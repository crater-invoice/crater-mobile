import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Field, change} from 'redux-form';
import {omit} from 'lodash';
import styles from './customize-estimate-style';
import {
  DefaultLayout,
  ToggleSwitch,
  CtDivider,
  Editor,
  PLACEHOLDER_TYPES as TYPE,
  Text,
  ActionButton
} from '@/components';
import {
  CUSTOMIZE_ESTIMATE_FORM,
  ESTIMATE_SETTINGS_TYPE,
  ESTIMATE_SWITCH_FIELDS
} from 'stores/customize/types';
import t from 'locales/use-translation';
import {IProps} from './customize-estimate-type';
import {hasObjectLength, hasTextLength, hasValue} from '@/constants';
import {NumberScheme, EndDate} from '../customize-common';
import {
  fetchCustomizeSettings,
  updateCustomizeSettings
} from 'stores/customize/actions';
import {routes} from '@/navigation';

export default class CustomizeEstimate extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch(fetchCustomizeSettings(ESTIMATE_SETTINGS_TYPE));
  }

  setFormField = (field, value) => {
    this.props.dispatch(change(CUSTOMIZE_ESTIMATE_FORM, field, value));
  };

  getTextAreaPlaceholderTypes = () => {
    const company = [TYPE.PREDEFINE_COMPANY, TYPE.ESTIMATE];
    const email = [TYPE.PREDEFINE_CUSTOMER, TYPE.CUSTOMER, TYPE.ESTIMATE];
    const shipping = [
      TYPE.PREDEFINE_SHIPPING,
      TYPE.PREDEFINE_CUSTOMER,
      TYPE.CUSTOMER,
      TYPE.ESTIMATE
    ];
    const billing = [
      TYPE.PREDEFINE_BILLING,
      TYPE.PREDEFINE_CUSTOMER,
      TYPE.CUSTOMER,
      TYPE.ESTIMATE
    ];

    return {
      email,
      company,
      shipping,
      billing
    };
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
    ESTIMATE_SWITCH_FIELDS.forEach(
      field => (params[field] = params[field] === true ? 'YES' : 'NO')
    );
    params = omit(params, ['next_umber']);
    const {dispatch, navigation} = this.props;
    dispatch(updateCustomizeSettings({params, navigation}));
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
          name={'estimate_mail_body'}
          label={'customizes.addresses.sendEstimateEmailBody'}
          showPreview
        />

        <Editor
          {...this.props}
          types={company}
          name={'estimate_company_address_format'}
          label={'customizes.addresses.company'}
          showPreview
        />

        <Editor
          {...this.props}
          types={shipping}
          name={'estimate_shipping_address_format'}
          label={'customizes.addresses.shipping'}
          showPreview
        />

        <Editor
          {...this.props}
          types={billing}
          name={'estimate_billing_address_format'}
          label={'customizes.addresses.billing'}
          showPreview
        />
      </>
    );
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
          {t('customizes.setting.estimate')}
        </Text>
        <Field
          name={'estimate_auto_generate'}
          component={ToggleSwitch}
          hint={t('customizes.autoGenerate.estimate')}
          description={t('customizes.autoGenerate.estimateDescription')}
        />
        <Field
          name={'estimate_email_attachment'}
          component={ToggleSwitch}
          hint={t('customizes.emailAttachment.estimate')}
          description={t('customizes.emailAttachment.estimateDescription')}
        />
      </ScrollView>
    );
  };

  render() {
    const {
      navigation,
      isLoading,
      theme,
      handleSubmit,
      formValues: {
        estimate_number_scheme,
        estimate_prefix,
        estimate_number_separator,
        estimate_number_length,
        set_expiry_date_automatically
      }
    } = this.props;
    let loading = isLoading || !hasObjectLength(this.props.formValues);
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
          leftIconPress: () => navigation.navigate(routes.CUSTOMIZE_LIST),
          title: t('header.estimates'),
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
          <Text
            color={theme.header.primary.color}
            style={styles.autoGenerateHeader}
          >
            {t('customizes.numberLabel.estimate')}
          </Text>
          <NumberScheme
            {...this.props}
            keyName={`estimate`}
            numberSchemeField={{
              name: 'estimate_number_scheme',
              value: estimate_number_scheme
            }}
            prefixField={{
              name: 'estimate_prefix',
              value: estimate_prefix
            }}
            separatorField={{
              name: 'estimate_number_separator',
              value: estimate_number_separator
            }}
            numberLengthField={{
              name: 'estimate_number_length',
              value: estimate_number_length
            }}
          />
          <EndDate
            toggleField={{
              name: 'set_expiry_date_automatically',
              hint: t('customizes.expDate.switchLabel'),
              description: t('customizes.expDate.description'),
              value: set_expiry_date_automatically
            }}
            endDateField={{
              name: 'expiry_date_days',
              hint: t('customizes.expDate.inputLabel')
            }}
          />
          {this.TEXTAREA_FIELDS()}
          {this.TOGGLE_FIELD_VIEW()}
        </ScrollView>
      </DefaultLayout>
    );
  }
}
