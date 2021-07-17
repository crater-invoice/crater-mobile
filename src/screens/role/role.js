// @flow

import React from 'react';
import {Field, FieldArray, change, SubmissionError} from 'redux-form';
import {pick} from 'lodash';
import t from 'locales/use-translation';
import {IProps, IStates} from './role-type';
import {goBack, MOUNT, UNMOUNT, ROUTES} from '@/navigation';
import {styles} from './role-styles';
import {
  DefaultLayout,
  InputField,
  ActionButton,
  View,
  Text,
  CheckBox,
  Label,
  CtDivider
} from '@/components';
import {
  fetchPermissions,
  addRole,
  updateRole,
  removeRole,
  updatePermission,
  fetchSingleRole
} from 'modules/roles/actions';
import {ROLE_FORM} from '@/modules/roles/constants';
import {hasValue} from '@/constants';

export default class Role extends React.Component<IProps, IStates> {
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

  loadData = () => {
    const {isEditScreen, roleId, dispatch} = this.props;
    if (isEditScreen) {
      dispatch(
        fetchSingleRole({
          id: roleId,
          onSuccess: () => this.setState({isFetchingInitialData: false})
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

  componentWillUnmount() {
    goBack(UNMOUNT);
  }

  onSave = ({name}) => {
    const {isFetchingInitialData} = this.state;
    const {
      isCreateScreen,
      dispatch,
      navigation,
      loading,
      permissions
    } = this.props;

    const abilities = permissions.map(p =>
      pick(p, ['name', 'ability', 'model', 'allowed'])
    );
    const params = {name, abilities};

    if (loading || isFetchingInitialData) {
      return;
    }

    isCreateScreen
      ? dispatch(addRole({params, navigation}))
      : dispatch(updateRole({params, navigation}));
  };

  removeRole = () => {};

  toggleAbility = (allowed, ability) => {
    const {dispatch} = this.props;
    dispatch(updatePermission({allowed, ability}));
  };

  render() {
    const {
      navigation,
      handleSubmit,
      locale,
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
                labelStyle={styles.checkboxLabel}
                disabled={disabled}
                input={{
                  value: allowed,
                  onChange: allowed => this.toggleAbility(allowed, ability)
                }}
              />
            );
          })}
          {/* <CtDivider dividerStyle={styles.dividerLine} /> */}
        </View>
      );
    }

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
        bottomAction={<ActionButton locale={locale} buttons={bottomAction} />}
        loadingProps={{is: isFetchingInitialData}}
      >
        <Field
          name="name"
          component={InputField}
          isRequired
          hint={t('roles.text_name', {locale})}
          disabled={disabled}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true
          }}
        />
        <Label h5 mt-8 mb-12 theme={theme}>
          {t('roles.text_permissions', {locale})}
        </Label>

        <View pb-10>{permissionList}</View>
      </DefaultLayout>
    );
  }
}
