import React, {Component} from 'react';
import {Keyboard, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {
  reduxForm,
  Field,
  change,
  SubmissionError,
  getFormValues
} from 'redux-form';
import styles from './styles';
import {validate} from './validation';
import {SlideModal} from '../SlideModal';
import {InputField} from '../InputField';
import {ActionButton} from '../button';
import t from 'locales/use-translation';
import {Content} from '../content';
import {Editor} from '../editor';
import {getMailConfiguration} from '../../features/more/actions';
import {commonSelector} from 'stores/common/selectors';
import {
  alertMe,
  EMAIL_REGEX,
  hasObjectLength,
  hasTextLength,
  hasValue,
  keyboardType
} from '@/constants';

type IProps = {
  handleSubmit: () => void,
  onSendMail: () => void,
  headerTitle: string,
  alertDesc: string
};

const emailField = {
  from: 'from',
  to: 'to',
  subject: 'subject',
  msg: 'body'
};

const MAIL_FORM = 'sendMail/MAIL_FORM';

class SendMailComponent extends Component<IProps> {
  keyboardDidShowListener: any;
  keyboardDidHideListener: any;

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      getMailConfigApiCalled: false,
      isKeyboardVisible: false
    };
  }

  componentDidMount() {
    this.props.mailReference?.(this);
    this.keyboardListener();
  }

  componentWillUnmount() {
    this.props.mailReference?.(undefined);
    this.keyboardDidShowListener?.remove?.();
    this.keyboardDidHideListener?.remove?.();
  }

  keyboardListener = () => {
    this.keyboardDidShowListener = Keyboard?.addListener?.(
      'keyboardDidShow',
      () => {
        this.setState({isKeyboardVisible: true});
      }
    );
    this.keyboardDidHideListener = Keyboard?.addListener?.(
      'keyboardDidHide',
      () => {
        this.setState({isKeyboardVisible: false});
      }
    );
  };

  onSendMail = values => {
    const {alertDesc = '', onSendMail} = this.props;
    const {getMailConfigApiCalled} = this.state;

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
      title: t('alert.title'),
      desc: t(alertDesc),
      showCancel: true,
      okPress: () => {
        this.onToggle();
        setTimeout(() => onSendMail?.(values), 200);
      }
    });
  };

  checkIsFieldsRequired = values => {
    let errors = {};

    if (
      !hasValue(values?.[emailField.from]) ||
      !EMAIL_REGEX.test(values?.[emailField.from])
    ) {
      errors[emailField.from] = 'validation.email';
    }

    if (
      !hasValue(values?.[emailField.to]) ||
      !EMAIL_REGEX.test(values?.[emailField.to])
    ) {
      errors[emailField.to] = 'validation.email';
    }

    if (!hasValue(values?.[emailField.subject])) {
      errors[emailField.subject] = 'validation.required';
    }

    if (
      !hasValue(values?.[emailField.msg]) ||
      !hasTextLength(values?.[emailField.msg])
    ) {
      errors[emailField.msg] = 'validation.required';
    }

    return errors;
  };

  onToggle = async () => {
    const {visible} = this.state;
    await this.setState({visible: !visible});
    this.getConfig();
  };

  getConfig = () => {
    const {getMailConfiguration, user, body, subject} = this.props;
    const {getMailConfigApiCalled} = this.state;

    if (!getMailConfigApiCalled) {
      getMailConfiguration({
        body,
        onSuccess: ({from_mail, emailBody}) => {
          this.setState({getMailConfigApiCalled: true});
          this.setFormField(emailField.from, from_mail);
          this.setFormField(emailField.to, user?.email);
          this.setFormField(emailField.subject, subject);
          this.setFormField(emailField.msg, emailBody);
        }
      });
    }
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(MAIL_FORM, field, value || undefined));
  };

  Screen = () => {
    const {isKeyboardVisible} = this.state;
    let mailRefs = {};

    return (
      <ScrollView
        style={[isKeyboardVisible && {paddingBottom: 120}]}
        keyboardShouldPersistTaps="handled"
      >
        <Field
          name={emailField.from}
          component={InputField}
          hint={t('send_mail.from')}
          onSubmitEditing={() => mailRefs.to.focus()}
          keyboardType={keyboardType.EMAIL}
          isRequired
        />

        <Field
          name={emailField.to}
          component={InputField}
          hint={t('send_mail.to')}
          onSubmitEditing={() => mailRefs.subject.focus()}
          keyboardType={keyboardType.EMAIL}
          refLinkFn={ref => (mailRefs.to = ref)}
          isRequired
        />

        <Field
          name={emailField.subject}
          component={InputField}
          hint={t('send_mail.subject')}
          refLinkFn={ref => (mailRefs.subject = ref)}
          isRequired
        />

        <Editor
          {...this.props}
          name={emailField.msg}
          label={'send_mail.body'}
          isRequired
          showPreview
        />
      </ScrollView>
    );
  };

  render() {
    const {handleSubmit, headerTitle = '', formValues, theme} = this.props;
    const {visible, getMailConfigApiCalled, isKeyboardVisible} = this.state;

    const headerProps = {
      leftIconPress: () => this.onToggle(),
      title: t(headerTitle),
      rightIcon: 'paper-plane',
      rightIconPress: handleSubmit(this.onSendMail),
      placement: 'center',
      hasCircle: false,
      noBorder: false,
      transparent: false
    };

    const bottomAction = [
      {
        label: 'button.send',
        onPress: handleSubmit(this.onSendMail),
        show: !isKeyboardVisible
      }
    ];

    return (
      <SlideModal
        defaultLayout
        visible={visible}
        onToggle={this.onToggle}
        headerProps={headerProps}
        bottomAction={<ActionButton buttons={bottomAction} />}
      >
        <Content
          loadingProps={{
            is: !hasObjectLength(formValues) || !getMailConfigApiCalled,
            style: styles.loadingContainer
          }}
          theme={theme}
        >
          {this.Screen()}
        </Content>
      </SlideModal>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues(MAIL_FORM)(state) || {},
  ...commonSelector(state)
});

const mapDispatchToProps = {
  getMailConfiguration
};
const SendMailReduxForm = reduxForm({
  form: MAIL_FORM,
  validate
})(SendMailComponent);

export const SendMail = connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMailReduxForm);
