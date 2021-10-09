import t from 'locales/use-translation';
import {keyboardType} from '@/constants';

export const customersFilterFields = () => {
  const filterRefs: any = {};

  return [
    {
      name: 'name',
      hint: t('customers.filterDisplayName'),
      onSubmitEditing: () => filterRefs.contactName.focus()
    },
    {
      name: 'contact_name',
      hint: t('customers.filterContactName'),
      onSubmitEditing: () => filterRefs.phone.focus(),
      refLinkFn: ref => (filterRefs.contactName = ref)
    },
    {
      name: 'phone',
      hint: t('customers.phone'),
      keyboardType: keyboardType.PHONE,
      refLinkFn: ref => (filterRefs.phone = ref)
    }
  ];
};
