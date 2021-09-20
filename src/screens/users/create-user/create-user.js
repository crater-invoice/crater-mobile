import React, {Component} from 'react';
import {Field, change, initialize, SubmissionError} from 'redux-form';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-user-type';
import {routes} from '@/navigation';
import {alertMe, KEYBOARD_TYPE} from '@/constants';
import {CREATE_USER_FORM} from 'stores/users/types';
import {IMAGES} from '@/assets';
import {
  DefaultLayout,
  InputField,
  ActionButton,
  SelectField
} from '@/components';
import {
  addUser,
  updateUser,
  removeUser,
  fetchSingleUser
} from 'stores/users/actions';

let userRefs = {};

export default class CreateUser extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {isEditScreen, userId, dispatch} = this.props;

    if (isEditScreen) {
      const onSuccess = user => {
        this.setInitialData(user);
      };
      dispatch(fetchSingleUser({id: userId, onSuccess}));
      return;
    }
  };

  throwError = errors => {
    let error = {};
    errors.email && (error.email = 'validation.alreadyTaken');
    errors.phone && (error.phone = 'validation.alreadyTaken');
    throw new SubmissionError(error);
  };

  setInitialData = user => {
    const {dispatch} = this.props;
    dispatch(initialize(CREATE_USER_FORM, user));
  };

  onSave = values => {
    const {
      isCreateScreen,
      navigation,
      loading,
      userId,
      dispatch,
      handleSubmit
    } = this.props;

    if (loading) {
      return;
    }

    const params = {
      params: values,
      navigation,
      userId,
      submissionError: errors => handleSubmit(() => this.throwError(errors))()
    };

    isCreateScreen ? dispatch(addUser(params)) : dispatch(updateUser(params));
  };

  removeUser = () => {
    const {navigation, userId, dispatch} = this.props;
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
      dispatch(
        removeUser({
          id: userId,
          onSuccess: val =>
            val ? navigation.navigate(routes.USERS) : alreadyUsedAlert()
        })
      )
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
      onSelect: item => {
        this.setFormField(`role`, item.name);
      }
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
      roles,
      fetchRoles,
      formValues
    } = this.props;
    const disabled = !isAllowToEdit;

    const getTitle = () => {
      let title = 'header.addUser';

      if (isEditScreen && !isAllowToEdit) title = 'header.viewUser';
      if (isEditScreen && isAllowToEdit) title = 'header.editUser';

      return t(title);
    };

    const bottomAction = [
      {
        label: 'button.save',
        onPress: handleSubmit(this.onSave),
        show: isAllowToEdit,
        loading: loading
      },
      {
        label: 'button.remove',
        onPress: this.removeUser,
        bgColor: 'btn-danger',
        show: isEditScreen && isAllowToDelete,
        loading: loading
      }
    ];

    const headerProps = {
      leftIconPress: () => navigation.goBack(null),
      title: getTitle(),
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
      >
        <Field
          name="name"
          component={InputField}
          isRequired
          hint={t('users.text_name')}
          disabled={disabled}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true,
            onSubmitEditing: () => userRefs.email.focus()
          }}
        />

        <Field
          name="email"
          component={InputField}
          hint={t('users.email')}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true,
            keyboardType: KEYBOARD_TYPE.EMAIL,
            onSubmitEditing: () => userRefs.password.focus()
          }}
          isRequired
          refLinkFn={ref => (userRefs.email = ref)}
          disabled={disabled}
        />

        <Field
          name="password"
          component={InputField}
          hint={t('users.password')}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true,
            onSubmitEditing: () => userRefs.phone.focus()
          }}
          secureTextEntry
          secureTextIconContainerStyle={{top: 6}}
          disabled={disabled}
          refLinkFn={ref => (userRefs.password = ref)}
          isRequired={!isEditScreen}
          minCharacter={8}
        />

        <Field
          name="phone"
          component={InputField}
          hint={t('users.phone')}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true,
            keyboardType: KEYBOARD_TYPE.PHONE
          }}
          refLinkFn={ref => (userRefs.phone = ref)}
          disabled={disabled}
        />

        <Field
          name="role"
          items={roles}
          apiSearch
          hasPagination
          isRequired
          getItems={fetchRoles}
          selectedItem={formValues?.user?.role}
          displayName="title"
          component={SelectField}
          label={t('users.role')}
          icon={'align-center'}
          createActionRouteName={routes.ROLE}
          rightIconPress={this.navigateToRole}
          placeholder={formValues?.role ?? t('users.rolePlaceholder')}
          navigation={navigation}
          compareField="id"
          onSelect={item => this.setFormField(`role`, item.name)}
          headerProps={{
            title: t('users.roles')
          }}
          emptyContentProps={{
            contentType: 'roles',
            image: IMAGES.EMPTY_CUSTOMERS
          }}
          isEditable={!disabled}
          fakeInputProps={{disabled}}
          refLinkFn={ref => (userRefs.role = ref)}
        />
      </DefaultLayout>
    );
  }
}
