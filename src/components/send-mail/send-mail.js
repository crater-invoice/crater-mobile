import React, {Component} from 'react';
import {Keyboard, ScrollView, StatusBar} from 'react-native';
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
import {alertMe, hasObjectLength} from '@/constants';
import {fetchMailConfig} from 'stores/setting/actions';
import {selectedCompanySettingSelector} from 'stores/company/selectors';
import {sendInvoice} from 'stores/invoice/actions';
import {navigation} from '@/navigation';
import Preview from './send-mail-preview';
import {sendEstimate} from 'stores/estimate/actions';
import {sendPaymentReceipt} from 'stores/payment/actions';
import {STATUS_BAR_CONTENT} from '@/utils';

class Modal extends Component<IProps> {
  keyboardShowListener: any;
  keyboardHideListener: any;

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      isKeyboardVisible: false,
      isPreview: false
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

  togglePreview = () => {
    const {isPreview} = this.state;
    const {formValues} = this.props;

    if (isPreview) {
      this.setState({isPreview: false});
      return;
    }

    const error = validateOnSubmit(formValues);

    if (error) {
      alert('Please complete correctly all of the required fields.');
      return;
    }

    this.setState({isPreview: true});
  };

  setInitialData = from => {
    const {dispatch, toEmail, type, selectedCompanySettings} = this.props;
    const subject = {
      invoice: 'New Invoice',
      estimate: 'New Estimate',
      payment: 'New Payment'
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

  onSendMail = async values => {
    const {onSendMail, dispatch, type, id, loading} = this.props;
    const error = validateOnSubmit(values);

    if (loading || !hasObjectLength(values) || error) {
      return;
    }

    function confirmationAlert(callback) {
      const alertMessage = {
        invoice: t('invoices.alert.send_invoice'),
        estimate: t('estimates.alert.send_estimate'),
        payment: t('payments.alert.send_payment')
      };
      alertMe({
        title: t('alert.title'),
        desc: alertMessage?.[type],
        showCancel: true,
        okPress: callback
      });
    }

    confirmationAlert(async () => {
      if (onSendMail) {
        await this.setState({visible: false});
        onSendMail?.(values);
        return;
      }

      const action = {
        invoice: sendInvoice,
        estimate: sendEstimate,
        payment: sendPaymentReceipt
      };

      const data = {
        id,
        params: values,
        onSuccess: async () => {
          await this.setState({visible: false});
          navigation.goBack();
        }
      };

      dispatch(action?.[type]?.(data));
    });
  };

  openModal = () => {
    this.setState({visible: true});
    StatusBar.setBarStyle(STATUS_BAR_CONTENT[(this.props.theme?.mode)], false);
  };

  closeModal = async () => {
    if (this.props.loading) return;
    this.setState({visible: false});
  };

  onBackPress = () =>
    this.state.isPreview ? this.togglePreview() : this.closeModal();

  render() {
    const {handleSubmit, formValues, theme, type, loading} = this.props;
    const {visible, isKeyboardVisible, isPreview} = this.state;
    const isFetchingInitialData = !hasObjectLength(formValues);
    let mailRefs = {};
    const headerTitle = {
      invoice: t('header.send_mail_invoice'),
      estimate: t('header.send_mail_estimate'),
      payment: t('header.send_mail_payment')
    };
    const headerProps = {
      leftIconPress: this.onBackPress,
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
          loading={loading}
        >
          {t('button.send')}
        </BaseButton>
        <BaseButton
          onPress={this.togglePreview}
          show={!isKeyboardVisible}
          disabled={isFetchingInitialData || loading}
          type="primary-outline"
          show={!this.props['hide-preview']}
        >
          {!isPreview
            ? t('button.preview')
            : t('recurring_invoices.dropdown.edit')}
        </BaseButton>
      </BaseButtonGroup>
    );

    return (
      <SlideModal
        defaultLayout
        visible={visible}
        onToggle={this.onBackPress}
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
          {isPreview ? (
            <Preview {...this.props} />
          ) : (
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
                disabled={this.props['disable-from-email']}
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
          )}
        </Content>
      </SlideModal>
    );
  }
}

const loadingSelector = state => {
  return (
    state.invoice?.isLoading ||
    state.estimate?.isLoading ||
    state.payment?.isLoading
  );
};

const mapStateToProps = state => ({
  formValues: getFormValues('SEND_MAIL_FORM')(state) || {},
  selectedCompanySettings: selectedCompanySettingSelector(state),
  loading: loadingSelector(state),
  endpointApi: state.common?.endpointApi,
  idToken: state.auth?.idToken,
  ...commonSelector(state)
});

const SendMailForm = reduxForm({
  form: 'SEND_MAIL_FORM',
  validate
})(Modal);

export const SendMail = connect(mapStateToProps)(SendMailForm);
