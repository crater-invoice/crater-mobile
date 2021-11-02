import React from 'react';
import {AssetImage, SelectField} from '@/components';
import {routes} from '@/navigation';
import t from 'locales/use-translation';
import {colors, itemsDescriptionStyle} from '@/styles';

interface IProps {
  /**
   * An array of objects with data for each item.
   */
  items?: Array<any>;

  /**
   * An action to return a list of item.
   */
  getItems?: () => void;

  /**
   * Is allowed to edit.
   */
  disabled?: boolean;
}

export const ItemSelectModal = (props: IProps) => {
  const {items, getItems, disabled} = props;

  return (
    <SelectField
      {...props}
      items={items ?? []}
      getItems={getItems}
      hasPagination
      apiSearch
      onlyPlaceholder
      isMultiSelect
      displayName="name"
      compareField="id"
      valueCompareField="item_id"
      icon={'percent'}
      placeholder={t('estimates.addItem')}
      createActionRouteName={routes.GLOBAL_ITEMS}
      paginationLimit={15}
      isEditable={!disabled}
      baseSelectProps={{
        icon: 'shopping-basket',
        rightIcon: 'angle-right',
        color: colors.primaryLight,
        disabled
      }}
      headerProps={{title: t('items.title')}}
      emptyContentProps={{
        contentType: 'items',
        image: AssetImage.images.empty_items
      }}
      listViewProps={{leftSubTitleStyle: itemsDescriptionStyle()}}
    />
  );
};
