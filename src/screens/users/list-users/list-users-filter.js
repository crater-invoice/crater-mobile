import t from 'locales/use-translation';
import {fetchRoles} from 'stores/role/actions';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';

export const itemsFilterFields = ({props, setFormField}) => {
  const {roles = [], navigation, dispatch} = props;
  const filterRefs: any = {};

  const inputFields = [
    {
      name: 'filterName',
      hint: t('users.name'),
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
      name: 'role',
      apiSearch: true,
      hasPagination: true,
      getItems: q => dispatch(fetchRoles(q)),
      items: roles,
      displayName: 'name',
      label: t('users.role'),
      placeholder: t('users.role_placeholder'),
      navigation: navigation,
      compareField: 'name',
      onSelect: item => setFormField('role', item.name),
      headerProps: {
        title: t('users.role_placeholder'),
        rightIconPress: null
      },
      emptyContentProps: {
        contentType: 'roles'
      },
      baseSelectProps: {}
    }
  ];

  if (PermissionService.isOwner) {
    return {inputFields, selectFields};
  } else {
    return {inputFields};
  }
};

export default itemsFilterFields;
