// @flow

import React, { Fragment } from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { Field, change } from 'redux-form';
import styles from './styles';
import {
    InputField,
    DatePickerField,
    CtButton,
    ListView,
    DefaultLayout,
    SelectField,
    CurrencyFormat,
    FakeInput,
    ToggleSwitch,
    TermsAndCondition,
    SendMail
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
import { colors, itemsDescriptionStyle } from '@/styles';
import { TemplateField } from '../TemplateField';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import Lng from '@/lang/i18n';
import { IMAGES } from '@/assets';
import FinalAmount from '../FinalAmount';
import { alertMe, BUTTON_TYPE, MAX_LENGTH } from '@/constants';
import { CUSTOMER_ADD } from '@/features/customers/constants';
import { PAYMENT_ADD } from '@/features/payments/constants';
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
    locale: String,
    type: String
};

const termsCondition = {
    description: 'terms_and_conditions',
    toggle: 'display_terms_and_conditions'
};
export class Invoice extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.invoiceRefs = setInvoiceRefs.bind(this);

        this.state = {
            taxTypeList: [],
            currency: {},
            itemList: [],
            customerName: '',
            markAsStatus: null
        };
    }

    componentDidMount() {
        const {
            getCreateInvoice,
            navigation,
            invoiceItems,
            getEditInvoice,
            type
        } = this.props;

        type === INVOICE_EDIT
            ? getEditInvoice({
                  id: navigation.getParam('id'),
                  onResult: ({ user: { currency, name }, status }) => {
                      this.setState({
                          currency,
                          customerName: name,
                          markAsStatus: status
                      });
                  }
              })
            : getCreateInvoice({
                  onResult: val => {
                      const { currency } = val;

                      this.setState({ currency });
                  }
              });

        this.getInvoiceItemList(invoiceItems);

        this.androidBackHandler();
    }

    componentWillUnmount() {
        const { clearInvoice } = this.props;
        clearInvoice();
        this.invoiceRefs(undefined);
        goBack(UNMOUNT);
    }

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
            okPress: handleSubmit(this.onSubmitInvoice)
        });
    };

    onSubmitInvoice = (values, status = 'draft') => {
        const {
            createInvoice,
            navigation,
            type,
            editInvoice,
            locale,
            invoiceData: { invoice_prefix = '' } = {}
        } = this.props;

        if (finalAmount() < 0) {
            alert(Lng.t('invoices.alert.lessAmount', { locale }));
            return;
        }

        let invoice = {
            ...values,
            invoice_number: `${invoice_prefix}-${values.invoice_number}`,
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

        type === INVOICE_ADD
            ? createInvoice({
                  invoice,
                  onResult: url => {
                      if (status === 'download') {
                          Linking.openURL(url);
                      }
                      navigation.navigate(ROUTES.MAIN_INVOICES);
                  }
              })
            : editInvoice({
                  invoice: { ...invoice, id: navigation.getParam('id') },
                  onResult: url => {
                      if (status === 'download') {
                          Linking.openURL(url);
                      }
                      navigation.navigate(ROUTES.MAIN_INVOICES);
                  }
              });
    };

    BOTTOM_ACTION = () => {
        const { locale, loading, handleSubmit } = this.props;

        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(val =>
                        this.onSubmitInvoice(
                            val,
                            (status = INVOICE_ACTIONS.VIEW)
                        )
                    )}
                    btnTitle={Lng.t('button.viewPdf', { locale })}
                    type={BUTTON_TYPE.OUTLINE}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                    loading={loading}
                />

                <CtButton
                    onPress={handleSubmit(val =>
                        this.onSubmitInvoice(val, (status = 'save'))
                    )}
                    btnTitle={Lng.t('button.save', { locale })}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                    loading={loading}
                />
            </View>
        );
    };

    getInvoiceItemList = invoiceItems => {
        this.setFormField('items', invoiceItems);

        const { currency } = this.state;

        let invoiceItemList = [];

        if (typeof invoiceItems !== 'undefined' && invoiceItems.length != 0) {
            invoiceItemList = invoiceItems.map(item => {
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
                                style={styles.itemLeftSubTitle}
                                containerStyle={styles.itemLeftSubTitleLabel}
                            />
                        )
                    },
                    amount: total,
                    currency,
                    fullItem: item
                };
            });
        }

        return invoiceItemList;
    };

    onOptionSelect = action => {
        const {
            removeInvoice,
            navigation,
            locale,
            formValues: { user, user_id, due_amount, invoice_number, id },
            handleSubmit,
            changeInvoiceStatus,
            type
        } = this.props;

        switch (action) {
            case INVOICE_ACTIONS.SEND:
                this.sendMailRef?.onToggle();
                break;

            case INVOICE_ACTIONS.MARK_AS_SENT:
                changeInvoiceStatus({
                    id: navigation.getParam('id'),
                    action: 'mark-as-sent',
                    navigation
                });
                break;

            case INVOICE_ACTIONS.RECORD_PAYMENT:
                let invoice = {
                    user,
                    user_id,
                    due_amount,
                    invoice_number,
                    id
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
                            id: navigation.getParam('id'),
                            action: 'clone',
                            navigation
                        })
                });

                break;

            case INVOICE_ACTIONS.DELETE:
                alertMe({
                    title: Lng.t('alert.title', { locale }),
                    desc: Lng.t('invoices.alert.removeDescription', { locale }),
                    showCancel: true,
                    okPress: () =>
                        removeInvoice({
                            id: navigation.getParam('id'),
                            onResult: res => {
                                res.success &&
                                    navigation.navigate(ROUTES.MAIN_INVOICES);

                                res.error &&
                                    res.error === 'payment_attached' &&
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
                            }
                        })
                });

                break;

            default:
                break;
        }
    };

    openTermConditionModal = () => this.termsAndConditionRef?.onToggle();

    TOGGLE_TERMS_CONDITION_VIEW = () => {
        const { formValues, locale } = this.props;
        let isShow = formValues?.display_terms_and_conditions;

        return (
            <Fragment>
                <Field
                    name={termsCondition.toggle}
                    component={ToggleSwitch}
                    status={isShow}
                    hint={Lng.t('termsCondition.show', { locale })}
                    mainContainerStyle={{ marginTop: 12 }}
                />

                {(isShow === true || isShow === 1) && (
                    <TouchableOpacity onPress={this.openTermConditionModal}>
                        <Text style={styles.termsEditText}>
                            {Lng.t('termsCondition.edit', { locale })}
                        </Text>
                    </TouchableOpacity>
                )}
            </Fragment>
        );
    };

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
            locale,
            initLoading,
            type,
            getCustomers,
            customers,
            customersLoading,
            formValues: { display_terms_and_conditions },
            changeInvoiceStatus
        } = this.props;

        const { currency, customerName, markAsStatus } = this.state;

        const isEditInvoice = type === INVOICE_EDIT;

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
                          ? 3
                          : hasCompleteStatus
                          ? 2
                          : 5,
                      destructiveButtonIndex: hasSentStatus
                          ? 2
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
                    rightIconPress: handleSubmit(val =>
                        this.onSubmitInvoice(val, (status = 'save'))
                    ),
                    rightIconProps: {
                        solid: true
                    },
                    placement: 'center'
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{ is: initLoading }}
                dropdownProps={drownDownProps}
            >
                <View style={styles.bodyContainer}>
                    <TermsAndCondition
                        termsConditionRef={ref =>
                            (this.termsAndConditionRef = ref)
                        }
                        props={this.props}
                        fieldName={termsCondition.description}
                    />
                    {isEditInvoice && !hasSentStatus && !hasCompleteStatus && (
                        <SendMail
                            mailReference={ref => (this.sendMailRef = ref)}
                            props={this.props}
                            headerTitle={'header.sendMailInvoice'}
                            alertDesc={'invoices.alert.sendInvoice'}
                            onSendMail={params =>
                                changeInvoiceStatus({
                                    id: navigation.getParam('id'),
                                    action: 'send',
                                    navigation,
                                    params
                                })
                            }
                        />
                    )}

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
                            prefix: invoice_prefix,
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
                        rightIconPress={() =>
                            navigation.navigate(ROUTES.CUSTOMER, {
                                type: CUSTOMER_ADD,
                                currency,
                                onSelect: val => {
                                    this.setFormField('user_id', val.id);
                                    this.setState({ currency: val.currency });
                                }
                            })
                        }
                        headerProps={{
                            title: Lng.t('customers.title', { locale })
                        }}
                        listViewProps={{
                            hasAvatar: true
                        }}
                        emptyContentProps={{
                            contentType: 'customers',
                            image: IMAGES.EMPTY_CUSTOMERS
                        }}
                        fakeInputProps={{ loading: customersLoading }}
                    />

                    <Text style={[styles.inputTextStyle, styles.label]}>
                        {Lng.t('invoices.items', { locale })}
                        <Text style={styles.required}> *</Text>
                    </Text>

                    <ListView
                        items={this.getInvoiceItemList(invoiceItems)}
                        itemContainer={styles.itemContainer}
                        leftTitleStyle={styles.itemLeftTitle}
                        leftSubTitleLabelStyle={[
                            styles.itemLeftSubTitle,
                            styles.itemLeftSubTitleLabel
                        ]}
                        leftSubTitleStyle={styles.itemLeftSubTitle}
                        rightTitleStyle={styles.itemRightTitle}
                        backgroundColor={colors.white}
                        onPress={this.onEditItem}
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

                    <Field
                        name="notes"
                        component={InputField}
                        hint={Lng.t('invoices.notes', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            placeholder: Lng.t('invoices.notePlaceholder', {
                                locale
                            }),
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
                        label={Lng.t('invoices.template', { locale })}
                        icon={'file-alt'}
                        placeholder={Lng.t('invoices.templatePlaceholder', {
                            locale
                        })}
                        navigation={navigation}
                        locale={locale}
                    />

                    {this.TOGGLE_TERMS_CONDITION_VIEW()}
                </View>
            </DefaultLayout>
        );
    }
}
