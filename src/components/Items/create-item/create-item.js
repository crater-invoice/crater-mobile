import React from 'react';
import {View} from 'react-native';
import {Field, change} from 'redux-form';
import styles from './create-item-styles';
import {
  InputField,
  CtDivider,
  DefaultLayout,
  CurrencyFormat,
  RadioButtonGroup,
  View as CtView,
  ActionButton,
  Text
} from '@/components';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {
  alertMe,
  definePlatformParam,
  hasValue,
  isIosPlatform,
  MAX_LENGTH
} from '@/constants';
import {TaxSelectModal, UnitSelectModal} from '@/select-modal';
import {itemActions} from '@/stores/items/helper';
import {CREATE_ITEM_FORM, ITEM_DISCOUNT_OPTION} from '@/stores/items/types';
import {IProps} from './create-item-types';

export class CreateItem extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

  setFormField = (field, value) => {
    this.props.dispatch(change(CREATE_ITEM_FORM, field, value));
  };

  saveItem = values => {
    const {itemId, navigation, type, screen, dispatch} = this.props;
    if (this.finalAmount() < 0) {
      alert(t('items.lessAmount'));
      return;
    }

    const item = {
      ...values,
      final_total: this.finalAmount(),
      total: this.subTotal(),
      discount_val: this.totalDiscount(),
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

    const callback = () => {
      dispatch(
        itemActions[screen].addItem({
          item,
          onResult: () => {
            navigation.goBack(null);
          }
        })
      );
    };

    if (!itemId) {
      callback();
    } else {
      const itemData = [{...item, item_id: itemId}];

      if (type === 'UPDATE') {
        dispatch(itemActions[screen].removeItem({id: itemId}));
      }
      dispatch(itemActions[screen].setItems(itemData));
      navigation.goBack(null);
    }
  };

  removeItem = () => {
    const {dispatch, itemId, navigation, screen} = this.props;

    alertMe({
      title: t('alert.title'),
      showCancel: true,
      okPress: () => {
        navigation.goBack(null);
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

  FINAL_AMOUNT = () => {
    const {
      formValues: {quantity, price, taxes},
      discountPerItem,
      theme,
      route
    } = this.props;

    const currency = route?.params?.currency;
    const color = theme?.listItem?.primary?.color;

    return (
      <View style={styles.amountContainer(theme)}>
        <View style={styles.subContainer}>
          <View style={{overflow: 'hidden'}}>
            <CurrencyFormat
              amount={price}
              currency={currency}
              preText={`${quantity} x `}
              style={styles.label(theme)}
            />
          </View>
          <View
            style={{
              marginTop: definePlatformParam(6, 5)
            }}
          >
            <CurrencyFormat
              amount={this.itemSubTotal()}
              currency={currency}
              style={styles.price(theme)}
              symbolStyle={styles.currencySymbol}
              currencySymbolStyle={styles.symbol(currency)}
            />
          </View>
        </View>

        {(discountPerItem === 'YES' || discountPerItem === '1') && (
          <View style={styles.subContainer}>
            <View>
              <Text gray medium style={{marginTop: 6}}>
                {t('items.finalDiscount')}
              </Text>
            </View>
            <View>
              <CurrencyFormat
                amount={this.totalDiscount()}
                currency={currency}
                style={styles.price(theme)}
                symbolStyle={styles.currencySymbol}
                currencySymbolStyle={styles.symbol(currency)}
              />
            </View>
          </View>
        )}

        {taxes &&
          taxes.map((val, index) =>
            !val.compound_tax ? (
              <View style={styles.subContainer} key={index}>
                <View>
                  <Text color={color} medium style={{marginTop: 6}}>
                    {val.name} ({val.percent} %)
                  </Text>
                </View>
                <View style={styles.center}>
                  <CurrencyFormat
                    amount={this.getTaxValue(val.percent)}
                    currency={currency}
                    style={styles.price(theme)}
                    symbolStyle={styles.currencySymbol}
                    currencySymbolStyle={styles.symbol(currency)}
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
                  <Text color={color} medium style={{marginTop: 6}}>
                    {this.getTaxName(val)} ({val.percent} %)
                  </Text>
                </View>
                <View style={styles.center}>
                  <CurrencyFormat
                    amount={this.getCompoundTaxValue(val.percent)}
                    currency={currency}
                    style={styles.price(theme)}
                    symbolStyle={styles.currencySymbol}
                    currencySymbolStyle={styles.symbol(currency)}
                  />
                </View>
              </View>
            ) : null
          )}

        <CtDivider dividerStyle={styles.divider} />

        <View style={styles.subContainer}>
          <View>
            <Text color={color} medium style={{marginTop: 6}}>
              {t('items.finalAmount')}
            </Text>
          </View>
          <View>
            <CurrencyFormat
              amount={this.finalAmount()}
              currency={currency}
              style={styles.totalPrice(theme)}
              moneyStyle={{
                marginTop: definePlatformParam(2, 4.5)
              }}
              {...(isIosPlatform && {
                currencySymbolStyle: styles.symbol(currency)
              })}
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
      formValues: {discount_type, taxes},
      initialValues,
      type,
      discountPerItem,
      itemId,
      taxTypes,
      taxPerItem,
      units,
      fetchItemUnits,
      getTaxes,
      theme,
      route
    } = this.props;

    const currency = route?.params?.currency;
    const isCreateItem = type === 'ADD';
    let itemRefs = {};
    const bottomAction = [
      {
        label: 'button.save',
        onPress: handleSubmit(this.saveItem),
        loading
      },
      {
        label: 'button.remove',
        onPress: this.removeItem,
        loading,
        bgColor: 'btn-danger',
        show: !isCreateItem
      }
    ];

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.goBack(null),
          title: isCreateItem ? t('header.addItem') : t('header.editItem'),
          placement: 'center',
          rightIcon: 'save',
          rightIconProps: {
            solid: true
          },
          rightIconPress: handleSubmit(this.saveItem)
        }}
        loadingProps={{
          is: loading
        }}
        bottomAction={<ActionButton buttons={bottomAction} />}
      >
        <Field
          name="name"
          isRequired
          component={InputField}
          hint={t('items.name')}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true,
            onSubmitEditing: () => {
              itemRefs.quantity.focus();
            }
          }}
        />

        <CtView flex={1} flex-row>
          <CtView flex={1} justify-between>
            <Field
              name={'quantity'}
              component={InputField}
              isRequired
              hint={t('items.quantity')}
              inputProps={{
                returnKeyType: 'next',
                keyboardType: 'numeric',
                onSubmitEditing: () => {
                  itemRefs.price.focus();
                }
              }}
              refLinkFn={ref => {
                itemRefs.quantity = ref;
              }}
            />
          </CtView>
          <CtView flex={0.07} />
          <CtView flex={1} justify-between>
            <Field
              name="price"
              isRequired
              component={InputField}
              leftSymbol={currency?.symbol}
              hint={t('items.price')}
              inputProps={{
                returnKeyType: 'next',
                keyboardType: 'decimal-pad'
              }}
              refLinkFn={ref => {
                itemRefs.price = ref;
              }}
              isCurrencyInput
            />
          </CtView>
        </CtView>

        {(initialValues.unit || !itemId) && (
          <Field
            name="unit_id"
            component={UnitSelectModal}
            units={units}
            fetchItemUnits={fetchItemUnits}
            onSelect={item => this.setFormField('unit_id', item.id)}
          />
        )}

        {(discountPerItem == 'YES' || discountPerItem == '1') && (
          <View>
            <Field
              name="discount_type"
              component={RadioButtonGroup}
              hint={t('items.discountType')}
              options={ITEM_DISCOUNT_OPTION}
              initialValue={initialValues.discount_type}
              theme={theme}
            />

            <Field
              name="discount"
              component={InputField}
              hint={t('items.discount')}
              inputProps={{
                returnKeyType: 'next',
                autoCapitalize: 'none',
                autoCorrect: true,
                keyboardType: 'decimal-pad'
              }}
              disabled={discount_type === 'none'}
            />
          </View>
        )}

        {(taxPerItem === 'YES' || taxPerItem === '1') && (
          <Field
            name="taxes"
            taxTypes={taxTypes}
            getTaxes={getTaxes}
            component={TaxSelectModal}
            theme={theme}
            rightIconPress={() =>
              navigation.navigate(routes.TAX, {
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
          component={InputField}
          hint={t('items.description')}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true,
            multiline: true,
            maxLength: MAX_LENGTH
          }}
          height={80}
        />
      </DefaultLayout>
    );
  }
}
