import React, {Component} from 'react';
import {Keyboard, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {reduxForm, Field, getFormValues, initialize} from 'redux-form';
import styles from './styles';
import {validate, validateOnSubmit} from './validation';
import {SlideModal} from '../slide-modal';
import {BaseInput} from '@/components';
import t from 'locales/use-translation';
import {Content} from '../content';
import {Editor} from '../editor';
import {commonSelector} from 'stores/common/selectors';
import {BaseButtonGroup, BaseButton} from '../base';
import {keyboardType} from '@/helpers/keyboard';
import {hasObjectLength} from '@/constants';
import {fetchMailConfig} from 'stores/setting/actions';
import {selectedCompanySettingSelector} from '@/stores/company/selectors';

class Modal extends Component<IProps> {
  keyboardShowListener: any;
  keyboardHideListener: any;

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      isKeyboardVisible: false
    };
  }

  componentDidMount() {
    this.props.reference?.(this);
    this.keyboardListener();
    this.loadData();
  }

  componentWillUnmount() {
    this.keyboardShowListener?.remove?.();
    this.keyboardHideListener?.remove?.();
  }

  keyboardListener = () => {
    this.keyboardShowListener = Keyboard?.addListener?.('keyboardDidShow', () =>
      this.setState({isKeyboardVisible: true})
    );
    this.keyboardHideListener = Keyboard?.addListener?.('keyboardDidHide', () =>
      this.setState({isKeyboardVisible: false})
    );
  };

  loadData = () => {
    const {dispatch} = this.props;
    dispatch(fetchMailConfig(({from_mail}) => this.setInitialData(from_mail)));
  };

  setInitialData = from => {
    const {dispatch, toEmail, type, selectedCompanySettings} = this.props;
    const subject = {
      invoice: 'New Invoice',
      estimate: 'New Estimate',
      payment: ''
    };

    const body = {
      invoice: selectedCompanySettings?.invoice_mail_body,
      estimate: selectedCompanySettings?.estimate_mail_body,
      payment: selectedCompanySettings?.payment_mail_body
    };

    const data = {
      from,
      to: toEmail,
      subject: subject[type],
      body: body[type]
    };
    dispatch(initialize('SEND_MAIL_FORM', data));
  };

  onSendMail = values => {
    const error = validateOnSubmit(values);

    if (!hasObjectLength(values) || error) {
      return;
    }

    this.closeModal();
    setTimeout(() => this.props.onSendMail?.(values), 300);
  };

  openModal = () => {
    this.setState({visible: true});
  };

  closeModal = async () => {
    this.setState({visible: false});
  };

  render() {
    const {handleSubmit, formValues, theme, type} = this.props;
    const {visible, isKeyboardVisible} = this.state;
    const isFetchingInitialData = !hasObjectLength(formValues);
    let mailRefs = {};
    const headerTitle = {
      invoice: t('header.send_mail_invoice'),
      estimate: t('header.send_mail_estimate'),
      payment: t('header.send_mail_payment')
    };
    const headerProps = {
      leftIconPress: this.closeModal,
      title: headerTitle[type],
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
        onToggle={this.closeModal}
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
          <ScrollView
            style={[isKeyboardVisible && {paddingBottom: 120}]}
            keyboardShouldPersistTaps="handled"
          >
            <Field
              name="from"
              component={BaseInput}
              hint={t('send_mail.from')}
              onSubmitEditing={() => mailRefs.to.focus()}
              keyboardType={keyboardType.EMAIL}
              isRequired
            />

            <Field
              name="to"
              component={BaseInput}
              hint={t('send_mail.to')}
              onSubmitEditing={() => mailRefs.subject.focus()}
              keyboardType={keyboardType.EMAIL}
              refLinkFn={ref => (mailRefs.to = ref)}
              isRequired
            />

            <Field
              name="subject"
              component={BaseInput}
              hint={t('send_mail.subject')}
              refLinkFn={ref => (mailRefs.subject = ref)}
              isRequired
            />

            <Editor
              {...this.props}
              name="body"
              label="send_mail.body"
              isRequired
              showPreview
              reference={null}
            />
          </ScrollView>
        </Content>
      </SlideModal>
    );
  }
}

const mapStateToProps = state => ({
  formValues: getFormValues('SEND_MAIL_FORM')(state) || {},
  selectedCompanySettings: selectedCompanySettingSelector(state),
  ...commonSelector(state)
});

const SendMailForm = reduxForm({
  form: 'SEND_MAIL_FORM',
  validate
})(Modal);

export const SendMail = connect(mapStateToProps)(SendMailForm);
