// @flow

import React from 'react';
import { View } from 'react-native';
import { find } from 'lodash';
import styles from './styles';
import { Field, change, SubmissionError } from 'redux-form';
import {
    InputField,
    DefaultLayout,
    SelectField,
    CustomField,
    ActionButton
} from '@/components';
import {
    CUSTOMER_FORM,
    CUSTOMER_ADD,
    CUSTOMER_ACTIONS,
    ACTIONS_VALUE,
    CUSTOMER_FIELDS as FIELDS
} from '../../constants';
import AddressContainer from '../../containers/Address';
import { alertMe, hasObjectLength, KEYBOARD_TYPE, isArray } from '@/constants';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import Lng from '@/lang/i18n';
import { colors } from '@/styles/colors';
import { SymbolStyle } from '@/components/CurrencyFormat/styles';
import { getApiFormattedCustomFields } from '@/utils';

interface IProps {
    navigation: Object;
    type: String;
    getCustomerDetail: Function;
    createCustomer: Function;
    updateCustomer: Function;
    handleSubmit: Function;
    customFields: any;
    loading: Boolean;
    locale: String;
    formValues: Object;
}

let customerRefs = {};

export class Customer extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {
        this.setInitialValues();
        goBack(MOUNT, this.props.navigation);
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    setInitialValues = () => {
        const {
            getCustomerDetail,
            type,
            countries,
            currency,
            currencies,
            getCreateCustomer,
            isEditScreen,
            id
        } = this.props;

        if (type === CUSTOMER_ADD) {
            getCreateCustomer({
                currencies,
                countries,
                onSuccess: () => {
                    this.setFormField(
                        `customer.${FIELDS.CURRENCY}`,
                        currency?.id
                    );
                    this.setState({ isLoading: false });
                }
            });
            return;
        }

        if (isEditScreen) {
            getCustomerDetail({
                id,
                currencies,
                countries,
                onSuccess: customer => {
                    const values = {
                        ...customer,
                        [FIELDS.BILLING]: customer?.billing_address ?? [],
                        [FIELDS.SHIPPING]: customer?.shipping_address ?? []
                    };
                    this.setFormField('customer', values);
                    this.setState({ isLoading: false });
                }
            });
            return;
        }
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(CUSTOMER_FORM, field, value));
    };

    throwError = errors => {
        let error = {};

        errors.email && (error.email = 'validation.alreadyTaken');
        errors.phone && (error.phone = 'validation.alreadyTaken');

        throw new SubmissionError({
            customer: { ...error }
        });
    };

    onSubmit = values => {
        const params = {
            ...values?.customer,
            customFields: getApiFormattedCustomFields(values?.customFields)
        };

        const {
            type,
            createCustomer,
            updateCustomer,
            navigation,
            handleSubmit,
            isEditScreen
        } = this.props;

        if (this.state.isLoading) {
            return;
        }

        if (type === CUSTOMER_ADD) {
            createCustomer({
                params,
                onResult: res => {
                    const onSelect = navigation.getParam('onSelect', null);
                    onSelect?.(res);
                    navigation.goBack(null);
                },
                submissionError: errors =>
                    handleSubmit(() => this.throwError(errors))()
            });
            return;
        }

        if (isEditScreen) {
            updateCustomer({
                params,
                navigation,
                submissionError: errors =>
                    handleSubmit(() => this.throwError(errors))()
            });
            return;
        }
    };

    removeCustomer = () => {
        const { removeCustomer, navigation, locale } = this.props;

        alertMe({
            title: Lng.t('alert.title', { locale }),
            desc: Lng.t('customers.alertDescription', { locale }),
            showCancel: true,
            okPress: () =>
                removeCustomer({
                    id: navigation.getParam('customerId', null),
                    navigation
                })
        });
    };

    onOptionSelect = action => {
        if (action == ACTIONS_VALUE.REMOVE) this.removeCustomer();
    };

    getSelectedCurrencySymbol = () => {
        const { formValues, currencies } = this.props;

        if (!isArray(currencies) || !formValues?.customer?.currency_id) {
            return null;
        }

        const currency = find(currencies, {
            fullItem: { id: Number(formValues?.customer?.currency_id) }
        });

        return currency?.fullItem?.symbol;
    };

    render() {
        const {
            navigation,
            handleSubmit,
            locale,
            theme,
            type,
            currencies,
            customFields,
            isAllowToEdit,
            isAllowToDelete,
            isEditScreen,
            formValues,
            loading
        } = this.props;

        const billingAddress = formValues?.customer?.[FIELDS.BILLING];
        const shippingAddress = formValues?.customer?.[FIELDS.SHIPPING];

        const { isLoading } = this.state;

        const hasCustomField = isEditScreen
            ? formValues?.customer &&
              formValues.customer.hasOwnProperty('fields')
            : isArray(customFields);

        const drownDownProps =
            isEditScreen && !isLoading && isAllowToDelete
                ? {
                      options: CUSTOMER_ACTIONS(Lng, locale),
                      onSelect: this.onOptionSelect,
                      cancelButtonIndex: 1,
                      destructiveButtonIndex: 2
                  }
                : null;

        const disabled = !isAllowToEdit;

        const getTitle = () => {
            let title = 'header.addCustomer';
            if (isEditScreen && !isAllowToEdit) title = 'header.viewCustomer';
            if (isEditScreen && isAllowToEdit) title = 'header.editCustomer';

            return Lng.t(title, { locale });
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
                headerProps={{
                    leftIconPress: () => navigation.goBack(null),
                    title: getTitle(),
                    placement: 'center',
                    ...((!isEditScreen || !isAllowToDelete) && {
                        rightIcon: 'save',
                        rightIconProps: { solid: true },
                        rightIconPress: handleSubmit(this.onSubmit)
                    })
                }}
                bottomAction={
                    <ActionButton locale={locale} buttons={bottomAction} />
                }
                loadingProps={{ is: isLoading }}
                dropdownProps={drownDownProps}
            >
                <View style={styles.bodyContainer}>
                    <Field
                        name={`customer.${FIELDS.NAME}`}
                        component={InputField}
                        isRequired
                        hint={Lng.t('customers.displayName', { locale })}
                        inputFieldStyle={styles.inputFieldStyle}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            keyboardType: KEYBOARD_TYPE.DEFAULT,
                            onSubmitEditing: () =>
                                customerRefs.contactName.focus()
                        }}
                        validationStyle={styles.inputFieldValidation}
                        disabled={disabled}
                        withRef
                    />

                    <Field
                        name={`customer.${FIELDS.CONTACT_NAME}`}
                        component={InputField}
                        hint={Lng.t('customers.contactName', { locale })}
                        inputFieldStyle={styles.inputFieldStyle}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            keyboardType: KEYBOARD_TYPE.DEFAULT,
                            onSubmitEditing: () => customerRefs.email.focus()
                        }}
                        refLinkFn={ref => (customerRefs.contactName = ref)}
                        validationStyle={styles.inputFieldValidation}
                        disabled={disabled}
                        withRef
                    />

                    <Field
                        name={`customer.${FIELDS.EMAIL}`}
                        component={InputField}
                        hint={Lng.t('customers.email', { locale })}
                        inputFieldStyle={styles.inputFieldStyle}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            keyboardType: KEYBOARD_TYPE.EMAIL,
                            onSubmitEditing: () => customerRefs.phone.focus()
                        }}
                        refLinkFn={ref => (customerRefs.email = ref)}
                        validationStyle={styles.inputFieldValidation}
                        disabled={disabled}
                    />

                    <Field
                        name={`customer.${FIELDS.PHONE}`}
                        component={InputField}
                        hint={Lng.t('customers.phone', { locale })}
                        inputFieldStyle={styles.inputFieldStyle}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            keyboardType: KEYBOARD_TYPE.PHONE,
                            onSubmitEditing: () => customerRefs.website.focus()
                        }}
                        refLinkFn={ref => (customerRefs.phone = ref)}
                        validationStyle={styles.inputFieldValidation}
                        disabled={disabled}
                    />

                    <Field
                        name={`customer.${FIELDS.WEBSITE}`}
                        component={InputField}
                        hint={Lng.t('customers.website', { locale })}
                        inputFieldStyle={styles.inputFieldStyle}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            keyboardType: KEYBOARD_TYPE.URL
                        }}
                        refLinkFn={ref => (customerRefs.website = ref)}
                        validationStyle={styles.inputFieldValidation}
                        disabled={disabled}
                    />

                    <View style={styles.inputGroup}>
                        <Field
                            name={`customer.${FIELDS.CURRENCY}`}
                            items={currencies ?? []}
                            displayName="name"
                            component={SelectField}
                            isInternalSearch
                            placeholder={Lng.t('customers.currency', {
                                locale
                            })}
                            navigation={navigation}
                            searchFields={['name']}
                            compareField="id"
                            onSelect={val =>
                                this.setFormField(
                                    `customer.${FIELDS.CURRENCY}`,
                                    val.id
                                )
                            }
                            headerProps={{
                                title: Lng.t('currencies.title', { locale }),
                                rightIconPress: null
                            }}
                            listViewProps={{
                                contentContainerStyle: { flex: 5 },
                                rightTitleStyle: SymbolStyle
                            }}
                            emptyContentProps={{ contentType: 'currencies' }}
                            isEditable={!disabled}
                            fakeInputProps={{
                                disabled,
                                rightIcon: 'angle-right',
                                valueStyle: styles.selectedField,
                                placeholderStyle: styles.selectedField,
                                leftSymbol: this.getSelectedCurrencySymbol()
                            }}
                        />

                        <Field
                            name={`customer.${FIELDS.BILLING}`}
                            component={AddressContainer}
                            hasBillingAddress
                            addressValue={billingAddress}
                            icon="map-marker-alt"
                            rightIcon="angle-right"
                            placeholder={Lng.t('customers.billingAddress', {
                                locale
                            })}
                            navigation={navigation}
                            onChangeCallback={val =>
                                this.setFormField(
                                    `customer.${FIELDS.BILLING}`,
                                    val
                                )
                            }
                            containerStyle={styles.addressField}
                            type={type}
                            fakeInputProps={{
                                valueStyle: styles.selectedField,
                                placeholderStyle: styles.selectedField,
                                color: hasObjectLength(billingAddress)
                                    ? colors.primaryLight
                                    : null
                            }}
                            theme={theme}
                            mainContainerStyle={
                                theme?.mode === 'dark' && styles.line(theme)
                            }
                            disabled={disabled}
                        />

                        <Field
                            name={`customer.${FIELDS.SHIPPING}`}
                            component={AddressContainer}
                            addressValue={shippingAddress}
                            autoFillValue={billingAddress}
                            icon="map-marker-alt"
                            rightIcon="angle-right"
                            placeholder={Lng.t('customers.shippingAddress', {
                                locale
                            })}
                            navigation={navigation}
                            onChangeCallback={val =>
                                this.setFormField(
                                    `customer.${FIELDS.SHIPPING}`,
                                    val
                                )
                            }
                            containerStyle={styles.addressField}
                            type={type}
                            fakeInputProps={{
                                valueStyle: styles.selectedField,
                                placeholderStyle: styles.selectedField,
                                color: hasObjectLength(shippingAddress)
                                    ? colors.primaryLight
                                    : null
                            }}
                            theme={theme}
                            disabled={disabled}
                        />
                    </View>

                    {hasCustomField && (
                        <CustomField {...this.props} type="customer" />
                    )}
                </View>
            </DefaultLayout>
        );
    }
}
