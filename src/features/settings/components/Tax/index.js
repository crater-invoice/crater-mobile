// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { DefaultLayout, CtButton, InputField, ToggleSwitch } from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import { BUTTON_COLOR } from '../../../../api/consts/core';
import { Field } from 'redux-form';
import Lng from '../../../../api/lang/i18n';
import { ADD_TAX } from '../../constants';
import { UNMOUNT, MOUNT, goBack } from '../../../../navigation/actions';
import { MAX_LENGTH, alertMe } from '../../../../api/global';

export class Tax extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            endpointVisible: false
        }
    }

    componentDidMount() {
        const { navigation } = this.props
        goBack(MOUNT, navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }


    onSave = (tax) => {
        const { addTax, navigation, type, editTax, loading } = this.props
        const isCreate = (type === ADD_TAX)

        if (!loading) {
            isCreate ?
                addTax({
                    tax,
                    onResult: (res) => {
                        const onSelect = navigation.getParam('onSelect', null)
                        onSelect && onSelect([{ ...res, tax_type_id: res.id }])
                        navigation.goBack(null)
                    }
                }) : editTax({
                    tax,
                    onResult: () => {
                        navigation.goBack(null)
                    }
                })
        }
    }

    removeTax = () => {
        const {
            removeTax,
            taxId,
            navigation,
            language,
            initialValues: { name }
        } = this.props

        alertMe({
            title: Lng.t("alert.title", { locale: language }),
            desc: Lng.t("taxes.alertDescription", { locale: language }),
            showCancel: true,
            okPress: () => removeTax({
                id: taxId,
                onResult: (val) => {
                    val ? navigation.navigate(ROUTES.TAXES) :
                        alertMe({ title: `${name} ${Lng.t("taxes.alreadyUsed", { locale: language })}` })
                }
            })
        })
    }

    BOTTOM_ACTION = (handleSubmit) => {
        const { loading, language, type } = this.props
        const isCreate = (type === ADD_TAX)

        return (
            <View style={[styles.submitButton, !isCreate && styles.multipleButton]}>
                <CtButton
                    onPress={handleSubmit(this.onSave)}
                    btnTitle={Lng.t("button.save", { locale: language })}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={!isCreate && styles.buttonContainer}
                    loading={loading}
                />
                {!isCreate &&
                    <CtButton
                        onPress={this.removeTax}
                        btnTitle={Lng.t("button.remove", { locale: language })}
                        containerStyle={styles.handleBtn}
                        buttonContainerStyle={styles.buttonContainer}
                        buttonColor={BUTTON_COLOR.DANGER}
                        loading={loading}
                    />
                }
            </View>
        )
    }

    render() {
        const { navigation, handleSubmit, language, type, initialValues } = this.props;
        const isCreate = (type === ADD_TAX)

        let taxRefs = {}

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.goBack(null),
                    title: isCreate ? Lng.t("header.addTaxes", { locale: language }) : Lng.t("header.editTaxes", { locale: language }),
                    placement: "center",
                    rightIcon: "save",
                    rightIconProps: {
                        solid: true,
                    },
                    rightIconPress: handleSubmit(this.onSave),
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
            >
                <View style={styles.mainContainer}>
                    <Field
                        name="name"
                        component={InputField}
                        isRequired
                        hint={Lng.t("taxes.type", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            autoFocus: true,
                            onSubmitEditing: () => {
                                taxRefs.percent.focus();
                            }
                        }}
                    />

                    <Field
                        name="percent"
                        isRequired
                        component={InputField}
                        hint={Lng.t("taxes.percentage", { locale: language }) + ' (%)'}
                        inputProps={{
                            returnKeyType: 'next',
                            keyboardType: 'numeric',
                            onSubmitEditing: () => {
                                taxRefs.description.focus();
                            }
                        }}
                        refLinkFn={(ref) => {
                            taxRefs.percent = ref;
                        }}
                        maxNumber={100}
                    />

                    <Field
                        name="description"
                        component={InputField}
                        hint={Lng.t("taxes.description", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            multiline: true,
                            maxLength: MAX_LENGTH
                        }}
                        refLinkFn={(ref) => {
                            taxRefs.description = ref;
                        }}
                        height={80}
                    />

                    <Field
                        name="compound_tax"
                        component={ToggleSwitch}
                        hint={Lng.t("taxes.compoundTax", { locale: language })}
                    />

                </View>
            </DefaultLayout>
        );
    }
}
