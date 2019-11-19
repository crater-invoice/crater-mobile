import {
    SET_PAYMENTS,
    PAYMENTS_TRIGGER_SPINNER,
    SET_FILTER_PAYMENTS,
} from "../constants";

const initialState = {
    payments: [],
    filterPayments: [],
    errors: null,
    loading: {
        paymentsLoading: false,
        initPaymentLoading: false,
        paymentLoading: false,
        getUnpaidInvoicesLoading: false,
    },
};

export default function paymentsReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {

        case SET_PAYMENTS:

            let { payments, fresh } = payload;

            if (!fresh) {
                return { ...state, payments: [...state.payments, ...payments] };
            }

            return { ...state, payments };

        case SET_FILTER_PAYMENTS:

            if (!payload.fresh) {
                return {
                    ...state,
                    filterPayments: [...state.filterPayments, ...payload.payments]
                };
            }

            return { ...state, filterPayments: payload.payments };

        case PAYMENTS_TRIGGER_SPINNER:
            return { ...state, loading: { ...payload } };

        default:
            return state;
    }
}
