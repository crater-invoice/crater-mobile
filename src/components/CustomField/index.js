import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { reduxForm, Field, FieldArray, change } from 'redux-form';
import { FakeInput } from '../FakeInput';
import styles from './styles';
import { ICONS } from '@/config';
import Lng from '@/api/lang/i18n';
import { SlideModal } from '../SlideModal';
import { CtButton } from '../Button';
import { InputField } from '../InputField';
import { hasFieldValue } from '@/api/global';
import { InputType } from './Types';
import { CUSTOM_FIELD_DATA_TYPES as DATA_TYPES } from '@/features/settings/constants';

type Props = {
    locale: String,
    fields: Array<any>,
    dispatch: Function,
    handleSubmit: Function
};

const CUSTOM_FIELD_FORM = 'CUSTOM_FIELD_FORM';
const FIELDS = 'fields';

class CustomFieldComponent extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    componentDidMount() {
        this.initialValues();
    }

    initialValues = () => {
        const { fields = [] } = this.props;
        const items = [];

        if (hasFieldValue(fields)) {
            fields.map(field => {
                const { id, defaultAnswer = '', default_answer = '' } = field;
                items.push({ id, value: defaultAnswer ?? default_answer });
            });
            this.setFormField(FIELDS, items);
        }
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(CUSTOM_FIELD_FORM, field, value));
    };

    onToggle = () => {
        this.setState(({ visible }) => ({ visible: !visible }));
    };

    onSubmit = values => {
        console.log({ values });
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
        // console.log({ fields })
        const items = [];

        if (fields.length === 0) return null;

        if (!hasFieldValue(this.props.fields)) return null;

        this.props.fields.map((field, index) => {
            const { type } = field;

            switch (type) {
                case DATA_TYPES.INPUT:
                    items.push(
                        <InputType
                            field={field}
                            name={`fields[${index}].value`}
                        />
                    );
                    break;

                // case DATA_TYPES.TEXTAREA:
                //     optionView = [DEFAULT_TEXTAREA_FIELD(), PLACEHOLDER_FIELD()]
                //     break

                // case DATA_TYPES.PHONE:
                //     optionView = [DEFAULT_INPUT_FIELD(), PLACEHOLDER_FIELD()]
                //     break

                // case DATA_TYPES.URL:
                //     optionView = [DEFAULT_INPUT_FIELD(), PLACEHOLDER_FIELD()]
                //     break

                // case DATA_TYPES.NUMBER:
                //     optionView = [DEFAULT_NUMBER_FIELD(), PLACEHOLDER_FIELD()]
                //     break

                // case DATA_TYPES.DROPDOWN:
                //     optionView = [
                //         SELECT_FIELD_OPTIONS(),
                //         SELECT_FIELD_DEFAULT_VALUE(),
                //         PLACEHOLDER_FIELD()
                //     ]
                //     break

                // case DATA_TYPES.SWITCH:
                //     optionView = [DEFAULT_CHECKBOX_FIELD()]
                //     break

                // case DATA_TYPES.DATE:
                //     optionView = [DEFAULT_DATE_FIELD(), PLACEHOLDER_FIELD()]
                //     break

                // case DATA_TYPES.TIME:
                //     optionView = [DEFAULT_TIME_FIELD(), PLACEHOLDER_FIELD()]
                //     break

                // case DATA_TYPES.DATE_TIME:
                //     optionView = [DEFAULT_DATE_TIME_FIELD(), PLACEHOLDER_FIELD()]

                default:
                    break;
            }
            // console.log(field)

            // items.push(InputType())
            // items.push(
            //     <Field
            //         key={index}
            //         name={`fields[${index}].value`}
            //         component={InputField}
            //         hint={'Enter Name'}
            //         inputProps={{
            //             returnKeyType: 'next',
            //             autoCorrect: true
            //         }}
            //     />
            // )
        });

        return items;
    };

    render() {
        const { locale } = this.props;
        const { visible } = this.state;

        return (
            <View>
                <FakeInput
                    icon={ICONS.PAINT}
                    rightIcon={ICONS.RIGHT}
                    values={Lng.t('header.customFields', { locale })}
                    leftIconStyle={styles.paintIcon}
                    containerStyle={styles.container}
                    onChangeCallback={this.onToggle}
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
