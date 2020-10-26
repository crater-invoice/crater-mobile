// @flow
import React, { Fragment } from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { change } from 'redux-form';
import { Field } from 'redux-form';
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
    TermsAndCondition
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
    getItemList
} from '../EstimateCalculation';
import FinalAmount from '../FinalAmount';
import { alertMe, BUTTON_TYPE, MAX_LENGTH } from '@/constants';

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
    locale: String,
    type: String
};

const termsCondition = {
    description: 'terms_and_conditions',
    toggle: 'display_terms_and_conditions'
};
export class Estimate extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.estimateRefs = setEstimateRefs.bind(this);

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
            getCreateEstimate,
            navigation,
            estimateItems,
            taxTypes,
            getEditEstimate,
            type,
            getNextNumber
        } = this.props;

        getNextNumber({
            key: 'invoice',
            onSuccess: () => {}
        })
        return;

        type === ESTIMATE_EDIT
            ? getEditEstimate({
                  id: navigation.getParam('id'),
                  onResult: ({ user: { currency, name }, status }) => {
                      this.setState({
                          currency,
                          taxTypeList: taxTypes,
                          customerName: name,
                          markAsStatus: status
                      });
                  }
              })
            : getCreateEstimate({
                  onResult: val => {
                      const { currency } = val;

                      this.setState({ taxTypeList: taxTypes, currency });
                  }
              });

        this.getEstimateItemList(estimateItems);

        this.androidBackHandler();
    }

    componentWillUnmount() {
        const { clearEstimate } = this.props;
        clearEstimate();
        this.estimateRefs(undefined);
        goBack(UNMOUNT);
    }

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
            okPress: handleSubmit(this.onSubmitEstimate)
        });
    };

    onSubmitEstimate = (values, status = 'draft') => {
        const {
            createEstimate,
            navigation,
            type,
            editEstimate,
            locale,
            estimateData: { estimate_prefix = '' } = {}
        } = this.props;

        if (finalAmount() < 0) {
            alert(Lng.t('estimates.alert.lessAmount', { locale }));
            return;
        }

        let estimate = {
            ...values,
            estimate_number: `${estimate_prefix}-${values.estimate_number}`,
            total: finalAmount(),
            sub_total: estimateSubTotal(),
            tax: estimateTax() + this.estimateCompoundTax(),
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

        type === ESTIMATE_ADD
            ? createEstimate({
                  estimate,
                  onResult: url => {
                      if (status === 'download') {
                          Linking.openURL(url);
                      }
                      navigation.navigate(ROUTES.ESTIMATE_LIST);
                  }
              })
            : editEstimate({
                  estimate: { ...estimate, id: navigation.getParam('id') },
                  onResult: url => {
                      if (status === 'download') {
                          Linking.openURL(url);
                      }
                      navigation.navigate(ROUTES.ESTIMATE_LIST);
                  }
              });
    };

    estimateItemTotalTaxes = () => {
        const { estimateItems } = this.props;
        let taxes = [];
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

        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={() => this.onOptionSelect(ESTIMATE_ACTIONS.VIEW)}
                    btnTitle={Lng.t('button.viewPdf', { locale })}
                    type={BUTTON_TYPE.OUTLINE}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                    loading={loading}
                />

                <CtButton
                    onPress={handleSubmit(val =>
                        this.onSubmitEstimate(val, (status = 'save'))
                    )}
                    btnTitle={Lng.t('button.save', { locale })}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                    loading={loading}
                />
            </View>
        );
    };

    getEstimateItemList = estimateItems => {
        this.setFormField('items', estimateItems);

        const { currency } = this.state;

        let estimateItemList = [];

        if (typeof estimateItems !== 'undefined' && estimateItems.length != 0) {
            estimateItemList = estimateItems.map(item => {
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

        return estimateItemList;
    };

    onOptionSelect = action => {
        const {
            removeEstimate,
            navigation,
            locale,
            convertToInvoice,
            handleSubmit,
            changeEstimateStatus,
            type
        } = this.props;

        switch (action) {
            case ESTIMATE_ACTIONS.VIEW:
                handleSubmit(val => this.onSubmitEstimate(val, action))();
                break;

            case ESTIMATE_ACTIONS.SEND:
                changeEstimateStatus({
                    id: navigation.getParam('id'),
                    action: 'send',
                    navigation
                });

                break;

            case ESTIMATE_ACTIONS.MARK_AS_SENT:
                changeEstimateStatus &&
                    changeEstimateStatus({
                        id: navigation.getParam('id'),
                        action: 'mark-as-sent',
                        navigation
                    });
                break;

            case ESTIMATE_ACTIONS.MARK_AS_ACCEPTED:
                changeEstimateStatus &&
                    changeEstimateStatus({
                        id: navigation.getParam('id'),
                        action: 'accept',
                        navigation
                    });
                break;

            case ESTIMATE_ACTIONS.MARK_AS_REJECTED:
                changeEstimateStatus &&
                    changeEstimateStatus({
                        id: navigation.getParam('id'),
                        action: 'reject',
                        navigation
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
                            id: navigation.getParam('id'),
                            onResult: () => {
                                navigation.navigate(ROUTES.MAIN_INVOICES);
                            }
                        })
                });
                break;

            case ESTIMATE_ACTIONS.DELETE:
                alertMe({
                    title: Lng.t('alert.title', { locale }),
                    desc: Lng.t('estimates.alert.removeDescription', {
                        locale
                    }),
                    showCancel: true,
                    okPress: () =>
                        removeEstimate({
                            id: navigation.getParam('id'),
                            onResult: () => {
                                navigation.navigate(ROUTES.ESTIMATE_LIST);
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
            loading,
            estimateData: {
                estimateTemplates,
                discount_per_item,
                tax_per_item,
                estimate_prefix
            } = {},
            estimateItems,
            getItems,
            itemsLoading,
            items,
            locale,
            initLoading,
            type,
            getCustomers,
            customers
        } = this.props;

        const { currency, customerName, markAsStatus } = this.state;

        const isEditEstimate = type === ESTIMATE_EDIT;

        const estimateRefs = {};

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
                    rightIconPress: handleSubmit(val =>
                        this.onSubmitEstimate(val, (status = 'save'))
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
                            fieldName: 'estimate_number',
                            prefix: estimate_prefix,
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
                    />

                    <Text style={[styles.inputTextStyle, styles.label]}>
                        {Lng.t('estimates.items', { locale })}
                        <Text style={styles.required}> *</Text>
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
                        hint={Lng.t('estimates.notes', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            placeholder: Lng.t('estimates.notePlaceholder', {
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

                    {this.TOGGLE_TERMS_CONDITION_VIEW()}
                </View>
            </DefaultLayout>
        );
    }
}
