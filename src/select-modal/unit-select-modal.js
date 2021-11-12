import React from 'react';
import {SelectField} from '@/components';
import t from 'locales/use-translation';
import {defineSize} from '@/helpers/size';

interface IProps {
  /**
   * An array of objects with data for each unit.
   */

  units?: Array<any>;

  /**
   * An action to return a list of unit.
   */
  fetchItemUnits?: () => void;

  /**
   * Is allowed to edit.
   */
  disabled?: boolean;
}

export const UnitSelectModal = (props: IProps) => {
  const {units, fetchItemUnits, disabled} = props;

  return (
    <SelectField
      placeholder={t('items.unit_placeholder')}
      {...props}
      items={units ?? []}
      getItems={fetchItemUnits}
      apiSearch
      hasPagination
      displayName={'name'}
      label={t('items.unit')}
      icon={'balance-scale'}
      compareField={'id'}
      emptyContentProps={{contentType: 'units'}}
      headerProps={{title: t('items.unit_placeholder')}}
      paginationLimit={defineSize(15, 15, 15, 20)}
      inputModalName="UnitModal"
      baseSelectProps={{disabled, leftIconProps: {size: 14}}}
    />
  );
};
