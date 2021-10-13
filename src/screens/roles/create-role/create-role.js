import React, {Component} from 'react';
import {Field, change} from 'redux-form';
import {find} from 'lodash';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-role-type';
import {alertMe, hasValue} from '@/constants';
import {CREATE_ROLE_FORM} from 'stores/roles/types';
import headerTitle from 'utils/header';
import {
  DefaultLayout,
  InputField,
  ActionButton,
  View,
  Text,
  CheckBox,
  Label,
  ButtonView
} from '@/components';
import {
  fetchPermissions,
  addRole,
  updateRole,
  removeRole,
  updatePermission,
  fetchSingleRole,
  selectAllPermissions,
  resetPermissions
} from 'stores/roles/actions';

export default class CreateRole extends Component<IProps, IStates> {
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
      dispatch(
        fetchSingleRole(id, role => {
          this.setFormField('name', role?.name);
          this.setState({isFetchingInitialData: false});
        })
      );
      return;
    }

    dispatch(
      fetchPermissions(() => {
        this.setState({isFetchingInitialData: false});
      })
    );
  };

  onSave = ({name}) => {
    const {isFetchingInitialData} = this.state;
    const {
      id,
      route,
      isEditScreen,
      dispatch,
      navigation,
      permissions
    } = this.props;

    if (this.props.isSaving || this.props.isDeleting || isFetchingInitialData) {
      return;
    }

    const hasPermission = hasValue(find(permissions, {allowed: true})?.allowed);

    if (!hasPermission) {
      alertMe({desc: 'Please select atleast one Permission.'});
      return;
    }

    const abilities = permissions.filter(p => p.allowed === true);

    const submissionError = errors => console.log(errors);

    const onSuccess = res => {
      const onSelect = route?.params?.onSelect;
      onSelect?.(res);
      navigation.goBack(null);
    };
    const params = {
      id,
      params: {name, abilities},
      navigation,
      submissionError,
      onSuccess
    };

    isEditScreen ? dispatch(updateRole(params)) : dispatch(addRole(params));
  };

  removeRole = () => {
    const {navigation, id, dispatch} = this.props;
    function alreadyUsedAlert() {
      alertMe({
        title: t('roles.text_already_used')
      });
    }

    function confirmationAlert(remove) {
      alertMe({
        title: t('alert.title'),
        desc: t('roles.text_alert_description'),
        showCancel: true,
        okPress: remove
      });
    }

    confirmationAlert(() =>
      dispatch(removeRole(id, navigation, val => alreadyUsedAlert()))
    );
  };

  toggleAbility = (allowed, ability) => {
    const {dispatch} = this.props;
    dispatch(updatePermission({allowed, ability}));
  };

  selectAllPermissions = () => this.props.dispatch(selectAllPermissions());

  resetPermissions = () => this.props.dispatch(resetPermissions());

  setFormField = (field, value) => {
    const {dispatch} = this.props;
    dispatch(change(CREATE_ROLE_FORM, field, value));
  };

  render() {
    const {
      navigation,
      handleSubmit,
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      formattedPermissions: permissions,
      theme,
      isSaving,
      isDeleting
    } = this.props;
    const {isFetchingInitialData} = this.state;
    const disabled = !isAllowToEdit;
    const loading = isFetchingInitialData || isSaving || isDeleting;
    const permissionList = [];
    const bottomAction = [
      {
        label: 'button.save',
        onPress: handleSubmit(this.onSave),
        show: isAllowToEdit,
        loading
      },
      {
        label: 'button.remove',
        onPress: this.removeRole,
        bgColor: 'btn-danger',
        show: isEditScreen && isAllowToDelete,
        loading
      }
    ];

    for (const permission in permissions) {
      permissionList.push(
        <View key={permission} mb-10>
          <Text h5 pl-5>
            {permission}
          </Text>
          {permissions[permission].map(ability => {
            const {name, allowed, disabled} = ability;
            return (
              <CheckBox
                key={name}
                label={name}
                labelStyle={{}}
                disabled={disabled || !isAllowToEdit}
                input={{
                  value: allowed,
                  onChange: allowed => this.toggleAbility(allowed, ability)
                }}
              />
            );
          })}
        </View>
      );
    }

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
          component={InputField}
          isRequired
          hint={t('roles.text_name')}
          disabled={disabled}
        />
        <View class="flex-row items-center">
          <Label h5 mt-8 mb-12 flex={1} isRequired theme={theme}>
            {t('roles.text_permissions')}
          </Label>
          <View class="flex-row flex-1 justify-end">
            {!disabled && (
              <>
                <ButtonView
                  class="px-5"
                  hitSlop={{top: 10, left: 7, bottom: 10, right: 7}}
                  onPress={this.selectAllPermissions}
                >
                  <Text primary>{t('roles.select_all')}</Text>
                </ButtonView>
                <View class="mx-2">
                  <Text>/</Text>
                </View>
                <ButtonView
                  class="px-5"
                  hitSlop={{top: 10, left: 7, bottom: 10, right: 7}}
                  onPress={this.resetPermissions}
                >
                  <Text primary>{t('roles.none')}</Text>
                </ButtonView>
              </>
            )}
          </View>
        </View>
        <View pb-10>{permissionList}</View>
      </DefaultLayout>
    );
  }
}
