import t from 'locales/use-translation';
import {fetchRoles} from 'stores/roles/actions';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';

export const itemsFilterFields = ({props, setFormField}) => {
  const {roles = [], navigation, dispatch} = props;
  const filterRefs: any = {};

  const inputFields = [
    {
      name: 'filterName',
      hint: t('users.text_name'),
      refLinkFn: ref => (filterRefs.filterName = ref),
      onSubmitEditing: () => filterRefs.email.focus()
    },
    {
      name: 'email',
      hint: t('users.email'),
      refLinkFn: ref => (filterRefs.email = ref),
      onSubmitEditing: () => filterRefs.phone.focus()
    },
    {
      name: 'phone',
      hint: t('users.phone'),
      refLinkFn: ref => (filterRefs.phone = ref)
    }
  ];

  const selectFields = [
    {
      name: 'role_name',
      apiSearch: true,
      hasPagination: true,
      getItems: q => dispatch(fetchRoles(q)),
      items: roles,
      displayName: 'name',
      label: t('users.role'),
      icon: 'balance-scale',
      placeholder: t('users.rolePlaceholder'),
      navigation: navigation,
      compareField: 'name',
      onSelect: item => setFormField('role_name', item.name),
      headerProps: {
        title: t('users.rolePlaceholder'),
        rightIconPress: null
      },
      emptyContentProps: {
        contentType: 'roles'
      },
      baseSelectProps: {}
    }
  ];

  if (PermissionService.isAllowToView(routes.ROLES)) {
    return {inputFields, selectFields};
  } else {
    return {inputFields};
  }
};

export default itemsFilterFields;
