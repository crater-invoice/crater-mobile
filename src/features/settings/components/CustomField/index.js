// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { Field, change } from 'redux-form';
import styles from './styles';
import {
    InputField,
    CtButton,
    DefaultLayout,
    ToggleSwitch,
    SelectPickerField
} from '../../../../components';
import { BUTTON_COLOR } from '../../../../api/consts/core';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import Lng from '../../../../api/lang/i18n';
import { alertMe, hasObjectLength, hasLength } from '../../../../api/global';
import {
    setCustomFieldRefs,
    HELP_TEXT_FIELD,
    DEFAULT_VALUE_FIELD,
    DEFAULT_NUMBER_FIELD,
    DEFAULT_CHECKBOX_FIELD
} from './options';
import {
    EDIT_CUSTOM_FIELD_TYPE,
    CREATE_CUSTOM_FIELD_TYPE,
    CUSTOM_FIELD_FORM,
    CUSTOM_FIELDS as FIELDS,
    DATA_TYPE_OPTION,
    DATA_TYPE_OPTION_VALUE as OPTION_VALUE
} from '../../constants';

type IProps = {
    navigation: Object,
    formValues: Object,
    handleSubmit: Function,
    createCustomField: Function,
    editCustomField: Function,
    language: String,
    type: String,
    getEditCategoryLoading: Boolean,
    currencyLoading: Boolean,
    id: Number,
}

export class CustomField extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.customFieldRefs = setCustomFieldRefs.bind(this);
        this.state = {
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation)
    }

    componentWillUnmount() {
        this.customFieldRefs(undefined)
        goBack(UNMOUNT)
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(CUSTOM_FIELD_FORM, field, value));
    };

    onSubmit = (values) => {
        console.log({ values })
        // const {
        //     id,
        //     type,
        //     createCustomField,
        //     editCustomField,
        //     navigation,
        //     currencyLoading,
        // } = this.props

        // if (!currencyLoading) {
        //     if (type === CREATE_CUSTOM_FIELD_TYPE)
        //         createCustomField({ params: values, navigation })
        //     else {
        //         editCustomField({ id, params: values, navigation })
        //     }
        // }
    };

    removeField = () => {

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
            <View style={[styles.submitButton, type === EDIT_CUSTOM_FIELD_TYPE && styles.multipleButton]}>
                <CtButton
                    onPress={handleSubmit(this.onSubmit)}
                    btnTitle={Lng.t("button.save", { locale: language })}
                    buttonContainerStyle={type === EDIT_CUSTOM_FIELD_TYPE && styles.flex}
                    containerStyle={styles.btnContainerStyle}
                    loading={currencyLoading}
                />

                {type === EDIT_CUSTOM_FIELD_TYPE &&
                    <CtButton
                        onPress={this.removeField}
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

    MANDATORY_TOGGLE_VIEW = () => {
        const { language } = this.props
        return (
            <View style={[styles.row, { marginTop: 10 }]}>

                <View style={styles.positionView}>
                    <Text style={styles.textStyle}>
                        {Lng.t("customFields.isMandatory", { locale: language })}
                    </Text>
                </View>

                <View style={styles.column}>
                    <Field
                        name={`${FIELDS.FIELD}.${FIELDS.IS_MANDATORY}`}
                        component={ToggleSwitch}
                        hint={Lng.t("customFields.no", { locale: language })}
                        hintStyle={styles.leftText}
                    />
                </View>

                <View style={styles.columnRight}>
                    <Text style={styles.textStyle}>
                        {Lng.t("customFields.yes", { locale: language })}
                    </Text>
                </View>

            </View>
        )
    }

    DISPLAY_PORTAL_TOGGLE_VIEW = () => {
        const { language } = this.props
        return (
            <View style={styles.row}>

                <View style={styles.positionView}>
                    <Text style={styles.textStyle}>
                        {Lng.t("customFields.displayInPortal", { locale: language })}
                    </Text>
                </View>

                <View style={styles.column}>
                    <Field
                        name={`${FIELDS.FIELD}.${FIELDS.DISPLAY_PORTAL}`}
                        component={ToggleSwitch}
                        hint={Lng.t("customFields.no", { locale: language })}
                        hintStyle={styles.leftText}
                    />
                </View>

                <View style={styles.columnRight}>
                    <Text style={styles.textStyle}>
                        {Lng.t("customFields.yes", { locale: language })}
                    </Text>
                </View>

            </View>
        )
    }

    DATA_TYPE_OPTION_BASE_VIEW = () => {
        const { formValues } = this.props
        let dataType = formValues?.[FIELDS.FIELD]?.[FIELDS.TYPE]
        let optionView = [];

        switch (dataType) {

            case OPTION_VALUE.TEXT_BOX:
            case OPTION_VALUE.MULTILINE_TEXT_BOX:
            case OPTION_VALUE.EMAIL:
            case OPTION_VALUE.URL:
            case OPTION_VALUE.DECIMAL:
            case OPTION_VALUE.PHONE:
                optionView = [HELP_TEXT_FIELD(), DEFAULT_VALUE_FIELD()]
                break;

            case OPTION_VALUE.AMOUNT:
                optionView = [HELP_TEXT_FIELD(), DEFAULT_NUMBER_FIELD()]
                break;

            case OPTION_VALUE.CHECKBOX:
                optionView = [HELP_TEXT_FIELD(), DEFAULT_CHECKBOX_FIELD()]
                break;

            case OPTION_VALUE.PERCENT:
                optionView = [HELP_TEXT_FIELD(), DEFAULT_NUMBER_FIELD('%')]
                break;

            default:
                break;
        }

        return !hasLength(optionView) ? <></> : optionView.map((field) => (
            <View>
                {field}
            </View>
        ))
    }

    render() {
        const {
            navigation,
            handleSubmit,
            language,
            type,
            formValues,
        } = this.props;

        this.customFieldRefs(this)

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => { navigation.goBack(null) },
                    title: type === EDIT_CUSTOM_FIELD_TYPE ?
                        Lng.t("header.editCustomField", { locale: language }) :
                        Lng.t("header.addCustomField", { locale: language }),
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
                        name={`${FIELDS.FIELD}.${FIELDS.NAME}`}
                        component={InputField}
                        isRequired
                        hint={Lng.t("customFields.name", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                        }}
                    />

                    <Field
                        name={`${FIELDS.FIELD}.${FIELDS.TYPE}`}
                        label={Lng.t("customFields.type", { locale: language })}
                        component={SelectPickerField}
                        isRequired
                        fieldIcon='calendar-week'
                        items={DATA_TYPE_OPTION(language, Lng)}
                        defaultPickerOptions={{
                            label: Lng.t("customFields.select", { locale: language }),
                            value: '',
                        }}
                    />

                    {this.DATA_TYPE_OPTION_BASE_VIEW()}

                    {this.MANDATORY_TOGGLE_VIEW()}

                    {this.DISPLAY_PORTAL_TOGGLE_VIEW()}

                </View>
            </DefaultLayout>
        );
    }
}

