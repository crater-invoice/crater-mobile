// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field, change, SubmissionError } from 'redux-form';
import styles from './styles';
import { validate } from './validation';
import { SlideModal } from '../SlideModal';
import { InputField } from '../InputField';
import { CtButton } from '../Button';
import Lng from '@/lang/i18n';
import { alertMe, hasObjectLength, hasValue } from '@/constants';
import { getMailConfiguration } from '../../features/more/actions';
import { Content } from '../Content';

type IProps = {
    handleSubmit: Function,
    onSendMail: Function,
    headerTitle: String,
    alertDesc: String
};

const emailField = {
    from: 'from',
    to: 'to',
    subject: 'subject',
    msg: 'body'
};

const MAIL_FORM = 'sendMail/MAIL_FORM';

class SendMailComponent extends Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            getMailConfigApiCalled: false
        };
    }

    componentDidMount() {
        this.props.mailReference(this);
    }

    componentWillUnmount() {
        this.props.mailReference(undefined);
    }

    onSendMail = values => {
        const { locale, alertDesc = '', onSendMail } = this.props;
        const { getMailConfigApiCalled } = this.state;

        if (!getMailConfigApiCalled) {
            return;
        }

        const errors = this.checkIsFieldsRequired(values);

        if (hasObjectLength(errors)) {
            throw new SubmissionError({
                ...errors
            });
        }

        alertMe({
            title: Lng.t('alert.title', { locale }),
            desc: Lng.t(alertDesc, { locale }),
            showCancel: true,
            okPress: () => {
                this.onToggle();
                setTimeout(() => onSendMail?.(values), 200);
            }
        });
    };

    checkIsFieldsRequired = values => {
        let errors = {};

        if (!hasValue(values?.[emailField.from])) {
            errors[emailField.from] = 'validation.required';
        }

        if (!hasValue(values?.[emailField.to])) {
            errors[emailField.to] = 'validation.required';
        }

        if (!hasValue(values?.[emailField.subject])) {
            errors[emailField.subject] = 'validation.required';
        }

        if (!hasValue(values?.[emailField.msg])) {
            errors[emailField.msg] = 'validation.required';
        }

        return errors;
    };

    onToggle = async () => {
        const { visible } = this.state;
        await this.setState({ visible: !visible });
        this.getConfig();
    };

    getConfig = () => {
        const { getMailConfiguration, user } = this.props;
        const { getMailConfigApiCalled } = this.state;

        if (!getMailConfigApiCalled) {
            getMailConfiguration({
                onSuccess: ({ from_mail }) => {
                    this.setState({ getMailConfigApiCalled: true });
                    this.setFormField(emailField.from, from_mail);
                    this.setFormField(emailField.to, user?.email);
                }
            });
        }
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(MAIL_FORM, field, value || undefined));
    };

    BOTTOM_ACTION = (handleSubmit, locale) => {
        return (
            <View style={styles.submitButton}>
                <View style={{ flex: 1 }}>
                    <CtButton
                        onPress={handleSubmit(this.onSendMail)}
                        btnTitle={Lng.t('button.send', { locale })}
                        containerStyle={styles.handleBtn}
                    />
                </View>
            </View>
        );
    };

    Screen = locale => {
        let mailRefs = {};

        return (
            <>
                <Field
                    name={emailField.from}
                    component={InputField}
                    hint={Lng.t('sendMail.from', { locale })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        keyboardType: 'email-address',
                        onSubmitEditing: () => mailRefs.to.focus()
                    }}
                    isRequired
                />

                <Field
                    name={emailField.to}
                    component={InputField}
                    hint={Lng.t('sendMail.to', { locale })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        keyboardType: 'email-address',
                        onSubmitEditing: () => mailRefs.subject.focus()
                    }}
                    refLinkFn={ref => (mailRefs.to = ref)}
                    isRequired
                />

                <Field
                    name={emailField.subject}
                    component={InputField}
                    hint={Lng.t('sendMail.subject', { locale })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCorrect: true,
                        onSubmitEditing: () => mailRefs.text.focus()
                    }}
                    refLinkFn={ref => (mailRefs.subject = ref)}
                    isRequired
                />

                <Field
                    name={emailField.msg}
                    component={InputField}
                    hint={Lng.t('sendMail.body', { locale })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        multiline: true
                    }}
                    height={170}
                    refLinkFn={ref => (mailRefs.text = ref)}
                    isRequired
                />
            </>
        );
    };

    render() {
        const { handleSubmit, headerTitle = '', locale } = this.props;
        const { visible, getMailConfigApiCalled } = this.state;

        return (
            <SlideModal
                defaultLayout
                visible={visible}
                onToggle={this.onToggle}
                headerProps={{
                    leftIconPress: () => this.onToggle(),
                    title: Lng.t(headerTitle, { locale }),
                    rightIcon: 'paper-plane',
                    rightIconPress: handleSubmit(this.onSendMail),
                    placement: 'center',
                    hasCircle: false,
                    noBorder: false,
                    transparent: false
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit, locale)}
            >
                <Content
                    loadingProps={{
                        is: !getMailConfigApiCalled,
                        style: styles.loadingContainer
                    }}
                >
                    {this.Screen(locale)}
                </Content>
            </SlideModal>
        );
    }
}

const mapStateToProps = ({ global }) => ({
    locale: global?.locale
});

const mapDispatchToProps = {
    getMailConfiguration
};
//  Redux Forms
const SendMailReduxForm = reduxForm({
    form: MAIL_FORM,
    validate
})(SendMailComponent);

//  connect
export const SendMail = connect(
    mapStateToProps,
    mapDispatchToProps
)(SendMailReduxForm);
