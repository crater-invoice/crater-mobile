import { hasLength } from '@/constants';
import { formatPaymentMethods } from '@/utils';
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
    payments => (!hasLength(payments) ? [] : formatPaymentItems(payments))
);

const getPaymentMethodsState = createSelector(
    methods => methods,
    methods => formatPaymentMethods(methods)
);

export { getPaymentsState, getPaymentMethodsState };
