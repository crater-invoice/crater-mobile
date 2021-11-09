import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Field, change} from 'redux-form';
import {
  BaseInput,
  BaseDivider,
  DefaultLayout,
  CurrencyFormat,
  Text,
  ActionButton
} from '@/components';
import {routes} from '@/navigation';
import {ITEM_FORM} from '../../constants';
import t from 'locales/use-translation';
import {definePlatformParam, keyboardType} from '@/constants';
import {alertMe, hasValue, MAX_LENGTH} from '@/constants';
import {TaxSelectModal, UnitSelectModal} from '@/select-modal';

export class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTaxPerItem: true,
      isLoading: true
    };
  }

  componentDidMount() {
    this.setInitialValues();
  }

  componentWillUnmount() {
    this.props.clearItem?.();
  }

  setInitialValues = () => {
    const {getEditItem, isEditScreen, itemId, getSettingInfo} = this.props;

    if (!isEditScreen) {
      getSettingInfo({
        key: 'tax_per_item',
        onSuccess: res => {
          this.setState({
            isTaxPerItem: res === 'YES',
            isLoading: false
          });
        }
      });
      return;
    }

    if (isEditScreen) {
      getEditItem({
        id: itemId,
        onResult: () => {
          this.setState({isLoading: false});
        }
      });
      return;
    }
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(ITEM_FORM, field, value));
  };

  saveItem = values => {
    const {addItem, editItem, itemId, isCreateScreen, navigation} = this.props;

    if (this.state.isLoading) {
      return;
    }

    if (this.finalAmount() < 0) {
      alert(t('items.less_amount'));
      return;
    }

    const item = {
      ...values,
      total: this.finalAmount(),
      tax: this.itemTax() + this.itemCompoundTax(),
      taxes:
        values.taxes &&
        values.taxes.map(val => {
          return {
            ...val,
            amount: val.compound_tax
              ? this.getCompoundTaxValue(val.percent)
              : this.getTaxValue(val.percent)
          };
        })
    };

    isCreateScreen
      ? addItem({
          item,
          onResult: () => {
            navigation.navigate(routes.GLOBAL_ITEMS);
          }
        })
      : editItem({
          item: {...item},
          id: itemId,
          onResult: () => {
            navigation.navigate(routes.GLOBAL_ITEMS);
          }
        });
  };

  removeItem = () => {
    const {removeItem, itemId, navigation} = this.props;

    if (this.state.isLoading) {
      return;
    }

    alertMe({
      title: t('alert.title'),
      desc: t('items.alert_description'),
      showCancel: true,
      okPress: () =>
        removeItem({
          id: itemId,
          onResult: res => {
            if (res.success) {
              navigation.navigate(routes.GLOBAL_ITEMS);
              return;
            }

            alertMe({
              title: t('items.already_attach_title'),
              desc: t('items.already_attach_description')
            });
          }
        })
    });
  };

  totalAmount = () => {
    const {formValues} = this.props;
    const price = formValues?.price ?? 0;
    return price + this.itemTax();
  };

  itemTax = () => {
    const {
      formValues: {taxes}
    } = this.props;

    let totalTax = 0;

    taxes &&
      taxes.map(val => {
        if (!val.compound_tax) {
          totalTax += this.getTaxValue(val.percent);
        }
      });

    return totalTax;
  };

  itemCompoundTax = () => {
    const {
      formValues: {taxes}
    } = this.props;

    let totalTax = 0;

    taxes &&
      taxes.map(val => {
        if (val.compound_tax) {
          totalTax += this.getCompoundTaxValue(val.percent);
        }
      });

    return totalTax;
  };

  getTaxValue = tax => {
    const {formValues} = this.props;
    const price = formValues?.price ?? 0;
    return (tax * price) / 100;
  };

  getCompoundTaxValue = tax => {
    return (tax * JSON.parse(this.totalAmount())) / 100;
  };

  getTaxName = tax => {
    if (hasValue(tax?.name)) {
      return tax.name;
    }

    const {taxTypes} = this.props;
    let taxName = '';

    const type =
      taxTypes && taxTypes.filter(val => val.fullItem.id === tax.tax_type_id);

    if (taxTypes && type.length > 0) {
      taxName = type[0]['fullItem'].name;
    }
    return taxName;
  };

  finalAmount = () => {
    return this.totalAmount() + this.itemCompoundTax();
  };

  FINAL_AMOUNT = () => {
    const {
      formValues: {taxes, price},
      currency,
      theme
    } = this.props;

    return (
      <View style={styles.amountContainer(theme)}>
        <View style={styles.subContainer}>
          <View>
            <Text gray h5 medium style={{marginTop: 6}}>
              {t('items.subtotal')}
            </Text>
          </View>
          <View style={{marginTop: definePlatformParam(6, 4)}}>
            <CurrencyFormat
              amount={price}
              currency={currency}
              style={styles.price(theme)}
              symbolStyle={styles.currencySymbol}
            />
          </View>
        </View>

        {taxes &&
          taxes.map(val =>
            !val.compound_tax ? (
              <View style={styles.subContainer}>
                <View>
                  <Text gray h5 medium style={{marginTop: 6}}>
                    {this.getTaxName(val)} ({val.percent} %)
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <CurrencyFormat
                    amount={this.getTaxValue(val.percent)}
                    currency={currency}
                    style={styles.price(theme)}
                    symbolStyle={styles.currencySymbol}
                  />
                </View>
              </View>
            ) : null
          )}

        {taxes &&
          taxes.map(val =>
            val.compound_tax ? (
              <View style={styles.subContainer}>
                <View>
                  <Text gray h5 medium style={{marginTop: 6}}>
                    {this.getTaxName(val)} ({val.percent} %)
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <CurrencyFormat
                    amount={this.getCompoundTaxValue(val.percent)}
                    currency={currency}
                    style={styles.price(theme)}
                    symbolStyle={styles.currencySymbol}
                  />
                </View>
              </View>
            ) : null
          )}

        <BaseDivider dividerStyle={styles.divider} />

        <View style={styles.subContainer}>
          <View>
            <Text gray h5 medium style={{marginTop: 6}}>
              {t('items.final_amount')}
            </Text>
          </View>
          <View style={{marginTop: definePlatformParam(4, 3)}}>
            <CurrencyFormat
              amount={this.finalAmount()}
              currency={currency}
              style={styles.totalPrice(theme)}
              currencyStyle={{
                marginTop: definePlatformParam(-1.5, -6)
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {
      navigation,
      handleSubmit,
      units,
      fetchItemUnits,
      currency,
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      loading,
      taxTypes,
      formValues: {taxes},
      fetchTaxes,
      theme
    } = this.props;

    const {isTaxPerItem, isLoading} = this.state;
    const disabled = !isAllowToEdit;
    let itemRefs = {};

    const getTitle = () => {
      let title = 'header.add_item';
      if (isEditScreen && !isAllowToEdit) title = 'header.view_item';
      if (isEditScreen && isAllowToEdit) title = 'header.edit_item';

      return t(title);
    };

    const bottomAction = [
      {
        label: 'button.save',
        onPress: handleSubmit(this.saveItem),
        show: isAllowToEdit,
        loading
      },
      {
        label: 'button.remove',
        onPress: this.removeItem,
        bgColor: 'btn-danger',
        show: isEditScreen && isAllowToDelete,
        loading
      }
    ];

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.navigate(routes.GLOBAL_ITEMS),
          title: getTitle(),
          placement: 'center',
          ...(isAllowToEdit && {
            rightIcon: 'save',
            rightIconProps: {solid: true},
            rightIconPress: handleSubmit(this.saveItem)
          })
        }}
        loadingProps={{is: isLoading}}
        bottomAction={<ActionButton buttons={bottomAction} />}
      >
        <Field
          name="name"
          component={BaseInput}
          isRequired
          hint={t('items.name')}
          disabled={disabled}
          onSubmitEditing={() => itemRefs.price.focus()}
        />

        <Field
          name="price"
          component={BaseInput}
          isRequired
          leftSymbol={currency?.symbol}
          hint={t('items.price')}
          disabled={disabled}
          keyboardType={keyboardType.DECIMAL}
          isCurrencyInput
          refLinkFn={ref => {
            itemRefs.price = ref;
          }}
        />

        <Field
          name="unit_id"
          component={UnitSelectModal}
          units={units}
          fetchItemUnits={fetchItemUnits}
          onSelect={item => this.setFormField('unit_id', item.id)}
          disabled={disabled}
        />

        {isTaxPerItem && (
          <Field
            name="taxes"
            taxTypes={taxTypes}
            fetchTaxes={fetchTaxes}
            component={TaxSelectModal}
            disabled={disabled}
            theme={theme}
            rightIconPress={() =>
              navigation.navigate(routes.CREATE_TAX, {
                type: 'ADD',
                onSelect: val => {
                  this.setFormField('taxes', [...val, ...taxes]);
                }
              })
            }
          />
        )}

        {this.FINAL_AMOUNT()}

        <Field
          name="description"
          component={BaseInput}
          hint={t('items.description')}
          inputProps={{
            multiline: true,
            maxLength: MAX_LENGTH
          }}
          disabled={disabled}
          height={80}
          refLinkFn={ref => {
            itemRefs.description = ref;
          }}
        />
      </DefaultLayout>
    );
  }
}
