const initialState = {
    companies: []
};

export default function commonReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        default:
            return state;
    }
}
