import React from 'react';
import {SelectField} from '@/components';
import {routes} from '@/navigation';
import t from 'locales/use-translation';

interface IProps {
  /**
   * An array of objects with data for each category.
   */
  categories?: Array<any>;

  /**
   * An action to return a list of category.
   */
  fetchCategories?: () => void;

  /**
   * Is allowed to edit.
   */
  disabled?: boolean;
}

export const ExpenseCategorySelectModal = (props: IProps) => {
  const {categories, fetchCategories, disabled = false} = props;

  return (
    <SelectField
      {...props}
      items={categories ?? []}
      getItems={fetchCategories}
      isRequired
      apiSearch
      hasPagination
      displayName="name"
      label={t('expenses.category')}
      icon="align-center"
      compareField="id"
      headerProps={{title: t('expenses.category_placeholder')}}
      emptyContentProps={{contentType: 'categories'}}
      isEditable={!disabled}
      baseSelectProps={{disabled}}
    />
  );
};
