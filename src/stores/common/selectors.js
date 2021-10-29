import {createSelector} from 'reselect';
import {PermissionService} from '@/services';
import {isEmpty} from '@/constants';

const commonStore = state => state?.common;

export const permissionSelector = route => {
  const type = route?.params?.type ?? 'ADD';
  const id = route?.params?.id;
  const isEditScreen = type === 'UPDATE';
  const isAllowToEdit = isEditScreen
    ? PermissionService.isAllowToEdit(route?.name)
    : true;
  const isAllowToDelete = isEditScreen
    ? PermissionService.isAllowToDelete(route?.name)
    : true;

  return {
    id,
    type,
    isCreateScreen: !isEditScreen,
    isEditScreen,
    isAllowToEdit,
    isAllowToDelete
  };
};

export const commonSelector = state => {
  const {common, user} = state;
  return {
    locale: common?.locale,
    theme: common?.theme,
    abilities: user?.currentAbilities
  };
};

export const settingsSelector = state => {
  const {
    common: {discount_per_item, tax_per_item}
  } = state;
  return {
    discount_per_item,
    tax_per_item
  };
};

export const countriesSelector = createSelector(
  commonStore,
  store => {
    if (isEmpty(store?.countries)) return [];
    return store.countries.map(country => ({
      title: country.name,
      rightTitle: country.code,
      fullItem: country
    }));
  }
);
