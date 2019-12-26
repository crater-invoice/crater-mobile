import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles'
import { AnimateModal } from '../AnimateModal';
import { Field } from 'redux-form';
import { InputField } from '../InputField';
import { CtButton } from '../Button';
import { BUTTON_COLOR } from '../../api/consts';
import Lng from '../../api/lang/i18n';
import { Icon } from 'react-native-elements';
import { colors } from '../../styles/colors';

type Iprops = {
    modalProps: Object,
    headerTitle: String,
    hint: String,
    fieldName: String,
    language: String,
    onToggle: Function,
    onRemove: Function,
    onSubmit: Function,
    visible: Boolean,
    showRemoveButton: Boolean,
}

export class InputModal extends Component<Iprops>{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    BUTTON_VIEW = () => {
        const {
            showRemoveButton = false,
            onRemove,
            onSubmit,
            language
        } = this.props

        return (
            <View style={styles.rowViewContainer}>
                {showRemoveButton && (
                    <View style={styles.rowView}>
                        <CtButton
                            onPress={() => onRemove && onRemove()}
                            btnTitle={Lng.t("button.remove", { locale: language })}
                            containerStyle={styles.handleBtn}
                            buttonColor={BUTTON_COLOR.DANGER}
                        />
                    </View>
                )}

                <View style={styles.rowView}>
                    <CtButton
                        onPress={() => onSubmit && onSubmit()}
                        btnTitle={Lng.t("button.save", { locale: language })}
                        containerStyle={styles.handleBtn}
                    />
                </View>
            </View>
        )
    }

    FIELD = () => {
        const { fieldName, hint, onSubmit } = this.props

        return (
            <View style={styles.fieldView}>
                <Field
                    name={fieldName}
                    component={InputField}
                    hint={hint}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCorrect: true,
                        onSubmitEditing: () => onSubmit && onSubmit()
                    }}
                    isRequired
                />
            </View>

        )
    }

    HEADER_VIEW = () => {
        const { headerTitle, onToggle } = this.props

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
        )
    }

    render() {
        const {
            modalProps,
            onToggle,
            visible = false,
        } = this.props

        return (
            <AnimateModal
                visible={visible}
                onToggle={() => onToggle && onToggle()}
                modalProps={{ ...modalProps }}
            >
                <View style={styles.modalViewContainer}>

                    {this.HEADER_VIEW()}

                    {this.FIELD()}

                    {this.BUTTON_VIEW()}

                </View>
            </AnimateModal>
        );
    }
}

