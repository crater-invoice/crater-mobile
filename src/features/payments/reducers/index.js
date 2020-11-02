import {
    SET_PAYMENTS,
    PAYMENTS_TRIGGER_SPINNER,
    SAVE_UNPAID_INVOICES
} from '../constants';

const initialState = {
    payments: [],
    errors: null,
    unPaidInvoices: [],
    loading: {
        paymentLoading: false,
        getUnpaidInvoicesLoading: false
    }
};

export default function paymentsReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case PAYMENTS_TRIGGER_SPINNER:
            return { ...state, loading: { ...payload } };

        case SET_PAYMENTS:
            let { payments, fresh } = payload;

            if (!fresh) {
                return { ...state, payments: [...state.payments, ...payments] };
            }

            return { ...state, payments };

        case SAVE_UNPAID_INVOICES:
            if (!payload.fresh) {
                return {
                    ...state,
                    unPaidInvoices: [
                        ...state.unPaidInvoices,
                        ...payload.invoices
                    ]
                };
            }

            return { ...state, unPaidInvoices: payload.invoices };

        default:
            return state;
    }
}
