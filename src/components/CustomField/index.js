import React, { Component } from 'react';
import { View } from 'react-native';
import { reduxForm, FieldArray, change, SubmissionError } from 'redux-form';
import lodash from 'lodash';
import { FakeInput } from '../FakeInput';
import styles from './styles';
import { ICONS } from '@/config';
import Lng from '@/api/lang/i18n';
import { SlideModal } from '../SlideModal';
import { CtButton } from '../Button';
import { hasFieldValue, hasValue, hasObjectLength } from '@/api/global';
import { CUSTOM_FIELD_DATA_TYPES as DATA_TYPES } from '@/features/settings/constants';
import { validate } from './validation';
import { getError } from '@/api/validation';
import {
    InputType,
    SwitchType,
    TextAreaType,
    PhoneType,
    UrlType,
    NumberType,
    DropdownType,
    DateType,
    TimeType,
    DateTimeType
} from './Types';

type Props = {
    locale: String,
    fields: Array<any>,
    initialFieldValues: Array<any>,
    dispatch: Function,
    handleSubmit: Function,
    input: any
};

const CUSTOM_FIELD_FORM = 'CUSTOM_FIELD_FORM';
const FIELDS = 'fields';

class CustomFieldComponent extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = { visible: false, loading: true, oldValues: null };
    }

    componentDidMount() {
        this.initialValues();
    }

    initialValues = () => {
        const { fields = [], initialFieldValues, input } = this.props;
        const items = [];
        const hasInitialValues = hasFieldValue(initialFieldValues);

        if (hasFieldValue(fields)) {
            fields.map(field => {
                const {
                    id,
                    defaultAnswer = '',
                    default_answer = '',
                    is_required = false,
                    type = ''
                } = field;

                let value = defaultAnswer ?? default_answer;

                if (hasInitialValues) {
                    const defaultValue = lodash.find(initialFieldValues, {
                        custom_field_id: id
                    });

                    if (hasValue(defaultValue))
                        value =
                            defaultValue?.defaultAnswer ??
                            defaultValue?.default_answer;
                }

                items.push({
                    id,
                    value: value?.toString(),
                    required: is_required,
                    type
                });
            });

            input?.onChange?.(items);
            this.setFormField(FIELDS, items);
            this.setState({ loading: false, oldValues: items });
        }
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(CUSTOM_FIELD_FORM, field, value));
    };

    onToggle = () => {
        const { visible, oldValues } = this.state;
        const { initialFieldValues } = this.props;

        this.setState({ visible: !visible });

        if (!visible && hasFieldValue(initialFieldValues)) {
            this.setFormField(FIELDS, oldValues);
        }
    };

    checkSubmissionError = fields => {
        let errors = {};
        let fieldErrors = [];

        if (!hasFieldValue(fields)) return errors;

        fields.forEach((field, index) => {
            let fieldError = {};
            const { required, type, value } = field;

            if (required && type !== DATA_TYPES.SWITCH && !value) {
                if (value !== 0 || value !== '0')
                    fieldError['value'] = getError(field['value'], [
                        'requiredField'
                    ]);
                fieldErrors[index] = fieldError;
            }
        });

        fieldErrors.length && (errors.fields = fieldErrors);

        return errors;
    };

    throwError = errors => {
        throw new SubmissionError({ ...errors });
    };

    onSubmit = ({ fields }) => {
        const { input } = this.props;
        const errors = this.checkSubmissionError(fields);

        if (hasObjectLength(errors)) {
            this.throwError(errors);
            return;
        }

        this.onToggle();
        input?.onChange?.(fields);
        this.setState({ oldValues: fields });
    };

    bottomAction = () => {
        const { locale, handleSubmit } = this.props;
        return (
            <CtButton
                onPress={handleSubmit(this.onSubmit)}
                btnTitle={Lng.t('button.done', { locale })}
                containerStyle={styles.bottomButton}
            />
        );
    };

    FIELDS = ({ fields }) => {
        const { locale } = this.props;
        const items = [];

        if (fields.length === 0) return null;

        if (!hasFieldValue(this.props.fields)) return null;

        this.props.fields.map((field, index) => {
            const { type } = field;
            const name = `fields[${index}].value`;
            const fieldProps = {
                field,
                name,
                key: index,
                locale
            };

            switch (type) {
                case DATA_TYPES.INPUT:
                    items.push(<InputType {...fieldProps} />);
                    break;

                case DATA_TYPES.TEXTAREA:
                    items.push(<TextAreaType {...fieldProps} />);
                    break;

                case DATA_TYPES.PHONE:
                    items.push(<PhoneType {...fieldProps} />);
                    break;

                case DATA_TYPES.URL:
                    items.push(<UrlType {...fieldProps} />);
                    break;

                case DATA_TYPES.NUMBER:
                    items.push(<NumberType {...fieldProps} />);
                    break;

                case DATA_TYPES.DROPDOWN:
                    items.push(<DropdownType {...fieldProps} />);
                    break;

                case DATA_TYPES.SWITCH:
                    items.push(<SwitchType {...fieldProps} />);
                    break;

                case DATA_TYPES.DATE:
                    items.push(<DateType {...fieldProps} />);
                    break;

                case DATA_TYPES.TIME:
                    items.push(<TimeType {...fieldProps} />);
                    break;

                case DATA_TYPES.DATE_TIME:
                    items.push(<DateTimeType {...fieldProps} />);
                    break;

                default:
                    break;
            }
        });

        return items;
    };

    render() {
        const { locale, fields, meta } = this.props;
        const { visible, loading } = this.state;
        const isLoading = !hasFieldValue(fields) || loading;

        return (
            <View>
                <FakeInput
                    icon={ICONS.PAINT}
                    rightIcon={ICONS.RIGHT}
                    values={Lng.t('header.customFields', { locale })}
                    leftIconStyle={styles.paintIcon}
                    containerStyle={styles.container}
                    onChangeCallback={() => !isLoading && this.onToggle()}
                    meta={meta}
                />

                <SlideModal
                    defaultLayout
                    visible={visible}
                    onToggle={this.onToggle}
                    headerProps={{
                        leftIcon: ICONS.LEFT_LONG,
                        leftIconPress: () => this.onToggle(),
                        title: Lng.t('header.customFields', { locale }),
                        placement: 'center',
                        hasCircle: false,
                        noBorder: false,
                        transparent: false
                    }}
                    bottomAction={this.bottomAction()}
                >
                    <FieldArray name={FIELDS} component={this.FIELDS} />
                </SlideModal>
            </View>
        );
    }
}

//  Redux Forms
export const CustomField = reduxForm({
    form: CUSTOM_FIELD_FORM,
    validate
})(CustomFieldComponent);
