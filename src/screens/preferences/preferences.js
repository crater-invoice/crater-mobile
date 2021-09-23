import React, {Component} from 'react';
import styles from './preferences-style';
import {
  DefaultLayout,
  SelectField,
  ToggleSwitch,
  CtDivider,
  ActionButton
} from '@/components';
import {Field, change, initialize} from 'redux-form';
import t from 'locales/use-translation';
import {find, omit} from 'lodash';
import {IProps, IStates} from './preferences-type';
import {PREFERENCES_FORM} from 'stores/company/types';
import {isEmpty} from '@/constants';
import {fetchPreferences, updatePreferences} from 'stores/company/actions';
import {SymbolStyle} from '@/components/CurrencyFormat/styles';

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
      currencyList,
      updatePreferencesLoading,
      dispatch
    } = this.props;

    if (!updatePreferencesLoading) {
      dispatch(
        updatePreferences({
          params: params,
          navigation,
          currencies: currencyList
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

  getSelectedCurrencySymbol = () => {
    const {currencyList, formValues} = this.props;

    if (isEmpty(currencyList) || !formValues?.currency) {
      return null;
    }

    const currency = find(currencyList, {
      fullItem: {id: Number(formValues.currency)}
    });

    return currency?.fullItem?.symbol;
  };

  render() {
    const {
      currencyList,
      languageList,
      timezoneList,
      dateFormatList,
      fiscalYearList,
      retrospectiveEditsList,
      navigation,
      handleSubmit,
      formValues: {time_zone, currency, language},
      updatePreferencesLoading,
      theme
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
          items={currencyList}
          displayName="name"
          component={SelectField}
          label={t('settings.preferences.currency')}
          rightIcon="angle-right"
          placeholder={
            currency
              ? this.getSelectedField(currencyList, currency, 'id')
              : t('settings.preferences.currencyPlaceholder')
          }
          searchFields={['name']}
          compareField="id"
          fakeInputProps={{
            valueStyle: styles.selectedField,
            placeholderStyle: styles.selectedField,
            leftSymbol: this.getSelectedCurrencySymbol(),
            leftSymbolStyle: {
              color: theme?.icons?.secondaryColor
            }
          }}
          onSelect={val => {
            this.setFormField('currency', val.id);
          }}
          headerProps={{
            title: t('currencies.title'),
            rightIconPress: null
          }}
          emptyContentProps={{
            contentType: 'currencies'
          }}
          isRequired
          listViewProps={{
            contentContainerStyle: {flex: 5},
            rightTitleStyle: SymbolStyle
          }}
          isInternalSearch
        />

        <Field
          name="language"
          items={languageList}
          component={SelectField}
          label={t('settings.preferences.language')}
          icon="language"
          rightIcon="angle-right"
          displayName="name"
          placeholder={
            language
              ? this.getSelectedField(languageList, language, 'code')
              : t('settings.preferences.languagePlaceholder')
          }
          fakeInputProps={{
            valueStyle: styles.selectedField,
            placeholderStyle: styles.selectedField
          }}
          searchFields={['name']}
          compareField="code"
          onSelect={val => {
            this.setFormField('language', val.code);
          }}
          headerProps={{
            title: t('languages.title'),
            rightIconPress: null
          }}
          listViewProps={{
            hasAvatar: true
          }}
          emptyContentProps={{
            contentType: 'languages'
          }}
          isRequired
          isInternalSearch
        />
        <Field
          name="time_zone"
          items={timezoneList}
          displayName="key"
          component={SelectField}
          label={t('settings.preferences.timeZone')}
          icon="clock"
          rightIcon="angle-right"
          placeholder={
            time_zone
              ? time_zone
              : t('settings.preferences.timeZonePlaceholder')
          }
          fakeInputProps={{
            valueStyle: styles.selectedField,
            placeholderStyle: styles.selectedField
          }}
          searchFields={['key']}
          compareField="value"
          onSelect={val => {
            this.setFormField('time_zone', val.value);
          }}
          headerProps={{
            title: t('timeZones.title'),
            rightIconPress: null
          }}
          emptyContentProps={{
            contentType: 'timeZones'
          }}
          isRequired
          isInternalSearch
        />

        <Field
          name="date_format"
          items={dateFormatList}
          displayName="display_date"
          component={SelectField}
          label={t('settings.preferences.dateFormat')}
          icon="calendar-alt"
          rightIcon="angle-right"
          placeholder={t('settings.preferences.dateFormatPlaceholder')}
          fakeInputProps={{
            valueStyle: styles.selectedField,
            placeholderStyle: styles.selectedField
          }}
          searchFields={['display_date']}
          compareField="moment_format_value"
          onSelect={val => {
            this.setFormField('carbon_date_format', val.carbon_format_value);
            this.setFormField('moment_date_format', val.moment_format_value);
            this.setFormField('date_format', val.moment_format_value);
          }}
          headerProps={{
            title: t('dateFormats.title'),
            rightIconPress: null
          }}
          emptyContentProps={{
            contentType: 'dateFormats'
          }}
          isRequired
          isInternalSearch
        />

        <Field
          name="fiscal_year"
          items={fiscalYearList}
          displayName="key"
          component={SelectField}
          label={t('settings.preferences.fiscalYear')}
          icon="calendar-alt"
          rightIcon="angle-right"
          placeholder={t('settings.preferences.fiscalYearPlaceholder')}
          fakeInputProps={{
            valueStyle: styles.selectedField,
            placeholderStyle: styles.selectedField
          }}
          searchFields={['key']}
          compareField="value"
          onSelect={val => {
            this.setFormField('fiscal_year', val.value);
          }}
          headerProps={{
            title: t('fiscalYears.title'),
            rightIconPress: null
          }}
          emptyContentProps={{
            contentType: 'fiscalYears'
          }}
          isInternalSearch
          isRequired
        />

        <Field
          name="retrospective_edits"
          items={retrospectiveEditsList}
          displayName="key"
          component={SelectField}
          label={t('settings.preferences.retrospectiveEdits')}
          icon="calendar-alt"
          rightIcon="angle-right"
          placeholder={t('settings.preferences.retrospectiveEdits')}
          fakeInputProps={{
            valueStyle: styles.selectedField,
            placeholderStyle: styles.selectedField
          }}
          searchFields={['key']}
          compareField="value"
          onSelect={val => {
            this.setFormField('retrospective_edits', val.value);
          }}
          headerProps={{
            title: t('retrospectiveEdits.title'),
            rightIconPress: null
          }}
          emptyContentProps={{
            contentType: 'retrospectiveEdits'
          }}
          isInternalSearch
          isRequired
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
