import React, {Component} from 'react';
import {Field, change} from 'redux-form';
import {pick, find} from 'lodash';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-role-type';
import {goBack, MOUNT, UNMOUNT, ROUTES} from '@/navigation';
import {alertMe, hasValue} from '@/constants';
import {CREATE_ROLE_FORM} from 'modules/roles/constants';
import {
  DefaultLayout,
  InputField,
  ActionButton,
  View,
  Text,
  CheckBox,
  Label
} from '@/components';
import {
  fetchPermissions,
  addRole,
  updateRole,
  removeRole,
  updatePermission,
  fetchSingleRole
} from 'modules/roles/actions';

export default class CreateRole extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingInitialData: true
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    goBack(MOUNT, navigation);
    this.loadData();
  }

  componentWillUnmount() {
    goBack(UNMOUNT);
  }

  loadData = () => {
    const {isEditScreen, roleId, dispatch} = this.props;
    if (isEditScreen) {
      const onSuccess = role => {
        this.setFormField('name', role?.title);
        this.setState({isFetchingInitialData: false});
      };
      dispatch(fetchSingleRole({id: roleId, onSuccess}));
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
      isCreateScreen,
      dispatch,
      navigation,
      loading,
      permissions,
      roleId
    } = this.props;

    if (loading || isFetchingInitialData) {
      return;
    }

    const abilities = permissions.map(p =>
      pick(p, ['name', 'ability', 'model', 'allowed'])
    );

    const hasPermission = hasValue(find(abilities, {allowed: true})?.allowed);

    if (!hasPermission) {
      alertMe({desc: 'Choose at least one permission'});
      return;
    }

    const params = {name, abilities};

    isCreateScreen
      ? dispatch(
          addRole({
            params,
            onResult: res => {
              const onSelect = navigation.getParam('onSelect', null);
              onSelect?.(res);
              navigation.goBack(null);
            }
          })
        )
      : dispatch(updateRole({params, roleId, navigation}));
  };

  removeRole = () => {
    const {navigation, roleId, dispatch} = this.props;
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
      dispatch(
        removeRole({
          id: roleId,
          onSuccess: val =>
            val ? navigation.navigate(ROUTES.ROLES) : alreadyUsedAlert()
        })
      )
    );
  };

  toggleAbility = (allowed, ability) => {
    const {dispatch} = this.props;
    dispatch(updatePermission({allowed, ability}));
  };

  setFormField = (field, value) => {
    const {dispatch} = this.props;
    dispatch(change(CREATE_ROLE_FORM, field, value));
  };

  render() {
    const {
      navigation,
      handleSubmit,
      loading,
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      formattedPermissions: permissions,
      theme
    } = this.props;
    const {isFetchingInitialData} = this.state;
    const disabled = !isAllowToEdit;

    const getTitle = () => {
      let title = 'header.addRole';
      if (isEditScreen && !isAllowToEdit) title = 'header.viewRole';
      if (isEditScreen && isAllowToEdit) title = 'header.editRole';

      return t(title);
    };

    const bottomAction = [
      {
        label: 'button.save',
        onPress: handleSubmit(this.onSave),
        show: isAllowToEdit,
        loading: loading || isFetchingInitialData
      },
      {
        label: 'button.remove',
        onPress: this.removeRole,
        bgColor: 'btn-danger',
        show: isEditScreen && isAllowToDelete,
        loading: loading || isFetchingInitialData
      }
    ];

    const permissionList = [];
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
                disabled={disabled}
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
        loadingProps={{is: isFetchingInitialData}}
      >
        <Field
          name="name"
          component={InputField}
          isRequired
          hint={t('roles.text_name')}
          disabled={disabled}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true
          }}
        />
        <Label h5 mt-8 mb-12 theme={theme}>
          {t('roles.text_permissions')}
        </Label>
        <View pb-10>{permissionList}</View>
      </DefaultLayout>
    );
  }
}
