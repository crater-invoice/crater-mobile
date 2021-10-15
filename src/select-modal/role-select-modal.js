import React from 'react';
import {AssetImage, SelectField} from '@/components';
import t from 'locales/use-translation';
import {routes} from '@/navigation';

interface IProps {
  /**
   * An array of objects with data for each role.
   */
  roles?: Array<any>;

  /**
   * An action to return a list of role.
   */
  fetchRoles?: () => void;

  /**
   * Is allowed to edit.
   */
  disabled?: Boolean;
}

export const RoleSelectModal = (props: IProps) => {
  const {roles, fetchRoles, disabled} = props;
  return (
    <SelectField
      {...props}
      items={roles ?? []}
      apiSearch
      hasPagination
      isRequired
      getItems={fetchRoles}
      displayName="title"
      label={t('users.role')}
      icon={'align-center'}
      createActionRouteName={routes.ROLES}
      compareField="id"
      headerProps={{title: t('users.roles')}}
      emptyContentProps={{
        contentType: 'roles',
        image: AssetImage.images.empty_customers
      }}
      isEditable={!disabled}
      fakeInputProps={{disabled}}
    />
  );
};
