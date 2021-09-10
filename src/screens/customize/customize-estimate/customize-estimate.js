import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Field, change} from 'redux-form';
import styles from './customize-estimate-style';
import {
  DefaultLayout,
  ToggleSwitch,
  InputField,
  CtDivider,
  Editor,
  PLACEHOLDER_TYPES as TYPE,
  Text,
  ActionButton
} from '@/components';
import {CUSTOMIZE_ESTIMATE_FORM} from 'stores/customize/types';
import t from 'locales/use-translation';
import {IProps, IStates} from './customize-estimate-type';
import {goBack, MOUNT, UNMOUNT, ROUTES} from '@/navigation';
import {hasObjectLength, hasTextLength, hasValue} from '@/constants';
import {
  fetchCustomizeSettings,
  setCustomizeSettings,
  editSettingItem,
  updateCustomizeSettings
} from 'stores/customize/actions';

export default class CustomizeEstimate extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {
      isUpdateAutoGenerate: false
    };
  }

  componentDidMount() {
    const {dispatch, customizes, navigation} = this.props;
    let hasCustomizeApiCalled = customizes
      ? typeof customizes === 'undefined' || customizes === null
      : true;

    hasCustomizeApiCalled && dispatch(fetchCustomizeSettings());
    goBack(MOUNT, navigation);
  }

  componentWillUnmount() {
    this.state.isUpdateAutoGenerate &&
      this.props.dispatch(setCustomizeSettings({customizes: null}));
    goBack(UNMOUNT);
  }

  setFormField = (field, value) => {
    this.props.dispatch(change(CUSTOMIZE_ESTIMATE_FORM, field, value));
  };

  changeAutoGenerateStatus = (field, status) => {
    this.setFormField(field, status);

    const settings = {
      [field]: status === true ? 'YES' : 'NO'
    };
    const payload = {
      params: {
        settings
      },
      hasCustomize: true,
      onResult: () => {
        this.toastReference?.show?.('settings.preferences.settingUpdate');
        this.setState({isUpdateAutoGenerate: true});
      }
    };
    this.dispatch(editSettingItem(payload));
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

    const {dispatch, navigation} = this.props;
    dispatch(updateCustomizeSettings({params, navigation}));
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
          onChangeCallback={val =>
            this.changeAutoGenerateStatus('estimate_auto_generate', val)
          }
        />
      </ScrollView>
    );
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
          <Field
            name={'estimate_prefix'}
            component={InputField}
            hint={t('customizes.prefix.estimate')}
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
          {this.TEXTAREA_FIELDS()}
          {this.TOGGLE_FIELD_VIEW()}
        </ScrollView>
      </DefaultLayout>
    );
  }
}
