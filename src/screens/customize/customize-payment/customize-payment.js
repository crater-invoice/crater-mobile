import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Field, change} from 'redux-form';
import styles from './customize-payment-style';
import {
  DefaultLayout,
  ToggleSwitch,
  InputField,
  CtDivider,
  Tabs,
  Editor,
  PLACEHOLDER_TYPES as TYPE,
  Text,
  ActionButton
} from '@/components';
import {CUSTOMIZE_PAYMENT_FORM, PAYMENT_TABS} from 'stores/customize/types';
import t from 'locales/use-translation';
import {IProps} from './customize-payment-type';
import {goBack, MOUNT, UNMOUNT, ROUTES} from '@/navigation';
import {hasObjectLength, hasTextLength, hasValue} from '@/constants';
import {View} from 'react-native';
import {PaymentModes} from 'screens/payment-modes';
export default class CustomizePayment extends Component<IProps> {
  constructor(props) {
    super(props);
    this.paymentChild = React.createRef();
    this.state = {
      isUpdateAutoGenerate: false,
      activeTab: PAYMENT_TABS.MODE
    };
  }

  componentDidMount() {
    const {getCustomizeSettings, customizes, navigation} = this.props;

    let hasCustomizeApiCalled = customizes
      ? typeof customizes === 'undefined' || customizes === null
      : true;

    hasCustomizeApiCalled && getCustomizeSettings();
    goBack(MOUNT, navigation);
  }

  componentWillUnmount() {
    this.state.isUpdateAutoGenerate &&
      this.props.setCustomizeSettings({customizes: null});
    goBack(UNMOUNT);
  }

  setFormField = (field, value) => {
    this.props.dispatch(change(CUSTOMIZE_PAYMENT_FORM, field, value));
  };

  changeAutoGenerateStatus = (field, status) => {
    this.setFormField(field, status);

    const {editSettingItem} = this.props;

    const settings = {
      [field]: status === true ? 'YES' : 'NO'
    };

    editSettingItem({
      params: {
        settings
      },
      hasCustomize: true,
      onResult: () => {
        this.toastReference?.show?.('settings.preferences.settingUpdate');
        this.setState({isUpdateAutoGenerate: true});
      }
    });
  };

  onSave = values => {
    let params = values;
    for (const key in params) {
      if (key.includes('mail_body') || key.includes('address_format')) {
        if (!hasValue(params[key]) || !hasTextLength(params[key])) {
          params[key] = `<p></p>`;
        }
      }
    }

    const {editCustomizeSettings, navigation} = this.props;
    editCustomizeSettings({params, navigation});
  };

  TOGGLE_FIELD_VIEW = () => {
    const {theme} = this.props;
    return (
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <CtDivider dividerStyle={styles.dividerLine} />

        <Text
          color={theme.header.primary.color}
          style={styles.autoGenerateHeader}
        >
          {t('customizes.setting.payment')}
        </Text>
        <Field
          name={'payment_auto_generate'}
          component={ToggleSwitch}
          hint={t('customizes.autoGenerate.payment')}
          description={t('customizes.autoGenerate.paymentDescription')}
          onChangeCallback={val =>
            this.changeAutoGenerateStatus('payment_auto_generate', val)
          }
        />
      </ScrollView>
    );
  };

  getTextAreaPlaceholderTypes = () => {
    const company = [TYPE.PREDEFINE_COMPANY, TYPE.PAYMENT];
    const email = [TYPE.PREDEFINE_CUSTOMER, TYPE.CUSTOMER, TYPE.PAYMENT];
    const customer = [
      TYPE.PREDEFINE_BILLING,
      TYPE.PREDEFINE_CUSTOMER,
      TYPE.CUSTOMER,
      TYPE.PAYMENT
    ];
    return {
      email,
      company,
      customer
    };
  };

  TEXTAREA_FIELDS = () => {
    const {email, company, customer} = this.getTextAreaPlaceholderTypes();

    return (
      <>
        <Field
          name={'payment_prefix'}
          component={InputField}
          hint={t('customizes.prefix.payment')}
          inputProps={{
            returnKeyType: 'next',
            autoCorrect: true,
            autoCapitalize: 'characters',
            maxLength: 5
          }}
          fieldName={t('customizes.prefix.title')}
          maxCharacter={5}
          isRequired
        />
        <Editor
          {...this.props}
          types={email}
          name={'payment_mail_body'}
          label={'customizes.addresses.sendPaymentEmailBody'}
          showPreview
        />

        <Editor
          {...this.props}
          types={company}
          name={'payment_company_address_format'}
          label={'customizes.addresses.company'}
          showPreview
        />

        <Editor
          {...this.props}
          types={customer}
          name={'payment_from_customer_address_format'}
          label={'customizes.addresses.customerAddress'}
          showPreview
        />
      </>
    );
  };
  setActiveTab = activeTab => {
    this.setState({activeTab});
  };

  render() {
    const {navigation, theme, isLoading, handleSubmit, formValues} = this.props;
    const {activeTab} = this.state;
    let isPaymentMode = activeTab === PAYMENT_TABS.MODE;
    let loading = isLoading || !hasObjectLength(formValues);
    let label = isPaymentMode ? 'button.add' : 'button.save';

    const bottomAction = [
      {
        label,
        onPress: () =>
          isPaymentMode
            ? this.paymentChild.current.openModal()
            : handleSubmit(this.onSave)(),
        loading: this.props.loading
      }
    ];

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.navigate(ROUTES.CUSTOMIZE_LIST),
          title: t('header.payments'),
          rightIconPress: null,
          placement: 'center',
          leftArrow: 'primary'
        }}
        bottomAction={<ActionButton buttons={bottomAction} />}
        loadingProps={{is: loading}}
        hideScrollView
        toastProps={{
          reference: ref => (this.toastReference = ref)
        }}
      >
        <Tabs
          activeTab={activeTab}
          style={styles.tabs(theme)}
          tabStyle={styles.tabView}
          setActiveTab={this.setActiveTab}
          theme={theme}
          tabs={[
            {
              Title: PAYMENT_TABS.MODE,
              tabName: t('payments.modes'),
              render: (
                <PaymentModes
                  ref={this.paymentChild}
                  setFormField={(field, value) =>
                    this.setFormField(field, value)
                  }
                />
              )
            },
            {
              Title: PAYMENT_TABS.PREFIX,
              tabName: t('payments.prefix'),
              render: (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={styles.scrollContainer}
                >
                  {this.TEXTAREA_FIELDS()}
                  {this.TOGGLE_FIELD_VIEW()}
                </ScrollView>
              )
            }
          ]}
        />
      </DefaultLayout>
    );
  }
}
