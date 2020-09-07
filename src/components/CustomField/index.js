import React, { Component } from 'react';
import { View } from 'react-native';
import { reduxForm, FieldArray, change } from 'redux-form';
import lodash from 'lodash';
import { FakeInput } from '../FakeInput';
import styles from './styles';
import { ICONS } from '@/config';
import Lng from '@/api/lang/i18n';
import { SlideModal } from '../SlideModal';
import { CtButton } from '../Button';
import { hasFieldValue, hasValue } from '@/api/global';
import { CUSTOM_FIELD_DATA_TYPES as DATA_TYPES } from '@/features/settings/constants';
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
    handleSubmit: Function
};

const CUSTOM_FIELD_FORM = 'CUSTOM_FIELD_FORM';
const FIELDS = 'fields';

class CustomFieldComponent extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = { visible: false, loading: true };
    }

    componentDidMount() {
        this.initialValues();
    }

    initialValues = () => {
        const { fields = [], initialFieldValues } = this.props;
        const items = [];

        if (hasFieldValue(initialFieldValues) && hasFieldValue(fields)) {
            fields.map(field => {
                const { id, defaultAnswer = '', default_answer = '' } = field;
                let value = defaultAnswer ?? default_answer;

                const defaultValue = lodash.find(initialFieldValues, {
                    custom_field_id: id
                });

                if (hasValue(defaultValue))
                    value =
                        defaultValue?.defaultAnswer ??
                        defaultValue?.default_answer;

                items.push({ id, value });
            });

            this.setFormField(FIELDS, items);
            this.setState({ loading: false });
        } else if (hasFieldValue(fields)) {
            fields.map(field => {
                const { id, defaultAnswer = '', default_answer = '' } = field;
                items.push({ id, value: defaultAnswer ?? default_answer });
            });
            this.setFormField(FIELDS, items);
            this.setState({ loading: false });
        }
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(CUSTOM_FIELD_FORM, field, value));
    };

    onToggle = () => {
        this.setState(({ visible }) => ({ visible: !visible }));
    };

    onSubmit = ({ fields }) => {
        const { input } = this.props;

        this.onToggle();
        input?.onChange?.(fields);
    };

    bottomAction = () => {
        const { locale, handleSubmit } = this.props;
        return (
            <CtButton
                onPress={handleSubmit(handleSubmit(this.onSubmit))}
                btnTitle={Lng.t('button.done', { locale })}
                containerStyle={styles.bottomButton}
            />
        );
    };

    FIELDS = ({ fields }) => {
        const items = [];

        if (fields.length === 0) return null;

        if (!hasFieldValue(this.props.fields)) return null;

        this.props.fields.map((field, index) => {
            const { type } = field;
            const name = `fields[${index}].value`;

            switch (type) {
                case DATA_TYPES.INPUT:
                    items.push(
                        <InputType field={field} name={name} key={index} />
                    );
                    break;

                case DATA_TYPES.TEXTAREA:
                    items.push(
                        <TextAreaType field={field} name={name} key={index} />
                    );
                    break;

                case DATA_TYPES.PHONE:
                    items.push(
                        <PhoneType field={field} name={name} key={index} />
                    );
                    break;

                case DATA_TYPES.URL:
                    items.push(
                        <UrlType field={field} name={name} key={index} />
                    );
                    break;

                case DATA_TYPES.NUMBER:
                    items.push(
                        <NumberType field={field} name={name} key={index} />
                    );
                    break;

                case DATA_TYPES.DROPDOWN:
                    items.push(
                        <DropdownType field={field} name={name} key={index} />
                    );
                    break;

                case DATA_TYPES.SWITCH:
                    items.push(
                        <SwitchType field={field} name={name} key={index} />
                    );
                    break;

                case DATA_TYPES.DATE:
                    items.push(
                        <DateType field={field} name={name} key={index} />
                    );
                    break;

                case DATA_TYPES.TIME:
                    items.push(
                        <TimeType field={field} name={name} key={index} />
                    );
                    break;

                case DATA_TYPES.DATE_TIME:
                    items.push(
                        <DateTimeType field={field} name={name} key={index} />
                    );
                    break;

                default:
                    break;
            }
        });

        return items;
    };

    render() {
        const { locale, fields } = this.props;
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
    form: CUSTOM_FIELD_FORM
})(CustomFieldComponent);
