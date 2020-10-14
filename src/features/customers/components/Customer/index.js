// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Field, change, SubmissionError } from 'redux-form';
import {
    InputField,
    CtButton,
    DefaultLayout,
    SelectField,
    CustomField
} from '@/components';
import {
    CUSTOMER_FORM,
    CUSTOMER_EDIT,
    CUSTOMER_ADD,
    CUSTOMER_ACTIONS,
    ACTIONS_VALUE
} from '../../constants';
import AddressContainer from '../../containers/Address';
import {
    alertMe,
    hasObjectLength,
    hasValue,
    isBooleanTrue,
    hasLength,
    KEYBOARD_TYPE,
    hasFieldValue
} from '@/api/global';
import { goBack, MOUNT, UNMOUNT } from '@/navigation/actions';
import Lng from '@/api/lang/i18n';
import { colors } from '@/styles/colors';
import { SymbolStyle } from '@/components/CurrencyFormat/styles';
import { headerTitle } from '@/api/helper';
import {
    CUSTOM_FIELD_TYPES,
    CUSTOM_FIELD_DATA_TYPES
} from '@/features/settings/constants';

const customerField = [
    'name',
    'contact_name',
    'email',
    'phone',
    'website',
    'enable_portal',
    'fields'
];

type IProps = {
    navigation: Object,
    type: String,
    getEditCustomer: Function,
    createCustomer: Function,
    editCustomer: Function,
    handleSubmit: Function,
    getCustomFields: Function,
    resetCustomFields: Function,
    customFields: any,
    customerLoading: Boolean,
    getEditCustomerLoading: Boolean,
    language: String,
    formValues: Object
};

let customerRefs = {};

export class Customer extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            selectedCurrency: '',
            portal: false
        };
    }

    componentDidMount() {
        const {
            navigation,
            getEditCustomer,
            type,
            getCountries,
            countries,
            currency,
            getCustomFields
        } = this.props;

        // Country
        let hasCountryApiCalled = !hasValue(countries) || !hasLength(countries);
        hasCountryApiCalled && getCountries();

        if (type === CUSTOMER_EDIT) {
            let id = navigation.getParam('customerId');

            getEditCustomer({
                id,
                onResult: customer => {
                    // let { currency_id, enable_portal } = customer
                    let { currency_id } = customer;

                    customerField.map(field => {
                        this.setFormField(field, customer[field]);
                    });

                    this.setFormField(
                        'billingAddress',
                        customer.billing_address ? customer.billing_address : []
                    );
                    this.setFormField(
                        'shippingAddress',
                        customer.shipping_address
                            ? customer.shipping_address
                            : []
                    );

                    if (currency_id) {
                        let { name, code } = customer.currency;
                        this.setFormField(
                            'currency_id',
                            customer.currency ? customer.currency.id : null
                        );
                        this.setState({ selectedCurrency: `${name}` });
                    }

                    getCustomFields({ type: CUSTOM_FIELD_TYPES.CUSTOMER });
                    // this.setState({ portal: enable_portal === 1 ? true : false })
                }
            });
        } else {
            if (hasValue(currency)) {
                const { name, id } = currency;
                this.setFormField('currency_id', id);
                this.setState({ selectedCurrency: name });
            }
            getCustomFields({ type: CUSTOM_FIELD_TYPES.CUSTOMER });
        }

        goBack(MOUNT, navigation);
    }

    componentWillUnmount() {
        const { resetCustomFields } = this.props;

        goBack(UNMOUNT);
        resetCustomFields?.();
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(CUSTOMER_FORM, field, value));
    };

    onTogglePortal = status => {
        this.setFormField('enable_portal', status);
        this.setState({ portal: status });
        !status && this.setFormField('password', '');
    };

    checkHasCustomFieldsRequired = (values, customFields) => {
        let isRequired = false;

        if (
            hasFieldValue(customFields) &&
            hasFieldValue(values?.customFields)
        ) {
            for (const { required, type, value } of values?.customFields) {
                if (
                    required &&
                    type !== CUSTOM_FIELD_DATA_TYPES.SWITCH &&
                    !value
                ) {
                    isRequired = true;
                    break;
                }
            }
        }

        return isRequired;
    };

    throwError = () => {
        throw new SubmissionError({ customFields: 'validation.required' });
    };

    onCustomerSubmit = values => {
        const {
            type,
            createCustomer,
            editCustomer,
            navigation,
            customFields
        } = this.props;

        const hasCustomFieldRequired = this.checkHasCustomFieldsRequired(
            values,
            customFields
        );

        if (hasCustomFieldRequired) {
            this.throwError();
            return;
        }

        type === CUSTOMER_ADD
            ? createCustomer({
                  params: values,
                  onResult: res => {
                      const onSelect = navigation.getParam('onSelect', null);
                      onSelect?.(res);
                      navigation.goBack(null);
                  }
              })
            : editCustomer({ params: values, navigation });
    };

    removeCustomer = () => {
        const { removeCustomer, navigation, language } = this.props;

        alertMe({
            title: Lng.t('alert.title', { locale: language }),
            desc: Lng.t('customers.alertDescription', { locale: language }),
            showCancel: true,
            okPress: () =>
                removeCustomer({
                    id: navigation.getParam('customerId', null),
                    navigation
                })
        });
    };

    BOTTOM_ACTION = handleSubmit => {
        const { customerLoading, language } = this.props;

        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(this.onCustomerSubmit)}
                    btnTitle={Lng.t('button.save', { locale: language })}
                    loading={customerLoading}
                />
            </View>
        );
    };

    onOptionSelect = action => {
        if (action == ACTIONS_VALUE.REMOVE) this.removeCustomer();
    };

    render() {
        const {
            navigation,
            handleSubmit,
            formValues: {
                billingAddress,
                shippingAddress,
                enable_portal,
                currency_id,
                fields
            },
            language,
            getEditCustomerLoading,
            countriesLoading,
            type,
            currencies,
            customFields
        } = this.props;

        const { selectedCurrency, portal } = this.state;
        let drownDownProps =
            type === CUSTOMER_EDIT
                ? {
                      options: CUSTOMER_ACTIONS(Lng, language),
                      onSelect: this.onOptionSelect,
                      cancelButtonIndex: 1,
                      destructiveButtonIndex: 2
                  }
                : null;

        return (
            <DefaultLayout
                headerProps={{
                    leftIcon: 'long-arrow-alt-left',
                    leftIconStyle: styles.leftIcon,
                    leftIconPress: () => navigation.goBack(null),
                    title:
                        type === CUSTOMER_EDIT
                            ? Lng.t('header.editCustomer', { locale: language })
                            : Lng.t('header.addCustomer', { locale: language }),
                    titleStyle: styles.headerTitle,
                    placement: 'center',
                    rightIcon: type !== CUSTOMER_EDIT ? 'save' : null,
                    rightIconProps: {
                        solid: true
                    },
                    rightIconPress: handleSubmit(this.onCustomerSubmit)
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{
                    is: getEditCustomerLoading || countriesLoading
                }}
                dropdownProps={drownDownProps}
            >
                <View style={styles.bodyContainer}>
                    <Field
                        name="name"
                        component={InputField}
                        isRequired
                        hint={Lng.t('customers.displayName', {
                            locale: language
                        })}
                        inputFieldStyle={styles.inputFieldStyle}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            autoFocus: true,
                            keyboardType: KEYBOARD_TYPE.DEFAULT,
                            onSubmitEditing: () =>
                                customerRefs.contactName.focus()
                        }}
                        validationStyle={styles.inputFieldValidation}
                        withRef
                    />

                    <Field
                        name="contact_name"
                        component={InputField}
                        hint={Lng.t('customers.contactName', {
                            locale: language
                        })}
                        inputFieldStyle={styles.inputFieldStyle}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            keyboardType: KEYBOARD_TYPE.DEFAULT,
                            onSubmitEditing: () => customerRefs.email.focus()
                        }}
                        refLinkFn={ref => (customerRefs.contactName = ref)}
                        validationStyle={styles.inputFieldValidation}
                        withRef
                    />

                    <Field
                        name="email"
                        component={InputField}
                        hint={Lng.t('customers.email', { locale: language })}
                        inputFieldStyle={styles.inputFieldStyle}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            keyboardType: KEYBOARD_TYPE.EMAIL,
                            onSubmitEditing: () => customerRefs.phone.focus()
                        }}
                        refLinkFn={ref => {
                            customerRefs.email = ref;
                        }}
                        validationStyle={styles.inputFieldValidation}
                    />

                    <Field
                        name="phone"
                        component={InputField}
                        hint={Lng.t('customers.phone', { locale: language })}
                        inputFieldStyle={styles.inputFieldStyle}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            keyboardType: KEYBOARD_TYPE.PHONE,
                            onSubmitEditing: () => customerRefs.website.focus()
                        }}
                        refLinkFn={ref => {
                            customerRefs.phone = ref;
                        }}
                        validationStyle={styles.inputFieldValidation}
                    />

                    <Field
                        name="website"
                        component={InputField}
                        hint={Lng.t('customers.website', { locale: language })}
                        inputFieldStyle={styles.inputFieldStyle}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            keyboardType: KEYBOARD_TYPE.URL
                        }}
                        refLinkFn={ref => (customerRefs.website = ref)}
                        validationStyle={styles.inputFieldValidation}
                    />

                    <View style={styles.inputGroup}>
                        <Field
                            name="currency_id"
                            items={currencies ?? []}
                            displayName="name"
                            component={SelectField}
                            icon="dollar-sign"
                            rightIcon="angle-right"
                            placeholder={
                                selectedCurrency
                                    ? selectedCurrency
                                    : Lng.t('customers.currency', {
                                          locale: language
                                      })
                            }
                            navigation={navigation}
                            searchFields={['name']}
                            compareField="id"
                            onSelect={val =>
                                this.setFormField('currency_id', val.id)
                            }
                            headerProps={{
                                title: Lng.t('currencies.title', {
                                    locale: language
                                }),
                                titleStyle: headerTitle({
                                    marginLeft: -30,
                                    marginRight: -65
                                }),
                                rightIconPress: null
                            }}
                            listViewProps={{
                                contentContainerStyle: { flex: 5 },
                                rightTitleStyle: SymbolStyle
                            }}
                            emptyContentProps={{
                                contentType: 'currencies'
                            }}
                        />

                        <Field
                            name="billingAddress"
                            component={AddressContainer}
                            hasBillingAddress
                            addressValue={billingAddress}
                            icon="map-marker-alt"
                            rightIcon="angle-right"
                            placeholder={Lng.t('customers.billingAddress', {
                                locale: language
                            })}
                            navigation={navigation}
                            onChangeCallback={val =>
                                this.setFormField('billingAddress', val)
                            }
                            containerStyle={styles.addressField}
                            type={type}
                            fakeInputProps={{
                                color: hasObjectLength(billingAddress)
                                    ? colors.primaryLight
                                    : null
                            }}
                        />

                        <Field
                            name="shippingAddress"
                            component={AddressContainer}
                            addressValue={shippingAddress}
                            autoFillValue={billingAddress}
                            icon="map-marker-alt"
                            rightIcon="angle-right"
                            placeholder={Lng.t('customers.shippingAddress', {
                                locale: language
                            })}
                            navigation={navigation}
                            onChangeCallback={val =>
                                this.setFormField('shippingAddress', val)
                            }
                            containerStyle={styles.addressField}
                            type={type}
                            fakeInputProps={{
                                color: hasObjectLength(shippingAddress)
                                    ? colors.primaryLight
                                    : null
                            }}
                        />
                    </View>

                    {/* {hasFieldValue(customFields) && (
                        <Field
                            name="customFields"
                            component={CustomField}
                            locale={language}
                            fields={customFields}
                            initialFieldValues={fields}
                        />
                    )} */}
                    {/*
                    <CtDivider dividerStyle={styles.dividerStyle} />

                    <Field
                        name="enable_portal"
                        component={ToggleSwitch}
                        status={enable_portal === 1 ? true : false}
                        hint={Lng.t("customers.enablePortal", { locale: language })}
                        onChangeCallback={(val) =>
                            this.onTogglePortal(val)
                        }
                    />

                    {portal && (
                        <Field
                            name={'password'}
                            component={InputField}
                            hint={Lng.t("customers.password", { locale: language })}
                            inputProps={{
                                returnKeyType: 'go',
                                autoCapitalize: 'none',
                                autoCorrect: true,
                            }}
                            secureTextEntry
                        />
                    )} */}
                </View>
            </DefaultLayout>
        );
    }
}
