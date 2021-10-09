import {routes} from '@/navigation';
import t from 'locales/use-translation';

export default params => {
  const {isEditScreen, isAllowToEdit} = params;
  const isUpdate = isEditScreen && isAllowToEdit;
  const isView = isEditScreen && !isAllowToEdit;

  function getTitle(addScreenTitle, updateScreenTitle, viewScreenTitle) {
    return isView
      ? t(viewScreenTitle)
      : isUpdate
      ? t(updateScreenTitle)
      : t(addScreenTitle);
  }

  switch (params?.route?.name) {
    case routes.CREATE_USER:
      return getTitle('header.addUser', 'header.editUser', 'header.viewUser');

    case routes.CREATE_ROLE:
      return getTitle('header.addRole', 'header.editRole', 'header.viewRole');

    default:
      return '';
  }
};
