// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Field, change } from 'redux-form';
import {
    InputField,
    CtDivider,
    DefaultLayout,
    SelectField,
    CurrencyFormat,
    RadioButtonGroup,
    Text,
    ActionButton,
    View as CtView
} from '@/components';
import {
    ITEM_DISCOUNT_OPTION,
    ITEM_EDIT,
    ITEM_ADD,
    ITEM_FORM
} from '../../constants';
import { colors } from '@/styles';
import Lng from '@/lang/i18n';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { ADD_TAX } from '@/features/settings/constants';
import {
    alertMe,
    hasValue,
    isIosPlatform,
    isIPhoneX,
    MAX_LENGTH
} from '@/constants';

export class EstimateItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation);
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(ITEM_FORM, field, value));
    };

    saveItem = values => {
        const {
            addItem,
            removeEstimateItem,
            setEstimateItems,
            itemId,
            navigation,
            type,
            locale
        } = this.props;

        if (this.finalAmount() < 0) {
            alert(Lng.t('items.lessAmount', { locale }));

            return;
        }

        const item = {
            ...values,
            title: values.name,
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
            addItem({
                item,
                onResult: () => {
                    navigation.navigate(ROUTES.ESTIMATE);
                }
            });
        };

        if (!itemId) {
            callback();
        } else {
            const estimateItem = [{ ...item, item_id: itemId }];

            if (type === ITEM_EDIT) {
                removeEstimateItem({ id: itemId });
            }

            setEstimateItems({ estimateItem });

            navigation.navigate(ROUTES.ESTIMATE);
        }
    };

    removeItem = () => {
        const { removeEstimateItem, itemId, navigation, locale } = this.props;

        alertMe({
            title: Lng.t('alert.title', { locale }),
            showCancel: true,
            okPress: () => {
                navigation.navigate(ROUTES.ESTIMATE);
                removeEstimateItem({ id: itemId });
            }
        });
    };

    totalDiscount = () => {
        const {
            formValues: { discount, discount_type }
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
            formValues: { quantity, price }
        } = this.props;

        subTotal = price * quantity;

        return subTotal;
    };

    subTotal = () => {
        return this.itemSubTotal() - this.totalDiscount();
    };

    itemTax = () => {
        const {
            formValues: { taxes }
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
            formValues: { taxes }
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

        const { taxTypes } = this.props;
        let taxName = '';

        const type = taxTypes.filter(
            val => val.fullItem.id === tax.tax_type_id
        );

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
            locale,
            formValues: { quantity, price, taxes },
            navigation,
            discountPerItem,
            theme
        } = this.props;

        const currency = navigation.getParam('currency');
        const color = theme?.listItem?.primary?.color;

        return (
            <View style={styles.amountContainer(theme)}>
                <View style={styles.subContainer}>
                    <View style={{ overflow: 'hidden' }}>
                        <CurrencyFormat
                            amount={price}
                            currency={currency}
                            preText={`${quantity} x `}
                            style={styles.label(theme)}
                            currencyStyle={{
                                marginTop: isIosPlatform() ? 6.5 : 3
                            }}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: isIosPlatform() ? 6 : 5
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
                            <Text gray medium style={{ marginTop: 6 }}>
                                {Lng.t('items.finalDiscount', { locale })}
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
                                    <Text
                                        color={color}
                                        medium
                                        style={{ marginTop: 6 }}
                                    >
                                        {this.getTaxName(val)} ({val.percent} %)
                                    </Text>
                                </View>
                                <View style={styles.center}>
                                    <CurrencyFormat
                                        amount={this.getTaxValue(val.percent)}
                                        currency={currency}
                                        style={styles.price(theme)}
                                        symbolStyle={styles.currencySymbol}
                                        currencySymbolStyle={styles.symbol(
                                            currency
                                        )}
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
                                    <Text
                                        color={color}
                                        medium
                                        style={{ marginTop: 6 }}
                                    >
                                        {this.getTaxName(val)} ({val.percent} %)
                                    </Text>
                                </View>
                                <View style={styles.center}>
                                    <CurrencyFormat
                                        amount={this.getCompoundTaxValue(
                                            val.percent
                                        )}
                                        currency={currency}
                                        style={styles.price(theme)}
                                        symbolStyle={styles.currencySymbol}
                                        currencySymbolStyle={styles.symbol(
                                            currency
                                        )}
                                    />
                                </View>
                            </View>
                        ) : null
                    )}

                <CtDivider dividerStyle={styles.divider} />

                <View style={styles.subContainer}>
                    <View>
                        <Text color={color} medium style={{ marginTop: 6 }}>
                            {Lng.t('items.finalAmount', { locale })}
                        </Text>
                    </View>
                    <View>
                        <CurrencyFormat
                            amount={this.finalAmount()}
                            currency={currency}
                            style={styles.totalPrice(theme)}
                            moneyStyle={{
                                marginTop: isIosPlatform() ? 2 : 4.5
                            }}
                            {...(isIosPlatform() && {
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
            formValues: { discount_type, taxes, discount },
            initialValues,
            locale,
            type,
            discountPerItem,
            taxTypes,
            itemId,
            taxPerItem,
            units,
            getTaxes,
            getItemUnits,
            theme
        } = this.props;

        const currency = navigation.getParam('currency');
        const isCreateItem = type === ITEM_ADD;
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
                    leftIconPress: () => navigation.navigate(ROUTES.ESTIMATE),
                    title: isCreateItem
                        ? Lng.t('header.addItem', { locale })
                        : Lng.t('header.editItem', { locale }),
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
                bottomAction={
                    <ActionButton locale={locale} buttons={bottomAction} />
                }
            >
                <View style={styles.bodyContainer}>
                    <Field
                        name="name"
                        component={InputField}
                        isRequired
                        hint={Lng.t('items.name', { locale })}
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
                                isRequired
                                component={InputField}
                                hint={Lng.t('items.quantity', { locale })}
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
                                hint={Lng.t('items.price', { locale })}
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
                            component={SelectField}
                            apiSearch
                            hasPagination
                            getItems={getItemUnits}
                            items={units}
                            displayName={'name'}
                            label={Lng.t('items.unit', { locale })}
                            icon={'balance-scale'}
                            placeholder={Lng.t('items.unitPlaceholder', {
                                locale
                            })}
                            navigation={navigation}
                            compareField={'id'}
                            emptyContentProps={{ contentType: 'units' }}
                            headerProps={{
                                title: Lng.t('items.unitPlaceholder', {
                                    locale
                                })
                            }}
                            fakeInputProps={{
                                valueStyle: styles.units,
                                placeholderStyle: styles.units
                            }}
                            onSelect={item =>
                                this.setFormField('unit_id', item.id)
                            }
                            paginationLimit={isIPhoneX() ? 20 : 15}
                            inputModalName="UnitModal"
                        />
                    )}

                    {(discountPerItem == 'YES' || discountPerItem == '1') && (
                        <View>
                            <Field
                                name="discount_type"
                                component={RadioButtonGroup}
                                hint={Lng.t('items.discountType', { locale })}
                                options={ITEM_DISCOUNT_OPTION}
                                initialValue={initialValues.discount_type}
                                theme={theme}
                            />

                            <Field
                                name="discount"
                                component={InputField}
                                hint={Lng.t('items.discount', { locale })}
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
                            items={taxTypes}
                            getItems={getTaxes}
                            apiSearch
                            hasPagination
                            displayName="name"
                            label={Lng.t('items.taxes', { locale })}
                            component={SelectField}
                            placeholder={Lng.t('items.selectTax', {
                                locale
                            })}
                            onlyPlaceholder
                            fakeInputProps={{
                                icon: 'percent',
                                rightIcon: 'angle-right',
                                color: colors.gray
                            }}
                            navigation={navigation}
                            isMultiSelect
                            locale={locale}
                            concurrentMultiSelect
                            compareField="id"
                            valueCompareField="tax_type_id"
                            listViewProps={{
                                contentContainerStyle: { flex: 2 }
                            }}
                            headerProps={{
                                title: Lng.t('taxes.title', { locale })
                            }}
                            rightIconPress={() =>
                                navigation.navigate(ROUTES.TAX, {
                                    type: ADD_TAX,
                                    onSelect: val => {
                                        this.setFormField('taxes', [
                                            ...val,
                                            ...taxes
                                        ]);
                                    }
                                })
                            }
                            emptyContentProps={{
                                contentType: 'taxes'
                            }}
                        />
                    )}

                    {this.FINAL_AMOUNT()}

                    <Field
                        name="description"
                        component={InputField}
                        hint={Lng.t('items.description', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            multiline: true,
                            maxLength: MAX_LENGTH
                        }}
                        height={80}
                    />
                </View>
            </DefaultLayout>
        );
    }
}
