// @flow

import React from 'react';
import { View } from 'react-native';
import { Field, change } from 'redux-form';
import moment from 'moment';
import styles from './styles';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import Lng from '@/lang/i18n';
import { IMAGES } from '@/assets';
import { CUSTOMER_ADD } from '@/features/customers/constants';
import {
    INVOICES_STATUS_BG_COLOR,
    INVOICES_STATUS_TEXT_COLOR
} from '@/features/invoices/constants';
import {
    InputField,
    CtButton,
    DefaultLayout,
    DatePickerField,
    SelectField,
    FakeInput
} from '@/components';
import {
    PAYMENT_ADD,
    PAYMENT_EDIT,
    PAYMENT_FORM,
    PAYMENT_ACTIONS,
    ACTIONS_VALUE,
    PAYMENT_FIELDS as FIELDS
} from '../../constants';
import {
    alertMe,
    DATE_FORMAT,
    hasObjectLength,
    hasValue,
    isArray,
    KEYBOARD_TYPE,
    MAX_LENGTH
} from '@/constants';

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
    getCustomers: Function
};

export class Payment extends React.Component<IProps> {
    customerReference: any;
    invoiceReference: any;

    constructor(props) {
        super(props);
        this.customerReference = React.createRef();
        this.invoiceReference = React.createRef();

        this.state = {
            selectedInvoice: null,
            selectedCustomer: null,
            isLoading: true
        };
    }

    componentDidMount() {
        const { navigation, hasRecordPayment } = this.props;

        this.setInitialValues();

        goBack(MOUNT, navigation, {
            route: hasRecordPayment ? null : ROUTES.MAIN_PAYMENTS
        });
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    setInitialValues = () => {
        const { getCreatePayment, getPaymentDetail, type, id } = this.props;

        if (type === PAYMENT_ADD) {
            getCreatePayment({
                onSuccess: ({ nextNumber, prefix }) => {
                    const values = {
                        [FIELDS.PREFIX]: prefix,
                        [FIELDS.NUMBER]: nextNumber,
                        [FIELDS.DATE]: moment()
                    };
                    this.setFormField(`payment`, values);
                    this.setState({ isLoading: false });
                }
            });
            return;
        }

        if (type === PAYMENT_EDIT) {
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

    onSubmit = ({ payment }) => {
        const { selectedInvoice, isLoading } = this.state;
        const {
            type,
            createPayment,
            updatePayment,
            navigation,
            locale,
            id
        } = this.props;

        if (isLoading) {
            return;
        }

        const prefix = payment?.[FIELDS.PREFIX];
        let params = payment;

        if (prefix) {
            params = {
                ...payment,
                [FIELDS.NUMBER]: `${payment?.[FIELDS.PREFIX]}-${
                    payment?.[FIELDS.NUMBER]
                }`
            };
        }

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
                submissionError: errors => this.throwError(errors, locale)
            });
        }

        if (type === PAYMENT_EDIT) {
            updatePayment({
                id,
                params,
                navigation,
                submissionError: errors => this.throwError(errors, locale)
            });
        }
    };

    throwError = (errors, locale) => {
        if (errors?.[FIELDS.NUMBER]) {
            alertMe({
                desc: Lng.t('alert.alreadyInUse', {
                    locale,
                    field: Lng.t('payments.number', { locale })
                })
            });
            return;
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
                    labelBgColor: INVOICES_STATUS_BG_COLOR[status],
                    labelTextColor: INVOICES_STATUS_TEXT_COLOR[status]
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
        const { sendPaymentReceipt, id, locale } = this.props;

        switch (action) {
            case ACTIONS_VALUE.REMOVE:
                return this.removePayment();

            case ACTIONS_VALUE.SEND:
                return alertMe({
                    title: Lng.t('alert.title', { locale }),
                    desc: Lng.t('payments.alertSendDescription', { locale }),
                    showCancel: true,
                    okPress: () => sendPaymentReceipt({ params: { id } })
                });

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
        const { formValues, locale } = this.props;
        const prefix = formValues?.payment?.[FIELDS.PREFIX];

        if (hasValue(prefix)) {
            return (
                <Field
                    name={`payment.${FIELDS.NUMBER}`}
                    component={FakeInput}
                    label={Lng.t('payments.number', { locale })}
                    isRequired
                    prefixProps={{
                        fieldName: `payment.${FIELDS.NUMBER}`,
                        prefix
                    }}
                />
            );
        }

        return (
            <Field
                name={`payment.${FIELDS.NUMBER}`}
                component={InputField}
                hint={Lng.t('payments.number', { locale })}
                inputFieldStyle={styles.inputFieldStyle}
                inputProps={{
                    keyboardType: KEYBOARD_TYPE.NUMERIC
                }}
            />
        );
    };

    BOTTOM_ACTION = handleSubmit => {
        const { locale, loading } = this.props;

        let buttonTitle = Lng.t('button.save', { locale });

        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(this.onSubmit)}
                    btnTitle={buttonTitle}
                    loading={loading}
                />
            </View>
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
            unPaidInvoices
        } = this.props;

        const { isLoading } = this.state;

        const drownDownProps =
            type === PAYMENT_EDIT && !isLoading
                ? {
                      options: PAYMENT_ACTIONS(Lng, locale),
                      onSelect: this.onOptionSelect,
                      cancelButtonIndex: 2,
                      destructiveButtonIndex: 1
                  }
                : null;

        const headerProps = {
            leftIconPress: () => navigation.goBack(null),
            title:
                type === PAYMENT_EDIT
                    ? Lng.t('header.editPayment', { locale })
                    : Lng.t('header.addPayment', { locale }),
            placement: 'center',
            rightIcon: type !== PAYMENT_EDIT ? 'save' : null,
            rightIconProps: {
                solid: true
            },
            rightIconPress: handleSubmit(this.onSubmit)
        };

        return (
            <DefaultLayout
                headerProps={headerProps}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{ is: isLoading }}
                dropdownProps={drownDownProps}
            >
                <View style={styles.bodyContainer}>
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
                        leftIcon={'dollar-sign'}
                        hint={Lng.t('payments.amount', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            keyboardType: 'numeric'
                        }}
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
                            }),
                            rightIconPress: null
                        }}
                        emptyContentProps={{ contentType: 'paymentMode' }}
                    />

                    <Field
                        name={`payment.${FIELDS.NOTES}`}
                        component={InputField}
                        hint={Lng.t('payments.notes', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            placeholder: Lng.t('payments.notesPlaceholder', {
                                locale
                            }),
                            autoCorrect: true,
                            multiline: true,
                            maxLength: MAX_LENGTH
                        }}
                        height={80}
                        autoCorrect={true}
                    />
                </View>
            </DefaultLayout>
        );
    }
}
