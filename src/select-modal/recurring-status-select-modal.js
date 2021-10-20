import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {IMAGES} from '@/assets';

interface IProps {
  /**
   * An array of objects with data for each status.
   */
  statusList?: Array<any>;

  /**
   * Is allowed to edit.
   */
  disabled?: Boolean;
}

export const StatusSelectModal = (props: IProps) => {
  const {statusList, disabled} = props;
  return (
    <SelectField
      {...props}
      items={statusList ?? []}
      isRequired
      label={t('recurring_invoices.status.title')}
      icon={'tag'}
      headerProps={{title: t('recurring_invoices.status.title')}}
      emptyContentProps={{
        contentType: 'recurring_invoices.status'
      }}
      isEditable={!disabled}
      baseSelectProps={{disabled}}
      isInternalSearch
    />
  );
};
