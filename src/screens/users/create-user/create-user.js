import React, {Component} from 'react';
import {Field, change, initialize} from 'redux-form';
import {find} from 'lodash';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-user-type.d';
import {routes} from '@/navigation';
import {alertMe, hasValue} from '@/constants';
import {keyboardType} from '@/helpers/keyboard';
import {secondaryHeader} from 'utils/header';
import {RoleSelectModal} from '@/select-modal';
import {CREATE_USER_FORM} from 'stores/users/types';
import {
  DefaultLayout,
  BaseInput,
  BaseButtonGroup,
  BaseButton,
  View,
  Text
} from '@/components';
import {
  addUser,
  updateUser,
  removeUser,
  fetchSingleUser,
  fetchUserInitialDetails
} from 'stores/users/actions';
import CompanyList from './create-user-company-selection';

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
      dispatch(fetchSingleUser(id, this.setInitialData));
      return;
    }

    dispatch(
      fetchUserInitialDetails(() =>
        this.setState({isFetchingInitialData: false})
      )
    );
  };

  setInitialData = res => {
    const {dispatch} = this.props;
    const companies = res?.companies?.map(company => {
      const selectedRole = find(res.roles, {scope: company.id});
      return {
        ...company,
        role: selectedRole?.name,
        selectedRole
      };
    });

    const data = {...res, companies};
    dispatch(initialize(CREATE_USER_FORM, data));
    this.setState({isFetchingInitialData: false});
  };

  onSave = params => {
    const {id, isCreateScreen, dispatch, isSaving, isDeleting} = this.props;
    const {isFetchingInitialData} = this.state;

    if (isSaving || isDeleting || isFetchingInitialData) {
      return;
    }

    let hasError = false;

    for (const company of params?.companies) {
      if (!hasValue(company?.role)) {
        hasError = true;
        break;
      }
    }

    if (hasError) {
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
        desc: t('users.alert_description'),
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
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      isSaving,
      isDeleting,
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
          component={BaseInput}
          hint={t('users.name')}
          disabled={disabled}
          onSubmitEditing={() => userRefs.email.focus()}
        />

        <Field
          name="email"
          isRequired
          component={BaseInput}
          disabled={disabled}
          hint={t('users.email')}
          refLinkFn={ref => (userRefs.email = ref)}
          keyboardType={keyboardType.EMAIL}
        />

        <CompanyList
          {...this.props}
          setFormField={this.setFormField}
          disabled={disabled}
        />

        <Field
          name="password"
          component={BaseInput}
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
          component={BaseInput}
          hint={t('users.phone')}
          refLinkFn={ref => (userRefs.phone = ref)}
          disabled={disabled}
          keyboardType={keyboardType.PHONE}
        />
      </DefaultLayout>
    );
  }
}
