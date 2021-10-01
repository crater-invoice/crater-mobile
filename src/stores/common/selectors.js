import {PermissionService} from '@/services';

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
  const {common} = state;
  return {
    locale: common?.locale,
    theme: common?.theme,
    abilities: common?.abilities
  };
};
