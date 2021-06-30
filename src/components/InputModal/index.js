import React, { Component } from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import { AnimateModal } from '../AnimateModal';
import { Field } from 'redux-form';
import { InputField } from '../InputField';
import { CtButton, CtDecorativeButton } from '../Button';
import Lng from '@/lang/i18n';
import { Icon } from 'react-native-elements';
import { colors } from '@/styles';
import { BUTTON_COLOR } from '@/constants';
import { Text } from '../Text';

type Iprops = {
    modalProps?: Object,
    headerTitle?: String,
    hint?: String,
    fieldName?: String,
    locale?: String,
    onRemove?: Function,
    onSubmit?: Function,
    showRemoveButton?: Boolean,
    reference?: any,
    onSubmitLoading?: Boolean
};

class inputModalComponent extends Component<Iprops> {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    componentDidMount() {
        this.props.reference?.(this);
    }

    componentWillUnmount() {
        this.props.reference?.(undefined);
    }

    onToggle = () => {
        this.setState(({ visible }) => {
            return { visible: !visible };
        });
    };

    BUTTON_VIEW = () => {
        const {
            showRemoveButton = false,
            onSubmitLoading = false,
            onRemoveLoading = false,
            onRemove,
            onSubmit,
            locale,
            theme
        } = this.props;

        return (
            <View style={styles.rowViewContainer(theme)}>
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
        const { fieldName, hint } = this.props;

        return (
            <View style={styles.fieldView}>
                <Field
                    name={fieldName}
                    component={InputField}
                    hint={hint}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCorrect: true
                    }}
                    isRequired
                />
            </View>
        );
    };

    HEADER_VIEW = () => {
        const { headerTitle, theme } = this.props;

        return (
            <View style={styles.rowViewContainer(theme)}>
                <View style={styles.rowView}>
                    <Text color={theme.input.color} style={styles.heading}>
                        {headerTitle}
                    </Text>
                </View>
                <View>
                    <CtDecorativeButton onPress={this.onToggle} withHitSlop>
                        <Icon
                            name="close"
                            size={28}
                            color={theme.listItem.fifth.color}
                        />
                    </CtDecorativeButton>
                </View>
            </View>
        );
    };

    render() {
        return (
            <AnimateModal
                visible={this.state.visible}
                onToggle={this.onToggle}
                modalProps={{ ...this.props?.modalProps }}
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
                        <View
                            style={styles.modalViewContainer(this.props.theme)}
                        >
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

export const InputModal = connect(
    ({ global }) => ({
        theme: global?.theme
    }),
    {}
)(inputModalComponent);
