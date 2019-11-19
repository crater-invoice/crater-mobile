import queryString from 'query-string';

export const GET_METHOD = 'GET'
export const GET_EDIT_METHOD = 'GET_EDIT'
export const GET_SLASH_METHOD = 'GET_SLASH'
export const POST_METHOD = 'POST'
export const PUT_METHOD = 'PUT'
export const DELETE_METHOD = 'DELETE'

export const COUNTRY_API = 'countries'
export const STATE_API = 'states'
export const CITY_API = 'cities'

export const CUSTOMERS_API = 'customers'


const apiMethod = (url, method, params) => {

    let { id } = params

    switch (method) {
        case GET_METHOD:
            return `${url}?${queryString.stringify(params)}`;

        case GET_EDIT_METHOD:
            return `${url}/${params}/edit`;

        case GET_SLASH_METHOD:
            return `${url}/${params}`;

        case POST_METHOD:
            return url;

        case PUT_METHOD:
            return `${url}/${id}`;

        case DELETE_METHOD:
            return `${url}/${id}`;

        default:
            return url;
    }
}

export const API_URL = ({ ...path }) => {
    const { method, params, apiName } = path

    return apiMethod(apiName, method, params, apiName)
}
