// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { Field, change } from 'redux-form';
import styles from './styles';
import {
    InputField,
    CtButton,
    DefaultLayout,
    ToggleSwitch
} from '../../../../components';
import { BUTTON_COLOR } from '../../../../api/consts/core';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import Lng from '../../../../api/lang/i18n';
import { EDIT_CURRENCY_TYPE, CREATE_CURRENCY_TYPE, CURRENCY_FORM } from '../../constants';
import { alertMe, hasObjectLength } from '../../../../api/global';

type IProps = {
    navigation: Object,
    formValues: Object,
    handleSubmit: Function,
    createCurrency: Function,
    editCurrency: Function,
    language: String,
    type: String,
    getEditCategoryLoading: Boolean,
    currencyLoading: Boolean,
    id: Number,
}

export class Currency extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(CURRENCY_FORM, field, value));
    };

    onSubmit = (values) => {

        const {
            id,
            type,
            createCurrency,
            editCurrency,
            navigation,
            currencyLoading,
        } = this.props

        if (!currencyLoading) {
            if (type === CREATE_CURRENCY_TYPE)
                createCurrency({ params: values, navigation })
            else {
                editCurrency({ id, params: values, navigation })
            }
        }
    };

    removeCategory = () => {

        const { removeCurrency, navigation, language, id } = this.props

        alertMe({
            title: Lng.t("alert.title", { locale: language }),
            desc: Lng.t("currencies.alertDescription", { locale: language }),
            showCancel: true,
            okPress: () => removeCurrency({ id, navigation })
        })
    }

    BOTTOM_ACTION = (handleSubmit) => {

        const {
            language,
            currencyLoading,
            type
        } = this.props

        return (
            <View style={[styles.submitButton, type === EDIT_CURRENCY_TYPE && styles.multipleButton]}>
                <CtButton
                    onPress={handleSubmit(this.onSubmit)}
                    btnTitle={Lng.t("button.save", { locale: language })}
                    buttonContainerStyle={type === EDIT_CURRENCY_TYPE && styles.flex}
                    containerStyle={styles.btnContainerStyle}
                    loading={currencyLoading}
                />

                {type === EDIT_CURRENCY_TYPE &&
                    <CtButton
                        onPress={this.removeCategory}
                        btnTitle={Lng.t("button.remove", { locale: language })}
                        buttonColor={BUTTON_COLOR.DANGER}
                        containerStyle={styles.btnContainerStyle}
                        buttonContainerStyle={styles.flex}
                        loading={currencyLoading}
                    />
                }
            </View>
        )
    }

    POSITION_VIEW = () => {
        const { language } = this.props
        return (
            <View style={styles.row}>

                <View style={styles.positionView}>
                    <Text style={styles.textStyle}>
                        {Lng.t("currencies.position", { locale: language })}
                    </Text>
                </View>

                <View style={styles.column}>
                    <Field
                        name="position"
                        component={ToggleSwitch}
                        hint={Lng.t("currencies.left", { locale: language })}
                        hintStyle={styles.leftText}
                    />
                </View>

                <View style={styles.columnRight}>
                    <Text style={styles.textStyle}>
                        {Lng.t("currencies.right", { locale: language })}
                    </Text>
                </View>

            </View>
        )
    }

    render() {
        const {
            navigation,
            handleSubmit,
            language,
            type,
            formValues
        } = this.props;

        let currencyRefs = {}

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => { navigation.goBack(null) },
                    title: type === EDIT_CURRENCY_TYPE ?
                        Lng.t("header.editCurrency", { locale: language }) :
                        Lng.t("header.addCurrency", { locale: language }),
                    placement: "center",
                    rightIcon: "save",
                    rightIconProps: {
                        solid: true,
                    },
                    rightIconPress: handleSubmit(this.onSubmit),
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{
                    is: !hasObjectLength(formValues)
                }}
            >
                <View style={styles.bodyContainer}>

                    <Field
                        name="name"
                        component={InputField}
                        isRequired
                        hint={Lng.t("currencies.name", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            onSubmitEditing: () => currencyRefs.code.focus()
                        }}
                    />

                    <Field
                        name="code"
                        component={InputField}
                        isRequired
                        hint={Lng.t("currencies.code", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            onSubmitEditing: () => currencyRefs.symbol.focus()
                        }}
                        refLinkFn={(ref) => {
                            currencyRefs.code = ref;
                        }}
                    />

                    <Field
                        name="symbol"
                        component={InputField}
                        isRequired
                        hint={Lng.t("currencies.symbol", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            onSubmitEditing: () => currencyRefs.precision.focus()
                        }}
                        refLinkFn={(ref) => {
                            currencyRefs.symbol = ref;
                        }}
                    />

                    <Field
                        name="precision"
                        component={InputField}
                        isRequired
                        hint={Lng.t("currencies.precision", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            keyboardType: 'numeric',
                            autoCorrect: true,
                            onSubmitEditing: () => currencyRefs.thousSeparator.focus()
                        }}
                        refLinkFn={(ref) => {
                            currencyRefs.precision = ref;
                        }}
                    />

                    <Field
                        name="thousand_separator"
                        component={InputField}
                        isRequired
                        hint={Lng.t("currencies.thousSeparator", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            onSubmitEditing: () => currencyRefs.decSeparator.focus()
                        }}
                        refLinkFn={(ref) => {
                            currencyRefs.thousSeparator = ref;
                        }}
                    />

                    <Field
                        name="decimal_separator"
                        component={InputField}
                        isRequired
                        hint={Lng.t("currencies.decSeparator", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                        }}
                        refLinkFn={(ref) => {
                            currencyRefs.decSeparator = ref;
                        }}
                    />

                    {this.POSITION_VIEW()}

                </View>
            </DefaultLayout>
        );
    }
}

