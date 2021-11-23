import React from 'react';
import {View} from 'react-native';
import {Field, change} from 'redux-form';
import styles from './create-item-styles';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {TaxSelectModal, UnitSelectModal} from '@/select-modal';
import {itemActions} from 'stores/item/helper';
import {CREATE_ITEM_FORM, ITEM_DISCOUNT_OPTION} from 'stores/item/types';
import {IProps} from './create-item-types.d';
import {
  getApiFormattedCustomFields,
  showNotification,
  withExchangedAmount
} from '@/utils';
import {fetchItemInitialDetails} from 'stores/item/actions';
import {keyboardType} from '@/helpers/keyboard';
import {
  alertMe,
  hasValue,
  isBooleanTrue,
  isEmpty,
  MAX_LENGTH
} from '@/constants';
import {
  Text,
  BaseInput,
  BaseDivider,
  DefaultLayout,
  CurrencyFormat,
  RadioButtonGroup,
  View as CtView,
  BaseButtonGroup,
  BaseButton,
  CustomField,
  taxList
} from '@/components';

export class CreateItem extends React.Component<IProps> {
  itemRefs: any;

  constructor(props) {
    super(props);
    this.state = {isFetchingInitialData: true};
    this.itemRefs = {};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {itemId, isItemScreen, dispatch} = this.props;

    // if (!itemId || isItemScreen) {
    //   dispatch(
    //     fetchItemInitialDetails(() =>
    //       this.setState({isFetchingInitialData: false})
    //     )
    //   );
    //   return;
    // }

    this.setState({isFetchingInitialData: false});
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(CREATE_ITEM_FORM, field, value));
  };

  saveItem = values => {
    const {
      itemId,
      navigation,
      screen,
      dispatch,
      isDeleting,
      isSaving,
      isCreateScreen,
      isItemScreen
    } = this.props;

    if (isSaving || isDeleting) {
      return;
    }

    if (this.finalAmount() <= 0) {
      showNotification({message: t('items.less_amount'), type: 'error'});
      return;
    }

    const item = {
      ...values,
      final_total: this.finalAmount(),
      total: this.subTotal(),
      discount_val: this.totalDiscount(),
      tax: this.itemTax() + this.itemCompoundTax(),
      // customFields: getApiFormattedCustomFields(values?.customFields),
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

    if (isCreateScreen && !itemId) {
      let newItem = item;
      if (screen !== 'item') {
        const {price, total} = item;
        const itemAdd = true;
        newItem = {
          ...item,
          price: withExchangedAmount(price, itemAdd),
          total: withExchangedAmount(total, itemAdd),
          exchangePrice: price
        };
      }
      dispatch(
        itemActions[screen].addItem({
          item: newItem,
          onSuccess: () => navigation.goBack(null)
        })
      );
    } else {
      const itemData = [item];
      if (screen !== 'item') {
        dispatch(itemActions[screen].removeItem({id: itemId}));
      }
      dispatch(itemActions[screen].setItems(itemData));
      !isItemScreen && navigation.goBack(null);
    }
  };

  removeItem = () => {
    const {dispatch, itemId, navigation, screen, isItemScreen} = this.props;

    alertMe({
      title: t('alert.title'),
      showCancel: true,
      okPress: () => {
        !isItemScreen && navigation.goBack(null);
        dispatch(itemActions[screen].removeItem({id: itemId}));
      }
    });
  };

  totalDiscount = () => {
    const {
      formValues: {discount, discount_type}
    } = this.props;

    let discountPrice = 0;

    if (discount_type === 'percentage') {
      discountPrice = (discount * this.itemSubTotal()) / 100;
    } else if (discount_type === 'fixed') {
      discountPrice = discount * 100;
    } else if (discount_type === 'none') {
      discountPrice = 0;
      this.setFormField('discount', 0);
    }
    return discountPrice;
  };

  totalAmount = () => {
    return this.subTotal() + this.itemTax();
  };

  itemSubTotal = () => {
    const {
      formValues: {quantity, price}
    } = this.props;

    let subTotal = price * quantity;

    return subTotal;
  };

  subTotal = () => {
    return this.itemSubTotal() - this.totalDiscount();
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
    return (tax * JSON.parse(this.subTotal())) / 100;
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

    const type = taxTypes.filter(val => val.fullItem.id === tax.tax_type_id);

    if (type.length > 0) {
      taxName = type[0]['fullItem'].name;
    }
    return taxName;
  };

  finalAmount = () => {
    return this.totalAmount() + this.itemCompoundTax();
  };

  PRICE = () => {
    const currency = this.props.route?.params?.currency;
    return (
      <Field
        name="price"
        isRequired
        component={BaseInput}
        leftSymbol={currency?.symbol}
        hint={t('items.price')}
        keyboardType={keyboardType.DECIMAL}
        refLinkFn={ref => {
          this.itemRefs.price = ref;
        }}
        isCurrencyInput
      />
    );
  };

  PRICE_AND_QUANTITY = () => {
    return (
      <CtView flex={1} flex-row>
        <CtView flex={1} justify-between>
          <Field
            name={'quantity'}
            component={BaseInput}
            isRequired
            hint={t('items.quantity')}
            onSubmitEditing={() => this.itemRefs.price.focus()}
            keyboardType={keyboardType.DECIMAL}
            refLinkFn={ref => {
              this.itemRefs.quantity = ref;
            }}
          />
        </CtView>
        <CtView flex={0.07} />
        <CtView flex={1} justify-between>
          {this.PRICE()}
        </CtView>
      </CtView>
    );
  };

  FINAL_AMOUNT = () => {
    const {
      formValues: {quantity, price, taxes},
      discountPerItem,
      theme,
      route,
      screen
    } = this.props;
    const isItemScreen = screen === 'item';

    const currency = route?.params?.currency;
    const color = theme?.listItem?.primary?.color;

    return (
      <View style={styles.amountContainer(theme)}>
        <View style={styles.subContainer}>
          <View style={styles.currencyFormatContainer}>
            <CurrencyFormat
              amount={price}
              currency={currency}
              preText={`${quantity} x `}
              style={styles.label(theme)}
            />
          </View>
          <View style={styles.currencyFormatContainer}>
            <CurrencyFormat
              amount={this.itemSubTotal()}
              currency={currency}
              style={styles.price(theme)}
            />
          </View>
        </View>

        {isBooleanTrue(discountPerItem) && !isItemScreen && (
          <View style={styles.subContainer}>
            <View>
              <Text gray medium style={{marginTop: 6}}>
                {t('items.final_discount')}
              </Text>
            </View>
            <View>
              <CurrencyFormat
                amount={this.totalDiscount()}
                currency={currency}
                style={styles.price(theme)}
              />
            </View>
          </View>
        )}

        {taxes &&
          taxes.map(tax => {
            if (tax.compound_tax) return;
            return taxList({
              key: tax.id,
              currency,
              theme,
              label: `${tax.name} ${tax.percent} %`,
              amount: this.getTaxValue(tax.percent)
            });
          })}

        {taxes &&
          taxes.map(tax => {
            if (!tax.compound_tax) return;
            return taxList({
              key: tax.id,
              currency,
              theme,
              label: `${this.getTaxName(tax)} ${tax.percent} %`,
              amount: this.getCompoundTaxValue(tax.percent)
            });
          })}

        <BaseDivider dividerStyle={styles.divider} />

        <View style={styles.subContainer}>
          <View>
            <Text color={color} medium style={{marginTop: 6}}>
              {t('items.final_amount')}
            </Text>
          </View>
          <View>
            <CurrencyFormat
              amount={this.finalAmount()}
              currency={currency}
              style={styles.totalPrice(theme)}
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
      loading,
      formValues: {discount_type, taxes, unit},
      initialValues,
      screen,
      discountPerItem,
      itemId,
      taxTypes,
      taxPerItem,
      units,
      isCreateScreen,
      isEditScreen,
      isItemScreen,
      fetchItemUnits,
      theme,
      fetchTaxes,
      isSaving,
      isDeleting,
      formValues,
      customFields
    } = this.props;
    const {isFetchingInitialData} = this.state;
    const unitName = unit?.name;
    // const hasCustomField = !itemId || isItemScreen ? true : false;

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          loading={loading || isSaving}
          onPress={handleSubmit(this.saveItem)}
          disabled={isFetchingInitialData || isDeleting}
        >
          {t('button.save')}
        </BaseButton>
        <BaseButton
          show={!isCreateScreen}
          loading={loading || isDeleting}
          disabled={isFetchingInitialData || isSaving}
          onPress={this.removeItem}
          type="danger"
        >
          {t('button.remove')}
        </BaseButton>
      </BaseButtonGroup>
    );

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.goBack(null),
          title: isCreateScreen ? t('header.add_item') : t('header.edit_item'),
          placement: 'center',
          rightIcon: 'save',
          rightIconProps: {
            solid: true
          },
          rightIconPress: handleSubmit(this.saveItem)
        }}
        loadingProps={{is: isFetchingInitialData}}
        bottomAction={bottomAction}
      >
        <Field
          name="name"
          isRequired
          component={BaseInput}
          hint={t('items.name')}
          onSubmitEditing={() => this.itemRefs.quantity.focus()}
        />

        {isItemScreen ? this.PRICE() : this.PRICE_AND_QUANTITY()}

        {(!itemId || isItemScreen) && (
          <Field
            name="unit_id"
            component={UnitSelectModal}
            units={units}
            fetchItemUnits={fetchItemUnits}
            onSelect={item => this.setFormField('unit_id', item.id)}
            placeholder={unitName ? unitName : t('items.unit_placeholder')}
          />
        )}

        {isBooleanTrue(discountPerItem) && !isItemScreen && (
          <View>
            <Field
              name="discount_type"
              component={RadioButtonGroup}
              hint={t('items.discount_type')}
              options={ITEM_DISCOUNT_OPTION}
              initialValue={initialValues?.discount_type}
              theme={theme}
            />

            <Field
              name="discount"
              component={BaseInput}
              hint={t('items.discount')}
              keyboardType={keyboardType.DECIMAL}
              disabled={discount_type === 'none'}
              inputProps={{selectTextOnFocus: true}}
            />
          </View>
        )}

        {isBooleanTrue(taxPerItem) && (
          <Field
            name="taxes"
            taxTypes={taxTypes}
            fetchTaxes={fetchTaxes}
            component={TaxSelectModal}
            multiSelectedItems={formValues?.taxes}
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

        {/* {hasCustomField && <CustomField {...this.props} />} */}

        <Field
          name="description"
          component={BaseInput}
          hint={t('items.description')}
          inputProps={{
            multiline: true,
            maxLength: MAX_LENGTH
          }}
          height={80}
        />
      </DefaultLayout>
    );
  }
}
