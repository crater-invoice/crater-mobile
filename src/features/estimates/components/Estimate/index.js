// @flow

import React from 'react';
import {
    View,
    Text,
    Alert,
    Linking
} from 'react-native';
import { change } from 'redux-form';
import { Field } from 'redux-form';
import styles from './styles';
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
} from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import {
    ESTIMATE_ADD,
    ESTIMATE_EDIT,
    ITEM_ADD,
    ITEM_EDIT,
    ESTIMATE_FORM,
    ADD_ESTIMATE_ACTIONS,
    ESTIMATE_ACTIONS,
    EDIT_ESTIMATE_ACTIONS,
    MARK_AS_ACCEPT, MARK_AS_REJECT, MARK_AS_SENT
} from '../../constants';
import { BUTTON_TYPE } from '../../../../api/consts/core';
import { colors } from '../../../../styles/colors';
import { TemplateField } from '../TemplateField';
import { MOUNT, UNMOUNT, goBackWithFunction } from '../../../../navigation/actions';
import Lng from '../../../../api/lang/i18n';
import { ESTIMATE_DISCOUNT_OPTION } from '../../constants';
import { CUSTOMER_ADD } from '../../../customers/constants';
import { IMAGES } from '../../../../config';
import { ADD_TAX } from '../../../settings/constants';
import { MAX_LENGTH } from '../../../../api/global';
import { itemsDescriptionStyle } from '../../../invoices/components/Invoice/styles';
import { headerTitle } from '../../../../api/helper';

type IProps = {
    navigation: Object,
    estimateItems: Object,
    taxTypes: Object,
    customers: Object,
    getCreateEstimate: Function,
    getEditEstimate: Function,
    clearEstimate: Function,
    createEstimate: Function,
    handleSubmit: Function,
    getCustomers: Function,
    getItems: Function,
    editEstimate: Boolean,
    itemsLoading: Boolean,
    initLoading: Boolean,
    loading: Boolean,
    estimateData: Object,
    estimateItems: Object,
    items: Object,
    language: String,
    type: String

}
export class Estimate extends React.Component<IProps> {
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
            getCreateEstimate,
            navigation,
            estimateItems,
            taxTypes,
            getEditEstimate,
            type,
        } = this.props;

        type === ESTIMATE_EDIT ?
            getEditEstimate({
                id: navigation.getParam('id'),
                onResult: ({ user: { currency, name }, status }) => {

                    this.setState({
                        currency,
                        taxTypeList: taxTypes,
                        customerName: name,
                        markAsStatus: status
                    })
                }
            }) :
            getCreateEstimate({
                onResult: (val) => {
                    const { currency } = val

                    this.setState({ taxTypeList: taxTypes, currency })
                }
            });

        navigation.addListener(
            'didFocus',
            payload => {
                this.forceUpdate();
            }
        );

        this.getEstimateItemList(estimateItems)

    }


    componentWillUnmount() {
        const { clearEstimate } = this.props
        clearEstimate();
        goBackWithFunction(UNMOUNT)
    }

    androidBackHandler = () => {
        const { navigation, handleSubmit } = this.props
        goBackWithFunction(MOUNT, navigation, () => this.onDraft(handleSubmit))
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(ESTIMATE_FORM, field, value));
    };

    onEditItem = (item) => {
        const {
            navigation,
            estimateData: { discount_per_item, tax_per_item }
        } = this.props
        const { currency } = this.state

        navigation.navigate(
            ROUTES.ESTIMATE_ITEM,
            { item, type: ITEM_EDIT, currency, discount_per_item, tax_per_item }
        )
    }

    onDraft = (handleSubmit) => {
        const { language, navigation, type } = this.props
        if (type === ESTIMATE_EDIT) {
            navigation.navigate(ROUTES.ESTIMATE_LIST)
            return
        }
        Alert.alert(
            Lng.t("estimates.alert.draftTitle", { locale: language }),
            '',
            [
                {
                    text: Lng.t("alert.action.saveAsDraft", { locale: language }),
                    onPress: handleSubmit(this.onSubmitEstimate)
                },
                {
                    text: Lng.t("alert.action.discard", { locale: language }),
                    onPress: () => {
                        navigation.navigate(ROUTES.ESTIMATE_LIST)
                    },
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );
    }

    onSubmitEstimate = (values, status = 'draft') => {

        const {
            createEstimate,
            navigation,
            type,
            editEstimate,
            language,
        } = this.props

        if (this.finalAmount() < 0) {
            alert(Lng.t("estimates.alert.lessAmount", { locale: language }))
            return
        }

        let estimate = {
            ...values,
            total: this.finalAmount(),
            sub_total: this.estimateSubTotal(),
            tax: this.estimateTax() + this.estimateCompoundTax(),
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
            estimate.estimateSend = true
        }

        type === ESTIMATE_ADD ?
            createEstimate({
                estimate,
                onResult: (url) => {
                    if (status === 'download') {
                        Linking.openURL(url);
                    }
                    navigation.navigate(ROUTES.ESTIMATE_LIST)
                }
            }) :
            editEstimate({
                estimate: { ...estimate, id: navigation.getParam('id') },
                onResult: (url) => {
                    if (status === 'download') {
                        Linking.openURL(url);
                    }
                    navigation.navigate(ROUTES.ESTIMATE_LIST)
                }
            })
    };

    estimateSubTotal = () => {
        const { estimateItems } = this.props
        let subTotal = 0
        estimateItems.map(val => {
            subTotal += JSON.parse(val.total)
        })

        return JSON.parse(subTotal)
    }

    subTotal = () => {
        let estimateTax = 0
        this.estimateItemTotalTaxes().filter(val => {
            estimateTax += val.amount
        })
        return (this.estimateSubTotal() + estimateTax) - this.totalDiscount()
    }

    estimateTax = () => {
        const { formValues: { taxes } } = this.props

        let totalTax = 0

        taxes && taxes.map(val => {
            if (!val.compound_tax) {
                totalTax += this.getTaxValue(val.percent)
            }
        })

        return totalTax
    }

    estimateCompoundTax = () => {
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
        const type = taxTypes && taxTypes.filter(val => val.fullItem.id === tax.tax_type_id)

        if (type.length > 0) {
            taxName = type[0]['fullItem'].name
        }
        return taxName
    }

    totalDiscount = () => {
        const { formValues: { discount, discount_type } } = this.props

        let discountPrice = 0

        if (discount_type === 'percentage') {
            discountPrice = ((discount * this.estimateSubTotal()) / 100)
        } else {
            discountPrice = (discount * 100)
        }

        return discountPrice
    }

    totalAmount = () => {
        return this.subTotal() + this.estimateTax()
    }

    finalAmount = () => {
        return this.totalAmount() + this.estimateCompoundTax()
    }

    estimateItemTotalTaxes = () => {
        const { estimateItems } = this.props
        let taxes = []
        estimateItems.map(val => {
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
            estimateData: { discount_per_item, tax_per_item },
            formValues: { taxes }
        } = this.props

        let taxPerItem = !(tax_per_item === 'NO' || typeof tax_per_item === 'undefined' || tax_per_item === null)

        let discountPerItem = !(discount_per_item === 'NO' || typeof discount_per_item === 'undefined' || discount_per_item === null)

        return (
            <View style={styles.amountContainer}>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.amountHeading}>
                            {Lng.t("estimates.subtotal", { locale: language })}
                        </Text>
                    </View>
                    <View>
                        <CurrencyFormat
                            amount={this.estimateSubTotal()}
                            currency={currency}
                            style={styles.subAmount}
                        />
                    </View>
                </View>

                {(!discountPerItem) && (
                    <View style={[styles.subContainer, styles.discount]}>
                        <View>
                            <Text style={styles.amountHeading}>
                                {Lng.t("estimates.discount", { locale: language })}
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
                                items={ESTIMATE_DISCOUNT_OPTION}
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
                                    {Lng.t("estimates.taxPlaceholder", { locale: language })}
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
                            {Lng.t("estimates.totalAmount", { locale: language })}:
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
                    onPress={() => this.onOptionSelect(ESTIMATE_ACTIONS.VIEW)}
                    btnTitle={Lng.t("button.viewPdf", { locale: language })}
                    type={BUTTON_TYPE.OUTLINE}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                    loading={loading}
                />

                <CtButton
                    onPress={handleSubmit((val) => this.onSubmitEstimate(val, status = 'save'))}
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

        let taxes = this.estimateItemTotalTaxes()

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

    getEstimateItemList = (estimateItems) => {
        this.setFormField('items', estimateItems)

        const { currency } = this.state

        let estimateItemList = []

        if (typeof estimateItems !== 'undefined' && estimateItems.length != 0) {

            estimateItemList = estimateItems.map((item) => {

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

        return estimateItemList
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
            removeEstimate,
            navigation,
            language,
            convertToInvoice,
            handleSubmit,
            changeEstimateStatus,
            type
        } = this.props

        switch (action) {
            case ESTIMATE_ACTIONS.VIEW:
                handleSubmit((val) => this.onSubmitEstimate(val, action))()
                break;

            case ESTIMATE_ACTIONS.SEND:
                type === ESTIMATE_ADD ? handleSubmit((val) => this.onSubmitEstimate(val, action))() :
                    changeEstimateStatus({
                        id: navigation.getParam('id'),
                        action: 'send',
                        navigation
                    })

                break;

            case ESTIMATE_ACTIONS.MARK_AS_SENT:
                changeEstimateStatus && changeEstimateStatus({ id: navigation.getParam('id'), action: 'mark-as-sent', navigation })
                break;

            case ESTIMATE_ACTIONS.MARK_AS_ACCEPTED:
                changeEstimateStatus && changeEstimateStatus({ id: navigation.getParam('id'), action: 'accept', navigation })
                break;

            case ESTIMATE_ACTIONS.MARK_AS_REJECTED:
                changeEstimateStatus && changeEstimateStatus({ id: navigation.getParam('id'), action: 'reject', navigation })
                break;

            case ESTIMATE_ACTIONS.CONVERT_TO_INVOICE:
                Alert.alert(
                    '',
                    Lng.t("estimates.alert.convertToInvoiceDescription", { locale: language }),
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                convertToInvoice({
                                    id: navigation.getParam('id'),
                                    onResult: () => {
                                        navigation.navigate(ROUTES.MAIN_INVOICES)
                                    }
                                })
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
                break;

            case ESTIMATE_ACTIONS.DELETE:
                Alert.alert(
                    Lng.t("alert.title", { locale: language }),
                    Lng.t("estimates.alert.removeDescription", { locale: language }),
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                removeEstimate({
                                    id: navigation.getParam('id'),
                                    onResult: () => {
                                        navigation.navigate(ROUTES.ESTIMATE_LIST)
                                    }
                                })
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
                break;

            default:
                break;
        }

    }

    handleEstimateAction = (action, title) => {
        const { handleSubmit } = this.props

        Alert.alert(
            title,
            '',
            [
                {
                    text: 'OK',
                    onPress: handleSubmit((val) => this.onSubmitEstimate(val, action))
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

    render() {
        const {
            navigation,
            handleSubmit,
            loading,
            estimateData: {
                estimateTemplates,
                discount_per_item,
                tax_per_item
            } = {},
            estimateItems,
            getItems,
            itemsLoading,
            items,
            language,
            initLoading,
            type,
            getCustomers,
            customers,
        } = this.props;

        const { currency, customerName, markAsStatus } = this.state

        const isEditEstimate = (type === ESTIMATE_EDIT)

        const estimateRefs = {}

        !initLoading && this.androidBackHandler()


        let hasMark = (markAsStatus === MARK_AS_ACCEPT) || (markAsStatus === MARK_AS_REJECT) || (markAsStatus === MARK_AS_SENT)

        let drownDownProps = !initLoading ? {
            options: isEditEstimate ?
                EDIT_ESTIMATE_ACTIONS(language, markAsStatus) :
                ADD_ESTIMATE_ACTIONS(language),
            onSelect: this.onOptionSelect,
            cancelButtonIndex: isEditEstimate ?
                hasMark ? 5 : 6
                : 1,
            destructiveButtonIndex: isEditEstimate ?
                hasMark ? 4 : 5
                : 2
        } : null

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => this.onDraft(handleSubmit),
                    title: isEditEstimate ?
                        Lng.t("header.editEstimate", { locale: language }) :
                        Lng.t("header.addEstimate", { locale: language }),
                    titleStyle: headerTitle({ marginLeft: -15, marginRight: -15 }),
                    placement: "center",
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{ is: initLoading }}
                dropdownProps={drownDownProps}
            >
                <View style={styles.bodyContainer}>
                    <View style={styles.dateFieldContainer}>
                        <View style={styles.dateField}>
                            <Field
                                name={'estimate_date'}
                                isRequired
                                component={DatePickerField}
                                label={Lng.t("estimates.estimateDate", { locale: language })}
                                icon={'calendar-alt'}
                                onChangeCallback={(val) =>
                                    this.setFormField('estimate_date', val)
                                }
                            />
                        </View>
                        <View style={styles.dateField}>
                            <Field
                                name="expiry_date"
                                isRequired
                                component={DatePickerField}
                                label={Lng.t("estimates.expiryDate", { locale: language })}
                                icon={'calendar-alt'}
                                onChangeCallback={(val) =>
                                    this.setFormField('expiry_date', val)
                                }
                            />
                        </View>
                    </View>

                    <Field
                        name="estimate_number"
                        component={InputField}
                        isRequired
                        hint={Lng.t("estimates.estimateNumber", { locale: language })}
                        leftIcon={'hashtag'}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                        }}
                        refLinkFn={(ref) => {
                            estimateRefs.number = ref;
                        }}
                        editable={false}
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
                        label={Lng.t("estimates.customer", { locale: language })}
                        icon={'user'}
                        placeholder={customerName ? customerName :
                            Lng.t("estimates.customerPlaceholder", { locale: language })
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
                    />

                    <Text style={[styles.inputTextStyle, styles.label]}>
                        {Lng.t("estimates.items", { locale: language })}
                        <Text style={styles.required}> *</Text>
                    </Text>

                    <ListView
                        items={this.getEstimateItemList(estimateItems)}
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
                        placeholder={Lng.t("estimates.addItem", { locale: language })}
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
                                navigation.navigate(ROUTES.ESTIMATE_ITEM, {
                                    item,
                                    currency,
                                    type: ITEM_ADD,
                                    discount_per_item,
                                    tax_per_item
                                })
                            }
                        }
                        rightIconPress={
                            () => navigation.navigate(ROUTES.ESTIMATE_ITEM, {
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

                    {this.FINAL_AMOUNT(estimateItems)}

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
                        hint={Lng.t("estimates.notes", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            placeholder: Lng.t("estimates.notePlaceholder", { locale: language }),
                            autoCorrect: true,
                            multiline: true,
                            maxLength: MAX_LENGTH
                        }}
                        height={80}
                        hintStyle={styles.noteHintStyle}
                        autoCorrect={true}
                    />

                    <Field
                        name="estimate_template_id"
                        templates={estimateTemplates}
                        component={TemplateField}
                        label={Lng.t("estimates.template", { locale: language })}
                        icon={'file-alt'}
                        placeholder={Lng.t("estimates.templatePlaceholder", { locale: language })}
                        navigation={navigation}
                        language={language}
                    />

                </View>
            </DefaultLayout>
        );
    }
}
