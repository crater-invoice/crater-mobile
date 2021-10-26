import t from 'locales/use-translation';
import {routes} from '@/navigation';

export const emptyContentPlaceholder = props => {
  const {route, search, navigation} = props;
  switch (route?.name) {
    case routes.CATEGORIES:
      return {
        title: t('search.noResult', {search}),
        ...(!search && {
          title: t('categories.empty.title'),
          description: t('categories.empty.description'),
          buttonTitle: t('categories.empty.buttonTitle'),
          buttonPress: () =>
            navigation.navigate(routes.CREATE_CATEGORY, {type: 'ADD'})
        })
      };
    case routes.USERS:
      return {
        title: t('search.noResult', {search}),
        ...(!search && {
          title: t('users.empty.title'),
          description: t('users.empty.description'),
          buttonTitle: t('users.text_add_new_user'),
          buttonPress: () =>
            navigation.navigate(routes.CREATE_USER, {type: 'ADD'})
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
