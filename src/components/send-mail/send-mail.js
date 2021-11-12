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
import {SlideModal} from '../slide-modal';
import {BaseInput} from '@/components';
import t from 'locales/use-translation';
import {Content} from '../content';
import {Editor} from '../editor';
import {getMailConfiguration} from '@/features/settings/actions';
import {commonSelector} from 'stores/common/selectors';
import {BaseButtonGroup, BaseButton} from '../base';
import {keyboardType} from '@/helpers/keyboard';
import {alertMe, hasObjectLength, hasTextLength, hasValue} from '@/constants';
import {EMAIL_REGEX} from '@/validator';

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
    this.props.reference?.(this);
    this.keyboardListener();
  }

  componentWillUnmount() {
    this.props.reference?.(undefined);
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

    if (!getMailConfigApiCalled || !hasObjectLength(values)) {
      return;
    }

    const errors = this.checkIsFieldsRequired(values);

    if (hasObjectLength(errors)) {
      throw new SubmissionError({...errors});
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
    this.props.dispatch(change('SEND_MAIL_FORM', field, value || undefined));
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
          component={BaseInput}
          hint={t('send_mail.from')}
          onSubmitEditing={() => mailRefs.to.focus()}
          keyboardType={keyboardType.EMAIL}
          isRequired
        />

        <Field
          name={emailField.to}
          component={BaseInput}
          hint={t('send_mail.to')}
          onSubmitEditing={() => mailRefs.subject.focus()}
          keyboardType={keyboardType.EMAIL}
          refLinkFn={ref => (mailRefs.to = ref)}
          isRequired
        />

        <Field
          name={emailField.subject}
          component={BaseInput}
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
    const isFetchingInitialData =
      !hasObjectLength(formValues) || !getMailConfigApiCalled;
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

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          onPress={handleSubmit(this.onSendMail)}
          show={!isKeyboardVisible}
          disabled={isFetchingInitialData}
        >
          {t('button.send')}
        </BaseButton>
      </BaseButtonGroup>
    );

    return (
      <SlideModal
        defaultLayout
        visible={visible}
        onToggle={this.onToggle}
        headerProps={headerProps}
        bottomAction={bottomAction}
      >
        <Content
          loadingProps={{
            is: isFetchingInitialData,
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
  formValues: getFormValues('SEND_MAIL_FORM')(state) || {},
  ...commonSelector(state)
});

const mapDispatchToProps = {
  getMailConfiguration
};
const SendMailForm = reduxForm({
  form: 'SEND_MAIL_FORM',
  validate
})(SendMailComponent);

export const SendMail = connect(
  mapStateToProps,
  mapDispatchToProps
)(SendMailForm);
