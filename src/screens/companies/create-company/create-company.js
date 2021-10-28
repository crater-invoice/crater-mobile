import React, {Component} from 'react';
import {Field, change} from 'redux-form';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-company-type';
import {secondaryHeader} from 'utils/header';
import {fetchCompanyInitialDetails, addCompany} from 'stores/company/actions';
import {CountrySelectModal, CurrencySelectModal} from '@/select-modal';
import {CREATE_COMPANY_FORM} from 'stores/company/types';
import {
  DefaultLayout,
  InputField,
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
      fileLoading: false
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {dispatch} = this.props;

    dispatch(
      fetchCompanyInitialDetails(() =>
        this.setState({isFetchingInitialData: false})
      )
    );
  };

  onSave = values => {
    const {dispatch} = this.props;
    const {isFetchingInitialData, fileLoading, logo} = this.state;

    if (this.props.isSaving || isFetchingInitialData) {
      return;
    }

    if (fileLoading) {
      return;
    }

    dispatch(addCompany(values, logo));
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(CREATE_COMPANY_FORM, field, value));
  };

  render() {
    const {
      isSaving,
      handleSubmit,
      initialValues,
      theme,
      countries,
      currencies
    } = this.props;
    const {isFetchingInitialData, fileLoading} = this.state;
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
          uploadedFileUrl={initialValues?.logo}
          fileLoading={fileLoading => this.setState({fileLoading})}
          containerStyle={{
            marginBottom: 10,
            marginTop: 4
          }}
        />
        <Field
          name="name"
          component={InputField}
          isRequired
          hint={t('settings.company.name')}
        />

        <Field
          name={'country_id'}
          countries={countries}
          component={CountrySelectModal}
          onSelect={({id}) => this.setFormField('country_id', id)}
          isRequired
          theme={theme}
        />

        <Field
          name="currency"
          currencies={currencies}
          component={CurrencySelectModal}
          label={t('settings.preferences.currency')}
          onSelect={val => this.setFormField('currency', val.id)}
          placeholder=""
          isRequired
          theme={theme}
        />
      </DefaultLayout>
    );
  }
}
