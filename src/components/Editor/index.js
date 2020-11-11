import React, { Component, Fragment } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Field, change } from 'redux-form';
import Lng from '@/lang/i18n';
import { includes } from 'lodash';
import { DOUBLE_RIGHT_ICON } from '@/assets';
import AssetSvg from '../AssetSvg';
import { InputField } from '../InputField';
import { AnimateModal } from '../AnimateModal';
import styles from './styles';
import { dismissKeyboard, hasValue, isArray, SCREEN_WIDTH } from '@/constants';

export const PLACEHOLDER_TYPES = {
    CUSTOMER: 'Customer',
    INVOICE: 'Invoice',
    ESTIMATE: 'Estimate',
    EXPENSE: 'Expense',
    PAYMENT: 'Payment',
    PREDEFINE_CUSTOMER: 'Predefine_Customer',
    PREDEFINE_COMPANY: 'Predefine_Company',
    PREDEFINE_BILLING: 'Predefine_Billing',
    PREDEFINE_SHIPPING: 'Predefine_Shipping'
};

interface IProps {
    customFields?: Array<any>;
    types?: Array<String>;
    name?: String;
    label?: String;
    dispatch?: Function;
    form?: String;
    locale?: String;
    formValues?: any;
    isRequired?: Boolean;
}

interface IStates {
    visible: boolean;
}

export class Editor extends Component<IProps, IStates> {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    onToggle = () => {
        dismissKeyboard();
        this.setState({ visible: !this.state.visible });
    };

    onSelect = value => {
        this.onToggle();
        this.updateValue(value);
    };

    updateValue = value => {
        const { dispatch, form, name, formValues } = this.props;
        let val = '';

        if (hasValue(formValues?.[name])) {
            val = `${formValues[name]}{${value}}`;
        } else {
            val = `{${value}}`;
        }

        dispatch(change(form, name, val));
    };

    getFormattedFields = (fields, type) => {
        const formattedFields = [];

        for (const field of fields) {
            if (field.model_type === type) {
                formattedFields.push({
                    label: field.label,
                    value: field.slug
                });
            }
        }

        const canAddLink = !(
            type === PLACEHOLDER_TYPES.CUSTOMER ||
            type === PLACEHOLDER_TYPES.EXPENSE
        );

        if (canAddLink) {
            formattedFields.push({
                label: `${type} Link`,
                value: `${type.toUpperCase()}_LINK`
            });
        }

        return {
            label: `${type.toUpperCase()} CUSTOM`,
            fields: formattedFields
        };
    };

    getFields = () => {
        const { customFields = [], types = [] } = this.props;

        const items = [];

        if (includes(types, PLACEHOLDER_TYPES.PREDEFINE_COMPANY)) {
            items.push({
                label: 'Company',
                fields: [
                    { label: 'Company Name', value: 'COMPANY_NAME' },
                    { label: 'Country', value: 'COMPANY_COUNTRY' },
                    { label: 'State', value: 'COMPANY_STATE' },
                    { label: 'City', value: 'COMPANY_CITY' },
                    {
                        label: 'Address Street 1',
                        value: 'COMPANY_ADDRESS_STREET_1'
                    },
                    {
                        label: 'Address Street 2',
                        value: 'COMPANY_ADDRESS_STREET_2'
                    },
                    { label: 'Phone', value: 'COMPANY_PHONE' },
                    { label: 'Zip Code', value: 'COMPANY_ZIP_CODE' }
                ]
            });
        }

        if (includes(types, PLACEHOLDER_TYPES.PREDEFINE_BILLING)) {
            items.push({
                label: 'Billing Address',
                fields: [
                    { label: 'Address name', value: 'BILLING_ADDRESS_NAME' },
                    { label: 'Country', value: 'BILLING_COUNTRY' },
                    { label: 'State', value: 'BILLING_STATE' },
                    { label: 'City', value: 'BILLING_CITY' },
                    {
                        label: 'Address Street 1',
                        value: 'BILLING_ADDRESS_STREET_1'
                    },
                    {
                        label: 'Address Street 2',
                        value: 'BILLING_ADDRESS_STREET_2'
                    },
                    { label: 'Phone', value: 'BILLING_PHONE' },
                    { label: 'Zip Code', value: 'BILLING_ZIP_CODE' }
                ]
            });
        }

        if (includes(types, PLACEHOLDER_TYPES.PREDEFINE_SHIPPING)) {
            items.push({
                label: 'Shipping Address',
                fields: [
                    { label: 'Address name', value: 'SHIPPING_ADDRESS_NAME' },
                    { label: 'Country', value: 'SHIPPING_COUNTRY' },
                    { label: 'State', value: 'SHIPPING_STATE' },
                    { label: 'City', value: 'SHIPPING_CITY' },
                    {
                        label: 'Address Street 1',
                        value: 'SHIPPING_ADDRESS_STREET_1'
                    },
                    {
                        label: 'Address Street 2',
                        value: 'SHIPPING_ADDRESS_STREET_2'
                    },
                    { label: 'Phone', value: 'SHIPPING_PHONE' },
                    { label: 'Zip Code', value: 'SHIPPING_ZIP_CODE' }
                ]
            });
        }

        if (includes(types, PLACEHOLDER_TYPES.PREDEFINE_CUSTOMER)) {
            items.push({
                label: 'CUSTOMER',
                fields: [
                    { label: 'Display Name', value: 'CONTACT_DISPLAY_NAME' },
                    { label: 'Contact Name', value: 'PRIMARY_CONTACT_NAME' },
                    { label: 'Email', value: 'CONTACT_EMAIL' },
                    { label: 'Phone', value: 'CONTACT_PHONE' },
                    { label: 'Website', value: 'CONTACT_WEBSITE' }
                ]
            });
        }

        for (const type of types) {
            for (const field of customFields) {
                if (field.model_type === type) {
                    items.push(this.getFormattedFields(customFields, type));
                    break;
                }
            }
        }

        return this.getFieldsView(items);
    };

    getFieldsView = items => {
        if (!isArray(items)) {
            return [];
        }

        return items.map((item, index) => {
            const { label, fields } = item;
            const isFirst = index === 0;
            const isOnlyOne = items.length === 1;

            const containerStyle = [
                !isFirst && { paddingLeft: 15 },
                isOnlyOne && {
                    width: SCREEN_WIDTH - 50
                }
            ];

            return (
                <View style={containerStyle}>
                    <View style={styles.labelView}>
                        <Text style={styles.label} numberOfLines={1}>
                            {label}
                        </Text>
                    </View>
                    {fields.map(field => (
                        <TouchableOpacity
                            onPress={() => this.onSelect(field.value)}
                            style={styles.item}
                        >
                            <View style={styles.arrowIcon}>
                                <AssetSvg
                                    name={DOUBLE_RIGHT_ICON}
                                    width={14}
                                    height={14}
                                />
                            </View>
                            <Text style={styles.itemText} numberOfLines={1}>
                                {field.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            );
        });
    };

    render() {
        const { locale, name, isRequired } = this.props;
        const { visible } = this.state;

        const items = this.getFields();
        const hasFields = isArray(items);
        const value = this.props?.formValues?.[name];

        const label = (
            <View style={styles.row}>
                <View>
                    <Text style={styles.hint}>
                        {Lng.t(this.props.label, { locale })}
                        {isRequired ? (
                            <Text style={styles.required}> *</Text>
                        ) : null}
                    </Text>
                </View>
                <View>
                    {hasFields && (
                        <TouchableOpacity onPress={this.onToggle}>
                            <Text style={styles.insertFields}>
                                {Lng.t('notes.insertFields', {
                                    locale
                                })}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );

        const field = (
            <Field
                name={name}
                component={InputField}
                height={150}
                inputProps={{
                    returnKeyType: 'next',
                    autoCapitalize: 'none',
                    autoCorrect: true,
                    multiline: true
                }}
            />
        );

        const modal = (
            <AnimateModal
                visible={visible}
                onToggle={this.onToggle}
                modalProps={{
                    animationIn: 'slideInUp',
                    animationOut: 'slideOutDown'
                }}
            >
                <View style={styles.modalViewContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyboardShouldPersistTaps="always"
                    >
                        <View style={styles.body}>
                            <View style={styles.items}>{items}</View>
                        </View>
                    </ScrollView>
                </View>
            </AnimateModal>
        );

        const children = (
            <Fragment>
                {label}
                {field}
                {modal}
            </Fragment>
        );

        return children;
    }
}
