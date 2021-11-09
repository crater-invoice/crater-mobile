import t from 'locales/use-translation';
import {routes} from '@/navigation';

export const emptyContentPlaceholder = props => {
  const {route, search, navigation} = props;
  switch (route?.name) {
    case routes.CATEGORIES:
      return {
        title: t('search.no_result', {search}),
        ...(!search && {
          title: t('categories.empty.title'),
          description: t('categories.empty.description'),
          buttonTitle: t('categories.empty.button_title'),
          buttonPress: () =>
            navigation.navigate(routes.CREATE_CATEGORY, {type: 'ADD'})
        })
      };
    case routes.USERS:
      return {
        title: t('search.no_result', {search}),
        ...(!search && {
          title: t('users.empty.title'),
          description: t('users.empty.description'),
          buttonTitle: t('users.add_new_user'),
          buttonPress: () =>
            navigation.navigate(routes.CREATE_USER, {type: 'ADD'})
        })
      };
    case routes.ROLES:
      return {
        title: t('search.no_result', {search}),
        ...(!search && {
          title: t('roles.empty.title'),
          description: t('roles.empty.description'),
          buttonTitle: t('roles.add_new_role'),
          buttonPress: () =>
            navigation.navigate(routes.CREATE_ROLE, {type: 'ADD'})
        })
      };

    case routes.NOTES:
      return {
        title: t('search.no_result', {search}),
        ...(!search && {
          title: t('notes.empty.title'),
          description: t('notes.empty.description'),
          buttonTitle: t('notes.empty.button_title'),
          buttonPress: () =>
            navigation.navigate(routes.CREATE_ROLE, {type: 'ADD'})
        })
      };

    default:
      return {
        title: props?.title,
        description: props?.description,
        image: props?.image,
        buttonTitle: props?.buttonTitle,
        buttonPress: props?.buttonPress
      };
  }
};
