// @flow

import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Alert,
} from 'react-native';
import styles from './styles';
import { Field, change } from 'redux-form';

import {
    InputField,
    CtDivider,
    CtButton,
    DefaultLayout,
    SelectField,
    SelectPickerField,
    CurrencyFormat,
    RadioButtonGroup,
} from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import {
    ITEM_DISCOUNT_OPTION,
    ITEM_EDIT,
    ITEM_ADD,
    ITEM_FORM
} from '../../constants';
import { BUTTON_COLOR } from '../../../../api/consts/core';
import { colors } from '../../../../styles/colors';
import Lng from '../../../../api/lang/i18n';
import { ADD_TAX } from '../../../settings/constants';
import { MAX_LENGTH, formatSelectPickerName } from '../../../../api/global';
import { ITEM_UNITS } from '../../../more/constants';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
export class EstimateItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        const { navigation, getItemUnits, itemId } = this.props

        !itemId && getItemUnits && getItemUnits()

        navigation.addListener(
            'didFocus',
            payload => {
                this.forceUpdate();
            }
        );

        goBack(MOUNT, navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(ITEM_FORM, field, value));
    };

    saveItem = (values) => {
        const {
            addItem,
            removeEstimateItem,
            setEstimateItems,
            itemId,
            navigation,
            type,
            language,
        } = this.props

        if (this.finalAmount() < 0) {
            alert(Lng.t("items.lessAmount", { locale: language }))

            return
        }

        const item = {
            ...values,
            title: values.name,
            final_total: this.finalAmount(),
            total: this.subTotal(),
            discount_val: this.totalDiscount(),
            tax: this.itemTax() + this.itemCompoundTax(),
            taxes: values.taxes && values.taxes.map(val => {
                return {
                    ...val,
                    amount: val.compound_tax ?
                        this.getCompoundTaxValue(val.percent) :
                        this.getTaxValue(val.percent),
                }
            }),
        }

        const callback = () => {
            addItem({
                item,
                onResult: () => {
                    navigation.navigate(ROUTES.ESTIMATE)
                }
            })
        }

        if (!itemId) {
            callback()
        } else {
            const estimateItem = [{ ...item, item_id: itemId }]

            if (type === ITEM_EDIT) {
                removeEstimateItem({ id: itemId })
            }

            setEstimateItems({ estimateItem })

            navigation.navigate(ROUTES.ESTIMATE)
        }

    };

    removeItem = () => {
        const { removeEstimateItem, itemId, navigation, language } = this.props

        Alert.alert(
            Lng.t("alert.title", { locale: language }),
            '',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        navigation.navigate(ROUTES.ESTIMATE)
                        removeEstimateItem({ id: itemId })
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );

    }

    totalDiscount = () => {
        const { formValues: { discount, discount_type } } = this.props

        let discountPrice = 0

        if (discount_type === 'percentage') {
            discountPrice = ((discount * this.itemSubTotal()) / 100)
        } else if (discount_type === 'fixed') {
            discountPrice = (discount * 100)
        }
        else if (discount_type === 'none') {
            discountPrice = 0
            this.setFormField('discount', 0)
        }

        return discountPrice
    }

    totalAmount = () => {
        return this.subTotal() + this.itemTax()
    }

    itemSubTotal = () => {
        const { formValues: { quantity, price } } = this.props

        subTotal = (price * quantity)

        return subTotal
    }

    subTotal = () => {
        return this.itemSubTotal() - this.totalDiscount()
    }

    itemTax = () => {
        const { formValues: { taxes } } = this.props

        let totalTax = 0

        taxes && taxes.map(val => {
            if (!val.compound_tax) {
                totalTax += this.getTaxValue(val.percent)
            }
        })

        return totalTax
    }

    itemCompoundTax = () => {
        const { formValues: { taxes } } = this.props

        let totalTax = 0

        taxes && taxes.map(val => {
            if (val.compound_tax) {
                totalTax += this.getCompoundTaxValue(val.percent)
            }
        })

        return totalTax
    }

    getTaxValue = (tax) => {
        return (tax * JSON.parse(this.subTotal())) / 100
    }

    getCompoundTaxValue = (tax) => {
        return (tax * JSON.parse(this.totalAmount())) / 100
    }

    getTaxName = (tax) => {
        const { taxTypes } = this.props
        let taxName = ''

        const type = taxTypes.filter(val => val.fullItem.id === tax.tax_type_id)

        if (taxTypes && type.length > 0) {
            taxName = type[0]['fullItem'].name
        }
        return taxName
    }

    finalAmount = () => {
        return this.totalAmount() + this.itemCompoundTax()
    }

    FINAL_AMOUNT = () => {
        const {
            language,
            formValues: { quantity, price, taxes },
            navigation,
            discountPerItem,
        } = this.props

        const currency = navigation.getParam('currency')

        return (
            <View style={styles.amountContainer}>
                <View style={styles.subContainer}>
                    <View>
                        <CurrencyFormat
                            amount={price}
                            currency={currency}
                            preText={`${quantity} x `}
                            style={styles.label}
                        />
                    </View>
                    <View>
                        <CurrencyFormat
                            amount={this.itemSubTotal()}
                            currency={currency}
                            style={styles.price}
                        />
                    </View>
                </View>
                {discountPerItem === 'YES' && (
                    <View style={styles.subContainer}>
                        <View>
                            <Text style={styles.label}>
                                {Lng.t("items.finalDiscount", { locale: language })}
                            </Text>
                        </View>
                        <View>
                            <CurrencyFormat
                                amount={this.totalDiscount()}
                                currency={currency}
                                style={styles.price}
                            />
                        </View>
                    </View>
                )}

                {taxes &&
                    taxes.map((val, index) => !val.compound_tax ? (
                        <View
                            style={styles.subContainer}
                            key={index}
                        >
                            <View>
                                <Text style={styles.label}>
                                    {this.getTaxName(val)} ({val.percent} %)
                            </Text>
                            </View>
                            <View>
                                <CurrencyFormat
                                    amount={this.getTaxValue(val.percent)}
                                    currency={currency}
                                    style={styles.price}
                                />
                            </View>
                        </View>
                    ) : null)
                }

                {taxes &&
                    taxes.map(val => val.compound_tax ? (
                        <View style={styles.subContainer}>
                            <View>
                                <Text style={styles.label}>
                                    {this.getTaxName(val)} ({val.percent} %)
                            </Text>
                            </View>
                            <View>
                                <CurrencyFormat
                                    amount={this.getCompoundTaxValue(val.percent)}
                                    currency={currency}
                                    style={styles.price}
                                />
                            </View>
                        </View>
                    ) : null)
                }

                <CtDivider dividerStyle={styles.divider} />

                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.label}>
                            {Lng.t("items.finalAmount", { locale: language })}
                        </Text>
                    </View>
                    <View>
                        <CurrencyFormat
                            amount={this.finalAmount()}
                            currency={currency}
                            style={styles.totalPrice}
                            currencyStyle={styles.finalAmountCurrency}
                        />
                    </View>
                </View>
            </View>
        )
    };

    BOTTOM_ACTION = (handleSubmit) => {
        const { language, loading, type } = this.props
        const isCreateItem = (type === ITEM_ADD)
        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(this.saveItem)}
                    btnTitle={Lng.t("button.save", { locale: language })}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                    loading={loading}
                />
                {!isCreateItem && (
                    <CtButton
                        onPress={this.removeItem}
                        btnTitle={Lng.t("button.remove", { locale: language })}
                        containerStyle={styles.handleBtn}
                        buttonColor={BUTTON_COLOR.DANGER}
                        buttonContainerStyle={styles.buttonContainer}
                        loading={loading}
                    />
                )}

            </View>
        )
    }

    render() {
        const {
            navigation,
            handleSubmit,
            loading,
            formValues: { discount_type, taxes, discount },
            initialValues,
            language,
            type,
            discountPerItem,
            taxTypes,
            itemId,
            taxPerItem,
            units
        } = this.props;

        const isCreateItem = (type === ITEM_ADD)
        let itemRefs = {}

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.navigate(ROUTES.ESTIMATE),
                    title: isCreateItem ?
                        Lng.t("header.addItem", { locale: language }) :
                        Lng.t("header.editItem", { locale: language }),
                    placement: "center",
                    rightIcon: 'save',
                    rightIconProps: {
                        solid: true
                    },
                    rightIconPress: handleSubmit(this.saveItem),
                }}
                loadingProps={{
                    is: loading
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
            >
                <View style={styles.bodyContainer}>
                    <Field
                        name="name"
                        component={InputField}
                        isRequired
                        hint={Lng.t("items.name", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            onSubmitEditing: () => {
                                itemRefs.quantity.focus();
                            }
                        }}
                    />

                    <View style={styles.dateFieldContainer}>
                        <View style={styles.dateField}>
                            <Field
                                name={'quantity'}
                                isRequired
                                component={InputField}
                                hint={Lng.t("items.quantity", { locale: language })}
                                inputProps={{
                                    returnKeyType: 'next',
                                    keyboardType: 'numeric',
                                    onSubmitEditing: () => {
                                        itemRefs.price.focus();
                                    }
                                }}
                                refLinkFn={(ref) => {
                                    itemRefs.quantity = ref;
                                }}
                            />
                        </View>
                        <View style={styles.dateField}>
                            <Field
                                name="price"
                                isRequired
                                component={InputField}
                                hint={Lng.t("items.price", { locale: language })}
                                inputProps={{
                                    returnKeyType: 'next',
                                    keyboardType: 'numeric'
                                }}
                                refLinkFn={(ref) => {
                                    itemRefs.price = ref;
                                }}
                                isCurrencyInput
                            />
                        </View>
                    </View>

                    {(initialValues.unit || !itemId) && (
                        <Field
                            name="unit_id"
                            label={Lng.t("items.unit", { locale: language })}
                            component={SelectPickerField}
                            items={formatSelectPickerName(units)}
                            defaultPickerOptions={{
                                label: Lng.t("items.unitPlaceholder", { locale: language }),
                                value: '',
                            }}
                            disabled={itemId ? true : false}
                            fieldIcon={'balance-scale'}
                        />
                    )}

                    {discountPerItem == 'YES' && (
                        <View>
                            <Field
                                name="discount_type"
                                component={RadioButtonGroup}
                                hint={Lng.t("items.discountType", { locale: language })}
                                options={ITEM_DISCOUNT_OPTION}
                                initialValue={initialValues.discount_type}
                            />

                            <Field
                                name="discount"
                                component={InputField}
                                hint={Lng.t("items.discount", { locale: language })}
                                inputProps={{
                                    returnKeyType: 'next',
                                    autoCapitalize: 'none',
                                    autoCorrect: true,
                                    keyboardType: 'numeric'
                                }}
                                disabled={discount_type === 'none'}
                            />
                        </View>
                    )}

                    {taxPerItem === 'YES' && (
                        <Field
                            name="taxes"
                            items={taxTypes}
                            displayName="name"
                            label={Lng.t("items.taxes", { locale: language })}
                            component={SelectField}
                            searchFields={['name', 'percent']}
                            placeholder={Lng.t("items.selectTax", { locale: language })}
                            onlyPlaceholder
                            fakeInputProps={{
                                icon: 'percent',
                                rightIcon: 'angle-right',
                                color: colors.gray,
                            }}
                            navigation={navigation}
                            isMultiSelect
                            isInternalSearch
                            language={language}
                            concurrentMultiSelect
                            compareField="id"
                            valueCompareField="tax_type_id"
                            listViewProps={{
                                contentContainerStyle: { flex: 2 }
                            }}
                            headerProps={{
                                title: Lng.t("taxes.title", { locale: language })
                            }}
                            rightIconPress={
                                () => navigation.navigate(ROUTES.TAX, {
                                    type: ADD_TAX,
                                    onSelect: (val) => {
                                        this.setFormField('taxes',
                                            [...val, ...taxes]
                                        )
                                    }
                                })
                            }
                            emptyContentProps={{
                                contentType: "taxes",
                            }}
                        />
                    )}

                    {this.FINAL_AMOUNT()}

                    <Field
                        name="description"
                        component={InputField}
                        hint={Lng.t("items.description", { locale: language })}
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
