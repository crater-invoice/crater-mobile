// @flow

import React from 'react';
import { View } from 'react-native';
import { Field, change } from 'redux-form';
import styles from './styles';
import {
    InputField,
    CtButton,
    DefaultLayout,
    ToggleSwitch,
    Text
} from '@/components';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import Lng from '@/lang/i18n';
import { EDIT_CURRENCY_TYPE, CREATE_CURRENCY_TYPE, CURRENCY_FORM } from '../../constants';
import { alertMe, BUTTON_COLOR, hasObjectLength } from '@/constants';

type IProps = {
    navigation: Object,
    formValues: Object,
    handleSubmit: Function,
    createCurrency: Function,
    editCurrency: Function,
    locale: String,
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

        const { removeCurrency, navigation, locale, id } = this.props

        alertMe({
            title: Lng.t("alert.title", { locale }),
            desc: Lng.t("currencies.alertDescription", { locale }),
            showCancel: true,
            okPress: () => removeCurrency({ id, navigation })
        })
    }

    BOTTOM_ACTION = (handleSubmit) => {

        const {
            locale,
            currencyLoading,
            type
        } = this.props

        return (
            <View style={[styles.submitButton, type === EDIT_CURRENCY_TYPE && styles.multipleButton]}>
                <CtButton
                    onPress={handleSubmit(this.onSubmit)}
                    btnTitle={Lng.t("button.save", { locale })}
                    buttonContainerStyle={type === EDIT_CURRENCY_TYPE && styles.flex}
                    containerStyle={styles.btnContainerStyle}
                    loading={currencyLoading}
                />

                {type === EDIT_CURRENCY_TYPE &&
                    <CtButton
                        onPress={this.removeCategory}
                        btnTitle={Lng.t("button.remove", { locale })}
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
        const { locale } = this.props
        return (
            <View style={styles.row}>

                <View style={styles.positionView}>
                    <Text secondary h4>
                        {Lng.t("currencies.position", { locale })}
                    </Text>
                </View>

                <View style={styles.column}>
                    <Field
                        name="position"
                        component={ToggleSwitch}
                        hint={Lng.t("currencies.left", { locale })}
                        hintStyle={styles.leftText}
                    />
                </View>

                <View style={styles.columnRight}>
                    <Text secondary h4>
                        {Lng.t("currencies.right", { locale })}
                    </Text>
                </View>

            </View>
        )
    }

    render() {
        const {
            navigation,
            handleSubmit,
            locale,
            type,
            formValues
        } = this.props;

        let currencyRefs = {}

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => { navigation.goBack(null) },
                    title: type === EDIT_CURRENCY_TYPE ?
                        Lng.t("header.editCurrency", { locale }) :
                        Lng.t("header.addCurrency", { locale }),
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
                        hint={Lng.t("currencies.name", { locale })}
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
                        hint={Lng.t("currencies.code", { locale })}
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
                        hint={Lng.t("currencies.symbol", { locale })}
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
                        hint={Lng.t("currencies.precision", { locale })}
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
                        hint={Lng.t("currencies.thousSeparator", { locale })}
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
                        hint={Lng.t("currencies.decSeparator", { locale })}
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

