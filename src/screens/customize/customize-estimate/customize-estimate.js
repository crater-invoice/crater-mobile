import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Field, change, initialize} from 'redux-form';
import {omit} from 'lodash';
import styles from './customize-estimate-style';
import {
  CUSTOMIZE_ESTIMATE_FORM,
  ESTIMATE_SETTINGS_TYPE,
  ESTIMATE_SWITCH_FIELDS
} from 'stores/customize/types';
import t from 'locales/use-translation';
import {IProps, IStates} from './customize-estimate-type';
import {hasTextLength, hasValue, isBooleanTrue} from '@/constants';
import {NumberScheme, DueDate} from '../customize-common';
import {
  fetchCustomizeSettings,
  updateCustomizeSettings
} from 'stores/customize/actions';
import {routes} from '@/navigation';
import {
  DefaultLayout,
  ToggleSwitch,
  CtDivider,
  Editor,
  PLACEHOLDER_TYPES as TYPE,
  Text,
  ActionButton
} from '@/components';

export default class CustomizeEstimate extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {isFetchingInitialData: true};
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(
      fetchCustomizeSettings(ESTIMATE_SETTINGS_TYPE, res => {
        this.setInitialData(res);
        this.setState({isFetchingInitialData: false});
      })
    );
  }

  setInitialData = res => {
    const {dispatch} = this.props;
    const data = {
      ...res,
      estimate_email_attachment: isBooleanTrue(res?.estimate_email_attachment),
      estimate_auto_generate: isBooleanTrue(res?.estimate_auto_generate),
      set_expiry_date_automatically: isBooleanTrue(
        res?.set_expiry_date_automatically
      )
    };

    dispatch(initialize(CUSTOMIZE_ESTIMATE_FORM, data));
  };

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
    const {dispatch, navigation} = this.props;
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
      theme,
      handleSubmit,
      loading,
      formValues: {
        estimate_number_scheme,
        estimate_prefix,
        estimate_number_separator,
        estimate_number_length,
        set_expiry_date_automatically
      }
    } = this.props;
    const {isFetchingInitialData} = this.state;
    const bottomAction = [
      {
        label: 'button.save',
        onPress: () => handleSubmit(this.onSave)(),
        loading: loading || isFetchingInitialData
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
        loadingProps={{is: isFetchingInitialData}}
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
          <DueDate
            toggleField={{
              name: 'set_expiry_date_automatically',
              hint: t('customizes.expDate.switchLabel'),
              description: t('customizes.expDate.description'),
              value: set_expiry_date_automatically
            }}
            dueDateField={{
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
