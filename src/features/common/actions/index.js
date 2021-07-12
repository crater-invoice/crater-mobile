import * as Actions from '../constants';

/**
 * Spinner
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function spinner(payload = {}) {
    return {
        type: Actions.SPINNER,
        payload
    };
}

/**
 * Fetch companies
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchCompanies(payload = {}) {
    return {
        type: Actions.FETCH_COMPANIES,
        payload
    };
}

/**
 * Add company
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function addCompany(payload = {}) {
    return {
        type: Actions.ADD_COMPANY,
        payload
    };
}

/**
 * Update company
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updateCompany(payload = {}) {
    return {
        type: Actions.UPDATE_COMPANY,
        payload
    };
}

/**
 * Remove company
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function removeCompany(payload = {}) {
    return {
        type: Actions.REMOVE_COMPANY,
        payload
    };
}
