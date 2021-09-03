import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Field, change} from 'redux-form';
import styles from './customize-invoice-style';
import {
  DefaultLayout,
  ToggleSwitch,
  CtDivider,
  Editor,
  PLACEHOLDER_TYPES as TYPE,
  Text,
  ActionButton
} from '@/components';
import {CUSTOMIZE_INVOICE_FORM} from 'stores/customize/types';
import t from 'locales/use-translation';
import {IProps} from './customize-invoice-type';
import {goBack, MOUNT, UNMOUNT, ROUTES} from '@/navigation';
import {hasObjectLength, hasTextLength, hasValue} from '@/constants';

export default class CustomizeInvoice extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      isUpdateAutoGenerate: false
    };
  }

  componentDidMount() {
    const {getCustomizeSettings, customizes, navigation} = this.props;
    console.log(this.props);

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
    this.props.dispatch(change(CUSTOMIZE_INVOICE_FORM, field, value));
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
          {t('customizes.setting.invoice')}
        </Text>
        <Field
          name={'invoice_auto_generate'}
          component={ToggleSwitch}
          hint={t('customizes.autoGenerate.invoice')}
          description={t('customizes.autoGenerate.invoiceDescription')}
          onChangeCallback={val =>
            this.changeAutoGenerateStatus('invoice_auto_generate', val)
          }
        />
      </ScrollView>
    );
  };

  getTextAreaPlaceholderTypes = () => {
    const company = [TYPE.PREDEFINE_COMPANY, TYPE.INVOICE];
    const email = [TYPE.PREDEFINE_CUSTOMER, TYPE.CUSTOMER, TYPE.INVOICE];
    const shipping = [
      TYPE.PREDEFINE_SHIPPING,
      TYPE.PREDEFINE_CUSTOMER,
      TYPE.CUSTOMER,
      TYPE.INVOICE
    ];
    const billing = [
      TYPE.PREDEFINE_BILLING,
      TYPE.PREDEFINE_CUSTOMER,
      TYPE.CUSTOMER,
      TYPE.INVOICE
    ];

    return {
      email,
      company,
      shipping,
      billing
    };
  };

  TEXTAREA_FIELDS = () => {
    const {
      email,
      company,
      shipping,
      billing
    } = this.getTextAreaPlaceholderTypes();

    return (
      <>
        <Editor
          {...this.props}
          types={email}
          name={'invoice_mail_body'}
          label={'customizes.addresses.sendInvoiceEmailBody'}
          showPreview
        />

        <Editor
          {...this.props}
          types={company}
          name={'invoice_company_address_format'}
          label={'customizes.addresses.company'}
          showPreview
        />

        <Editor
          {...this.props}
          types={shipping}
          name={'invoice_shipping_address_format'}
          label={'customizes.addresses.shipping'}
          showPreview
        />

        <Editor
          {...this.props}
          types={billing}
          name={'invoice_billing_address_format'}
          label={'customizes.addresses.billing'}
          showPreview
        />
      </>
    );
  };

  render() {
    const {navigation, isLoading, handleSubmit, formValues} = this.props;
    let loading = isLoading || !hasObjectLength(formValues);
    const bottomAction = [
      {
        label: 'button.save',
        onPress: () => handleSubmit(this.onSave)(),
        loading: this.props.loading
      }
    ];

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.navigate(ROUTES.CUSTOMIZE_LIST),
          title: t('header.invoices'),
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
        >
          {this.TEXTAREA_FIELDS()}
          {this.TOGGLE_FIELD_VIEW()}
        </ScrollView>
      </DefaultLayout>
    );
  }
}
