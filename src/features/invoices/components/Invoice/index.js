// @flow

import React from 'react';
import { View } from 'react-native';
import * as Linking from 'expo-linking';
import { Field, change, SubmissionError } from 'redux-form';
import styles from './styles';
import { colors, itemsDescriptionStyle } from '@/styles';
import { TemplateField } from '../TemplateField';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import Lng from '@/lang/i18n';
import { IMAGES } from '@/assets';
import FinalAmount from '../FinalAmount';
import { alertMe, BUTTON_TYPE, isArray } from '@/constants';
import { PAYMENT_ADD } from '@/features/payments/constants';
import { CUSTOMER_ADD } from '@/features/customers/constants';
import {
    InputField,
    DatePickerField,
    CtButton,
    ListView,
    DefaultLayout,
    SelectField,
    CurrencyFormat,
    FakeInput,
    SendMail,
    CustomField,
    Text,
    Label
} from '@/components';
import {
    INVOICE_ADD,
    INVOICE_EDIT,
    ITEM_ADD,
    ITEM_EDIT,
    INVOICE_FORM,
    INVOICE_ACTIONS,
    EDIT_INVOICE_ACTIONS,
    setInvoiceRefs
} from '../../constants';
import {
    invoiceSubTotal,
    invoiceTax,
    invoiceCompoundTax,
    getCompoundTaxValue,
    totalDiscount,
    getTaxValue,
    getItemList,
    finalAmount
} from '../InvoiceCalculation';
import { getApiFormattedCustomFields } from '@/utils';
import Notes from './notes';
import InvoiceServices from '../../services';

type IProps = {
    navigation: any,
    invoiceItems: any,
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
    items: Object,
    locale: String,
    type: String,
    changeInvoiceStatus: Function,
    formValues: any,
    invoiceData: any,
    id: number,
    withLoading: boolean,
    customFields: Array<any>
};

type IStates = {
    currency: any,
    itemList: Array<any>,
    customerName: string,
    markAsStatus: string,
    isLoading: boolean
};

export class Invoice extends React.Component<IProps, IStates> {
    invoiceRefs: any;
    sendMailRef: any;
    customerReference: any;

    constructor(props) {
        super(props);
        this.invoiceRefs = setInvoiceRefs.bind(this);
        this.sendMailRef = React.createRef();
        this.customerReference = React.createRef();

        this.state = {
            currency: props?.currency,
            itemList: [],
            customerName: '',
            markAsStatus: null,
            isLoading: true
        };
    }

    componentDidMount() {
        this.setInitialValues();
        this.androidBackHandler();
    }

    componentWillUnmount() {
        const { clearInvoice } = this.props;
        clearInvoice();
        this.invoiceRefs(undefined);
        goBack(UNMOUNT);
    }

    navigateToCustomer = () => {
        const { navigation } = this.props;
        const { currency } = this.state;

        navigation.navigate(ROUTES.CUSTOMER, {
            type: CUSTOMER_ADD,
            currency,
            onSelect: item => {
                this.customerReference?.changeDisplayValue?.(item);
                this.setFormField('user_id', item.id);
                this.setState({ currency: item.currency });
            }
        });
    };

    setInitialValues = () => {
        const { getCreateInvoice, getEditInvoice, type, id } = this.props;

        if (type === INVOICE_ADD) {
            getCreateInvoice({
                onSuccess: () => {
                    this.setState({ isLoading: false });
                }
            });
            return;
        }

        if (type === INVOICE_EDIT) {
            getEditInvoice({
                id,
                onSuccess: ({ user, status }) => {
                    this.setState({
                        currency: user.currency,
                        customerName: user.name,
                        markAsStatus: status,
                        isLoading: false
                    });
                }
            });
            return;
        }
    };

    androidBackHandler = () => {
        const { navigation, handleSubmit } = this.props;
        goBack(MOUNT, navigation, {
            callback: () => this.onDraft(handleSubmit)
        });
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(INVOICE_FORM, field, value));
    };

    onEditItem = item => {
        const {
            navigation,
            invoiceData: { discount_per_item, tax_per_item }
        } = this.props;
        const { currency } = this.state;

        navigation.navigate(ROUTES.INVOICE_ITEM, {
            item,
            type: ITEM_EDIT,
            currency,
            discount_per_item,
            tax_per_item
        });
    };

    onDraft = handleSubmit => {
        const { locale, navigation, type } = this.props;
        const { isLoading } = this.state;

        if (isLoading) {
            navigation.navigate(ROUTES.MAIN_INVOICES);
            return;
        }

        if (type === INVOICE_EDIT) {
            navigation.navigate(ROUTES.MAIN_INVOICES);
            return;
        }

        alertMe({
            title: Lng.t('invoices.alert.draftTitle', { locale }),
            showCancel: true,
            cancelText: Lng.t('alert.action.discard', { locale }),
            cancelPress: () => navigation.navigate(ROUTES.MAIN_INVOICES),
            okText: Lng.t('alert.action.saveAsDraft', { locale }),
            okPress: handleSubmit(this.draftInvoice)
        });
    };

    onSubmitInvoice = (values, status) => {
        const {
            createInvoice,
            navigation,
            type,
            editInvoice,
            locale,
            id,
            handleSubmit,
            initLoading,
            withLoading
        } = this.props;

        if (this.state.isLoading || initLoading || withLoading) {
            return;
        }

        if (finalAmount() < 0) {
            alert(Lng.t('invoices.alert.lessAmount', { locale }));
            return;
        }

        let invoice = {
            ...values,
            invoice_number: `${values.prefix}-${values.invoice_number}`,
            total: finalAmount(),
            sub_total: invoiceSubTotal(),
            tax: invoiceTax() + invoiceCompoundTax(),
            discount_val: totalDiscount(),
            taxes: values.taxes
                ? values.taxes.map(val => {
                      return {
                          ...val,
                          amount: val.compound_tax
                              ? getCompoundTaxValue(val.percent)
                              : getTaxValue(val.percent)
                      };
                  })
                : []
        };

        if (status === 'send') {
            invoice.invoiceSend = true;
        }

        const params = {
            invoice: {
                ...invoice,
                id,
                customFields: getApiFormattedCustomFields(values?.customFields)
            },
            navigation,
            status,
            onSuccess: url => {
                if (status === 'download') {
                    Linking.openURL(url);
                    return;
                }
                navigation.navigate(ROUTES.MAIN_INVOICES);
            },
            submissionError: errors =>
                handleSubmit(() => this.throwError(errors, locale))()
        };

        type === INVOICE_ADD ? createInvoice(params) : editInvoice(params);
    };

    downloadInvoice = values => {
        this.onSubmitInvoice(values, INVOICE_ACTIONS.VIEW);
    };

    saveInvoice = values => {
        this.onSubmitInvoice(values, 'save');
    };

    draftInvoice = values => {
        this.onSubmitInvoice(values, 'draft');
    };

    throwError = (errors, locale) => {
        if (errors?.invoice_number) {
            throw new SubmissionError({
                invoice_number: 'validation.alreadyTaken'
            });
        }

        alertMe({
            desc: Lng.t('validation.wrong', { locale })
        });
    };

    BOTTOM_ACTION = () => {
        const { locale, loading, handleSubmit } = this.props;
        const { isLoading } = this.state;

        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(this.downloadInvoice)}
                    btnTitle={Lng.t('button.viewPdf', { locale })}
                    type={BUTTON_TYPE.OUTLINE}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                    loading={loading || isLoading}
                />

                <CtButton
                    onPress={handleSubmit(this.saveInvoice)}
                    btnTitle={Lng.t('button.save', { locale })}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                    loading={loading || isLoading}
                />
            </View>
        );
    };

    getInvoiceItemList = invoiceItems => {
        this.setFormField('items', invoiceItems);

        const { currency } = this.state;

        if (!isArray(invoiceItems)) {
            return [];
        }

        return invoiceItems.map(item => {
            let { name, description, price, quantity, total } = item;

            return {
                title: name,
                subtitle: {
                    title: description,
                    labelComponent: (
                        <CurrencyFormat
                            amount={price}
                            currency={currency}
                            preText={`${quantity} * `}
                            style={styles.itemLeftSubTitle(this.props.theme)}
                            containerStyle={styles.itemLeftSubTitleLabel}
                        />
                    )
                },
                amount: total,
                currency,
                fullItem: item
            };
        });
    };

    removeInvoice = () => {
        const { removeInvoice, navigation, locale, id } = this.props;

        alertMe({
            title: Lng.t('alert.title', { locale }),
            desc: Lng.t('invoices.alert.removeDescription', { locale }),
            showCancel: true,
            okPress: () =>
                removeInvoice({
                    id,
                    onResult: res => {
                        if (res?.success) {
                            navigation.navigate(ROUTES.MAIN_INVOICES);
                            return;
                        }

                        if (res?.data?.errors && res?.data?.errors?.['ids.0']) {
                            alertMe({
                                title: Lng.t(
                                    'invoices.alert.paymentAttachedTitle',
                                    { locale }
                                ),
                                desc: Lng.t(
                                    'invoices.alert.paymentAttachedDescription',
                                    { locale }
                                )
                            });
                            return;
                        }

                        alertMe({
                            desc: Lng.t('validation.wrong', { locale })
                        });
                    }
                })
        });
    };

    onOptionSelect = action => {
        const {
            navigation,
            locale,
            formValues,
            changeInvoiceStatus,
            id
        } = this.props;

        switch (action) {
            case INVOICE_ACTIONS.SEND:
                this.sendMailRef?.onToggle();
                break;

            case INVOICE_ACTIONS.MARK_AS_SENT:
                alertMe({
                    title: Lng.t('alert.title', { locale }),
                    desc: Lng.t('invoices.alert.markAsSent', { locale }),
                    showCancel: true,
                    okPress: () =>
                        changeInvoiceStatus({
                            id,
                            action: `${id}/status`,
                            navigation,
                            params: {
                                status: 'SENT'
                            }
                        })
                });
                break;

            case INVOICE_ACTIONS.RECORD_PAYMENT:
                const {
                    user,
                    due_amount,
                    sub_total,
                    prefix,
                    invoice_number
                } = formValues;
                const invoice = {
                    user,
                    id,
                    due: { due_amount, sub_total },
                    number: `${prefix}-${invoice_number}`
                };

                navigation.navigate(ROUTES.PAYMENT, {
                    type: PAYMENT_ADD,
                    invoice,
                    hasRecordPayment: true
                });
                break;

            case INVOICE_ACTIONS.CLONE:
                alertMe({
                    title: Lng.t('alert.title', { locale }),
                    desc: Lng.t('invoices.alert.clone', { locale }),
                    showCancel: true,
                    okPress: () =>
                        changeInvoiceStatus({
                            id,
                            action: `${id}/clone`,
                            navigation
                        })
                });

                break;

            case INVOICE_ACTIONS.DELETE:
                this.removeInvoice();
                break;

            default:
                break;
        }
    };

    sendEmail = params => {
        const { navigation, changeInvoiceStatus, id } = this.props;

        changeInvoiceStatus({
            id,
            action: `${id}/send`,
            navigation,
            params,
            onResult: () => InvoiceServices.toggleIsEmailSent(true)
        });
    };

    sendMailComponent = () => {
        return (
            <SendMail
                mailReference={ref => (this.sendMailRef = ref)}
                headerTitle={'header.sendMailInvoice'}
                alertDesc={'invoices.alert.sendInvoice'}
                user={this.props.formValues?.customer}
                subject="New Invoice"
                body="invoice_mail_body"
                onSendMail={params => this.sendEmail(params)}
            />
        );
    };

    render() {
        const {
            navigation,
            handleSubmit,
            invoiceData: {
                invoiceTemplates,
                discount_per_item,
                tax_per_item
            } = {},
            invoiceItems,
            getItems,
            itemsLoading,
            items,
            locale,
            initLoading,
            type,
            getCustomers,
            customers,
            formValues,
            withLoading,
            customFields,
            theme
        } = this.props;

        const { currency, customerName, markAsStatus, isLoading } = this.state;

        const isEditInvoice = type === INVOICE_EDIT;

        const hasCustomField = isEditInvoice
            ? formValues && formValues.hasOwnProperty('fields')
            : isArray(customFields);

        let hasSentStatus =
            markAsStatus === 'SENT' || markAsStatus === 'VIEWED';
        let hasCompleteStatus = markAsStatus === 'COMPLETED';

        let drownDownProps =
            isEditInvoice && !initLoading
                ? {
                      options: EDIT_INVOICE_ACTIONS(
                          locale,
                          hasSentStatus,
                          hasCompleteStatus
                      ),
                      onSelect: this.onOptionSelect,
                      cancelButtonIndex: hasSentStatus
                          ? 4
                          : hasCompleteStatus
                          ? 2
                          : 5,
                      destructiveButtonIndex: hasSentStatus
                          ? 3
                          : hasCompleteStatus
                          ? 1
                          : 4
                  }
                : null;

        this.invoiceRefs(this);
        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => this.onDraft(handleSubmit),
                    title: isEditInvoice
                        ? Lng.t('header.editInvoice', { locale })
                        : Lng.t('header.addInvoice', { locale }),
                    rightIcon: !isEditInvoice ? 'save' : null,
                    rightIconPress: handleSubmit(this.downloadInvoice),
                    rightIconProps: {
                        solid: true
                    },
                    placement: 'center'
                }}
                bottomAction={this.BOTTOM_ACTION()}
                loadingProps={{ is: isLoading || initLoading || withLoading }}
                contentProps={{ withLoading }}
                dropdownProps={drownDownProps}
            >
                <View
                    style={[
                        styles.bodyContainer,
                        { opacity: withLoading ? 0.8 : 1 }
                    ]}
                >
                    {isEditInvoice &&
                        !hasCompleteStatus &&
                        this.sendMailComponent()}

                    <View style={styles.dateFieldContainer}>
                        <View style={styles.dateField}>
                            <Field
                                name={'invoice_date'}
                                isRequired
                                component={DatePickerField}
                                label={Lng.t('invoices.invoiceDate', {
                                    locale
                                })}
                                icon={'calendar-alt'}
                                onChangeCallback={val =>
                                    this.setFormField('invoice_date', val)
                                }
                            />
                        </View>
                        <View style={styles.dateField}>
                            <Field
                                name="due_date"
                                isRequired
                                component={DatePickerField}
                                label={Lng.t('invoices.dueDate', { locale })}
                                icon={'calendar-alt'}
                                onChangeCallback={val =>
                                    this.setFormField('due_date', val)
                                }
                            />
                        </View>
                    </View>

                    <Field
                        name="invoice_number"
                        component={FakeInput}
                        label={Lng.t('invoices.invoiceNumber', { locale })}
                        isRequired
                        prefixProps={{
                            fieldName: 'invoice_number',
                            prefix: formValues?.prefix,
                            icon: 'hashtag',
                            iconSolid: false
                        }}
                    />

                    <Field
                        name="user_id"
                        items={customers}
                        apiSearch
                        hasPagination
                        isRequired
                        getItems={getCustomers}
                        selectedItem={formValues?.user}
                        displayName="name"
                        component={SelectField}
                        label={Lng.t('invoices.customer', { locale })}
                        icon={'user'}
                        placeholder={
                            customerName
                                ? customerName
                                : Lng.t('invoices.customerPlaceholder', {
                                      locale
                                  })
                        }
                        navigation={navigation}
                        compareField="id"
                        onSelect={item => {
                            this.setFormField('user_id', item.id);
                            this.setState({ currency: item.currency });
                        }}
                        rightIconPress={this.navigateToCustomer}
                        headerProps={{
                            title: Lng.t('customers.title', { locale })
                        }}
                        listViewProps={{ hasAvatar: true }}
                        emptyContentProps={{
                            contentType: 'customers',
                            image: IMAGES.EMPTY_CUSTOMERS
                        }}
                        reference={ref => (this.customerReference = ref)}
                    />

                    <Label isRequired theme={theme} style={styles.label}>
                        {Lng.t('invoices.items', { locale })}
                    </Label>

                    <ListView
                        items={this.getInvoiceItemList(invoiceItems)}
                        itemContainer={styles.itemContainer(theme)}
                        leftTitleStyle={styles.itemLeftTitle(theme)}
                        leftSubTitleLabelStyle={[
                            styles.itemLeftSubTitle(theme),
                            styles.itemLeftSubTitleLabel
                        ]}
                        leftSubTitleStyle={styles.itemLeftSubTitle(theme)}
                        rightTitleStyle={styles.itemRightTitle(theme)}
                        backgroundColor={theme.thirdBgColor}
                        onPress={this.onEditItem}
                        parentViewStyle={{ marginVertical: 4 }}
                    />

                    <Field
                        name="items"
                        items={getItemList(items)}
                        displayName="name"
                        component={SelectField}
                        hasPagination
                        apiSearch
                        getItems={getItems}
                        compareField="id"
                        valueCompareField="item_id"
                        icon={'percent'}
                        placeholder={Lng.t('invoices.addItem', { locale })}
                        navigation={navigation}
                        onlyPlaceholder
                        isMultiSelect
                        loading={itemsLoading}
                        fakeInputProps={{
                            icon: 'shopping-basket',
                            rightIcon: 'angle-right',
                            color: colors.primaryLight
                        }}
                        onSelect={item => {
                            navigation.navigate(ROUTES.INVOICE_ITEM, {
                                item,
                                currency,
                                type: ITEM_ADD,
                                discount_per_item,
                                tax_per_item
                            });
                        }}
                        rightIconPress={() =>
                            navigation.navigate(ROUTES.INVOICE_ITEM, {
                                type: ITEM_ADD,
                                currency,
                                discount_per_item,
                                tax_per_item
                            })
                        }
                        headerProps={{
                            title: Lng.t('items.title', { locale })
                        }}
                        emptyContentProps={{
                            contentType: 'items',
                            image: IMAGES.EMPTY_ITEMS
                        }}
                        listViewProps={{
                            leftSubTitleStyle: itemsDescriptionStyle()
                        }}
                        paginationLimit={15}
                    />

                    <FinalAmount state={this.state} props={this.props} />

                    <Field
                        name="reference_number"
                        component={InputField}
                        hint={Lng.t('invoices.referenceNumber', { locale })}
                        leftIcon={'hashtag'}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true
                        }}
                    />

                    <Notes
                        {...this.props}
                        isEditInvoice={isEditInvoice}
                        setFormField={this.setFormField}
                    />

                    <Field
                        name="invoice_template_id"
                        templates={invoiceTemplates ?? []}
                        component={TemplateField}
                        label={Lng.t('invoices.template', { locale })}
                        icon={'file-alt'}
                        placeholder={Lng.t('invoices.templatePlaceholder', {
                            locale
                        })}
                        navigation={navigation}
                        locale={locale}
                    />

                    {hasCustomField && (
                        <CustomField {...this.props} type={null} />
                    )}
                </View>
            </DefaultLayout>
        );
    }
}
