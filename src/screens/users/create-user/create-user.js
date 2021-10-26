import React, {Component} from 'react';
import {Field, change, initialize} from 'redux-form';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-user-type';
import {routes} from '@/navigation';
import {alertMe, keyboardType} from '@/constants';
import {secondaryHeader} from 'utils/header';
import {RoleSelectModal} from '@/select-modal';
import {CREATE_USER_FORM} from 'stores/users/types';
import {
  DefaultLayout,
  InputField,
  BaseButtonGroup,
  BaseButton
} from '@/components';
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

  onSave = params => {
    const {id, isCreateScreen, dispatch} = this.props;
    const {isFetchingInitialData} = this.state;

    if (this.props.isSaving || this.props.isDeleting || isFetchingInitialData) {
      return;
    }

    isCreateScreen
      ? dispatch(addUser({params}))
      : dispatch(updateUser({id, params}));
  };

  removeUser = () => {
    const {id, dispatch} = this.props;

    function confirmationAlert(remove) {
      alertMe({
        title: t('alert.title'),
        desc: t('users.text_alert_description'),
        showCancel: true,
        okPress: remove
      });
    }

    confirmationAlert(() => dispatch(removeUser(id)));
  };

  setFormField = (field, value) => {
    const {dispatch} = this.props;
    dispatch(change(CREATE_USER_FORM, field, value));
  };

  navigateToRole = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_ROLE, {
      onSelect: item => this.setFormField(`role`, item.name),
      type: 'ADD'
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
      fetchRoles,
      handleSubmit
    } = this.props;
    const userRefs: any = {};
    const {isFetchingInitialData} = this.state;
    const disabled = !isAllowToEdit;
    const headerProps = secondaryHeader({
      ...this.props,
      rightIconPress: handleSubmit(this.onSave)
    });

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          show={isAllowToEdit}
          loading={isSaving}
          disabled={isFetchingInitialData || isDeleting}
          onPress={handleSubmit(this.onSave)}
        >
          {t('button.save')}
        </BaseButton>
        <BaseButton
          type="danger"
          show={isEditScreen && isAllowToDelete}
          loading={isDeleting}
          disabled={isFetchingInitialData || isSaving}
          onPress={this.removeUser}
        >
          {t('button.remove')}
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

        <Field
          name="password"
          component={InputField}
          hint={t('users.password')}
          secureTextEntry
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
      </DefaultLayout>
    );
  }
}
