import React from 'react';
import {AssetImage, SelectField} from '@/components';
import {routes} from '@/navigation';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each customer.
   */
  customers?: Array<any>;

  /**
   * An action to return a list of customer.
   */
  getCustomers?: () => void;

  /**
   * Is allowed to edit.
   */
  disabled?: Boolean;
}

export const CustomerSelectModal = (props: IProps) => {
  const {customers, getCustomers, disabled} = props;

  return (
    <SelectField
      placeholder={t('estimates.customerPlaceholder')}
      {...props}
      items={customers ?? []}
      getItems={getCustomers}
      isRequired
      apiSearch
      hasPagination
      displayName="name"
      label={t('customers.customer')}
      icon={'user'}
      compareField="id"
      createActionRouteName={routes.MAIN_CUSTOMERS}
      headerProps={{title: t('customers.title')}}
      listViewProps={{hasAvatar: true}}
      emptyContentProps={{
        contentType: 'customers',
        image: AssetImage.images.empty_customers
      }}
      isEditable={!disabled}
      fakeInputProps={{disabled}}
    />
  );
};
