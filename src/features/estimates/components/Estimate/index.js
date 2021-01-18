// @flow
import React from 'react';
import { View } from 'react-native';
import * as Linking from 'expo-linking';
import { Field, change, SubmissionError } from 'redux-form';
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
    SendMail,
    CustomField,
    Text
} from '@/components';
import {
    ESTIMATE_ADD,
    ESTIMATE_EDIT,
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
import Lng from '@/lang/i18n';
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
import { alertMe, BUTTON_TYPE, isArray } from '@/constants';
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
    locale: String,
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
        const { getCreateEstimate, getEditEstimate, type, id } = this.props;

        if (type === ESTIMATE_ADD) {
            getCreateEstimate({
                onSuccess: () => {
                    this.setState({ isLoading: false });
                }
            });
            return;
        }

        if (type === ESTIMATE_EDIT) {
            getEditEstimate({
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
        this.props.dispatch(change(ESTIMATE_FORM, field, value));
    };

    onEditItem = item => {
        const {
            navigation,
            estimateData: { discount_per_item, tax_per_item }
        } = this.props;
        const { currency } = this.state;

        navigation.navigate(ROUTES.ESTIMATE_ITEM, {
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
            navigation.navigate(ROUTES.ESTIMATE_LIST);
            return;
        }

        if (type === ESTIMATE_EDIT) {
            navigation.navigate(ROUTES.ESTIMATE_LIST);
            return;
        }

        alertMe({
            title: Lng.t('estimates.alert.draftTitle', { locale }),
            showCancel: true,
            cancelText: Lng.t('alert.action.discard', { locale }),
            cancelPress: () => navigation.navigate(ROUTES.ESTIMATE_LIST),
            okText: Lng.t('alert.action.saveAsDraft', { locale }),
            okPress: handleSubmit(this.draftEstimate)
        });
    };

    onSubmitEstimate = (values, status = 'draft') => {
        const {
            createEstimate,
            navigation,
            type,
            editEstimate,
            locale,
            initLoading,
            id,
            handleSubmit,
            withLoading
        } = this.props;

        if (this.state.isLoading || initLoading || withLoading) {
            return;
        }

        if (finalAmount() < 0) {
            alert(Lng.t('estimates.alert.lessAmount', { locale }));
            return;
        }

        let estimate = {
            ...values,
            estimate_number: `${values.prefix}-${values.estimate_number}`,
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
                handleSubmit(() => this.throwError(errors, locale))()
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

    throwError = (errors, locale) => {
        if (errors?.estimate_number) {
            throw new SubmissionError({
                estimate_number: 'validation.alreadyTaken'
            });
        }

        alertMe({
            desc: Lng.t('validation.wrong', { locale })
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

    BOTTOM_ACTION = () => {
        const { locale, loading, handleSubmit } = this.props;
        const { isLoading } = this.state;
        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(this.downloadEstimate)}
                    btnTitle={Lng.t('button.viewPdf', { locale })}
                    type={BUTTON_TYPE.OUTLINE}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                    loading={loading | isLoading}
                />

                <CtButton
                    onPress={handleSubmit(this.saveEstimate)}
                    btnTitle={Lng.t('button.save', { locale })}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                    loading={loading | isLoading}
                />
            </View>
        );
    };

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
    };

    removeEstimate = () => {
        const { removeEstimate, navigation, locale, id } = this.props;

        alertMe({
            title: Lng.t('alert.title', { locale }),
            desc: Lng.t('estimates.alert.removeDescription', {
                locale
            }),
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
                    title: Lng.t('alert.title', { locale }),
                    desc: Lng.t('estimates.alert.markAsSent', { locale }),
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
                    title: Lng.t('alert.title', { locale }),
                    desc: Lng.t('estimates.alert.markAsAccept', { locale }),
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
                    title: Lng.t('alert.title', { locale }),
                    desc: Lng.t('estimates.alert.markAsReject', { locale }),
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
                    desc: Lng.t('estimates.alert.convertToInvoiceDescription', {
                        locale
                    }),
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
            locale,
            initLoading,
            withLoading,
            type,
            getCustomers,
            customers,
            formValues,
            customFields
        } = this.props;

        const { currency, customerName, markAsStatus, isLoading } = this.state;

        const isEditEstimate = type === ESTIMATE_EDIT;

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
                      options: EDIT_ESTIMATE_ACTIONS(locale, markAsStatus),
                      onSelect: this.onOptionSelect,
                      cancelButtonIndex: hasMark ? 5 : 6,
                      destructiveButtonIndex: hasMark ? 4 : 5
                  }
                : null;

        this.estimateRefs(this);

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => this.onDraft(handleSubmit),
                    title: isEditEstimate
                        ? Lng.t('header.editEstimate', { locale })
                        : Lng.t('header.addEstimate', { locale }),
                    titleStyle: headerTitle({
                        marginLeft: -15,
                        marginRight: -15
                    }),
                    rightIcon: !isEditEstimate ? 'save' : null,
                    rightIconPress: handleSubmit(this.saveEstimate),
                    rightIconProps: {
                        solid: true
                    },
                    placement: 'center'
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
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
                    {isEditEstimate &&
                        !hasCompleteStatus &&
                        this.sendMailComponent()}

                    <View style={styles.dateFieldContainer}>
                        <View style={styles.dateField}>
                            <Field
                                name={'estimate_date'}
                                isRequired
                                component={DatePickerField}
                                label={Lng.t('estimates.estimateDate', {
                                    locale
                                })}
                                icon={'calendar-alt'}
                                onChangeCallback={val =>
                                    this.setFormField('estimate_date', val)
                                }
                            />
                        </View>
                        <View style={styles.dateField}>
                            <Field
                                name="expiry_date"
                                isRequired
                                component={DatePickerField}
                                label={Lng.t('estimates.expiryDate', {
                                    locale
                                })}
                                icon={'calendar-alt'}
                                onChangeCallback={val =>
                                    this.setFormField('expiry_date', val)
                                }
                            />
                        </View>
                    </View>

                    <Field
                        name="estimate_number"
                        component={FakeInput}
                        label={Lng.t('estimates.estimateNumber', { locale })}
                        isRequired
                        prefixProps={{
                            prefix: formValues?.prefix,
                            fieldName: 'estimate_number',
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
                        label={Lng.t('estimates.customer', { locale })}
                        icon={'user'}
                        placeholder={
                            customerName
                                ? customerName
                                : Lng.t('estimates.customerPlaceholder', {
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
                        listViewProps={{
                            hasAvatar: true
                        }}
                        emptyContentProps={{
                            contentType: 'customers',
                            image: IMAGES.EMPTY_CUSTOMERS
                        }}
                        reference={ref => (this.customerReference = ref)}
                    />

                    <Text dark3 medium h5 style={styles.label}>
                        {Lng.t('estimates.items', { locale })}
                        <Text danger> *</Text>
                    </Text>

                    <ListView
                        items={this.getEstimateItemList(estimateItems)}
                        itemContainer={styles.itemContainer}
                        leftTitleStyle={styles.itemLeftTitle}
                        leftSubTitleLabelStyle={[
                            styles.itemLeftSubTitle,
                            styles.itemLeftSubTitleLabel
                        ]}
                        leftSubTitleStyle={styles.itemLeftSubTitle}
                        rightTitleStyle={styles.itemRightTitle}
                        backgroundColor={colors.white}
                        parentViewStyle={{ marginVertical: 4 }}
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
                        placeholder={Lng.t('estimates.addItem', { locale })}
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
                        isEditEstimate={isEditEstimate}
                        setFormField={this.setFormField}
                    />

                    <Field
                        name="estimate_template_id"
                        templates={estimateTemplates}
                        component={TemplateField}
                        label={Lng.t('estimates.template', { locale })}
                        icon={'file-alt'}
                        placeholder={Lng.t('estimates.templatePlaceholder', {
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
