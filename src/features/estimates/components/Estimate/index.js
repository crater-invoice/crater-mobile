// @flow
import React from 'react';
import * as Linking from 'expo-linking';
import { find } from 'lodash';
import { Field, change, SubmissionError } from 'redux-form';
import styles from './styles';
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
    ActionButton,
    View as CtView
} from '@/components';
import {
    ESTIMATE_ADD,
    ITEM_ADD,
    ITEM_EDIT,
    ESTIMATE_FORM,
    ESTIMATE_ACTIONS,
    EDIT_ESTIMATE_ACTIONS,
    MARK_AS_ACCEPT,
    MARK_AS_REJECT,
    MARK_AS_SENT,
    setEstimateRefs
} from '../../constants';
import { colors, headerTitle, itemsDescriptionStyle } from '@/styles';
import { TemplateField } from '../TemplateField';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import t from 'locales/use-translation';
import { CUSTOMER_ADD } from '../../../customers/constants';
import { IMAGES } from '@/assets';
import {
    estimateSubTotal,
    estimateTax,
    getTaxValue,
    totalDiscount,
    getCompoundTaxValue,
    finalAmount,
    getItemList,
    estimateCompoundTax
} from '../EstimateCalculation';
import FinalAmount from '../FinalAmount';
import { alertMe, isArray } from '@/constants';
import { getApiFormattedCustomFields } from '@/utils';
import Notes from './notes';
import EstimateServices from '../../services';

type IProps = {
    navigation: Object,
    estimateItems: any,
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
    items: Object,
    type: String,
    notesReference: any
};

export class Estimate extends React.Component<IProps> {
    estimateRefs: any;
    sendMailRef: any;
    customerReference: any;

    constructor(props) {
        super(props);
        this.estimateRefs = setEstimateRefs.bind(this);
        this.sendMailRef = React.createRef();
        this.customerReference = React.createRef();
        this.notesReference = React.createRef();

        this.state = {
            currency: props?.currency,
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
        const { clearEstimate } = this.props;
        clearEstimate();
        this.estimateRefs(undefined);
        goBack(UNMOUNT);
    }

    setInitialValues = () => {
        const {
            getCreateEstimate,
            getEditEstimate,
            type,
            isEditEstimate,
            id
        } = this.props;

        if (type === ESTIMATE_ADD) {
            getCreateEstimate({
                onSuccess: () => {
                    this.setState({ isLoading: false });
                }
            });
            return;
        }

        if (isEditEstimate) {
            getEditEstimate({
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
        this.props.dispatch(change(ESTIMATE_FORM, field, value));
    };

    onEditItem = item => {
        const {
            navigation,
            estimateData: { discount_per_item, tax_per_item },
            isAllowToEdit
        } = this.props;
        const { currency } = this.state;

        if (!isAllowToEdit) {
            return;
        }

        navigation.navigate(ROUTES.ESTIMATE_ITEM, {
            item,
            type: ITEM_EDIT,
            currency,
            discount_per_item,
            tax_per_item
        });
    };

    onDraft = handleSubmit => {
        const { navigation, isEditEstimate } = this.props;
        const { isLoading } = this.state;

        if (isLoading) {
            navigation.navigate(ROUTES.ESTIMATE_LIST);
            return;
        }

        if (isEditEstimate) {
            navigation.navigate(ROUTES.ESTIMATE_LIST);
            return;
        }

        alertMe({
            title: t('estimates.alert.draftTitle'),
            showCancel: true,
            cancelText: t('alert.action.discard'),
            cancelPress: () => navigation.navigate(ROUTES.ESTIMATE_LIST),
            okText: t('alert.action.saveAsDraft'),
            okPress: handleSubmit(this.draftEstimate)
        });
    };

    onSubmitEstimate = (values, status = 'draft') => {
        const {
            createEstimate,
            navigation,
            type,
            editEstimate,
            initLoading,
            id,
            handleSubmit,
            withLoading,
            estimateData: { estimateTemplates = [] } = {}
        } = this.props;

        if (this.state.isLoading || initLoading || withLoading) {
            return;
        }

        if (finalAmount() < 0) {
            alert(t('estimates.alert.lessAmount'));
            return;
        }

        let estimate = {
            ...values,
            estimate_number: `${values.prefix}-${values.estimate_number}`,
            estimate_no: values.estimate_number,
            total: finalAmount(),
            sub_total: estimateSubTotal(),
            tax: estimateTax() + estimateCompoundTax(),
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
            estimate.estimateSend = true;
        }

        estimate.estimate_template_id = find(estimateTemplates, {
            name: estimate?.template_name
        })?.id;

        const params = {
            estimate: {
                ...estimate,
                id,
                customFields: getApiFormattedCustomFields(values?.customFields)
            },
            navigation,
            onSuccess: url => {
                if (status === 'download') {
                    Linking.openURL(url);
                    return;
                }
                navigation.navigate(ROUTES.ESTIMATE_LIST);
            },
            submissionError: errors =>
                handleSubmit(() => this.throwError(errors))()
        };

        type === ESTIMATE_ADD ? createEstimate(params) : editEstimate(params);
    };

    downloadEstimate = values => {
        this.onSubmitEstimate(values, ESTIMATE_ACTIONS.VIEW);
    };

    saveEstimate = values => {
        this.onSubmitEstimate(values, 'save');
    };

    draftEstimate = values => {
        this.onSubmitEstimate(values, 'draft');
    };

    throwError = errors => {
        if (errors?.estimate_number) {
            throw new SubmissionError({
                estimate_number: 'validation.alreadyTaken'
            });
        }

        alertMe({
            desc: t('validation.wrong')
        });
    };

    estimateItemTotalTaxes = () => {
        const { estimateItems } = this.props;
        let taxes = [];

        if (!isArray(estimateItems)) {
            return [];
        }

        estimateItems.map(val => {
            val.taxes &&
                val.taxes.filter(tax => {
                    let hasSame = false;
                    const { tax_type_id, id, amount } = tax;

                    taxes = taxes.map(tax2 => {
                        if ((tax_type_id || id) === tax2.tax_type_id) {
                            hasSame = true;
                            return {
                                ...tax2,
                                amount: amount + tax2.amount,
                                tax_type_id: tax2.tax_type_id
                            };
                        }
                        return tax2;
                    });

                    if (!hasSame) {
                        taxes.push({ ...tax, tax_type_id: tax_type_id || id });
                    }
                });
        });
        return taxes;
    };

    navigateToCustomer = () => {
        const { navigation } = this.props;
        const { currency } = this.state;

        navigation.navigate(ROUTES.CUSTOMER, {
            type: CUSTOMER_ADD,
            currency,
            onSelect: item => {
                this.customerReference?.changeDisplayValue?.(item);
                this.setFormField('customer_id', item.id);
                this.setState({ currency: item.currency });
            }
        });
    };

    getEstimateItemList = estimateItems => {
        this.setFormField('items', estimateItems);

        const { currency } = this.state;

        if (!isArray(estimateItems)) {
            return [];
        }

        return estimateItems.map(item => {
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

    removeEstimate = () => {
        const { removeEstimate, navigation, id } = this.props;

        alertMe({
            title: t('alert.title'),
            desc: t('estimates.alert.removeDescription'),
            showCancel: true,
            okPress: () =>
                removeEstimate({
                    id,
                    onResult: res => {
                        if (res?.success) {
                            navigation.navigate(ROUTES.ESTIMATE_LIST);
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
        const {
            navigation,
            convertToInvoice,
            handleSubmit,
            changeEstimateStatus,
            id
        } = this.props;

        switch (action) {
            case ESTIMATE_ACTIONS.VIEW:
                handleSubmit(val => this.onSubmitEstimate(val, action))();
                break;

            case ESTIMATE_ACTIONS.SEND:
                this.sendMailRef?.onToggle();
                break;

            case ESTIMATE_ACTIONS.MARK_AS_SENT:
                alertMe({
                    title: t('alert.title'),
                    desc: t('estimates.alert.markAsSent'),
                    showCancel: true,
                    okPress: () =>
                        changeEstimateStatus?.({
                            id,
                            action: `${id}/status`,
                            navigation,
                            params: {
                                status: MARK_AS_SENT
                            }
                        })
                });
                break;

            case ESTIMATE_ACTIONS.MARK_AS_ACCEPTED:
                alertMe({
                    title: t('alert.title'),
                    desc: t('estimates.alert.markAsAccept'),
                    showCancel: true,
                    okPress: () =>
                        changeEstimateStatus?.({
                            id,
                            action: `${id}/status`,
                            navigation,
                            params: {
                                status: MARK_AS_ACCEPT
                            }
                        })
                });
                break;

            case ESTIMATE_ACTIONS.MARK_AS_REJECTED:
                alertMe({
                    title: t('alert.title'),
                    desc: t('estimates.alert.markAsReject'),
                    showCancel: true,
                    okPress: () =>
                        changeEstimateStatus?.({
                            id,
                            action: `${id}/status`,
                            navigation,
                            params: {
                                status: MARK_AS_REJECT
                            }
                        })
                });
                break;

            case ESTIMATE_ACTIONS.CONVERT_TO_INVOICE:
                alertMe({
                    desc: t('estimates.alert.convertToInvoiceDescription'),
                    showCancel: true,
                    okPress: () =>
                        convertToInvoice({
                            id,
                            onResult: () => {
                                navigation.navigate(ROUTES.MAIN_INVOICES);
                            }
                        })
                });
                break;

            case ESTIMATE_ACTIONS.DELETE:
                this.removeEstimate();
                break;

            default:
                break;
        }
    };

    sendEmail = params => {
        const { navigation, changeEstimateStatus, id } = this.props;

        changeEstimateStatus?.({
            id,
            action: `${id}/send`,
            navigation,
            params,
            onResult: () => EstimateServices.toggleIsEmailSent(true)
        });
    };

    sendMailComponent = () => {
        return (
            <SendMail
                mailReference={ref => (this.sendMailRef = ref)}
                headerTitle={'header.sendMailEstimate'}
                alertDesc={'estimates.alert.sendEstimate'}
                user={this.props?.formValues?.customer}
                subject="New Estimate"
                body="estimate_mail_body"
                onSendMail={params => this.sendEmail(params)}
            />
        );
    };

    render() {
        const {
            navigation,
            handleSubmit,
            estimateData: {
                estimateTemplates,
                discount_per_item,
                tax_per_item
            } = {},
            estimateItems,
            getItems,
            itemsLoading,
            items,
            initLoading,
            withLoading,
            getCustomers,
            customers,
            formValues,
            customFields,
            isEditEstimate,
            isAllowToEdit,
            isAllowToDelete,
            loading,
            theme
        } = this.props;

        const { currency, customerName, markAsStatus, isLoading } = this.state;
        const disabled = !isAllowToEdit;

        const hasCustomField = isEditEstimate
            ? formValues && formValues.hasOwnProperty('fields')
            : isArray(customFields);

        let hasCompleteStatus = markAsStatus === 'COMPLETED';

        let hasMark =
            markAsStatus === MARK_AS_ACCEPT ||
            markAsStatus === MARK_AS_REJECT ||
            markAsStatus === MARK_AS_SENT;

        let drownDownProps =
            isEditEstimate && !initLoading
                ? {
                      options: EDIT_ESTIMATE_ACTIONS(
                          markAsStatus,
                          isAllowToDelete
                      ),
                      onSelect: this.onOptionSelect,
                      cancelButtonIndex: 6,
                      destructiveButtonIndex: 5,
                      ...(hasMark && {
                          cancelButtonIndex: 5,
                          destructiveButtonIndex: 4
                      }),
                      ...(!isAllowToDelete &&
                          !hasMark && {
                              cancelButtonIndex: 5,
                              destructiveButtonIndex: 6
                          }),
                      ...(!isAllowToDelete &&
                          hasMark && {
                              cancelButtonIndex: 4,
                              destructiveButtonIndex: 5
                          })
                  }
                : null;

        const getTitle = () => {
            let title = 'header.addEstimate';
            if (isEditEstimate && !isAllowToEdit) title = 'header.viewEstimate';
            if (isEditEstimate && isAllowToEdit) title = 'header.editEstimate';

            return t(title);
        };

        this.estimateRefs(this);

        const bottomAction = [
            {
                label: 'button.viewPdf',
                onPress: handleSubmit(this.downloadEstimate),
                type: 'btn-outline',
                show: isAllowToEdit,
                loading: loading || isLoading
            },
            {
                label: 'button.save',
                onPress: handleSubmit(this.saveEstimate),
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
                    withTitleStyle: headerTitle({
                        marginLeft: -15,
                        marginRight: -15
                    }),
                    ...(!isEditEstimate && {
                        rightIcon: 'save',
                        rightIconProps: { solid: true },
                        rightIconPress: handleSubmit(this.saveEstimate)
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
                {isEditEstimate &&
                    !hasCompleteStatus &&
                    this.sendMailComponent()}

                <CtView flex={1} flex-row>
                    <CtView flex={1} justify-between>
                        <Field
                            name={'estimate_date'}
                            isRequired
                            component={DatePickerField}
                            label={t('estimates.estimateDate')}
                            icon={'calendar-alt'}
                            onChangeCallback={val =>
                                this.setFormField('estimate_date', val)
                            }
                            disabled={disabled}
                        />
                    </CtView>
                    <CtView flex={0.07} />
                    <CtView flex={1} justify-between>
                        <Field
                            name="expiry_date"
                            isRequired
                            component={DatePickerField}
                            label={t('estimates.expiryDate')}
                            icon={'calendar-alt'}
                            onChangeCallback={val =>
                                this.setFormField('expiry_date', val)
                            }
                            disabled={disabled}
                        />
                    </CtView>
                </CtView>

                <Field
                    name="estimate_number"
                    component={FakeInput}
                    label={t('estimates.estimateNumber')}
                    isRequired
                    prefixProps={{
                        prefix: formValues?.prefix,
                        fieldName: 'estimate_number',
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
                    label={t('estimates.customer')}
                    icon={'user'}
                    placeholder={
                        customerName
                            ? customerName
                            : t('estimates.customerPlaceholder')
                    }
                    navigation={navigation}
                    compareField="id"
                    onSelect={item => {
                        this.setFormField('customer_id', item.id);
                        this.setState({ currency: item.currency });
                    }}
                    rightIconPress={this.navigateToCustomer}
                    createActionRouteName={ROUTES.CUSTOMER}
                    headerProps={{
                        title: t('customers.title')
                    }}
                    listViewProps={{
                        hasAvatar: true
                    }}
                    emptyContentProps={{
                        contentType: 'customers',
                        image: IMAGES.EMPTY_CUSTOMERS
                    }}
                    reference={ref => (this.customerReference = ref)}
                    isEditable={!disabled}
                    fakeInputProps={{ disabled }}
                />

                <Label isRequired theme={theme} style={styles.label}>
                    {t('estimates.items')}
                </Label>

                <ListView
                    items={this.getEstimateItemList(estimateItems)}
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
                    placeholder={t('estimates.addItem')}
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
                    onSelect={item => {
                        navigation.navigate(ROUTES.ESTIMATE_ITEM, {
                            item,
                            currency,
                            type: ITEM_ADD,
                            discount_per_item,
                            tax_per_item
                        });
                    }}
                    rightIconPress={() =>
                        navigation.navigate(ROUTES.ESTIMATE_ITEM, {
                            type: ITEM_ADD,
                            currency,
                            discount_per_item,
                            tax_per_item
                        })
                    }
                    createActionRouteName={ROUTES.GLOBAL_ITEM}
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
                    isEditEstimate={isEditEstimate}
                    setFormField={this.setFormField}
                />

                <Field
                    name="template_name"
                    templates={estimateTemplates}
                    component={TemplateField}
                    label={t('estimates.template')}
                    icon={'file-alt'}
                    placeholder={t('estimates.templatePlaceholder')}
                    navigation={navigation}
                    disabled={disabled}
                />

                {hasCustomField && <CustomField {...this.props} type={null} />}
            </DefaultLayout>
        );
    }
}
