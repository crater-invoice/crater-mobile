// @flow

import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { CtButton } from '../Button';
import { BUTTON_TYPE } from '../../api/consts';
import { AnimateModal } from '../AnimateModal';
import { isIPhoneX } from '../../api/helper';
import { CustomizeAddresses } from '../../features/settings/components/CustomizeAddresses';
import { CUSTOMIZE_ADDRESSES_ACTION } from '../../features/settings/constants';
import Lng from '../../api/lang/i18n';

type IProps = {
    type: String,
    fieldName: String,
    props: Object,
}

let defaultInputHeight = isIPhoneX() ? 250 : 220
let maximumInputHeight = isIPhoneX() ? 530 : 450

export class TermsAndCondition extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            height: defaultInputHeight,
            value: null,
            defaultValue: null
        }
    }

    componentWillUpdate(nextProps, nextState) {

        const { props: { navigation, formValues }, fieldName } = nextProps
        const { value } = nextState
        const visible = navigation.getParam('visibleTermsCondition', false)

        if (visible) {
            navigation.setParams({ 'visibleTermsCondition': false })

            if (this.isEditTermsCondition() && this.hasInitialValue()) {
                !value && this.setState({ value: formValues[fieldName] })
                this.setFormField(fieldName, !value ? formValues[fieldName] : value)
            }
            else {
                !value ? this.initialGlobalValue() : this.setFormField(fieldName, value)
            }

            this.onToggle()
        }
    }


    isEditTermsCondition = () => {
        const { props: { type } } = this.props
        return type.includes('EDIT')
    }

    hasInitialValue = () => {
        const { props: { formValues }, fieldName } = this.props
        let value = formValues[fieldName]
        return typeof value !== 'undefined' && value !== null && value !== ''
    }

    initialGlobalValue = () => {
        const { props: { formValues }, fieldName } = this.props
        const { defaultValue } = this.state

        if (this.hasInitialValue()) {
            !defaultValue && this.setState({ defaultValue: formValues[fieldName] })
            this.setFormField(fieldName, !defaultValue ? formValues[fieldName] : defaultValue)
        }
    }

    onToggle = () => {
        this.setState((prevState) => {
            return { visible: !prevState.visible }
        });
    }

    setFormField = (field, value) => {
        const { props: { dispatch, form } } = this.props
        dispatch(change(form, field, value));
    };

    updateInputHeightStyle = (height) => {

        let inputHeight = 0

        if (height <= defaultInputHeight)
            inputHeight = defaultInputHeight
        else if (height >= maximumInputHeight)
            inputHeight = maximumInputHeight
        else
            inputHeight = height


        this.setState({ height: inputHeight })

    }

    onSave = () => {
        const { props: { formValues }, fieldName } = this.props

        this.hasInitialValue() && this.setState({ value: formValues[fieldName] })

        this.onToggle()
    }

    BOTTOM_ACTION = () => {
        const { props: { language } } = this.props
        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={() => this.onToggle()}
                    btnTitle={Lng.t("button.cancel", { locale: language })}
                    type={BUTTON_TYPE.OUTLINE}
                    buttonOutlineStyle={styles.buttonOutline}
                />
                <CtButton
                    onPress={() => this.onSave()}
                    btnTitle={Lng.t("button.update", { locale: language })}
                    containerStyle={styles.handleBtn}
                    buttonContainerStyle={styles.buttonContainer}
                />
            </View>
        )
    }

    render() {

        const { visible, height } = this.state
        const { props, fieldName } = this.props

        const TERMS_CONDITION_INSERT_FIELDS = [{
            label: "termsCondition.title",
            value: CUSTOMIZE_ADDRESSES_ACTION.TERMS_AND_CONDITION
        }]

        return (
            <AnimateModal
                visible={visible}
                onToggle={this.onToggle}
            >
                <KeyboardAvoidingView
                    keyboardVerticalOffset={-80}
                    behavior="position"
                >
                    <View style={styles.modalViewContainer}>


                        <CustomizeAddresses
                            customizeProps={props}
                            addresses={TERMS_CONDITION_INSERT_FIELDS}
                            addressesProps={{
                                insertFieldContainerStyle: styles.insertFieldContainer,
                                inputProps: {
                                    onContentSizeChange: (e) => this.updateInputHeightStyle(e.nativeEvent.contentSize.height),
                                },
                                height: height,
                                hintStyle: styles.label
                            }}
                            bodyContainerStyle={styles.bodyContainerStyle}
                            modalProps={{
                                coverScreen: true,
                            }}
                        />

                        {this.BOTTOM_ACTION()}

                    </View>
                </KeyboardAvoidingView>
            </AnimateModal>
        );
    }
}
