// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Field, change } from 'redux-form';
import {
    SlideModal,
    FakeInput,
    InputField,
    CtButton,
    SelectField,
} from '../../../../components';
import { CUSTOMER_ADDRESS, CUSTOMER_EDIT } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { colors } from '../../../../styles/colors';
import { MAX_LENGTH, formatCountries } from '../../../../api/global';

type IProps = {
    label: String,
    icon: String,
    onChangeCallback: Function,
    placeholder: String,
    containerStyle: Object,
    rightIcon: String,
    leftIcon: String,
    color: String,
    value: String,
    items: Object,
    rightIcon: String,
    hasBillingAddress: Boolean,
    meta: Object,
    handleSubmit: Function,
    language: String,
    type: String
};

let country = 'country_id'
let state = 'state'
let city = 'city'

let addressField = [
    "name",
    "address_street_1",
    "address_street_2",
    "phone",
    "zip",
    "country_id",
    "state",
    "city",
    "type"
]


export class Address extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            values: '',
            status: false,
        };
    }

    componentDidMount() {
    }


    fillShippingAddress = (status) => {

        if (status) {
            this.setState({ status })
            const { autoFillValue } = this.props

            if (typeof autoFillValue !== 'undefined') {
                addressField.map((field) => {
                    this.setFormField(field, autoFillValue[field])
                })
            }
        }
        else {
            this.setState({ status })
            this.clearFormField()
        }
    }

    onToggle = () => {
        const { visible, status } = this.state
        const { addressValue,
            hasBillingAddress,
            autoFillValue
        } = this.props

        if (!visible) {
            if (typeof addressValue !== 'undefined') {
                addressField.map((field) => {
                    this.setFormField(field, addressValue[field])
                })
            }

            if (!hasBillingAddress && status === true && typeof addressValue === 'undefined') {
                if (typeof autoFillValue !== 'undefined') {
                    addressField.map((field) => {
                        this.setFormField(field, autoFillValue[field])
                    })
                }
            }
        }
        else {
            if (typeof addressValue === 'undefined')
                this.clearFormField()
        }
        this.setState((prevState) => {
            return { visible: !prevState.visible }
        });
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(CUSTOMER_ADDRESS, field, value));
    };

    clearFormField = () => {
        addressField.map((field) => {
            this.setFormField(field, "")
        })
    };

    saveAddress = (address) => {
        const { onChangeCallback } = this.props
        this.onToggle()

        onChangeCallback(address)
        this.clearFormField()
    }

    BOTTOM_ACTION = (handleSubmit) => {
        const { language } = this.props
        return (
            <View style={styles.submitButton}>
                <View style={{ flex: 1 }}>
                    <CtButton
                        onPress={handleSubmit(this.saveAddress)}
                        btnTitle={Lng.t("button.done", { locale: language })}
                        containerStyle={styles.handleBtn}
                    />
                </View>
            </View>
        )
    }

    Screen = () => {


        const {
            handleSubmit,
            hasBillingAddress,
            navigation,
            addressValue,
            formValues,
            language,
            countries
        } = this.props

        const { status } = this.state

        let addressRefs = {}

        return (
            <View>

                {!hasBillingAddress && (
                    <FakeInput
                        icon={'copy'}
                        color={colors.primaryLight}
                        leftIconSolid={false}
                        values={Lng.t("customers.address.sameAs", { locale: language })}
                        valueStyle={styles.sameAsToggle}
                        onChangeCallback={
                            () => this.fillShippingAddress(!status)
                        }
                    />
                )}

                <Field
                    name={"name"}
                    component={InputField}
                    hint={Lng.t("customers.address.name", { locale: language })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        autoFocus: true,
                    }}
                />

                <Field
                    name={country}
                    items={formatCountries(countries)}
                    displayName="name"
                    component={SelectField}
                    label={Lng.t("customers.address.country", { locale: language })}
                    placeholder={" "}
                    rightIcon='angle-right'
                    navigation={navigation}
                    searchFields={['name']}
                    compareField="id"
                    onSelect={({ id }) => {
                        this.setFormField(country, id)
                    }}
                    headerProps={{
                        title: Lng.t("header.country", { locale: language }),
                        rightIconPress: null
                    }}
                    listViewProps={{
                        contentContainerStyle: { flex: 7 }
                    }}
                    emptyContentProps={{
                        contentType: "countries",
                    }}
                />

                <Field
                    name={state}
                    component={InputField}
                    hint={Lng.t("customers.address.state", { locale: language })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        onSubmitEditing: () => {
                            addressRefs.city.focus();
                        }
                    }}
                />

                <Field
                    name={city}
                    component={InputField}
                    hint={Lng.t("customers.address.city", { locale: language })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        onSubmitEditing: () => {
                            addressRefs.street1.focus();
                        }
                    }}
                    refLinkFn={(ref) => {
                        addressRefs.city = ref;
                    }}
                />

                <Field
                    name={"address_street_1"}
                    component={InputField}
                    hint={Lng.t("customers.address.address", { locale: language })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        placeholder: Lng.t("customers.address.street1", { locale: language }),
                        autoCorrect: true,
                        multiline: true,
                        maxLength: MAX_LENGTH
                    }}
                    height={60}
                    autoCorrect={true}
                    refLinkFn={(ref) => {
                        addressRefs.street1 = ref;
                    }}
                />

                <Field
                    name={"address_street_2"}
                    component={InputField}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        placeholder: Lng.t("customers.address.street2", { locale: language }),
                        autoCorrect: true,
                        multiline: true,
                        maxLength: MAX_LENGTH
                    }}
                    height={60}
                    autoCorrect={true}
                    containerStyle={styles.addressStreetField}
                />

                <Field
                    name={"phone"}
                    component={InputField}
                    hint={Lng.t("customers.address.phone", { locale: language })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        keyboardType: 'phone-pad'
                    }}
                    refLinkFn={(ref) => {
                        addressRefs.phone = ref;
                    }}
                />

                <Field
                    name={"zip"}
                    component={InputField}
                    hint={Lng.t("customers.address.zipcode", { locale: language })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        onSubmitEditing: handleSubmit(this.saveAddress)
                    }}
                />
            </View>
        )
    }

    render() {
        const {
            containerStyle,
            label,
            icon,
            placeholder,
            meta,
            rightIcon,
            hasBillingAddress,
            handleSubmit,
            language,
            type,
            fakeInputProps,
        } = this.props;


        const { visible, values } = this.state

        return (
            <View style={styles.container}>
                <FakeInput
                    label={label}
                    icon={icon}
                    rightIcon={rightIcon}
                    values={values || placeholder}
                    placeholder={placeholder}
                    onChangeCallback={this.onToggle}
                    containerStyle={containerStyle}
                    meta={meta}
                    {...fakeInputProps}
                />

                <SlideModal
                    defaultLayout
                    visible={visible}
                    onToggle={this.onToggle}
                    headerProps={{
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => this.onToggle(),
                        title: hasBillingAddress ? Lng.t("header.billingAddress", { locale: language }) : Lng.t("header.shippingAddress", { locale: language }),
                        placement: "center",
                        hasCircle: false,
                        noBorder: false,
                        transparent: false,
                    }}
                    bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                >
                    {this.Screen()}
                </SlideModal>

            </View>
        );
    }
}
