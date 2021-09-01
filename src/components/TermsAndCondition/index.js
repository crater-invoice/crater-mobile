// @flow

import React from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { CtButton } from '../Button';
import { AnimateModal } from '../AnimateModal';
import t from 'locales/use-translation';
import { BUTTON_TYPE, isIPhoneX } from '@/constants';

type IProps = {
    type: String,
    fieldName: String,
    props: Object
};

let defaultInputHeight = isIPhoneX() ? 250 : 220;

export class TermsAndCondition extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            height: defaultInputHeight,
            value: null,
            defaultValue: null
        };
    }

    componentDidMount() {
        this.props.termsConditionRef(this);
    }

    componentWillUnmount() {
        this.props.termsConditionRef(undefined);
    }

    isEditTermsCondition = () => {
        const {
            props: { type }
        } = this.props;
        return type.includes('EDIT');
    };

    hasInitialValue = () => {
        const {
            props: { formValues },
            fieldName
        } = this.props;
        let value = formValues[fieldName];
        return typeof value !== 'undefined' && value !== null && value !== '';
    };

    initialGlobalValue = () => {
        const {
            props: { formValues },
            fieldName
        } = this.props;
        const { defaultValue } = this.state;

        if (this.hasInitialValue()) {
            !defaultValue &&
                this.setState({ defaultValue: formValues[fieldName] });
            this.setFormField(
                fieldName,
                !defaultValue ? formValues[fieldName] : defaultValue
            );
        }
    };

    onToggle = () => {
        this.setState(({ visible }) => {
            return { visible: !visible };
        });

        const {
            props: { formValues },
            fieldName
        } = this.props;
        const { value, visible } = this.state;

        if (!visible) {
            if (this.isEditTermsCondition() && this.hasInitialValue()) {
                !value && this.setState({ value: formValues[fieldName] });
                this.setFormField(
                    fieldName,
                    !value ? formValues[fieldName] : value
                );
            } else {
                !value
                    ? this.initialGlobalValue()
                    : this.setFormField(fieldName, value);
            }
        }
    };

    setFormField = (field, value) => {
        const {
            props: { dispatch, form }
        } = this.props;
        dispatch(change(form, field, value));
    };

    onSave = () => {
        const {
            props: { formValues },
            fieldName
        } = this.props;

        this.hasInitialValue() &&
            this.setState({ value: formValues[fieldName] });

        this.onToggle();
    };

    BOTTOM_ACTION = () => {
        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={() => this.onToggle()}
                    btnTitle={t('button.cancel')}
                    type={BUTTON_TYPE.OUTLINE}
                    buttonOutlineStyle={styles.buttonOutline}
                />
                <CtButton
                    onPress={() => this.onSave()}
                    btnTitle={t('button.update')}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                />
            </View>
        );
    };

    render() {
        const { visible, height } = this.state;
        const { props, fieldName } = this.props;

        return (
            <AnimateModal visible={visible} onToggle={this.onToggle}>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={-20}
                    behavior="position"
                >
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View style={styles.modalViewContainer}>
                            {this.BOTTOM_ACTION()}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </AnimateModal>
        );
    }
}
