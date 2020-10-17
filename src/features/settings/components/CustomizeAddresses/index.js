// @flow

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Field, change } from 'redux-form';
import styles from './styles';
import { CtButton, InputField, AnimateModal } from '../../../../components';
import { CUSTOMIZE_ADDRESSES_ACTION, addressFields, } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { hasValue } from '../../../../api/global';

type IProps = {
    navigation: Object,
    customizeProps: Object,
    modalProps: Object,
    locale: String,
    type: String,
    loading: Boolean,
    handleSubmit: Function,
}

export const listOFAddresses = ({
    addresses,
    locale,
    onPress,
    insertFieldContainerStyle = null,
    inputProps = null,
    hintStyle,
    height = 220,
}) => {

    return addresses.map((field, index) => {
        const { label, value } = field

        return (
            <View
                key={index}
                style={index !== 0 && styles.addressesContainer}
            >

                <Text style={[styles.label, hintStyle && hintStyle]}>
                    {Lng.t(label, { locale })}
                </Text>

                <View
                    style={[
                        styles.insertFieldContainer,
                        insertFieldContainerStyle && insertFieldContainerStyle
                    ]}
                >
                    <View style={styles.insertFieldLabelContainer}>
                        <Text style={styles.insertFieldLabel}>
                            {Lng.t("customizes.addresses.insertFields", { locale })}
                        </Text>
                    </View>
                    <View style={styles.insertFieldButton}>
                        <CtButton
                            onPress={() => onPress(value)}
                            containerStyle={styles.handleBtn}
                            buttonContainerStyle={styles.buttonContainer}
                            iconName={'plus'}
                        />
                    </View>
                </View>
                <View>
                    <Field
                        name={value}
                        component={InputField}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            multiline: true,
                            ...inputProps
                        }}
                        height={height}
                        autoCorrect={true}
                        containerStyle={styles.textArea}
                    />
                </View>
            </View>
        )
    })
}
export class CustomizeAddresses extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            type: null,
        }
    }

    onToggle = () => {
        this.setState((prevState) => {
            return { visible: !prevState.visible }
        });
    }

    setFormField = (field, value) => {
        const { customizeProps: { dispatch, form } } = this.props
        dispatch(change(form, field, value));
    };

    onSelectFormatField = (label, value) => {
        const { customizeProps: { formValues }, toggleToast, addresses } = this.props
        let field = this.state.type

        this.onToggle()
        toggleToast && toggleToast(label)

        formValues[field] === null ?
            this.setFormField(field, `{${value}}`) :
            this.setFormField(field, formValues[field].concat(`{${value}}`))

    }

    selectedFormatType = (type) => {
        this.setState({ type })
        this.onToggle()
    }

    listOfFields = (fields) => {
        const { customizeProps: { locale } } = this.props;

        return fields.map((field, index) => {
            const { label, value } = field

            return (
                <TouchableOpacity
                    key={index}
                    style={styles.buttonField}
                    onPress={() => this.onSelectFormatField(label, value)}
                >
                    <Text style={styles.buttonFieldText}>
                        {Lng.t(label, { locale })}
                    </Text>
                </TouchableOpacity>
            )
        })
    }

    checkRecentAddressType = ({ type }) => {
        let selectedType = true
        let ACTION = CUSTOMIZE_ADDRESSES_ACTION

        switch (this.state.type) {
            case ACTION.BILLING:
                selectedType = (type === ACTION.CUSTOMER || type === ACTION.BILLING)
                break;

            case ACTION.SHIPPING:
                selectedType = (type === ACTION.CUSTOMER || type === ACTION.SHIPPING)
                break;

            case ACTION.COMPANY:
                selectedType = (type === ACTION.COMPANY)
                break;

            case ACTION.TERMS_AND_CONDITION:
                selectedType = !(type === ACTION.COMPANY)
                break;

            default:
                selectedType = true
                break;
        }

        hasValue(this.state.type) && this.state.type.toString().includes("terms_and_conditions")
            && (selectedType = !(type === ACTION.COMPANY))

        return selectedType
    }

    formatAddressView = (locale) => {

        let listOfAddressFormatList = addressFields.filter(this.checkRecentAddressType)
        let hasOnlyOneFormatList = (listOfAddressFormatList.length === 1)

        return (
            <View style={styles.selectFieldContainer}>
                <ScrollView
                    horizontal={true}
                    bounces={hasOnlyOneFormatList ? false : true}
                >
                    {listOfAddressFormatList &&
                        listOfAddressFormatList.map(({ fields, label }, index) => {

                            let showLine = !(index === listOfAddressFormatList.length - 1)

                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.selectFieldContact,
                                        hasOnlyOneFormatList && { marginLeft: 30 }
                                    ]}
                                >
                                    <View style={styles.field}>
                                        <Text style={styles.heading}>
                                            {Lng.t(label, { locale })}
                                        </Text>


                                        {this.listOfFields(fields)}

                                    </View>

                                    {showLine && (<View style={styles.line} />)}
                                </View>
                            )
                        })}
                </ScrollView>
            </View>
        )
    }

    render() {

        const {
            addresses,
            addressesProps = null,
            customizeProps: { locale },
            bodyContainerStyle,
            modalProps
        } = this.props;
        const { visible } = this.state

        return (
            <View style={[styles.bodyContainer, bodyContainerStyle && bodyContainerStyle]}>


                {listOFAddresses({
                    addresses: addresses,
                    locale,
                    onPress: (value) => this.selectedFormatType(value),
                    ...addressesProps
                })
                }

                <AnimateModal
                    visible={visible}
                    onToggle={this.onToggle}
                    modalProps={{ ...modalProps }}
                >
                    <View style={styles.modalViewContainer}>
                        <View style={styles.selectFieldContainer}>
                            {this.formatAddressView(locale)}
                        </View>
                    </View>
                </AnimateModal>

            </View>
        );
    }
}
