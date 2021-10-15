import React, {Component} from 'react';
import {Field, change, initialize, SubmissionError} from 'redux-form';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-user-type';
import {routes} from '@/navigation';
import {alertMe, keyboardType} from '@/constants';
import {CREATE_USER_FORM} from 'stores/users/types';
import {DefaultLayout, InputField, ActionButton} from '@/components';
import headerTitle from 'utils/header';
import {RoleSelectModal} from '@/select-modal';
import {
  addUser,
  updateUser,
  removeUser,
  fetchSingleUser
} from 'stores/users/actions';

export default class CreateUser extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {isFetchingInitialData: true};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {isEditScreen, id, dispatch} = this.props;
    if (isEditScreen) {
      dispatch(fetchSingleUser(id, user => this.setInitialData(user)));
      return;
    }

    this.setState({isFetchingInitialData: false});
  };

  setInitialData = user => {
    const {dispatch} = this.props;
    dispatch(initialize(CREATE_USER_FORM, user));
    this.setState({isFetchingInitialData: false});
  };

  throwError = errors => {
    let error: any = {};
    errors.email && (error.email = 'validation.alreadyTaken');
    errors.phone && (error.phone = 'validation.alreadyTaken');
    throw new SubmissionError(error);
  };

  onSave = values => {
    const {id, isCreateScreen, navigation, dispatch, handleSubmit} = this.props;
    const {isFetchingInitialData} = this.state;

    if (this.props.isSaving || this.props.isDeleting || isFetchingInitialData) {
      return;
    }

    const submissionError = errors =>
      handleSubmit(() => this.throwError(errors))();

    const params = {
      id,
      params: values,
      navigation,
      submissionError
    };

    isCreateScreen ? dispatch(addUser(params)) : dispatch(updateUser(params));
  };

  removeUser = () => {
    const {id, navigation, dispatch} = this.props;

    function alreadyUsedAlert() {
      alertMe({
        title: t('users.text_already_used')
      });
    }

    function confirmationAlert(remove) {
      alertMe({
        title: t('alert.title'),
        desc: t('users.text_alert_description'),
        showCancel: true,
        okPress: remove
      });
    }

    confirmationAlert(() =>
      dispatch(removeUser(id, navigation, val => alreadyUsedAlert()))
    );
  };

  setFormField = (field, value) => {
    const {dispatch} = this.props;
    dispatch(change(CREATE_USER_FORM, field, value));
  };

  navigateToRole = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_ROLE, {
      type: 'ADD',
      onSelect: item => this.setFormField(`role`, item.name)
    });
  };

  render() {
    const {
      roles,
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      formValues,
      isSaving,
      isDeleting,
      navigation,
      fetchRoles,
      handleSubmit
    } = this.props;
    const userRefs: any = {};
    const {isFetchingInitialData} = this.state;
    const disabled = !isAllowToEdit;
    const loading = isFetchingInitialData || isSaving || isDeleting;

    const bottomAction = [
      {
        label: 'button.save',
        onPress: handleSubmit(this.onSave),
        show: isAllowToEdit,
        loading
      },
      {
        label: 'button.remove',
        onPress: this.removeUser,
        bgColor: 'btn-danger',
        show: isEditScreen && isAllowToDelete,
        loading
      }
    ];

    const headerProps = {
      leftIconPress: () => navigation.goBack(null),
      title: headerTitle(this.props),
      placement: 'center',
      ...(isAllowToEdit && {
        rightIcon: 'save',
        rightIconProps: {solid: true},
        rightIconPress: handleSubmit(this.onSave)
      })
    };

    return (
      <DefaultLayout
        headerProps={headerProps}
        bottomAction={<ActionButton buttons={bottomAction} />}
        loadingProps={{is: isFetchingInitialData}}
      >
        <Field
          name="name"
          isRequired
          component={InputField}
          hint={t('users.text_name')}
          disabled={disabled}
          onSubmitEditing={() => userRefs.email.focus()}
        />

        <Field
          name="email"
          isRequired
          component={InputField}
          disabled={disabled}
          hint={t('users.email')}
          refLinkFn={ref => (userRefs.email = ref)}
          onSubmitEditing={() => userRefs.password.focus()}
          keyboardType={keyboardType.EMAIL}
        />

        <Field
          name="password"
          component={InputField}
          hint={t('users.password')}
          secureTextEntry
          secureTextIconContainerStyle={{top: 6}}
          disabled={disabled}
          refLinkFn={ref => (userRefs.password = ref)}
          isRequired={!isEditScreen}
          minCharacter={8}
          onSubmitEditing={() => userRefs.phone.focus()}
        />

        <Field
          name="phone"
          component={InputField}
          hint={t('users.phone')}
          refLinkFn={ref => (userRefs.phone = ref)}
          disabled={disabled}
          keyboardType={keyboardType.PHONE}
        />

        <Field
          name="role"
          roles={roles}
          fetchRoles={fetchRoles}
          component={RoleSelectModal}
          rightIconPress={this.navigateToRole}
          onSelect={item => this.setFormField(`role`, item.name)}
          disabled={disabled}
          refLinkFn={ref => (userRefs.role = ref)}
          placeholder={formValues?.role ?? t('users.rolePlaceholder')}
          selectedItem={formValues?.role}
        />
      </DefaultLayout>
    );
  }
}
