import React from 'react';
import Lng from '@/api/lang/i18n';

export const customersFilterFields = language => {
    const filterRefs: any = {};

    return [
        {
            name: 'name',
            hint: Lng.t('customers.filterDisplayName', {
                locale: language
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
                locale: language
            }),
            inputProps: {
                autoCorrect: true,
                onSubmitEditing: () => filterRefs.phone.focus()
            },
            refLinkFn: ref => (filterRefs.contactName = ref)
        },
        {
            name: 'phone',
            hint: Lng.t('customers.phone', { locale: language }),
            inputProps: {
                keyboardType: 'phone-pad'
            },
            refLinkFn: ref => (filterRefs.phone = ref)
        }
    ];
};
