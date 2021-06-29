// @flow

import React from 'react';
import { View } from 'react-native';
import { Field, change, SubmissionError } from 'redux-form';
import moment from 'moment';
import styles from './styles';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import Lng from '@/lang/i18n';
import { IMAGES } from '@/assets';
import { CUSTOMER_ADD } from '@/features/customers/constants';
import {
    InputField,
    DefaultLayout,
    DatePickerField,
    SelectField,
    FakeInput,
    SendMail,
    CustomField,
    ActionButton
} from '@/components';
import {
    PAYMENT_ADD,
    PAYMENT_FORM,
    PAYMENT_ACTIONS,
    ACTIONS_VALUE,
    PAYMENT_FIELDS as FIELDS
} from '../../constants';
import { alertMe, DATE_FORMAT, hasObjectLength, isArray } from '@/constants';
import {
    BADGE_STATUS_BG_COLOR,
    BADGE_STATUS_TEXT_COLOR,
    getApiFormattedCustomFields
} from '@/utils';
import Notes from './notes';
import PaymentServices from '../../services';

type IProps = {
    navigation: Object,
    customers: Object,
    getCreatePayment: Function,
    getPaymentDetail: Function,
    getUnpaidInvoices: Function,
    createPayment: Function,
    updatePayment: Function,
    handleSubmit: Function,
    type: String,
    locale: String,
    loading: Boolean,
    getCustomers: Function,
    notesReference: any
};

export class Payment extends React.Component<IProps> {
    customerReference: any;
    invoiceReference: any;
    sendMailRef: any;

    constructor(props) {
        super(props);
        this.customerReference = React.createRef();
        this.invoiceReference = React.createRef();
        this.sendMailRef = React.createRef();
        this.notesReference = React.createRef();

        this.state = {
            selectedInvoice: null,
            selectedCustomer: null,
            isLoading: true
        };
    }

    componentDidMount() {
        const { navigation } = this.props;

        this.setInitialValues();

        goBack(MOUNT, navigation);
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    setInitialValues = () => {
        const {
            getCreatePayment,
            getPaymentDetail,
            isEditScreen,
            type,
            id,
            hasRecordPayment
        } = this.props;

        if (type === PAYMENT_ADD) {
            getCreatePayment({
                onSuccess: ({ nextNumber, prefix }) => {
                    const values = {
                        [FIELDS.PREFIX]: prefix,
                        [FIELDS.NUMBER]: nextNumber,
                        [FIELDS.DATE]: moment()
                    };

                    if (hasRecordPayment) {
                        this.SetRecordPaymentField(values);
                        return;
                    }

                    this.setFormField(`payment`, values);
                    this.setState({ isLoading: false });
                }
            });
            return;
        }

        if (isEditScreen) {
            getPaymentDetail({
                id,
                onSuccess: res => {
                    const { payment_prefix, nextPaymentNumber, payment } = res;
                    const values = {
                        ...payment,
                        [FIELDS.PREFIX]: payment_prefix,
                        [FIELDS.NUMBER]: nextPaymentNumber
                    };

                    this.setFormField(`payment`, values);

                    this.setState({
                        isLoading: false,
                        selectedCustomer: payment?.user,
                        selectedInvoice: payment?.invoice
                    });
                }
            });
            return;
        }
    };

    SetRecordPaymentField = values => {
        const { invoice } = this.props;
        const val = {
            ...values,
            [FIELDS.CUSTOMER]: invoice?.user?.id,
            [FIELDS.INVOICE]: invoice?.id,
            [FIELDS.AMOUNT]: invoice?.due?.due_amount,
            user: invoice?.user,
            invoice: { invoice_number: invoice?.number }
        };

        this.setFormField(`payment`, val);

        this.setState({
            selectedCustomer: invoice?.user,
            selectedInvoice: invoice?.due,
            isLoading: false
        });
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(PAYMENT_FORM, field, value));
    };

    onSelectCustomer = customer => {
        this.setFormField(`payment.${FIELDS.CUSTOMER}`, customer.id);
        this.setState({ selectedCustomer: customer });
        this.invoiceReference?.changeDisplayValue?.(null);
        this.setFormField(`payment.${FIELDS.AMOUNT}`, null);
    };

    onSelectInvoice = invoice => {
        this.setFormField(`payment.${FIELDS.INVOICE}`, invoice?.id);
        this.setFormField(`payment.${FIELDS.AMOUNT}`, invoice?.due_amount);
        this.setState({ selectedInvoice: invoice });
    };

    onSubmit = values => {
        const payment = values?.payment;

        const { selectedInvoice, isLoading } = this.state;
        const {
            type,
            handleSubmit,
            createPayment,
            updatePayment,
            navigation,
            locale,
            hasRecordPayment,
            isEditScreen,
            id
        } = this.props;

        if (isLoading) {
            return;
        }

        const customFields = getApiFormattedCustomFields(values?.customFields);

        const params = {
            ...payment,
            [FIELDS.NUMBER]: `${payment?.[FIELDS.PREFIX]}-${
                payment?.[FIELDS.NUMBER]
            }`,
            customFields
        };

        if (hasObjectLength(selectedInvoice)) {
            const amount = payment?.[FIELDS.AMOUNT] ?? 0;
            const due = selectedInvoice?.due_amount ?? 0;
            const subTotal = selectedInvoice?.sub_total ?? 0;

            if (due !== 0 && amount > due) {
                alertMe({
                    desc: Lng.t('payments.alertAmount', { locale })
                });
                return;
            }

            if (due === 0 && amount > subTotal) {
                alertMe({
                    desc: Lng.t('payments.alertAmount', { locale })
                });
                return;
            }
        }

        if (type === PAYMENT_ADD) {
            createPayment({
                params,
                navigation,
                hasRecordPayment,
                submissionError: errors =>
                    handleSubmit(() => this.throwError(errors, locale))()
            });
        }

        if (isEditScreen) {
            updatePayment({
                id,
                params,
                navigation,
                submissionError: errors =>
                    handleSubmit(() => this.throwError(errors, locale))()
            });
        }
    };

    throwError = (errors, locale) => {
        if (errors?.[FIELDS.NUMBER]) {
            throw new SubmissionError({
                payment: { [FIELDS.NUMBER]: 'validation.alreadyTaken' }
            });
        }

        alertMe({
            desc: Lng.t('validation.wrong', { locale })
        });
    };

    formatUnpaidInvoices = items => {
        if (!isArray(items)) {
            return [];
        }

        const { selectedCustomer } = this.state;
        const { theme } = this.props;

        return items.map(item => {
            const {
                invoice_number,
                status,
                formattedDueDate,
                due_amount,
                user
            } = item;

            return {
                title: user?.name,
                subtitle: {
                    title: invoice_number,
                    label: status,
                    labelBgColor: BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode],
                    labelTextColor:
                        BADGE_STATUS_TEXT_COLOR?.[status]?.[theme.mode]
                },
                amount: due_amount,
                currency: selectedCustomer?.currency,
                rightSubtitle: formattedDueDate,
                fullItem: item
            };
        });
    };

    removePayment = () => {
        const { removePayment, navigation, locale, id } = this.props;

        alertMe({
            title: Lng.t('alert.title', { locale }),
            desc: Lng.t('payments.alertDescription', { locale }),
            showCancel: true,
            okPress: () => removePayment({ id, navigation })
        });
    };

    onOptionSelect = action => {
        switch (action) {
            case ACTIONS_VALUE.REMOVE:
                return this.removePayment();

            case ACTIONS_VALUE.SEND:
                return this.sendMailRef?.onToggle();

            default:
                break;
        }
    };

    navigateToCustomer = () => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.CUSTOMER, {
            type: CUSTOMER_ADD,
            onSelect: item => {
                this.customerReference?.changeDisplayValue?.(item);
                this.onSelectCustomer(item);
            }
        });
    };

    nextNumberView = () => {
        const { formValues, locale, isAllowToEdit } = this.props;

        return (
            <Field
                name={`payment.${FIELDS.NUMBER}`}
                component={FakeInput}
                label={Lng.t('payments.number', { locale })}
                isRequired
                prefixProps={{
                    fieldName: `payment.${FIELDS.NUMBER}`,
                    prefix: formValues?.payment?.[FIELDS.PREFIX]
                }}
                disabled={!isAllowToEdit}
            />
        );
    };

    sendEmail = params => {
        const { navigation, sendPaymentReceipt, id } = this.props;

        sendPaymentReceipt({
            params: { ...params, id },
            navigation,
            onSuccess: () => PaymentServices.toggleIsEmailSent(true)
        });
    };

    sendMailComponent = () => {
        return (
            <SendMail
                mailReference={ref => (this.sendMailRef = ref)}
                headerTitle={'header.sendMailPayment'}
                alertDesc={'payments.alert.sendPayment'}
                user={this.props.formValues?.payment?.user}
                body="payment_mail_body"
                onSendMail={params => this.sendEmail(params)}
            />
        );
    };

    render() {
        const {
            navigation,
            handleSubmit,
            customers,
            locale,
            type,
            getCustomers,
            getPaymentModes,
            paymentMethods,
            formValues,
            getUnpaidInvoices,
            unPaidInvoices,
            withLoading,
            customFields,
            isEditScreen,
            isAllowToEdit,
            isAllowToDelete,
            currency,
            loading
        } = this.props;

        const { isLoading, selectedCustomer } = this.state;
        const disabled = !isAllowToEdit;

        const hasCustomField = isEditScreen
            ? formValues?.payment && formValues.payment.hasOwnProperty('fields')
            : isArray(customFields);

        const drownDownProps =
            isEditScreen && !isLoading
                ? {
                      options: PAYMENT_ACTIONS(isAllowToDelete, Lng, locale),
                      onSelect: this.onOptionSelect,
                      cancelButtonIndex: 2,
                      destructiveButtonIndex: 1,
                      ...(!isAllowToDelete && {
                          cancelButtonIndex: 1,
                          destructiveButtonIndex: 2
                      })
                  }
                : null;

        const getTitle = () => {
            let title = 'header.addPayment';
            if (isEditScreen && !isAllowToEdit) title = 'header.viewPayment';
            if (isEditScreen && isAllowToEdit) title = 'header.editPayment';

            return Lng.t(title, { locale });
        };

        const headerProps = {
            leftIconPress: () => navigation.goBack(null),
            title: getTitle(),
            placement: 'center',
            ...(!isEditScreen && {
                rightIcon: 'save',
                rightIconProps: { solid: true },
                rightIconPress: handleSubmit(this.onSubmit)
            })
        };

        const bottomAction = [
            {
                label: 'button.save',
                onPress: handleSubmit(this.onSubmit),
                loading: loading || isLoading,
                show: isAllowToEdit
            }
        ];

        return (
            <DefaultLayout
                headerProps={headerProps}
                loadingProps={{
                    is: isLoading || !hasObjectLength(formValues) || withLoading
                }}
                contentProps={{ withLoading }}
                dropdownProps={drownDownProps}
                bottomAction={
                    <ActionButton locale={locale} buttons={bottomAction} />
                }
            >
                <View
                    style={[
                        styles.bodyContainer,
                        { opacity: withLoading ? 0.8 : 1 }
                    ]}
                >
                    {isEditScreen && this.sendMailComponent()}

                    <View style={styles.numberDateFieldContainer}>
                        <View style={styles.numberDateField}>
                            <Field
                                name={`payment.${FIELDS.DATE}`}
                                component={DatePickerField}
                                dateTimeFormat={DATE_FORMAT}
                                label={Lng.t('payments.date', { locale })}
                                icon={'calendar-alt'}
                                onChangeCallback={val => {
                                    this.setFormField('payment_date', val);
                                }}
                                isRequired
                                fakeInputProps={{
                                    fakeInputContainerStyle: styles.date
                                }}
                                disabled={disabled}
                            />
                        </View>

                        <View style={styles.numberDateField}>
                            {this.nextNumberView()}
                        </View>
                    </View>

                    <Field
                        name={`payment.${FIELDS.CUSTOMER}`}
                        apiSearch
                        hasPagination
                        getItems={getCustomers}
                        items={customers}
                        selectedItem={formValues?.payment?.user}
                        displayName="name"
                        component={SelectField}
                        label={Lng.t('payments.customer', { locale })}
                        icon={'user'}
                        placeholder={Lng.t('payments.customerPlaceholder', {
                            locale
                        })}
                        navigation={navigation}
                        compareField="id"
                        onSelect={item => this.onSelectCustomer(item)}
                        rightIconPress={this.navigateToCustomer}
                        headerProps={{
                            title: Lng.t('customers.title', { locale })
                        }}
                        listViewProps={{ hasAvatar: true }}
                        emptyContentProps={{
                            contentType: 'customers',
                            image: IMAGES.EMPTY_CUSTOMERS
                        }}
                        isRequired
                        isEditable={type === PAYMENT_ADD}
                        fakeInputProps={{
                            disabled: type !== PAYMENT_ADD
                        }}
                        reference={ref => (this.customerReference = ref)}
                    />

                    <Field
                        name={`payment.${FIELDS.INVOICE}`}
                        component={SelectField}
                        isRequired
                        apiSearch
                        hasPagination
                        getItems={getUnpaidInvoices}
                        items={this.formatUnpaidInvoices(unPaidInvoices)}
                        selectedItem={formValues?.payment?.invoice}
                        displayName="invoice_number"
                        label={Lng.t('payments.invoice', { locale })}
                        icon="align-center"
                        placeholder={Lng.t('payments.invoicePlaceholder', {
                            locale
                        })}
                        navigation={navigation}
                        compareField="id"
                        onSelect={item => this.onSelectInvoice(item)}
                        headerProps={{
                            title: Lng.t('invoices.title', { locale }),
                            rightIconPress: null
                        }}
                        emptyContentProps={{ contentType: 'invoices' }}
                        queryString={{
                            customer_id: formValues?.payment?.[FIELDS.CUSTOMER],
                            status: 'UNPAID'
                        }}
                        reference={ref => (this.invoiceReference = ref)}
                        isEditable={type === PAYMENT_ADD}
                        fakeInputProps={{
                            disabled: type !== PAYMENT_ADD
                        }}
                    />

                    <Field
                        name={`payment.${FIELDS.AMOUNT}`}
                        component={InputField}
                        leftSymbol={
                            selectedCustomer?.currency?.symbol ??
                            currency?.symbol
                        }
                        hint={Lng.t('payments.amount', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            keyboardType: 'decimal-pad'
                        }}
                        disabled={disabled}
                        isCurrencyInput
                        isRequired
                    />

                    <Field
                        name={`payment.${FIELDS.METHOD}`}
                        component={SelectField}
                        apiSearch
                        hasPagination
                        getItems={getPaymentModes}
                        items={paymentMethods}
                        selectedItem={formValues?.payment?.payment_method}
                        displayName="name"
                        label={Lng.t('payments.mode', { locale })}
                        icon="align-center"
                        placeholder={Lng.t('payments.modePlaceholder', {
                            locale
                        })}
                        navigation={navigation}
                        compareField="id"
                        onSelect={item =>
                            this.setFormField(
                                `payment.${FIELDS.METHOD}`,
                                item.id
                            )
                        }
                        headerProps={{
                            title: Lng.t('payments.modePlaceholder', {
                                locale
                            })
                        }}
                        emptyContentProps={{ contentType: 'paymentMode' }}
                        inputModalName="PaymentModeModal"
                        isEditable={!disabled}
                        fakeInputProps={{ disabled }}
                    />

                    <Notes
                        {...this.props}
                        isEditPayment={isEditScreen}
                        setFormField={this.setFormField}
                    />

                    {hasCustomField && (
                        <CustomField {...this.props} type="payment" />
                    )}
                </View>
            </DefaultLayout>
        );
    }
}
