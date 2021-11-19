import React from 'react';
import {AssetImage, SelectField} from '@/components';
import t from 'locales/use-translation';

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
  disabled?: boolean;
}

export const RoleSelectModal = (props: IProps) => {
  const {roles, fetchRoles, disabled, company_id} = props;

  return (
    <SelectField
      {...props}
      items={roles ?? []}
      apiSearch
      hasPagination
      isRequired
      getItems={fetchRoles}
      displayName="title"
      compareField="id"
      headerProps={{title: t('users.roles'), rightIconPress: null}}
      infiniteScrollProps={{
        hideLoader: false,
        defaultQueryString: {company_id}
      }}
      emptyContentProps={{
        contentType: 'roles',
        image: AssetImage.images.empty_customers
      }}
      isEditable={!disabled}
      baseSelectProps={{disabled}}
    />
  );
};
