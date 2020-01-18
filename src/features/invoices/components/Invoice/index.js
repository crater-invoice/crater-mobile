// @flow

import React, { Fragment } from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { Field, change } from 'redux-form';
import styles, { itemsDescriptionStyle } from './styles';
import {
    InputField,
    DatePickerField,
    CtDivider,
    CtButton,
    ListView,
    DefaultLayout,
    SelectField,
    SelectPickerField,
    CurrencyFormat,
    FakeInput,
    ToggleSwitch,
    TermsAndCondition
} from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import {
    INVOICE_ADD,
    INVOICE_EDIT,
    ITEM_ADD,
    ITEM_EDIT,
    INVOICE_FORM,
    INVOICE_ACTIONS,
    EDIT_INVOICE_ACTIONS
} from '../../constants';
import { BUTTON_TYPE } from '../../../../api/consts/core';
import { colors } from '../../../../styles/colors';
import { TemplateField } from '../TemplateField';
import { MOUNT, UNMOUNT, goBack } from '../../../../navigation/actions';
import Lng from '../../../../api/lang/i18n';
import { INVOICE_DISCOUNT_OPTION } from '../../constants';
import { CUSTOMER_ADD } from '../../../customers/constants';
import { IMAGES } from '../../../../config';
import { ADD_TAX } from '../../../settings/constants';
import { PAYMENT_ADD } from '../../../payments/constants';
import { MAX_LENGTH, alertMe, hasValue } from '../../../../api/global';


type IProps = {
    navigation: Object,
    invoiceItems: Object,
    taxTypes: Object,
    customers: Object,
    getCreateInvoice: Function,
    getEditInvoice: Function,
    clearInvoice: Function,
    createInvoice: Function,
    handleSubmit: Function,
    getCustomers: Function,
    getItems: Function,
    editInvoice: Boolean,
    itemsLoading: Boolean,
    initLoading: Boolean,
    loading: Boolean,
    invoiceData: Object,
    invoiceItems: Object,
    items: Object,
    language: String,
    type: String

}

const termsCondition = {
    description: 'terms_and_conditions',
    toggle: "display_terms_and_conditions"
}
export class Invoice extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            taxTypeList: [],
            currency: {},
            itemList: [],
            customerName: '',
            markAsStatus: null,
        };
    }


    componentDidMount() {

        const {
            getCreateInvoice,
            navigation,
            invoiceItems,
            getEditInvoice,
            type,
        } = this.props;

        type === INVOICE_EDIT ?
            getEditInvoice({
                id: navigation.getParam('id'),
                onResult: ({ user: { currency, name }, status }) => {
                    this.setState({
                        currency,
                        customerName: name,
                        markAsStatus: status
                    })
                }
            }) :
            getCreateInvoice({
                onResult: (val) => {
                    const { currency } = val

                    this.setState({ currency })
                }
            });

        navigation.addListener(
            'didFocus',
            payload => {
                this.forceUpdate();
            }
        );
        this.getInvoiceItemList(invoiceItems)

        this.androidBackHandler()
    }

    componentWillUnmount() {
        const { clearInvoice } = this.props
        clearInvoice();
        goBack(UNMOUNT)
    }

    androidBackHandler = () => {
        const { navigation, handleSubmit } = this.props
        goBack(MOUNT, navigation, { callback: () => this.onDraft(handleSubmit) })
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(INVOICE_FORM, field, value));
    };

    onEditItem = (item) => {
        const {
            navigation,
            invoiceData: { discount_per_item, tax_per_item }
        } = this.props
        const { currency } = this.state

        navigation.navigate(
            ROUTES.INVOICE_ITEM,
            { item, type: ITEM_EDIT, currency, discount_per_item, tax_per_item }
        )
    }

    onDraft = (handleSubmit) => {
        const { language, navigation, type } = this.props

        if (type === INVOICE_EDIT) {
            navigation.navigate(ROUTES.MAIN_INVOICES)
            return
        }

        alertMe({
            title: Lng.t("invoices.alert.draftTitle", { locale: language }),
            showCancel: true,
            cancelText: Lng.t("alert.action.discard", { locale: language }),
            cancelPress: () => navigation.navigate(ROUTES.MAIN_INVOICES),
            okText: Lng.t("alert.action.saveAsDraft", { locale: language }),
            okPress: handleSubmit(this.onSubmitInvoice)
        })
    }

    onSubmitInvoice = (values, status = 'draft') => {
        const {
            createInvoice,
            navigation,
            type,
            editInvoice,
            language,
            invoiceData: { invoice_prefix = '' } = {}
        } = this.props

        if (this.finalAmount() < 0) {
            alert(Lng.t("invoices.alert.lessAmount", { locale: language }))
            return
        }

        let invoice = {
            ...values,
            invoice_number: `${invoice_prefix}-${values.invoice_number}`,
            total: this.finalAmount(),
            sub_total: this.invoiceSubTotal(),
            tax: this.invoiceTax() + this.invoiceCompoundTax(),
            discount_val: this.totalDiscount(),
            taxes: values.taxes ? values.taxes.map(val => {
                return {
                    ...val,
                    amount: val.compound_tax ?
                        this.getCompoundTaxValue(val.percent) :
                        this.getTaxValue(val.percent),
                }
            }) : [],
        }

        if (status === 'send') {
            invoice.invoiceSend = true
        }

        type === INVOICE_ADD ?
            createInvoice({
                invoice,
                onResult: (url) => {
                    if (status === 'download') {
                        Linking.openURL(url);
                    }
                    navigation.navigate(ROUTES.MAIN_INVOICES)
                }
            }) :
            editInvoice({
                invoice: { ...invoice, id: navigation.getParam('id') },
                onResult: (url) => {
                    if (status === 'download') {
                        Linking.openURL(url);
                    }
                    navigation.navigate(ROUTES.MAIN_INVOICES)
                }
            })
    };

    invoiceSubTotal = () => {
        const { invoiceItems } = this.props
        let subTotal = 0
        invoiceItems.map(val => {
            subTotal += JSON.parse(val.total)
        })

        return JSON.parse(subTotal)
    }

    subTotal = () => {
        let invoiceTax = 0
        this.invoiceItemTotalTaxes().filter(val => {
            invoiceTax += val.amount
        })
        return (this.invoiceSubTotal() + invoiceTax) - this.totalDiscount()
    }

    invoiceTax = () => {
        const { formValues: { taxes } } = this.props

        let totalTax = 0

        taxes && taxes.map(val => {
            if (!val.compound_tax) {
                totalTax += this.getTaxValue(val.percent)
            }
        })

        return totalTax
    }

    invoiceCompoundTax = () => {
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

        if (type.length > 0) {
            taxName = type[0]['fullItem'].name
        }
        return taxName
    }

    totalDiscount = () => {
        const { formValues: { discount, discount_type } } = this.props

        let discountPrice = 0

        if (discount_type === 'percentage') {
            discountPrice = ((discount * this.invoiceSubTotal()) / 100)
        } else {
            discountPrice = (discount * 100)
        }

        return discountPrice
    }

    totalAmount = () => {
        return this.subTotal() + this.invoiceTax()
    }

    finalAmount = () => {
        return this.totalAmount() + this.invoiceCompoundTax()
    }

    invoiceItemTotalTaxes = () => {
        const { invoiceItems } = this.props
        let taxes = []
        invoiceItems.map(val => {
            val.taxes && val.taxes.filter(tax => {
                let hasSame = false
                const { tax_type_id, id, amount } = tax

                taxes = taxes.map(tax2 => {
                    if ((tax_type_id || id) === tax2.tax_type_id) {
                        hasSame = true
                        return {
                            ...tax2,
                            amount: amount + tax2.amount,
                            tax_type_id: tax2.tax_type_id
                        }
                    }
                    return tax2
                })

                if (!hasSame) {
                    taxes.push({ ...tax, tax_type_id: (tax_type_id || id) })
                }
            })
        })
        return taxes
    }

    FINAL_AMOUNT = () => {
        const { currency } = this.state

        const {
            language,
            taxTypes,
            navigation,
            invoiceData: { discount_per_item, tax_per_item },
            formValues: { taxes }
        } = this.props

        let taxPerItem = !(tax_per_item === 'NO' || typeof tax_per_item === 'undefined' || tax_per_item === null)

        let discountPerItem = !(discount_per_item === 'NO' || typeof discount_per_item === 'undefined' || discount_per_item === null)

        return (
            <View style={styles.amountContainer}>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.amountHeading}>
                            {Lng.t("invoices.subtotal", { locale: language })}
                        </Text>
                    </View>
                    <View>
                        <CurrencyFormat
                            amount={this.invoiceSubTotal()}
                            currency={currency}
                            style={styles.subAmount}
                        />
                    </View>
                </View>

                {(!discountPerItem) && (
                    <View style={[styles.subContainer, styles.discount]}>
                        <View>
                            <Text style={styles.amountHeading}>
                                {Lng.t("invoices.discount", { locale: language })}
                            </Text>
                        </View>
                        <View style={[styles.subAmount, styles.discountField]}>
                            <Field
                                name="discount"
                                component={InputField}
                                inputProps={{
                                    returnKeyType: 'next',
                                    autoCapitalize: 'none',
                                    autoCorrect: true,
                                    keyboardType: 'numeric',
                                }}
                                fieldStyle={styles.fieldStyle}
                            />
                            <Field
                                name="discount_type"
                                component={SelectPickerField}
                                items={INVOICE_DISCOUNT_OPTION}
                                onChangeCallback={(val) => {
                                    this.setFormField('discount_type', val)
                                }}
                                isFakeInput
                                defaultPickerOptions={{
                                    label: 'Fixed',
                                    value: 'fixed',
                                    color: colors.secondary,
                                    displayLabel: currency ? currency.symbol : '$',
                                }}
                                fakeInputValueStyle={styles.fakeInputValueStyle}
                                fakeInputContainerStyle={styles.selectPickerField}
                                containerStyle={styles.SelectPickerContainer}
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
                                <Text style={styles.amountHeading}>
                                    {this.getTaxName(val)} ({val.percent} %)
                                </Text>
                            </View>
                            <View>
                                <CurrencyFormat
                                    amount={this.getTaxValue(val.percent)}
                                    currency={currency}
                                    style={styles.subAmount}
                                />
                            </View>
                        </View>
                    ) : null
                    )
                }

                {taxes &&
                    taxes.map((val, index) => val.compound_tax ? (
                        <View
                            style={styles.subContainer}
                            key={index}
                        >
                            <View>
                                <Text style={styles.amountHeading}>
                                    {this.getTaxName(val)} ({val.percent} %)
                                </Text>
                            </View>
                            <View>
                                <CurrencyFormat
                                    amount={this.getCompoundTaxValue(val.percent)}
                                    currency={currency}
                                    style={styles.subAmount}
                                />
                            </View>
                        </View>
                    ) : null
                    )
                }

                {this.DISPLAY_ITEM_TAX()}

                {(!taxPerItem) && (
                    <Field
                        name="taxes"
                        items={taxTypes}
                        displayName="name"
                        component={SelectField}
                        searchFields={['name', 'percent']}
                        onlyPlaceholder
                        fakeInputProps={{
                            fakeInput: (
                                <Text style={styles.taxFakeInput}>
                                    {Lng.t("invoices.taxPlaceholder", { locale: language })}
                                </Text>
                            )
                        }}
                        navigation={navigation}
                        isMultiSelect
                        isInternalSearch
                        language={language}
                        concurrentMultiSelect
                        compareField="id"
                        valueCompareField="tax_type_id"
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
                        listViewProps={{
                            contentContainerStyle: { flex: 2 }
                        }}
                        emptyContentProps={{
                            contentType: "taxes",
                        }}
                    />
                )}

                <CtDivider dividerStyle={styles.divider} />

                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.amountHeading}>
                            {Lng.t("invoices.totalAmount", { locale: language })}:
                        </Text>
                    </View>
                    <View>
                        <CurrencyFormat
                            amount={this.finalAmount()}
                            currency={currency}
                            style={styles.finalAmount}
                        />
                    </View>
                </View>
            </View>
        )
    };

    BOTTOM_ACTION = () => {
        const { language, loading, handleSubmit } = this.props

        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit((val) => this.onSubmitInvoice(val, status = INVOICE_ACTIONS.VIEW))}
                    btnTitle={Lng.t("button.viewPdf", { locale: language })}
                    type={BUTTON_TYPE.OUTLINE}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                    loading={loading}
                />

                <CtButton
                    onPress={handleSubmit((val) => this.onSubmitInvoice(val, status = 'save'))}
                    btnTitle={Lng.t("button.save", { locale: language })}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                    loading={loading}
                />

            </View>
        )
    }

    DISPLAY_ITEM_TAX = () => {
        const { currency } = this.state
        let taxes = this.invoiceItemTotalTaxes()

        return taxes ? (
            taxes.map((val, index) => (
                <View
                    style={styles.subContainer}
                    key={index}
                >
                    <View>
                        <Text style={styles.amountHeading}>
                            {this.getTaxName(val)} ({val.percent} %)
                        </Text>
                    </View>
                    <View>
                        <CurrencyFormat
                            amount={val.amount}
                            currency={currency}
                            style={styles.subAmount}
                        />
                    </View>
                </View>
            )
            )
        ) : null
    }

    getInvoiceItemList = (invoiceItems) => {
        this.setFormField('items', invoiceItems)

        const { currency } = this.state

        let invoiceItemList = []

        if (typeof invoiceItems !== 'undefined' && invoiceItems.length != 0) {

            invoiceItemList = invoiceItems.map((item) => {

                let { name, description, price, quantity, total } = item

                return {
                    title: name,
                    subtitle: {
                        title: description,
                        labelComponent: (
                            <CurrencyFormat
                                amount={price}
                                currency={currency}
                                preText={`${quantity} * `}
                                style={styles.itemLeftSubTitle}
                                containerStyle={styles.itemLeftSubTitleLabel}
                            />
                        ),
                    },
                    amount: total,
                    currency,
                    fullItem: item,
                };
            });
        }

        return invoiceItemList
    }

    getItemList = (items) => {
        const { currency } = this.state

        let itemList = []

        if (typeof items !== 'undefined' && items.length != 0) {

            itemList = items.map((item) => {

                let { name, description, price } = item

                return {
                    title: name,
                    subtitle: {
                        title: description,
                    },
                    amount: price,
                    currency,
                    fullItem: item,
                };
            });
        }

        return itemList
    }

    onOptionSelect = (action) => {
        const {
            removeInvoice,
            navigation,
            language,
            formValues: {
                user,
                user_id,
                due_amount,
                invoice_number,
                id,
            },
            handleSubmit,
            changeInvoiceStatus,
            type
        } = this.props

        switch (action) {

            case INVOICE_ACTIONS.SEND:
                alertMe({
                    title: Lng.t("alert.title", { locale: language }),
                    desc: Lng.t("invoices.alert.sendEmail", { locale: language }),
                    showCancel: true,
                    okPress: () => changeInvoiceStatus({
                        id: navigation.getParam('id'),
                        action: 'send',
                        navigation
                    })
                })

                break;

            case INVOICE_ACTIONS.MARK_AS_SENT:
                changeInvoiceStatus({
                    id: navigation.getParam('id'),
                    action: 'mark-as-sent',
                    navigation
                })
                break;

            case INVOICE_ACTIONS.RECORD_PAYMENT:

                let invoice = {
                    user,
                    user_id,
                    due_amount,
                    invoice_number,
                    id
                }

                navigation.navigate(ROUTES.PAYMENT,
                    { type: PAYMENT_ADD, invoice, hasRecordPayment: true }
                )
                break;

            case INVOICE_ACTIONS.CLONE:
                alertMe({
                    title: Lng.t("alert.title", { locale: language }),
                    desc: Lng.t("invoices.alert.clone", { locale: language }),
                    showCancel: true,
                    okPress: () => changeInvoiceStatus({
                        id: navigation.getParam('id'),
                        action: 'clone',
                        navigation
                    })
                })

                break;

            case INVOICE_ACTIONS.DELETE:
                alertMe({
                    title: Lng.t("alert.title", { locale: language }),
                    desc: Lng.t("invoices.alert.removeDescription", { locale: language }),
                    showCancel: true,
                    okPress: () => removeInvoice({
                        id: navigation.getParam('id'),
                        onResult: (res) => {
                            res.success &&
                                navigation.navigate(ROUTES.MAIN_INVOICES)

                            res.error && (res.error === 'payment_attached') &&
                                alertMe({
                                    title: Lng.t("invoices.alert.paymentAttachedTitle", { locale: language }),
                                    desc: Lng.t("invoices.alert.paymentAttachedDescription", { locale: language }),
                                })
                        }
                    })
                })

                break;

            default:
                break;
        }

    }

    openTermConditionModal = () => this.termsAndConditionRef?.onToggle()

    TOGGLE_TERMS_CONDITION_VIEW = () => {
        const { formValues, language } = this.props
        let isShow = formValues?.display_terms_and_conditions

        return (
            <Fragment>
                <Field
                    name={termsCondition.toggle}
                    component={ToggleSwitch}
                    status={isShow}
                    hint={Lng.t("termsCondition.show", { locale: language })}
                    mainContainerStyle={{ marginTop: 12 }}
                />

                {(isShow === true || isShow === 1) && (
                    <TouchableOpacity
                        onPress={this.openTermConditionModal}
                    >
                        <Text style={styles.termsEditText}
                        >
                            {Lng.t("termsCondition.edit", { locale: language })}
                        </Text>
                    </TouchableOpacity>
                )}
            </Fragment>
        )
    }

    render() {
        const {
            navigation,
            handleSubmit,
            invoiceData: {
                invoiceTemplates,
                discount_per_item,
                tax_per_item,
                invoice_prefix
            } = {},
            invoiceItems,
            getItems,
            itemsLoading,
            items,
            language,
            initLoading,
            type,
            getCustomers,
            customers,
            customersLoading,
            formValues: { display_terms_and_conditions }
        } = this.props;

        const { currency, customerName, markAsStatus } = this.state

        const isEditInvoice = (type === INVOICE_EDIT)

        let hasSentStatus = (markAsStatus === 'SENT' || markAsStatus === 'VIEWED')
        let hasCompleteStatus = (markAsStatus === 'COMPLETED')

        let drownDownProps = (isEditInvoice && !initLoading) ? {
            options: EDIT_INVOICE_ACTIONS(
                language,
                hasSentStatus,
                hasCompleteStatus
            ),
            onSelect: this.onOptionSelect,
            cancelButtonIndex:
                hasSentStatus ? 3 :
                    hasCompleteStatus ? 2 : 5,
            destructiveButtonIndex:
                hasSentStatus ? 2 :
                    hasCompleteStatus ? 1 : 4,
        } : null


        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => this.onDraft(handleSubmit),
                    title: isEditInvoice ?
                        Lng.t("header.editInvoice", { locale: language }) :
                        Lng.t("header.addInvoice", { locale: language }),
                    rightIcon: !isEditInvoice ? 'save' : null,
                    rightIconPress: handleSubmit((val) => this.onSubmitInvoice(val, status = 'save')),
                    rightIconProps: {
                        solid: true
                    },
                    placement: "center",
                }}

                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{ is: initLoading }}
                dropdownProps={drownDownProps}
            >
                <View style={styles.bodyContainer}>

                    <TermsAndCondition
                        termsConditionRef={ref => (this.termsAndConditionRef = ref)}
                        props={this.props}
                        fieldName={termsCondition.description}
                    />

                    <View style={styles.dateFieldContainer}>
                        <View style={styles.dateField}>
                            <Field
                                name={'invoice_date'}
                                isRequired
                                component={DatePickerField}
                                label={Lng.t("invoices.invoiceDate", { locale: language })}
                                icon={'calendar-alt'}
                                onChangeCallback={(val) =>
                                    this.setFormField('invoice_date', val)
                                }
                            />
                        </View>
                        <View style={styles.dateField}>
                            <Field
                                name="due_date"
                                isRequired
                                component={DatePickerField}
                                label={Lng.t("invoices.dueDate", { locale: language })}
                                icon={'calendar-alt'}
                                onChangeCallback={(val) =>
                                    this.setFormField('due_date', val)
                                }
                            />
                        </View>
                    </View>

                    <Field
                        name="invoice_number"
                        component={FakeInput}
                        label={Lng.t("invoices.invoiceNumber", { locale: language })}
                        isRequired
                        prefixProps={{
                            fieldName: "invoice_number",
                            prefix: invoice_prefix,
                            icon: 'hashtag',
                            iconSolid: false,
                        }}
                    />

                    <Field
                        name="user_id"
                        items={customers}
                        apiSearch
                        hasPagination
                        isRequired
                        getItems={getCustomers}
                        displayName="name"
                        component={SelectField}
                        label={Lng.t("invoices.customer", { locale: language })}
                        icon={'user'}
                        placeholder={customerName ? customerName :
                            Lng.t("invoices.customerPlaceholder", { locale: language })
                        }
                        navigation={navigation}
                        compareField="id"
                        onSelect={(item) => {
                            this.setFormField('user_id', item.id)
                            this.setState({ currency: item.currency })
                        }}
                        rightIconPress={
                            () => navigation.navigate(ROUTES.CUSTOMER, {
                                type: CUSTOMER_ADD,
                                currency,
                                onSelect: (val) => {
                                    this.setFormField('user_id', val.id)
                                    this.setState({ currency: val.currency })
                                }
                            })
                        }
                        headerProps={{
                            title: Lng.t("customers.title", { locale: language }),
                        }}
                        listViewProps={{
                            hasAvatar: true,
                        }}
                        emptyContentProps={{
                            contentType: "customers",
                            image: IMAGES.EMPTY_CUSTOMERS,
                        }}
                        fakeInputProps={{ loading: customersLoading }}
                    />

                    <Text style={[styles.inputTextStyle, styles.label]}>
                        {Lng.t("invoices.items", { locale: language })}
                        <Text style={styles.required}> *</Text>
                    </Text>

                    <ListView
                        items={this.getInvoiceItemList(invoiceItems)}
                        itemContainer={styles.itemContainer}
                        leftTitleStyle={styles.itemLeftTitle}
                        leftSubTitleLabelStyle={[styles.itemLeftSubTitle, styles.itemLeftSubTitleLabel]}
                        leftSubTitleStyle={styles.itemLeftSubTitle}
                        rightTitleStyle={styles.itemRightTitle}
                        backgroundColor={colors.white}
                        onPress={this.onEditItem}
                    />

                    <Field
                        name="items"
                        items={this.getItemList(items)}
                        displayName="name"
                        component={SelectField}
                        hasPagination
                        apiSearch
                        getItems={getItems}
                        compareField="id"
                        valueCompareField="item_id"
                        icon={'percent'}
                        placeholder={Lng.t("invoices.addItem", { locale: language })}
                        navigation={navigation}
                        onlyPlaceholder
                        isMultiSelect
                        loading={itemsLoading}
                        fakeInputProps={{
                            icon: 'shopping-basket',
                            rightIcon: 'angle-right',
                            color: colors.primaryLight,
                        }}
                        onSelect={
                            (item) => {
                                navigation.navigate(ROUTES.INVOICE_ITEM, {
                                    item,
                                    currency,
                                    type: ITEM_ADD,
                                    discount_per_item,
                                    tax_per_item
                                })
                            }
                        }
                        rightIconPress={
                            () => navigation.navigate(ROUTES.INVOICE_ITEM, {
                                type: ITEM_ADD,
                                currency,
                                discount_per_item,
                                tax_per_item
                            })
                        }
                        headerProps={{
                            title: Lng.t("items.title", { locale: language }),
                        }}
                        emptyContentProps={{
                            contentType: "items",
                            image: IMAGES.EMPTY_ITEMS,
                        }}
                        listViewProps={{
                            leftSubTitleStyle: itemsDescriptionStyle()
                        }}
                    />

                    {this.FINAL_AMOUNT(invoiceItems)}

                    <Field
                        name="reference_number"
                        component={InputField}
                        hint={Lng.t("invoices.referenceNumber", { locale: language })}
                        leftIcon={'hashtag'}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                        }}
                    />

                    <Field
                        name="notes"
                        component={InputField}
                        hint={Lng.t("invoices.notes", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            placeholder: Lng.t("invoices.notePlaceholder", { locale: language }),
                            autoCorrect: true,
                            multiline: true,
                            maxLength: MAX_LENGTH
                        }}
                        height={80}
                        hintStyle={styles.noteHintStyle}
                        autoCorrect={true}
                    />

                    <Field
                        name="invoice_template_id"
                        templates={invoiceTemplates}
                        component={TemplateField}
                        label={Lng.t("invoices.template", { locale: language })}
                        icon={'file-alt'}
                        placeholder={Lng.t("invoices.templatePlaceholder", { locale: language })}
                        navigation={navigation}
                        language={language}
                    />

                    {this.TOGGLE_TERMS_CONDITION_VIEW()}
                </View>

            </DefaultLayout>
        );
    }
}

