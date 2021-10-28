import t from 'locales/use-translation';
import {ARROW_ICON} from '@/assets';
import {navigation, routes} from '@/navigation';

const layoutProps = route => {
  switch (route?.name) {
    case routes.CATEGORIES:
      return {
        title: t('header.expenseCategory'),
        navigateToRoute: routes.CREATE_CATEGORY
      };
    case routes.USERS:
      return {
        title: t('header.users'),
        navigateToRoute: routes.CREATE_USER
      };
    case routes.ROLES:
      return {
        title: t('header.roles'),
        navigateToRoute: routes.CREATE_ROLE
      };
    case routes.RECURRING_INVOICES:
      return {
        title: t('header.recurring_invoices'),
        navigateToRoute: routes.CREATE_RECURRING_INVOICE
      };
    default:
      return {title: '', navigateToRoute: null};
  }
};

const secondaryHeaderTitle = params => {
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

    case routes.CREATE_RECURRING_INVOICE:
      return getTitle(
        'header.add_recurring_invoice',
        'header.edit_recurring_invoice',
        'header.view_recurring_invoice'
      );

    case routes.CREATE_ROLE:
      return getTitle('header.addRole', 'header.editRole', 'header.viewRole');

    case routes.CREATE_CATEGORY:
      return getTitle(
        'header.addCategory',
        'header.editCategory',
        'header.viewCategory'
      );

    case routes.CREATE_COMPANY:
      return getTitle(
        'header.addCompany',
        'header.addCompany',
        'header.addCompany'
      );

    default:
      return '';
  }
};

export const primaryHeader = params => {
  const {route} = params;
  const {title, navigateToRoute} = layoutProps(route);

  const leftIconPress = () => {
    if (params?.leftIconPress) {
      params?.leftIconPress();
      return;
    }
    navigation.goBack();
  };

  const rightIconPress = () => {
    if (params?.rightIconPress) {
      params?.rightIconPress();
      return;
    }
    navigation.navigateTo({route: navigateToRoute, params: {type: 'ADD'}});
  };

  return {
    title,
    route,
    placement: 'center',
    leftIcon: ARROW_ICON,
    rightIcon: 'plus',
    leftIconPress,
    rightIconPress
  };
};

export const secondaryHeader = params => {
  const {isAllowToEdit, rightIconPress} = params;

  const leftIconPress = () => {
    if (params?.leftIconPress) {
      params?.leftIconPress();
      return;
    }
    navigation.goBack();
  };

  return {
    leftIconPress,
    title: secondaryHeaderTitle(params),
    placement: 'center',
    ...(isAllowToEdit && {
      rightIcon: 'save',
      rightIconProps: {solid: true},
      rightIconPress
    })
  };
};
