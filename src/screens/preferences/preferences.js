import React, {Component} from 'react';
import styles from './preferences-style';
import {
  DefaultLayout,
  ToggleSwitch,
  CtDivider,
  ActionButton
} from '@/components';
import {Field, change, initialize} from 'redux-form';
import t from 'locales/use-translation';
import {omit} from 'lodash';
import {IProps, IStates} from './preferences-type';
import {PREFERENCES_FORM} from 'stores/company/types';
import {isEmpty} from '@/constants';
import {fetchPreferences, updatePreferences} from 'stores/company/actions';
import {
  CurrencySelectModal,
  DateFormatSelectModal,
  FiscalYearSelectModal,
  LanguageSelectModal,
  RetrospectiveEditSelectModal,
  TimeZoneSelectModal
} from '@/select-modal';

export default class Preferences extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.toastReference = React.createRef();

    this.state = {
      isFetchingInitialData: true
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {dispatch} = this.props;

    const onSuccess = preferences => {
      this.setInitialData(preferences);
      this.setState({isFetchingInitialData: false});
    };

    dispatch(fetchPreferences({onSuccess}));
  };

  setInitialData = preferences => {
    const {dispatch} = this.props;
    const {
      carbon_date_format,
      moment_date_format,
      time_zone,
      fiscal_year,
      discount_per_item,
      tax_per_item
    } = preferences;

    const data = {
      ...preferences,
      carbon_date_format: carbon_date_format,
      moment_date_format: moment_date_format,
      date_format: moment_date_format.trim(),
      time_zone: time_zone,
      fiscal_year: fiscal_year,
      discount_per_item: discount_per_item === 'YES' || discount_per_item === 1,
      tax_per_item: tax_per_item === 'YES' || tax_per_item === 1
    };
    dispatch(initialize(PREFERENCES_FORM, data));
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(PREFERENCES_FORM, field, value));
  };

  onSubmit = values => {
    if (this.state.isFetchingInitialData) {
      return;
    }
    const params = omit(values, ['discount_per_item', 'tax_per_item']);
    const {
      navigation,
      currencies,
      updatePreferencesLoading,
      dispatch
    } = this.props;

    if (!updatePreferencesLoading) {
      dispatch(
        updatePreferences({
          params: params,
          navigation,
          currencies
        })
      );
    }
  };

  setDiscountPerItem = val => {
    const payload = {
      params: {
        discount_per_item: val === true ? 'YES' : 'NO'
      },
      onResult: () => {
        this.toastReference?.show?.('settings.preferences.settingUpdate');
      }
    };
    this.props.dispatch(updatePreferences(payload));
  };

  setTaxPerItem = val => {
    const {editSettingItem} = this.props;

    const settings = {
      tax_per_item: val === true ? 'YES' : 'NO'
    };

    editSettingItem({
      params: {
        settings
      },
      onResult: () => {
        this.toastReference?.show?.('settings.preferences.settingUpdate');
      }
    });
  };

  getSelectedField = (items, find, field) => {
    let newData = [];
    if (!isEmpty(items)) {
      newData = items.filter(item => {
        let filterData = false;
        let itemField = item.fullItem
          ? item.fullItem[field].toString()
          : item[field].toString();

        if (itemField === find) filterData = true;

        return filterData;
      });
    }

    if (newData.length !== 0) {
      let {name} = newData[0].fullItem;
      return name;
    }
    return '  ';
  };

  render() {
    const {
      currencies,
      languages,
      timezones,
      dateFormats,
      fiscalYears,
      retrospectiveEdits,
      navigation,
      handleSubmit,
      updatePreferencesLoading
    } = this.props;
    const bottomAction = [
      {
        label: 'button.save',
        onPress: handleSubmit(this.onSubmit),
        loading: updatePreferencesLoading
      }
    ];
    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.goBack(null),
          title: t('header.setting.preferences'),
          placement: 'center',
          rightIcon: 'save',
          rightIconProps: {
            solid: true
          },
          rightIconPress: handleSubmit(this.onSubmit)
        }}
        loadingProps={{
          is: this.state.isFetchingInitialData
        }}
        bottomAction={<ActionButton buttons={bottomAction} />}
        toastProps={{
          reference: ref => (this.toastReference = ref)
        }}
      >
        <Field
          name="currency"
          currencies={currencies}
          component={CurrencySelectModal}
          label={t('settings.preferences.currency')}
          rightIcon="angle-right"
          isRequired
          onSelect={val => {
            this.setFormField('currency', val.id);
          }}
        />

        <Field
          name="language"
          languages={languages}
          component={LanguageSelectModal}
          onSelect={val => {
            this.setFormField('language', val.code);
          }}
          isRequired
        />
        <Field
          name="time_zone"
          timezones={timezones}
          component={TimeZoneSelectModal}
          onSelect={val => {
            this.setFormField('time_zone', val.value);
          }}
        />

        <Field
          name="date_format"
          dateFormats={dateFormats}
          component={DateFormatSelectModal}
          onSelect={val => {
            this.setFormField('carbon_date_format', val.carbon_format_value);
            this.setFormField('moment_date_format', val.moment_format_value);
            this.setFormField('date_format', val.moment_format_value);
          }}
          navigation={navigation}
        />

        <Field
          name="fiscal_year"
          fiscalYears={fiscalYears}
          component={FiscalYearSelectModal}
          onSelect={val => {
            this.setFormField('fiscal_year', val.value);
          }}
        />

        <Field
          name="retrospective_edits"
          retrospectiveEdits={retrospectiveEdits}
          component={RetrospectiveEditSelectModal}
          onSelect={val => {
            this.setFormField('retrospective_edits', val.value);
          }}
        />

        <CtDivider dividerStyle={styles.dividerLine} />

        <Field
          name="discount_per_item"
          component={ToggleSwitch}
          hint={t('settings.preferences.discountPerItem')}
          description={t('settings.preferences.discountPerItemPlaceholder')}
          onChangeCallback={val => this.setDiscountPerItem(val)}
        />

        <Field
          name="tax_per_item"
          component={ToggleSwitch}
          hint={t('settings.preferences.taxPerItem')}
          description={t('settings.preferences.taxPerItemPlaceholder')}
          onChangeCallback={val => this.setTaxPerItem(val)}
          mainContainerStyle={{marginVertical: 12}}
        />
      </DefaultLayout>
    );
  }
}
