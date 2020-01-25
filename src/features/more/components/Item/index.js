// @flow

import React from 'react';
import { View, Text } from 'react-native';
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
} from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import { ITEM_FORM, EDIT_ITEM, ADD_ITEM, ITEM_UNITS } from '../../constants';
import { BUTTON_COLOR } from '../../../../api/consts/core';
import { colors } from '../../../../styles/colors';
import Lng from '../../../../api/lang/i18n';
import { goBack, UNMOUNT, MOUNT } from '../../../../navigation/actions';
import { ADD_TAX } from '../../../settings/constants';
import { MAX_LENGTH, alertMe, formatSelectPickerName, hasValue } from '../../../../api/global';

export class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isTaxPerItem: true
        }
    }

    componentDidMount() {
        const { navigation, getItemUnits, getSettingItem, type } = this.props

        getItemUnits()

        type === ADD_ITEM && getSettingItem({
            key: 'tax_per_item',
            onResult: (res) => this.setState({ isTaxPerItem: res === 'YES' })
        })

        goBack(MOUNT, navigation)
    }

    componentWillMount() {
        const { getEditItem, type, itemId } = this.props;

        const isEdit = (type === EDIT_ITEM)

        isEdit && getEditItem({ id: itemId })
    }

    componentWillUnmount() {
        const { clearItem } = this.props
        clearItem()
        goBack(UNMOUNT)
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(ITEM_FORM, field, value));
    };

    saveItem = (values) => {
        const {
            addItem,
            editItem,
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
            total: this.finalAmount(),
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

        type == ADD_ITEM ? addItem({
            item,
            onResult: () => {
                navigation.navigate(ROUTES.GLOBAL_ITEMS)
            }
        }) : editItem({
            item: { ...item },
            id: itemId,
            onResult: () => {
                navigation.navigate(ROUTES.GLOBAL_ITEMS)
            }
        })

    };

    removeItem = () => {
        const { removeItem, itemId, navigation, language } = this.props

        alertMe({
            title: Lng.t("alert.title", { locale: language }),
            desc: Lng.t("items.alertDescription", { locale: language }),
            showCancel: true,
            okPress: () => removeItem({
                id: itemId,
                onResult: (res) => {
                    res.error && res.error === 'item_attached' ?
                        alertMe({
                            title: Lng.t("items.alreadyAttachTitle", { locale: language }),
                            desc: Lng.t("items.alreadyAttachDescription", { locale: language })
                        })
                        : navigation.navigate(ROUTES.GLOBAL_ITEMS)
                }
            })
        })

    }

    totalAmount = () => {
        const { formValues: { price } } = this.props

        return price + this.itemTax()
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
        const { formValues: { price } } = this.props
        return (tax * price) / 100
    }

    getCompoundTaxValue = (tax) => {
        return (tax * JSON.parse(this.totalAmount())) / 100
    }

    getTaxName = (tax) => {
        const { taxTypes } = this.props
        let taxName = ''

        const type = taxTypes && taxTypes.filter(val => val.fullItem.id === tax.tax_type_id)

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
            formValues: { taxes, price },
            navigation,
        } = this.props

        const currency = navigation.getParam('currency')

        return (
            <View style={styles.amountContainer}>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.label}>
                            {Lng.t("items.subTotal", { locale: language })}
                        </Text>
                    </View>
                    <View>
                        <CurrencyFormat
                            amount={price}
                            currency={currency}
                            style={styles.price}
                        />
                    </View>
                </View>

                {taxes &&
                    taxes.map(val => !val.compound_tax ? (
                        <View style={styles.subContainer}>
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
                        />
                    </View>
                </View>
            </View>
        )
    };

    BOTTOM_ACTION = (handleSubmit) => {
        const { language, loading, type } = this.props
        const isCreateItem = (type === ADD_ITEM)

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
                        buttonContainerStyle={styles.buttonContainer}
                        buttonColor={BUTTON_COLOR.DANGER}
                        loading={loading}
                    />
                )}
            </View>
        )
    }

    TAX_FIELD_VIEW = () => {
        const {
            navigation,
            language,
            taxTypes,
            formValues: { taxes }
        } = this.props;

        return (
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
                language={language}
                concurrentMultiSelect
                isInternalSearch
                compareField="id"
                valueCompareField="tax_type_id"
                listViewProps={{
                    contentContainerStyle: { flex: 2 }
                }}
                headerProps={{
                    title: Lng.t("taxes.title", { locale: language }),
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
        )
    }

    render() {
        const {
            navigation,
            handleSubmit,
            loading,
            language,
            type,
            units,
            formValues: { taxes }
        } = this.props;
        const { isTaxPerItem } = this.state
        const isCreateItem = (type === ADD_ITEM)
        let itemRefs = {}

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.navigate(ROUTES.GLOBAL_ITEMS),
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
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{ is: loading || !hasValue(isTaxPerItem) }}
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
                            autoFocus: true,
                            onSubmitEditing: () => {
                                itemRefs.price.focus();
                            }
                        }}
                    />

                    <Field
                        name="price"
                        component={InputField}
                        isRequired
                        hint={Lng.t("items.price", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            keyboardType: 'numeric'
                        }}
                        isCurrencyInput
                        refLinkFn={(ref) => {
                            itemRefs.price = ref;
                        }}
                    />

                    <Field
                        name="unit_id"
                        component={SelectPickerField}
                        label={Lng.t("items.unit", { locale: language })}
                        items={formatSelectPickerName(units)}
                        fieldIcon={'balance-scale'}
                        containerStyle={styles.selectPicker}
                        defaultPickerOptions={{
                            label: Lng.t("items.unitPlaceholder", { locale: language }),
                            value: '',
                        }}
                    />

                    {isTaxPerItem && this.TAX_FIELD_VIEW()}

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
                        refLinkFn={(ref) => {
                            itemRefs.description = ref;
                        }}
                    />

                </View>

            </DefaultLayout>

        );
    }
}
