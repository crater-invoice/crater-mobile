import React, {Component} from 'react';
import {Field, change, initialize} from 'redux-form';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-company-type.d';
import {secondaryHeader} from 'utils/header';
import {CountrySelectModal, CurrencySelectModal} from '@/select-modal';
import {CREATE_COMPANY_FORM} from 'stores/company/types';
import {keyboardType} from '@/helpers/keyboard';
import {
  fetchCompanyInitialDetails,
  addCompany,
  updateCompany
} from 'stores/company/actions';
import {
  DefaultLayout,
  BaseInput,
  BaseButtonGroup,
  BaseButton,
  FilePicker
} from '@/components';

export default class CreateCompany extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingInitialData: true,
      logo: null,
      uploadedLogo: null,
      fileLoading: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {dispatch, isCreateScreen, selectedCompany, currency} = this.props;

    dispatch(
      fetchCompanyInitialDetails(isCreateScreen, data => {
        if (data) {
          this.setInitialData(data);
          return;
        }

        if (isCreateScreen && selectedCompany && currency) {
          this.setFormField(
            'country_id',
            selectedCompany.address.country_id.toString()
          );
          this.setFormField('currency', currency.id.toString());
        }
        this.setState({isFetchingInitialData: false});
      })
    );
  };

  setInitialData = data => {
    const {dispatch, currency} = this.props;
    const company = {
      ...data?.address,
      name: data.name,
      currency: currency.id.toString()
    };
    dispatch(initialize(CREATE_COMPANY_FORM, company));
    this.setState({uploadedLogo: data?.logo, isFetchingInitialData: false});
  };

  onSave = values => {
    const {dispatch, isCreateScreen, isSaving} = this.props;
    const {isFetchingInitialData, fileLoading, logo} = this.state;

    if (isSaving || isFetchingInitialData || fileLoading) {
      return;
    }

    const params = {...values, address: values};

    isCreateScreen
      ? dispatch(addCompany(params, logo))
      : dispatch(updateCompany(params, logo));
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(CREATE_COMPANY_FORM, field, value));
  };

  render() {
    const {
      isSaving,
      handleSubmit,
      theme,
      countries,
      currencies,
      isCreateScreen
    } = this.props;
    const {isFetchingInitialData, uploadedLogo, fileLoading} = this.state;
    const companyRefs = {};
    const headerProps = secondaryHeader({
      ...this.props,
      rightIconPress: handleSubmit(this.onSave),
      isAllowToEdit: true
    });

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          loading={isSaving}
          disabled={isFetchingInitialData || fileLoading}
          onPress={handleSubmit(this.onSave)}
        >
          {t('button.save')}
        </BaseButton>
      </BaseButtonGroup>
    );

    return (
      <DefaultLayout
        headerProps={headerProps}
        bottomAction={bottomAction}
        loadingProps={{is: isFetchingInitialData}}
      >
        <Field
          name={'logo'}
          component={FilePicker}
          label={t('settings.company.logo')}
          onChangeCallback={logo => this.setState({logo})}
          uploadedFileUrl={uploadedLogo}
          fileLoading={fileLoading => this.setState({fileLoading})}
          containerStyle={{marginBottom: 10, marginTop: 4}}
        />

        <Field
          name="name"
          component={BaseInput}
          isRequired
          hint={t('settings.company.name')}
        />

        <Field
          name={'country_id'}
          component={CountrySelectModal}
          countries={countries}
          onSelect={({id}) => this.setFormField('country_id', id)}
          isRequired
          theme={theme}
        />

        {isCreateScreen && (
          <Field
            name="currency"
            component={CurrencySelectModal}
            currencies={currencies}
            label={t('settings.preferences.currency')}
            onSelect={val => this.setFormField('currency', val.id)}
            placeholder=""
            isRequired
            theme={theme}
            baseSelectProps={{description: t('company.currency_set_alert')}}
          />
        )}

        {!isCreateScreen && (
          <>
            <Field
              name={'phone'}
              component={BaseInput}
              hint={t('settings.company.phone')}
              keyboardType={keyboardType.PHONE}
              refLinkFn={ref => (companyRefs.phone = ref)}
              onSubmitEditing={() => companyRefs.state.focus()}
            />

            <Field
              name={'state'}
              component={BaseInput}
              hint={t('customers.address.state')}
              refLinkFn={ref => (companyRefs.state = ref)}
              onSubmitEditing={() => companyRefs.city.focus()}
            />

            <Field
              name={'city'}
              component={BaseInput}
              hint={t('customers.address.city')}
              onSubmitEditing={() => companyRefs.street1.focus()}
              refLinkFn={ref => (companyRefs.city = ref)}
            />

            <Field
              name={'address_street_1'}
              component={BaseInput}
              hint={t('settings.company.address')}
              height={60}
              refLinkFn={ref => (companyRefs.street1 = ref)}
              placeholder={t('settings.company.street_1')}
              inputProps={{multiline: true}}
            />

            <Field
              name={'address_street_2'}
              component={BaseInput}
              height={60}
              containerStyle={styles.addressStreetField}
              placeholder={t('settings.company.street_2')}
              inputProps={{multiline: true}}
            />

            <Field
              name={'zip'}
              component={BaseInput}
              hint={t('settings.company.zip_code')}
            />
          </>
        )}
      </DefaultLayout>
    );
  }
}
