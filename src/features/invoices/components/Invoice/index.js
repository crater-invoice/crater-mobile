// @flow

import React from 'react';
import * as Linking from 'expo-linking';
import { find } from 'lodash';
import { Field, change, SubmissionError } from 'redux-form';
import styles from './styles';
import { colors, itemsDescriptionStyle } from '@/styles';
import { TemplateField } from '../TemplateField';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import t from 'locales/use-translation';
import { IMAGES } from '@/assets';
import FinalAmount from '../FinalAmount';
import { alertMe, isArray } from '@/constants';
import {
    InputField,
    DatePickerField,
    ListView,
    DefaultLayout,
    SelectField,
    CurrencyFormat,
    FakeInput,
    SendMail,
    CustomField,
    Label,
    View as CtView,
    ActionButton
} from '@/components';
import {
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
            type: 'ADD',
            currency,
            onSelect: item => {
                this.customerReference?.changeDisplayValue?.(item);
                this.setFormField('customer_id', item.id);
                this.setState({ currency: item.currency });
            }
        });
    };

    setInitialValues = () => {
        const {
            getCreateInvoice,
            getEditInvoice,
            isEditScreen,
            id
        } = this.props;

        if (!isEditScreen) {
            getCreateInvoice({
                onSuccess: () => {
                    this.setState({ isLoading: false });
                }
            });
            return;
        }

        if (isEditScreen) {
            getEditInvoice({
                id,
                onSuccess: ({ customer, status }) => {
                    this.setState({
                        currency: customer.currency,
                        customerName: customer.name,
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
            invoiceData: { discount_per_item, tax_per_item },
            isAllowToEdit
        } = this.props;
        const { currency } = this.state;

        if (!isAllowToEdit) {
            return;
        }

        navigation.navigate(ROUTES.INVOICE_ITEM, {
            item,
            type: ITEM_EDIT,
            currency,
            discount_per_item,
            tax_per_item
        });
    };

    onDraft = handleSubmit => {
        const { navigation, isEditScreen } = this.props;
        const { isLoading } = this.state;

        if (isLoading) {
            navigation.navigate(ROUTES.MAIN_INVOICES);
            return;
        }

        if (isEditScreen) {
            navigation.navigate(ROUTES.MAIN_INVOICES);
            return;
        }

        alertMe({
            title: t('invoices.alert.draftTitle'),
            showCancel: true,
            cancelText: t('alert.action.discard'),
            cancelPress: () => navigation.navigate(ROUTES.MAIN_INVOICES),
            okText: t('alert.action.saveAsDraft'),
            okPress: handleSubmit(this.draftInvoice)
        });
    };

    onSubmitInvoice = (values, status) => {
        const {
            createInvoice,
            navigation,
            editInvoice,
            id,
            handleSubmit,
            initLoading,
            withLoading,
            isCreateScreen,
            invoiceData: { invoiceTemplates = [] } = {}
        } = this.props;

        if (this.state.isLoading || initLoading || withLoading) {
            return;
        }

        if (finalAmount() < 0) {
            alert(t('invoices.alert.lessAmount'));
            return;
        }

        let invoice = {
            ...values,
            invoice_number: `${values.prefix}-${values.invoice_number}`,
            invoice_no: values.invoice_number,
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

        invoice.invoice_template_id = find(invoiceTemplates, {
            name: invoice?.template_name
        })?.id;

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
                handleSubmit(() => this.throwError(errors))()
        };

        isCreateScreen ? createInvoice(params) : editInvoice(params);
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

    throwError = errors => {
        if (errors?.invoice_number) {
            throw new SubmissionError({
                invoice_number: 'validation.alreadyTaken'
            });
        }

        alertMe({
            desc: t('validation.wrong')
        });
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
        const { removeInvoice, navigation, id } = this.props;

        alertMe({
            title: t('alert.title'),
            desc: t('invoices.alert.removeDescription'),
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
                                title: t('invoices.alert.paymentAttachedTitle'),
                                desc: t(
                                    'invoices.alert.paymentAttachedDescription'
                                )
                            });
                            return;
                        }

                        alertMe({
                            desc: t('validation.wrong')
                        });
                    }
                })
        });
    };

    onOptionSelect = action => {
        const { navigation, formValues, changeInvoiceStatus, id } = this.props;

        switch (action) {
            case INVOICE_ACTIONS.SEND:
                this.sendMailRef?.onToggle();
                break;

            case INVOICE_ACTIONS.MARK_AS_SENT:
                alertMe({
                    title: t('alert.title'),
                    desc: t('invoices.alert.markAsSent'),
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
                    type: 'ADD',
                    invoice,
                    hasRecordPayment: true
                });
                break;

            case INVOICE_ACTIONS.CLONE:
                alertMe({
                    title: t('alert.title'),
                    desc: t('invoices.alert.clone'),
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
            initLoading,
            getCustomers,
            customers,
            formValues,
            withLoading,
            customFields,
            isAllowToEdit,
            isAllowToDelete,
            isEditScreen,
            loading,
            theme
        } = this.props;

        const { currency, customerName, markAsStatus, isLoading } = this.state;
        const disabled = !isAllowToEdit;

        const hasCustomField = isEditScreen
            ? formValues && formValues.hasOwnProperty('fields')
            : isArray(customFields);

        let hasSentStatus =
            markAsStatus === 'SENT' || markAsStatus === 'VIEWED';
        let hasCompleteStatus = markAsStatus === 'COMPLETED';

        let drownDownProps =
            isEditScreen && !initLoading
                ? {
                      options: EDIT_INVOICE_ACTIONS(
                          hasSentStatus,
                          hasCompleteStatus,
                          isAllowToDelete
                      ),
                      onSelect: this.onOptionSelect,
                      cancelButtonIndex: 5,
                      destructiveButtonIndex: 4,
                      ...(hasSentStatus && {
                          cancelButtonIndex: 4,
                          destructiveButtonIndex: 3
                      }),
                      ...(hasCompleteStatus && {
                          cancelButtonIndex: 2,
                          destructiveButtonIndex: 1
                      }),
                      ...(!isAllowToDelete &&
                          hasSentStatus && {
                              cancelButtonIndex: 3,
                              destructiveButtonIndex: 4
                          }),
                      ...(!isAllowToDelete &&
                          hasCompleteStatus && {
                              cancelButtonIndex: 1,
                              destructiveButtonIndex: 2
                          }),
                      ...(!isAllowToDelete &&
                          !hasSentStatus &&
                          !hasCompleteStatus && {
                              cancelButtonIndex: 4,
                              destructiveButtonIndex: 5
                          })
                  }
                : null;

        const getTitle = () => {
            let title = 'header.addInvoice';
            if (isEditScreen && !isAllowToEdit) title = 'header.viewInvoice';
            if (isEditScreen && isAllowToEdit) title = 'header.editInvoice';

            return t(title);
        };

        this.invoiceRefs(this);

        const bottomAction = [
            {
                label: 'button.viewPdf',
                onPress: handleSubmit(this.downloadInvoice),
                type: 'btn-outline',
                show: isAllowToEdit,
                loading: loading || isLoading
            },
            {
                label: 'button.save',
                onPress: handleSubmit(this.saveInvoice),
                show: isAllowToEdit,
                loading: loading || isLoading
            }
        ];

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => this.onDraft(handleSubmit),
                    title: getTitle(),
                    placement: 'center',
                    ...(!isEditScreen && {
                        rightIcon: 'save',
                        rightIconProps: { solid: true },
                        rightIconPress: handleSubmit(this.downloadInvoice)
                    })
                }}
                bottomAction={<ActionButton buttons={bottomAction} />}
                loadingProps={{ is: isLoading || initLoading || withLoading }}
                contentProps={{ withLoading }}
                dropdownProps={drownDownProps}
                bodyStyle={`px-22 pt-10 pb-15 opacity-${
                    withLoading ? 80 : 100
                }`}
            >
                {isEditScreen && !hasCompleteStatus && this.sendMailComponent()}

                <CtView flex={1} flex-row>
                    <CtView flex={1} justify-between>
                        <Field
                            name={'invoice_date'}
                            isRequired
                            component={DatePickerField}
                            label={t('invoices.invoiceDate')}
                            icon={'calendar-alt'}
                            onChangeCallback={val =>
                                this.setFormField('invoice_date', val)
                            }
                            disabled={disabled}
                        />
                    </CtView>
                    <CtView flex={0.07} />
                    <CtView flex={1} justify-between>
                        <Field
                            name="due_date"
                            isRequired
                            component={DatePickerField}
                            label={t('invoices.dueDate')}
                            icon={'calendar-alt'}
                            onChangeCallback={val =>
                                this.setFormField('due_date', val)
                            }
                            disabled={disabled}
                        />
                    </CtView>
                </CtView>

                <Field
                    name="invoice_number"
                    component={FakeInput}
                    label={t('invoices.invoiceNumber')}
                    isRequired
                    prefixProps={{
                        fieldName: 'invoice_number',
                        prefix: formValues?.prefix,
                        icon: 'hashtag',
                        iconSolid: false
                    }}
                    disabled={disabled}
                />

                <Field
                    name="customer_id"
                    items={customers}
                    apiSearch
                    hasPagination
                    isRequired
                    getItems={getCustomers}
                    selectedItem={formValues?.user}
                    displayName="name"
                    component={SelectField}
                    label={t('invoices.customer')}
                    icon={'user'}
                    createActionRouteName={ROUTES.CUSTOMER}
                    placeholder={
                        customerName
                            ? customerName
                            : t('invoices.customerPlaceholder')
                    }
                    navigation={navigation}
                    compareField="id"
                    onSelect={item => {
                        this.setFormField('customer_id', item.id);
                        this.setState({ currency: item.currency });
                    }}
                    rightIconPress={this.navigateToCustomer}
                    headerProps={{
                        title: t('customers.title')
                    }}
                    listViewProps={{ hasAvatar: true }}
                    emptyContentProps={{
                        contentType: 'customers',
                        image: IMAGES.EMPTY_CUSTOMERS
                    }}
                    reference={ref => (this.customerReference = ref)}
                    isEditable={!disabled}
                    fakeInputProps={{ disabled }}
                />

                <Label isRequired theme={theme} style={styles.label}>
                    {t('invoices.items')}
                </Label>

                <ListView
                    items={this.getInvoiceItemList(invoiceItems)}
                    itemContainer={styles.itemContainer(theme, disabled)}
                    leftTitleStyle={styles.itemLeftTitle(theme)}
                    leftSubTitleLabelStyle={[
                        styles.itemLeftSubTitle(theme),
                        styles.itemLeftSubTitleLabel
                    ]}
                    leftSubTitleStyle={styles.itemLeftSubTitle(theme)}
                    rightTitleStyle={styles.itemRightTitle(theme)}
                    backgroundColor={
                        !disabled
                            ? theme.thirdBgColor
                            : theme?.input?.disableBackgroundColor
                    }
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
                    placeholder={t('invoices.addItem')}
                    navigation={navigation}
                    onlyPlaceholder
                    isMultiSelect
                    loading={itemsLoading}
                    fakeInputProps={{
                        icon: 'shopping-basket',
                        rightIcon: 'angle-right',
                        color: colors.primaryLight,
                        disabled
                    }}
                    createActionRouteName={ROUTES.GLOBAL_ITEM}
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
                        title: t('items.title')
                    }}
                    emptyContentProps={{
                        contentType: 'items',
                        image: IMAGES.EMPTY_ITEMS
                    }}
                    listViewProps={{
                        leftSubTitleStyle: itemsDescriptionStyle()
                    }}
                    paginationLimit={15}
                    isEditable={!disabled}
                />

                <FinalAmount state={this.state} props={this.props} />

                <Field
                    name="reference_number"
                    component={InputField}
                    hint={t('invoices.referenceNumber')}
                    leftIcon={'hashtag'}
                    disabled={disabled}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true
                    }}
                />

                <Notes
                    {...this.props}
                    isEditScreen={isEditScreen}
                    setFormField={this.setFormField}
                />

                <Field
                    name="template_name"
                    templates={invoiceTemplates ?? []}
                    component={TemplateField}
                    label={t('invoices.template')}
                    icon={'file-alt'}
                    placeholder={t('invoices.templatePlaceholder')}
                    navigation={navigation}
                    disabled={disabled}
                />

                {hasCustomField && <CustomField {...this.props} type={null} />}
            </DefaultLayout>
        );
    }
}
