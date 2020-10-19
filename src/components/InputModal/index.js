import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { styles } from './styles';
import { AnimateModal } from '../AnimateModal';
import { Field } from 'redux-form';
import { InputField } from '../InputField';
import { CtButton } from '../Button';
import Lng from '@/lang/i18n';
import { Icon } from 'react-native-elements';
import { colors } from '@/styles';
import { BUTTON_COLOR } from '@/constants';

type Iprops = {
    modalProps: Object,
    headerTitle: String,
    hint: String,
    fieldName: String,
    locale: String,
    onToggle: Function,
    onRemove: Function,
    onSubmit: Function,
    visible: Boolean,
    showRemoveButton: Boolean
};

export class InputModal extends Component<Iprops> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    BUTTON_VIEW = () => {
        const {
            showRemoveButton = false,
            onSubmitLoading = false,
            onRemoveLoading = false,
            onRemove,
            onSubmit,
            locale
        } = this.props;

        return (
            <View style={styles.rowViewContainer}>
                {showRemoveButton && (
                    <View style={styles.rowView}>
                        <CtButton
                            onPress={() => onRemove?.()}
                            btnTitle={Lng.t('button.remove', {
                                locale
                            })}
                            containerStyle={styles.handleBtn}
                            buttonColor={BUTTON_COLOR.DANGER}
                            loading={onRemoveLoading}
                        />
                    </View>
                )}

                <View style={styles.rowView}>
                    <CtButton
                        onPress={() => onSubmit?.()}
                        btnTitle={Lng.t('button.save', { locale })}
                        containerStyle={styles.handleBtn}
                        loading={onSubmitLoading}
                    />
                </View>
            </View>
        );
    };

    FIELD = () => {
        const { fieldName, hint, onSubmit } = this.props;

        return (
            <View style={styles.fieldView}>
                <Field
                    name={fieldName}
                    component={InputField}
                    hint={hint}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCorrect: true,
                        autoFocus: true
                    }}
                    isRequired
                />
            </View>
        );
    };

    HEADER_VIEW = () => {
        const { headerTitle, onToggle } = this.props;

        return (
            <View style={styles.rowViewContainer}>
                <View style={styles.rowView}>
                    <Text style={styles.heading}>{headerTitle}</Text>
                </View>
                <View>
                    <Icon
                        name="close"
                        size={28}
                        color={colors.dark}
                        onPress={() => onToggle && onToggle()}
                    />
                </View>
            </View>
        );
    };

    render() {
        const { modalProps, onToggle, visible = false } = this.props;

        return (
            <AnimateModal
                visible={visible}
                onToggle={() => onToggle && onToggle()}
                modalProps={{ ...modalProps }}
            >
                <KeyboardAvoidingView
                    keyboardVerticalOffset={0}
                    behavior="position"
                >
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.modalViewContainer}>
                            {this.HEADER_VIEW()}

                            {this.FIELD()}

                            {this.BUTTON_VIEW()}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </AnimateModal>
        );
    }
}
