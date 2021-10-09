import React from 'react';
import {Field} from 'redux-form';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {alertMe} from '@/constants';
import {addCompany, updateCompany, removeCompany} from '../../actions';
import {
  DefaultLayout,
  InputField,
  ActionButton,
  FilePicker
} from '@/components';

export default class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: null,
      fileLoading: false
    };
  }

  onSave = params => {
    const {isCreateScreen, dispatch, navigation, loading, route} = this.props;
    const {logo, fileLoading} = this.state;

    if (loading || fileLoading) {
      return;
    }

    const onSuccess = res => {
      const onSelect = route?.params?.onSelect;
      onSelect?.(res);
      navigation.goBack(null);
    };

    isCreateScreen
      ? dispatch(addCompany({params, logo, onSuccess}))
      : dispatch(updateCompany({params, logo, onSuccess}));
  };

  removeCompany = () => {
    const {
      companyId,
      navigation,
      initialValues: {name},
      dispatch
    } = this.props;

    const alreadyUsedAlert = () =>
      alertMe({
        title: `${name} ${t('company.text_already_used')}`
      });

    alertMe({
      title: t('alert.title'),
      desc: t('company.text_alert_description'),
      showCancel: true,
      okPress: () =>
        dispatch(
          removeCompany({
            id: companyId,
            onSuccess: val =>
              val ? navigation.navigate(routes.COMPANIES) : alreadyUsedAlert()
          })
        )
    });
  };

  render() {
    const {
      navigation,
      handleSubmit,
      loading,
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      initialValues
    } = this.props;

    const disabled = !isAllowToEdit;

    const getTitle = () => {
      let title = 'header.addCompany';
      if (isEditScreen && !isAllowToEdit) title = 'header.viewCompany';
      if (isEditScreen && isAllowToEdit) title = 'header.editCompany';

      return t(title);
    };

    const bottomAction = [
      {
        label: 'button.save',
        onPress: handleSubmit(this.onSave),
        show: isAllowToEdit,
        loading: loading || this.state.fileLoading
      },
      {
        label: 'button.remove',
        onPress: this.removeCompany,
        bgColor: 'btn-danger',
        show: isEditScreen && isAllowToDelete,
        loading
      }
    ];

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.goBack(null),
          title: getTitle(),
          placement: 'center',
          ...(isAllowToEdit && {
            rightIcon: 'save',
            rightIconProps: {solid: true},
            rightIconPress: handleSubmit(this.onSave)
          })
        }}
        bottomAction={<ActionButton buttons={bottomAction} />}
      >
        <Field
          name="name"
          component={InputField}
          isRequired
          hint={t('settings.company.name')}
          disabled={disabled}
        />

        <Field
          name={'logo'}
          component={FilePicker}
          label={t('settings.company.logo')}
          onChangeCallback={logo => this.setState({logo})}
          uploadedFileUrl={initialValues?.logo}
          disabled={disabled}
          fileLoading={fileLoading => this.setState({fileLoading})}
        />
      </DefaultLayout>
    );
  }
}
