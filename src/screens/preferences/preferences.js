import React, {Component} from 'react';
import {Field, change, initialize} from 'redux-form';
import styles from './preferences-style';
import t from 'locales/use-translation';
import {IProps, IStates} from './preferences-type.d';
import {PREFERENCES_FORM} from 'stores/company/types';
import {isBooleanTrue} from '@/constants';
import {fetchPreferences, updatePreferences} from 'stores/company/actions';
import {
  DefaultLayout,
  BaseSwitch,
  BaseDivider,
  BaseButtonGroup,
  BaseButton
} from '@/components';
import {
  CurrencySelectModal,
  DateFormatSelectModal,
  FiscalYearSelectModal,
  LanguageSelectModal,
  TimeZoneSelectModal
} from '@/select-modal';

export default class Preferences extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {isFetchingInitialData: true};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {dispatch} = this.props;

    dispatch(
      fetchPreferences(data => {
        this.setInitialData(data);
        this.setState({isFetchingInitialData: false});
      })
    );
  };

  setInitialData = preferences => {
    const {dispatch} = this.props;
    const {
      moment_date_format,
      retrospective_edits,
      discount_per_item,
      tax_per_item
    } = preferences;

    const data = {
      ...preferences,
      date_format: moment_date_format.trim(),
      discount_per_item: isBooleanTrue(discount_per_item),
      tax_per_item: isBooleanTrue(tax_per_item)
    };
    dispatch(initialize(PREFERENCES_FORM, data));
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(PREFERENCES_FORM, field, value));
  };

  onSubmit = values => {
    const {navigation, isSaving, dispatch} = this.props;

    if (this.state.isFetchingInitialData || isSaving) {
      return;
    }

    const params = {
      ...values,
      tax_per_item: isBooleanTrue(values?.tax_per_item) ? 'YES' : 'NO',
      discount_per_item: isBooleanTrue(values?.discount_per_item) ? 'YES' : 'NO'
    };
    dispatch(updatePreferences({params, navigation}));
  };

  render() {
    const {
      currencies,
      languages,
      timezones,
      dateFormats,
      fiscalYears,
      navigation,
      handleSubmit,
      isSaving,
      theme
    } = this.props;
    const {isFetchingInitialData} = this.state;

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          onPress={handleSubmit(this.onSubmit)}
          loading={isSaving}
          disabled={isFetchingInitialData}
        >
          {t('button.save')}
        </BaseButton>
      </BaseButtonGroup>
    );

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.goBack(null),
          title: t('header.setting.preferences'),
          placement: 'center',
          rightIcon: 'save',
          rightIconProps: {solid: true},
          rightIconPress: handleSubmit(this.onSubmit)
        }}
        loadingProps={{is: isFetchingInitialData}}
        bottomAction={bottomAction}
      >
        <Field
          name="currency"
          currencies={currencies}
          component={CurrencySelectModal}
          label={t('settings.preferences.currency')}
          isRequired
          theme={theme}
          onSelect={val => this.setFormField('currency', val.id)}
          baseSelectProps={{
            description: t('settings.preferences.company_currency_unchangeable')
          }}
          disabled
        />

        <Field
          name="language"
          languages={languages}
          component={LanguageSelectModal}
          onSelect={val => this.setFormField('language', val.code)}
          isRequired
        />

        <Field
          name="time_zone"
          timezones={timezones}
          component={TimeZoneSelectModal}
          onSelect={val => this.setFormField('time_zone', val.value)}
        />

        <Field
          name="date_format"
          dateFormats={dateFormats}
          component={DateFormatSelectModal}
          navigation={navigation}
          onSelect={val => {
            this.setFormField('carbon_date_format', val.carbon_format_value);
            this.setFormField('moment_date_format', val.moment_format_value);
            this.setFormField('date_format', val.moment_format_value);
          }}
        />

        <Field
          name="fiscal_year"
          fiscalYears={fiscalYears}
          component={FiscalYearSelectModal}
          onSelect={val => this.setFormField('fiscal_year', val.value)}
        />

        <BaseDivider dividerStyle={styles.dividerLine} />

        <Field
          name="discount_per_item"
          component={BaseSwitch}
          hint={t('settings.preferences.discount_per_item')}
          description={t('settings.preferences.discount_per_item_placeholder')}
        />

        <Field
          name="tax_per_item"
          component={BaseSwitch}
          hint={t('settings.preferences.tax_per_item')}
          description={t('settings.preferences.tax_per_item_placeholder')}
          mainContainerStyle={{marginVertical: 12}}
        />
      </DefaultLayout>
    );
  }
}
