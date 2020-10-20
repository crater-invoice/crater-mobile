import { SET_PAYMENTS, PAYMENTS_TRIGGER_SPINNER } from '../constants';

const initialState = {
    payments: [],
    errors: null,
    loading: {
        initPaymentLoading: false,
        paymentLoading: false,
        getUnpaidInvoicesLoading: false
    }
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

        case PAYMENTS_TRIGGER_SPINNER:
            return { ...state, loading: { ...payload } };

        default:
            return state;
    }
}
