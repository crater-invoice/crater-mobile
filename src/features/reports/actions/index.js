import {
    GENERATE_REPORT,
} from "../constants";

// Reports
export const generateReport = (payload) => ({
    type: GENERATE_REPORT,
    payload,
});
