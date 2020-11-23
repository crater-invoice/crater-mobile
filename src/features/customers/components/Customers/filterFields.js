import React from 'react';
import Lng from '@/lang/i18n';

export const customersFilterFields = locale => {
    const filterRefs: any = {};

    return [
        {
            name: 'name',
            hint: Lng.t('customers.filterDisplayName', {
                locale
            }),
            inputProps: {
                autoCorrect: true,
                autoFocus: true,
                onSubmitEditing: () => filterRefs.contactName.focus()
            }
        },
        {
            name: 'contact_name',
            hint: Lng.t('customers.filterContactName', {
                locale
            }),
            inputProps: {
                autoCorrect: true,
                onSubmitEditing: () => filterRefs.phone.focus()
            },
            refLinkFn: ref => (filterRefs.contactName = ref)
        },
        {
            name: 'phone',
            hint: Lng.t('customers.phone', { locale }),
            inputProps: {
                keyboardType: 'phone-pad'
            },
            refLinkFn: ref => (filterRefs.phone = ref)
        }
    ];
};
