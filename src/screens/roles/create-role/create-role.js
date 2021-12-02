import React, {Component} from 'react';
import {Field, change} from 'redux-form';
import {find} from 'lodash';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-role-type.d';
import {alertMe, hasValue} from '@/constants';
import {CREATE_ROLE_FORM} from 'stores/role/types';
import {secondaryHeader} from 'utils/header';
import {showNotification} from '@/utils';
import {
  DefaultLayout,
  BaseInput,
  View,
  Text,
  CheckBox,
  ButtonView,
  BaseLabel,
  BaseButtonGroup,
  BaseButton
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
} from 'stores/role/actions';

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
      showNotification({
        message: 'Please select atleast one Permission.',
        type: 'error'
      });
      return;
    }

    const abilities = permissions.filter(p => p.allowed === true);

    const onSuccess = res => {
      const onSelect = route?.params?.onSelect;
      onSelect?.(res);
      navigation.goBack(null);
    };
    const params = {id, params: {name, abilities}, onSuccess};

    isEditScreen ? dispatch(updateRole(params)) : dispatch(addRole(params));
  };

  removeRole = () => {
    const {id, dispatch} = this.props;

    function confirmationAlert(remove) {
      alertMe({
        title: t('alert.title'),
        desc: t('roles.alert_description'),
        showCancel: true,
        okPress: remove
      });
    }

    confirmationAlert(() => dispatch(removeRole(id)));
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
      handleSubmit,
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      formattedPermissions: permissions,
      isSaving,
      isDeleting
    } = this.props;
    const {isFetchingInitialData} = this.state;
    const disabled = !isAllowToEdit;
    const permissionList = [];
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
          onPress={this.removeRole}
        >
          {t('button.remove')}
        </BaseButton>
      </BaseButtonGroup>
    );

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

    return (
      <DefaultLayout
        headerProps={headerProps}
        bottomAction={bottomAction}
        loadingProps={{is: isFetchingInitialData}}
      >
        <Field
          name="name"
          component={BaseInput}
          isRequired
          hint={t('roles.name')}
          disabled={disabled}
        />
        <View class="flex-row items-center">
          <BaseLabel mt-8 mb-12 flex={1} isRequired>
            {t('roles.permissions')}
          </BaseLabel>
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
