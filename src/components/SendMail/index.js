// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field, change } from 'redux-form';
import styles from './styles';
import { validate } from './validation';
import { SlideModal } from '../SlideModal';
import { InputField } from '../InputField';
import { CtButton } from '../Button';
import Lng from '../../api/lang/i18n';
import { alertMe } from '../../api/global';
import { getMailConfiguration } from '../../features/more/actions';
import { getSettingItem } from '../../features/settings/actions';
import { Content } from '../Content';
import { store } from '../../store';

type IProps = {
    handleSubmit: Function,
    onSendMail: Function,
    headerTitle: String,
    props: Object,
    alertDesc: String
};

const emailField = {
    from: 'from',
    to: 'to',
    subject: 'subject',
    msg: 'body'
}

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

    setDefaultValues = (mailDrivers = null) => {
        const {
            mailDriver,
            company: { name },
            props: { formValues: { customer, invoice_number } }
        } = this.props
        const subject = `Invoice - ${invoice_number} from ${name}`
        const message = `Dear ${customer?.name},\nYour Invoice can be viewed, printed and downloaded as PDF from the link below.`

        this.setFormField(emailField.from, mailDrivers?.from_mail ?? mailDriver?.from_mail)
        this.setFormField(emailField.to, customer?.email)
        this.setFormField(emailField.subject, subject)
    }

    onToggle = () => {

        this.setState(({ visible }) => {
            return { visible: !visible }
        });

        if (!this.state.getMailConfigApiCalled) {

            store.dispatch(getMailConfiguration({
                onResult: (mailDrivers) => {
                    this.setDefaultValues(mailDrivers)
                    this.setState({ getMailConfigApiCalled: true })
                }
            }))

            // getSettingItem({
            //     key: 'default_body',
            //     onResult: (val) => this.setFormField(emailField.msg, val)
            // })
        }
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(MAIL_FORM, field, value || undefined));
    };

    BOTTOM_ACTION = (handleSubmit, language) => {
        return (
            <View style={styles.submitButton}>
                <View style={{ flex: 1 }}>
                    <CtButton
                        onPress={handleSubmit(this.onSendMail)}
                        btnTitle={Lng.t("button.send", { locale: language })}
                        containerStyle={styles.handleBtn}
                    />
                </View>
            </View>
        )
    }

    onSendMail = ({ from = '', to = '', subject = '', body = '' }) => {
        const {
            props: { language },
            alertDesc = '',
            onSendMail
        } = this.props

        const params = {
            from,
            to,
            subject,
            body
        }

        if (from && to && subject) {
            alertMe({
                title: Lng.t("alert.title", { locale: language }),
                desc: Lng.t(alertDesc, { locale: language }),
                showCancel: true,
                okPress: () => {
                    this.onToggle()
                    onSendMail && onSendMail(params)
                }
            })
        }
    }

    Screen = (language) => {

        let mailRefs = {}

        return (
            <View>
                <Field
                    name={emailField.from}
                    component={InputField}
                    hint={Lng.t("sendMail.from", { locale: language })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        keyboardType: 'email-address',
                        onSubmitEditing: () => {
                            mailRefs.to.focus();
                        }
                    }}
                />

                <Field
                    name={emailField.to}
                    component={InputField}
                    hint={Lng.t("sendMail.to", { locale: language })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        keyboardType: 'email-address',
                        onSubmitEditing: () => {
                            mailRefs.subject.focus();
                        }
                    }}
                    refLinkFn={(ref) => {
                        mailRefs.to = ref;
                    }}
                />

                <Field
                    name={emailField.subject}
                    component={InputField}
                    hint={Lng.t("sendMail.subject", { locale: language })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCorrect: true,
                        onSubmitEditing: () => {
                            mailRefs.text.focus();
                        }
                    }}
                    refLinkFn={(ref) => {
                        mailRefs.subject = ref;
                    }}
                />

                <Field
                    name={emailField.msg}
                    component={InputField}
                    hint={Lng.t("sendMail.body", { locale: language })}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        multiline: true
                    }}
                    height={300}
                    autoCorrect={true}
                    refLinkFn={(ref) => {
                        mailRefs.text = ref;
                    }}
                />
            </View>
        )
    }

    render() {
        const {
            handleSubmit,
            headerTitle = '',
            loading = true,
            props: { language }
        } = this.props
        const { visible } = this.state

        return (
            <SlideModal
                defaultLayout
                visible={visible}
                onToggle={this.onToggle}
                headerProps={{
                    leftIcon: "long-arrow-alt-left",
                    leftIconPress: () => this.onToggle(),
                    title: Lng.t(headerTitle, { locale: language }),
                    rightIcon: "paper-plane",
                    rightIconPress: handleSubmit(this.onSendMail),
                    placement: "center",
                    hasCircle: false,
                    noBorder: false,
                    transparent: false,
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit, language)}
            >
                <Content loadingProps={{ is: loading, style: styles.loadingContainer }}>
                    {this.Screen(language)}
                </Content>
            </SlideModal>
        );
    }
}

const mapStateToProps = ({
    global: { mailDriver, company },
    more: { loading: { getMailConfigLoading } },
    settings: { loading: { getSettingItemLoading } }
}) => ({
    mailDriver,
    company,
    loading: getMailConfigLoading || getSettingItemLoading
});

const mapDispatchToProps = {
    getMailConfiguration,
    getSettingItem,
};
//  Redux Forms
const SendMailReduxForm = reduxForm({
    form: MAIL_FORM,
    validate
})(SendMailComponent)

//  connect
export const SendMail = connect(
    mapStateToProps,
    mapDispatchToProps
)(SendMailReduxForm);

