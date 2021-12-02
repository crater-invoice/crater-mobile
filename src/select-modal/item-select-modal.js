import React from 'react';
import {AssetImage, SelectField} from '@/components';
import {routes} from '@/navigation';
import t from 'locales/use-translation';
import {colors, itemsDescriptionStyle} from '@/styles';
import {store} from '@/stores';
import {fetchItems} from 'stores/item/actions';

interface IProps {
  /**
   * An array of objects with data for each item.
   */
  items?: Array<any>;

  /**
   * Is allowed to edit.
   */
  disabled?: boolean;
}

export const ItemSelectModal = (props: IProps) => {
  const {items, disabled} = props;
  return (
    <SelectField
      {...props}
      items={items ?? []}
      getItems={q => store.dispatch(fetchItems(q))}
      hasPagination
      apiSearch
      onlyPlaceholder
      displayName="name"
      compareField="id"
      valueCompareField="item_id"
      icon={'percent'}
      placeholder={t('estimates.add_item')}
      createActionRouteName={routes.ITEMS}
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
