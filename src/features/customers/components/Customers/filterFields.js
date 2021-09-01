import t from 'locales/use-translation';

export const customersFilterFields = () => {
    const filterRefs: any = {};

    return [
        {
            name: 'name',
            hint: t('customers.filterDisplayName'),
            inputProps: {
                autoCorrect: true,
                onSubmitEditing: () => filterRefs.contactName.focus()
            }
        },
        {
            name: 'contact_name',
            hint: t('customers.filterContactName'),
            inputProps: {
                autoCorrect: true,
                onSubmitEditing: () => filterRefs.phone.focus()
            },
            refLinkFn: ref => (filterRefs.contactName = ref)
        },
        {
            name: 'phone',
            hint: t('customers.phone'),
            inputProps: {
                keyboardType: 'phone-pad'
            },
            refLinkFn: ref => (filterRefs.phone = ref)
        }
    ];
};
