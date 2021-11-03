import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Field, change, initialize} from 'redux-form';
import {omit} from 'lodash';
import styles from './customize-invoice-style';
import t from 'locales/use-translation';
import {IProps, IStates} from './customize-invoice-type';
import {routes} from '@/navigation';
import {hasTextLength, hasValue, isBooleanTrue} from '@/constants';
import {NumberScheme, DueDate} from '../customize-common';
import {
  CUSTOMIZE_INVOICE_FORM,
  INVOICE_SWITCH_FIELDS,
  INVOICE_SETTINGS_TYPE
} from 'stores/customize/types';
import {
  DefaultLayout,
  BaseSwitch,
  BaseDivider,
  Editor,
  PLACEHOLDER_TYPES as TYPE,
  Text,
  BaseButtonGroup,
  BaseButton
} from '@/components';
import {
  fetchCustomizeSettings,
  updateCustomizeSettings
} from 'stores/customize/actions';

export default class CustomizeInvoice extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {isFetchingInitialData: true};
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(
      fetchCustomizeSettings(INVOICE_SETTINGS_TYPE, res => {
        this.setInitialData(res);
        this.setState({isFetchingInitialData: false});
      })
    );
  }

  setInitialData = res => {
    const {dispatch} = this.props;
    const data = {
      ...res,
      invoice_auto_generate: isBooleanTrue(res?.invoice_auto_generate),
      invoice_email_attachment: isBooleanTrue(res?.invoice_email_attachment),
      set_due_date_automatically: isBooleanTrue(res?.set_due_date_automatically)
    };
    dispatch(initialize(CUSTOMIZE_INVOICE_FORM, data));
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(CUSTOMIZE_INVOICE_FORM, field, value));
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

  onSave = values => {
    const {navigation, dispatch} = this.props;
    let params = values;
    for (const key in params) {
      if (key.includes('mail_body') || key.includes('address_format')) {
        if (!hasValue(params[key]) || !hasTextLength(params[key])) {
          params[key] = `<p></p>`;
        }
      }
    }
    INVOICE_SWITCH_FIELDS.forEach(
      field => (params[field] = params[field] === true ? 'YES' : 'NO')
    );
    params = omit(params, ['next_umber']);
    dispatch(
      updateCustomizeSettings({
        successMessage: 'notification.invoice_setting_updated',
        params,
        navigation
      })
    );
  };

  render() {
    const {
      navigation,
      theme,
      handleSubmit,
      isSaving,
      formValues: {
        invoice_number_scheme,
        invoice_prefix,
        invoice_number_separator,
        invoice_number_length,
        set_due_date_automatically
      }
    } = this.props;
    const {isFetchingInitialData} = this.state;
    const {
      email,
      company,
      shipping,
      billing
    } = this.getTextAreaPlaceholderTypes();

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          onPress={handleSubmit(this.onSave)}
          loading={isSaving}
          disabled={isFetchingInitialData}
        >
          {t('button.save')}
        </BaseButton>
      </BaseButtonGroup>
    );

    const headerProps = {
      leftIconPress: () => navigation.navigate(routes.CUSTOMIZE_LIST),
      title: t('header.invoices'),
      rightIconPress: null,
      placement: 'center',
      leftArrow: 'primary'
    };

    return (
      <DefaultLayout
        headerProps={headerProps}
        bottomAction={bottomAction}
        loadingProps={{is: isFetchingInitialData}}
        hideScrollView
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
        >
          <Text
            color={theme.header.primary.color}
            style={styles.autoGenerateHeader}
          >
            {t('customizes.number_label.invoice')}
          </Text>

          <NumberScheme
            {...this.props}
            keyName={`invoice`}
            numberSchemeField={{
              name: 'invoice_number_scheme',
              value: invoice_number_scheme
            }}
            prefixField={{
              name: 'invoice_prefix',
              value: invoice_prefix
            }}
            separatorField={{
              name: 'invoice_number_separator',
              value: invoice_number_separator
            }}
            numberLengthField={{
              name: 'invoice_number_length',
              value: invoice_number_length
            }}
          />

          <DueDate
            toggleField={{
              name: 'set_due_date_automatically',
              hint: t('customizes.due_date.switch_label'),
              description: t('customizes.due_date.description'),
              value: set_due_date_automatically
            }}
            dueDateField={{
              name: 'due_date_days',
              hint: t('customizes.due_date.input_label')
            }}
          />

          <Editor
            {...this.props}
            types={email}
            name={'invoice_mail_body'}
            label={'customizes.addresses.send_invoice_email_body'}
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

          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <BaseDivider dividerStyle={styles.dividerLine} />

            <Text
              color={theme.header.primary.color}
              style={styles.autoGenerateHeader}
            >
              {t('customizes.setting.invoice')}
            </Text>
            <Field
              name={'invoice_auto_generate'}
              component={BaseSwitch}
              hint={t('customizes.auto_generate.invoice')}
              description={t('customizes.auto_generate.invoice_description')}
            />
            <Field
              name={'invoice_email_attachment'}
              component={BaseSwitch}
              hint={t('customizes.email_attachment.invoice')}
              description={t('customizes.email_attachment.invoice_description')}
            />
          </ScrollView>
        </ScrollView>
      </DefaultLayout>
    );
  }
}
