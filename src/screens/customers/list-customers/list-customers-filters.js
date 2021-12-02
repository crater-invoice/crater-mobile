import t from 'locales/use-translation';
import {keyboardType} from '@/helpers/keyboard';

const filterRefs: any = {};

export default [
  {
    name: 'name',
    hint: t('customers.filter_display_name'),
    onSubmitEditing: () => filterRefs.contactName.focus()
  },
  {
    name: 'contact_name',
    hint: t('customers.filter_contact_name'),
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
