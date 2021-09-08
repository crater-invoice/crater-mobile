<<<<<<< HEAD
import { hasLength, isArray } from '@/constants';
import { formatPaymentModes } from '@/utils';
=======
import { isEmpty } from '@/constants';
import { formatPaymentMethods } from '@/utils';
>>>>>>> 7d9acb802b0aa688ee04d9002508e9977f18fa2c
import { createSelector } from 'reselect';

const formatPaymentItems = payments =>
    payments.map(payment => {
        const {
            formattedPaymentDate,
            amount,
            payment_mode,
            customer: { name },
            currency
        } = payment;

        return {
            title: `${name}`,
            subtitle: {
                title: `${payment_mode ? '(' + payment_mode + ')' : ''}`
            },
            amount,
            currency,
            rightSubtitle: formattedPaymentDate,
            fullItem: payment
        };
    });

const getPaymentsState = createSelector(
    payments => payments,
    payments => (isEmpty(payments) ? [] : formatPaymentItems(payments))
);

const getPaymentModesState = createSelector(
    methods => methods,
    methods => formatPaymentModes(methods)
);

export { getPaymentsState, getPaymentModesState };
