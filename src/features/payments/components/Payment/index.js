// @flow

import React from 'react';
import { Field, change, SubmissionError } from 'redux-form';
import moment from 'moment';
import styles from './styles';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import t from 'locales/use-translation';
import { IMAGES } from '@/assets';
import {
    InputField,
    DefaultLayout,
    DatePickerField,
    SelectField,
    FakeInput,
    SendMail,
    CustomField,
    View as CtView,
    ActionButton
} from '@/components';
import {
    PAYMENT_FORM,
    PAYMENT_ACTIONS,
    ACTIONS_VALUE,
    PAYMENT_FIELDS as FIELDS
} from '../../constants';
import {
    alertMe,
    capitalize,
    DATE_FORMAT,
    hasObjectLength,
    isEmpty
} from '@/constants';
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
            isCreateScreen,
            hasRecordPayment,
            id
        } = this.props;

        if (isCreateScreen) {
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
                    const { payment_prefix, nextPaymentNumber } = res?.meta;
                    const payment = res?.data;
                    const values = {
                        ...payment,
                        [FIELDS.PREFIX]: payment_prefix,
                        [FIELDS.NUMBER]: nextPaymentNumber
                    };

                    this.setFormField(`payment`, values);

                    this.setState({
                        isLoading: false,
                        selectedCustomer: payment?.customer,
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
            [FIELDS.CUSTOMER]: invoice?.customer?.id,
            [FIELDS.INVOICE]: invoice?.id,
            [FIELDS.AMOUNT]: invoice?.due?.due_amount,
            user: invoice?.customer,
            invoice: { invoice_number: invoice?.number }
        };

        this.setFormField(`payment`, val);

        this.setState({
            selectedCustomer: invoice?.customer,
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
            handleSubmit,
            createPayment,
            updatePayment,
            navigation,
            hasRecordPayment,
            isEditScreen,
            isCreateScreen,
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
            [FIELDS.PAYMENT_NO]: payment?.[FIELDS.NUMBER],
            customFields
        };

        if (hasObjectLength(selectedInvoice)) {
            const amount = payment?.[FIELDS.AMOUNT] ?? 0;
            const due = selectedInvoice?.due_amount ?? 0;
            const subTotal = selectedInvoice?.sub_total ?? 0;

            if (due !== 0 && amount > due) {
                alertMe({
                    desc: t('payments.alertAmount')
                });
                return;
            }

            if (due === 0 && amount > subTotal) {
                alertMe({
                    desc: t('payments.alertAmount')
                });
                return;
            }
        }

        if (isCreateScreen) {
            createPayment({
                params,
                navigation,
                hasRecordPayment,
                submissionError: errors =>
                    handleSubmit(() => this.throwError(errors))()
            });
        }

        if (isEditScreen) {
            updatePayment({
                id,
                params,
                navigation,
                submissionError: errors =>
                    handleSubmit(() => this.throwError(errors))()
            });
        }
    };

    throwError = errors => {
        if (errors?.[FIELDS.NUMBER]) {
            throw new SubmissionError({
                payment: { [FIELDS.NUMBER]: 'validation.alreadyTaken' }
            });
        }

        alertMe({
            desc: t('validation.wrong')
        });
    };

    formatUnpaidInvoices = items => {
        if (isEmpty(items)) {
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
                customer
            } = item;

            return {
                title: customer?.name,
                subtitle: {
                    title: invoice_number,
                    labelTextColor:
                        BADGE_STATUS_TEXT_COLOR?.[status]?.[theme.mode],
                    ...(theme.mode === 'dark'
                        ? {
                              label: capitalize(status),
                              labelOutlineColor:
                                  BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode]
                          }
                        : {
                              label: status,
                              labelBgColor:
                                  BADGE_STATUS_BG_COLOR?.[status]?.[theme.mode]
                          })
                },
                amount: due_amount,
                currency: selectedCustomer?.currency,
                rightSubtitle: formattedDueDate,
                fullItem: item
            };
        });
    };

    removePayment = () => {
        const { removePayment, navigation, id } = this.props;

        alertMe({
            title: t('alert.title'),
            desc: t('payments.alertDescription'),
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
            type: 'ADD',
            onSelect: item => {
                this.customerReference?.changeDisplayValue?.(item);
                this.onSelectCustomer(item);
            }
        });
    };

    nextNumberView = () => {
        const { formValues, isAllowToEdit } = this.props;

        return (
            <Field
                name={`payment.${FIELDS.NUMBER}`}
                component={FakeInput}
                label={t('payments.number')}
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
            type,
            getCustomers,
            fetchPaymentModes,
            paymentModes,
            formValues,
            getUnpaidInvoices,
            unPaidInvoices,
            withLoading,
            customFields,
            isCreateScreen,
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
            : !isEmpty(customFields);

        const drownDownProps =
            isEditScreen && !isLoading
                ? {
                      options: PAYMENT_ACTIONS(isAllowToDelete),
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

            return t(title);
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
                bottomAction={<ActionButton buttons={bottomAction} />}
                bodyStyle={`px-22 pt-10 pb-15 opacity-${
                    withLoading ? 80 : 100
                }`}
            >
                {isEditScreen && this.sendMailComponent()}

                <CtView flex={1} flex-row>
                    <CtView flex={1} justify-between>
                        <Field
                            name={`payment.${FIELDS.DATE}`}
                            component={DatePickerField}
                            dateTimeFormat={DATE_FORMAT}
                            label={t('payments.date')}
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
                    </CtView>
                    <CtView flex={0.07} />
                    <CtView flex={1} justify-between>
                        {this.nextNumberView()}
                    </CtView>
                </CtView>

                <Field
                    name={`payment.${FIELDS.CUSTOMER}`}
                    apiSearch
                    hasPagination
                    getItems={getCustomers}
                    items={customers}
                    selectedItem={formValues?.payment?.customer}
                    displayName="name"
                    component={SelectField}
                    label={t('payments.customer')}
                    icon={'user'}
                    placeholder={t('payments.customerPlaceholder')}
                    navigation={navigation}
                    compareField="id"
                    onSelect={item => this.onSelectCustomer(item)}
                    createActionRouteName={ROUTES.CUSTOMER}
                    rightIconPress={this.navigateToCustomer}
                    headerProps={{
                        title: t('customers.title')
                    }}
                    listViewProps={{ hasAvatar: true }}
                    emptyContentProps={{
                        contentType: 'customers',
                        image: IMAGES.EMPTY_CUSTOMERS
                    }}
                    isRequired
                    isEditable={isCreateScreen}
                    fakeInputProps={{
                        disabled: isEditScreen
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
                    label={t('payments.invoice')}
                    icon="align-center"
                    placeholder={t('payments.invoicePlaceholder')}
                    navigation={navigation}
                    compareField="id"
                    onSelect={item => this.onSelectInvoice(item)}
                    headerProps={{
                        title: t('invoices.title'),
                        rightIconPress: null
                    }}
                    emptyContentProps={{ contentType: 'invoices' }}
                    queryString={{
                        customer_id: formValues?.payment?.[FIELDS.CUSTOMER],
                        status: 'UNPAID'
                    }}
                    reference={ref => (this.invoiceReference = ref)}
                    isEditable={isCreateScreen}
                    fakeInputProps={{
                        disabled: isEditScreen
                    }}
                />

                <Field
                    name={`payment.${FIELDS.AMOUNT}`}
                    component={InputField}
                    leftSymbol={
                        selectedCustomer?.currency?.symbol ?? currency?.symbol
                    }
                    hint={t('payments.amount')}
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
                    getItems={fetchPaymentModes}
                    items={paymentModes}
                    selectedItem={formValues?.payment?.payment_method}
                    displayName="name"
                    label={t('payments.mode')}
                    icon="align-center"
                    placeholder={t('payments.modePlaceholder')}
                    navigation={navigation}
                    compareField="id"
                    onSelect={item =>
                        this.setFormField(`payment.${FIELDS.METHOD}`, item.id)
                    }
                    headerProps={{
                        title: t('payments.modePlaceholder')
                    }}
                    emptyContentProps={{ contentType: 'paymentMode' }}
                    inputModalName="PaymentModeModal"
                    createActionRouteName={ROUTES.CUSTOMIZE_PAYMENT}
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
            </DefaultLayout>
        );
    }
}
