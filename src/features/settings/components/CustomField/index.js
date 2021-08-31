// @flow

import React from 'react';
import { View } from 'react-native';
import { Field, change } from 'redux-form';
import {
    alertMe,
    hasObjectLength,
    hasLength,
    hasFieldValue,
    hasValue,
    KEYBOARD_TYPE
} from '@/constants';
import t from 'locales/use-translation';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import {
    InputField,
    DefaultLayout,
    ToggleSwitch,
    SelectPickerField,
    Text,
    ActionButton
} from '@/components';
import {
    setCustomFieldRefs,
    DEFAULT_INPUT_FIELD,
    DEFAULT_NUMBER_FIELD,
    DEFAULT_DATE_FIELD,
    DEFAULT_TIME_FIELD,
    PLACEHOLDER_FIELD,
    DEFAULT_TEXTAREA_FIELD,
    SELECT_FIELD_OPTIONS,
    SELECT_FIELD_DEFAULT_VALUE,
    DEFAULT_CHECKBOX_FIELD,
    DEFAULT_DATE_TIME_FIELD
} from './options';
import {
    EDIT_CUSTOM_FIELD_TYPE,
    CREATE_CUSTOM_FIELD_TYPE,
    CUSTOM_FIELD_FORM,
    CUSTOM_FIELDS as FIELDS,
    DATA_TYPE_OPTION_VALUE as OPTION_VALUE,
    CUSTOM_FIELD_MODAL_TYPES as MODAL_TYPES,
    CUSTOM_FIELD_DATA_TYPE_LIST as DATA_TYPES
} from '../../constants';
import styles from './styles';

type IProps = {
    navigation: Object,
    formValues: Object,
    handleSubmit: Function,
    createCustomField: Function,
    editCustomField: Function,
    getCustomField: Function,
    removeCustomField: Function,
    type: String,
    loading: boolean,
    id: Number,
    field: any,
    getCustomFieldLoading: boolean,
    removeCustomFieldLoading: boolean
};

export class CustomField extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.customFieldRefs = setCustomFieldRefs.bind(this);
        this.state = {};
    }

    componentDidMount() {
        const { navigation, type, dispatch, getCustomField, id } = this.props;
        goBack(MOUNT, navigation);

        if (type === EDIT_CUSTOM_FIELD_TYPE) {
            getCustomField({
                id,
                onResult: res => {
                    const field = {
                        ...res,
                        [FIELDS.DEFAULT_VALUE]:
                            res.defaultAnswer || res.default_answer
                    };
                    dispatch(change(CUSTOM_FIELD_FORM, FIELDS.FIELD, field));
                }
            });
        }
    }

    componentWillUnmount() {
        this.customFieldRefs(undefined);
        goBack(UNMOUNT);
    }

    setFormField = (field, value) => {
        const fieldName = `${FIELDS.FIELD}.${field}`;
        this.props.dispatch(change(CUSTOM_FIELD_FORM, fieldName, value));
    };

    getOptionsValue = options => {
        return options.filter(option => hasValue(option) && option !== '');
    };

    onSubmit = ({ field }) => {
        const {
            id,
            type,
            createCustomField,
            editCustomField,
            navigation,
            loading,
            formValues,
            getCustomFieldLoading,
            removeCustomFieldLoading
        } = this.props;

        if (
            !loading &&
            !getCustomFieldLoading &&
            !removeCustomFieldLoading &&
            formValues
        ) {
            const options = hasFieldValue(field[FIELDS.OPTIONS])
                ? this.getOptionsValue(field[FIELDS.OPTIONS])
                : [];
            const params = { ...field, [FIELDS.OPTIONS]: options };

            if (type === CREATE_CUSTOM_FIELD_TYPE)
                createCustomField({ params, navigation });
            else {
                editCustomField({ id, params, navigation });
            }
        }
    };

    removeField = () => {
        const { removeCustomField, navigation, id } = this.props;

        alertMe({
            title: t('alert.title'),
            desc: t('customFields.removeAlertDescription'),
            showCancel: true,
            okPress: () => removeCustomField({ id, navigation })
        });
    };

    onChangeReset = () => {
        this.setFormField(FIELDS.DEFAULT_VALUE, '');
        this.setFormField(FIELDS.PLACEHOLDER, '');
        this.setFormField(FIELDS.OPTIONS, []);
    };

    REQUIRE_FIELD_VIEW = () => {
        const { theme, isAllowToEdit } = this.props;
        return (
            <View style={[styles.row, { marginTop: 10 }]}>
                <View style={styles.positionView}>
                    <Text
                        h4
                        color={theme?.viewLabel?.secondaryColor}
                        medium={theme?.mode === 'dark'}
                        style={{ marginLeft: 3 }}
                    >
                        {t('customFields.required')}
                    </Text>
                </View>

                <View style={styles.column}>
                    <Field
                        name={`${FIELDS.FIELD}.${FIELDS.IS_REQUIRED}`}
                        component={ToggleSwitch}
                        switchStyle={{ marginRight: 100 }}
                        hintStyle={styles.leftText}
                        disabled={!isAllowToEdit}
                    />
                </View>
            </View>
        );
    };

    DISPLAY_PORTAL_TOGGLE_VIEW = () => {
        return (
            <View style={styles.row}>
                <View style={styles.positionView}>
                    <Text secondary h4 style={{ marginLeft: 3 }}>
                        {t('customFields.displayInPortal')}
                    </Text>
                </View>

                <View style={styles.column}>
                    <Field
                        name={`${FIELDS.FIELD}.${FIELDS.DISPLAY_PORTAL}`}
                        component={ToggleSwitch}
                        hint={t('customFields.no')}
                        hintStyle={styles.leftText}
                    />
                </View>

                <View style={styles.columnRight}>
                    <Text secondary h4 style={{ marginLeft: 3 }}>
                        {t('customFields.yes')}
                    </Text>
                </View>
            </View>
        );
    };

    DATA_TYPE_OPTION_BASE_VIEW = () => {
        const { formValues } = this.props;
        let dataType = formValues?.[FIELDS.FIELD]?.[FIELDS.TYPE];
        let optionView = [];

        switch (dataType) {
            case OPTION_VALUE.INPUT:
                optionView = [DEFAULT_INPUT_FIELD(), PLACEHOLDER_FIELD()];
                break;

            case OPTION_VALUE.TEXTAREA:
                optionView = [DEFAULT_TEXTAREA_FIELD(), PLACEHOLDER_FIELD()];
                break;

            case OPTION_VALUE.PHONE:
                optionView = [DEFAULT_INPUT_FIELD(), PLACEHOLDER_FIELD()];
                break;

            case OPTION_VALUE.URL:
                optionView = [DEFAULT_INPUT_FIELD(), PLACEHOLDER_FIELD()];
                break;

            case OPTION_VALUE.NUMBER:
                optionView = [DEFAULT_NUMBER_FIELD(), PLACEHOLDER_FIELD()];
                break;

            case OPTION_VALUE.DROPDOWN:
                optionView = [
                    SELECT_FIELD_OPTIONS(),
                    SELECT_FIELD_DEFAULT_VALUE(),
                    PLACEHOLDER_FIELD()
                ];
                break;

            case OPTION_VALUE.SWITCH:
                optionView = [DEFAULT_CHECKBOX_FIELD()];
                break;

            case OPTION_VALUE.DATE:
                optionView = [DEFAULT_DATE_FIELD(), PLACEHOLDER_FIELD()];
                break;

            case OPTION_VALUE.TIME:
                optionView = [DEFAULT_TIME_FIELD(), PLACEHOLDER_FIELD()];
                break;

            case OPTION_VALUE.DATE_TIME:
                optionView = [DEFAULT_DATE_TIME_FIELD(), PLACEHOLDER_FIELD()];

            default:
                break;
        }

        return !hasLength(optionView) ? <></> : optionView;
    };

    isLoading = () => {
        const { formValues, getCustomFieldLoading } = this.props;
        return (
            !formValues || !hasObjectLength(formValues) || getCustomFieldLoading
        );
    };

    render() {
        const {
            navigation,
            handleSubmit,
            loading,
            removeCustomFieldLoading,
            isEditScreen,
            isAllowToEdit,
            isAllowToDelete
        } = this.props;
        const disabled = !isAllowToEdit;

        const getTitle = () => {
            let title = 'header.addCustomField';
            if (isEditScreen && !isAllowToEdit)
                title = 'header.viewCustomField';
            if (isEditScreen && isAllowToEdit) title = 'header.editCustomField';

            return t(title);
        };

        const bottomAction = [
            {
                label: 'button.save',
                onPress: handleSubmit(this.onSubmit),
                show: isAllowToEdit,
                loading: loading || this.isLoading()
            },
            {
                label: 'button.remove',
                onPress: this.removeField,
                bgColor: 'btn-danger',
                show: isEditScreen && isAllowToDelete,
                loading: removeCustomFieldLoading || this.isLoading()
            }
        ];

        this.customFieldRefs(this);

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => {
                        navigation.goBack(null);
                    },
                    title: getTitle(),
                    placement: 'center',
                    ...(isAllowToEdit && {
                        rightIcon: 'save',
                        rightIconProps: { solid: true },
                        rightIconPress: handleSubmit(this.onSubmit)
                    })
                }}
                bottomAction={<ActionButton buttons={bottomAction} />}
                loadingProps={{ is: this.isLoading() }}
            >
                <Field
                    name={`${FIELDS.FIELD}.${FIELDS.NAME}`}
                    component={InputField}
                    isRequired
                    disabled={disabled}
                    hint={t('customFields.name')}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCorrect: true
                    }}
                />

                <Field
                    name={`${FIELDS.FIELD}.${FIELDS.MODAL_TYPE}`}
                    component={SelectPickerField}
                    label={t('customFields.model')}
                    fieldIcon="align-center"
                    items={MODAL_TYPES}
                    disabled={disabled}
                    defaultPickerOptions={{
                        label: t('customFields.modelPlaceholder'),
                        value: ''
                    }}
                    isRequired
                />

                {this.REQUIRE_FIELD_VIEW()}

                <Field
                    name={`${FIELDS.FIELD}.${FIELDS.TYPE}`}
                    label={t('customFields.type')}
                    component={SelectPickerField}
                    isRequired
                    fieldIcon="align-center"
                    items={DATA_TYPES}
                    defaultPickerOptions={{
                        label: t('customFields.typePlaceholder'),
                        value: ''
                    }}
                    disabled={disabled}
                    onChangeCallback={() => this.onChangeReset()}
                    callbackWhenMount={() => {}}
                />

                <Field
                    name={`${FIELDS.FIELD}.${FIELDS.LABEL}`}
                    component={InputField}
                    isRequired
                    disabled={disabled}
                    hint={t('customFields.label')}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCorrect: true
                    }}
                />

                {this.DATA_TYPE_OPTION_BASE_VIEW()}

                <Field
                    name={`${FIELDS.FIELD}.${FIELDS.ORDER}`}
                    component={InputField}
                    hint={t('customFields.order')}
                    disabled={disabled}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCorrect: true,
                        keyboardType: KEYBOARD_TYPE.NUMERIC
                    }}
                    isRequired
                />
            </DefaultLayout>
        );
    }
}
