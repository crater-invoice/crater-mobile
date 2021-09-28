import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {IMAGES} from '@/assets';

interface IProps {
  /**
   * An array of objects with data for each role.
   */
  roles?: Array;

  /**
   * An action to return a list of role.
   */
  fetchRoles?: () => void;

  /**
   * Is allowed to edit.
   */
  disabled?: Boolean;

  /**
   * Gets form data.
   */
  formValues: any;
}

export const RoleSelectModal = (props: IProps) => {
  const {roles, fetchRoles, formValues, disabled} = props;

  return (
    <SelectField
      {...props}
      items={roles ?? []}
      apiSearch
      hasPagination
      isRequired
      getItems={fetchRoles}
      placeholder={formValues?.role ?? t('users.rolePlaceholder')}
      selectedItem={formValues?.user?.role}
      displayName="title"
      label={t('users.role')}
      icon={'align-center'}
      createActionRouteName={routes.ROLES}
      compareField="id"
      headerProps={{
        title: t('users.roles')
      }}
      emptyContentProps={{
        contentType: 'roles',
        image: IMAGES.EMPTY_CUSTOMERS
      }}
      isEditable={!disabled}
      fakeInputProps={{disabled}}
    />
  );
};
