// @flow
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { store } from '../store';
import { env } from '@/config';
import { ROUTES } from '@/navigation';
import { checkConnection, hasValue } from '@/constants';

type IProps = {
    path: string,
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    headers?: Object,
    body?: Object,
    axiosProps?: any
};

export default class Request {
    static get(params) {
        return this.request({ method: 'GET', ...params });
    }

    static post(params) {
        return this.request({ method: 'POST', ...params });
    }

    static put(params) {
        return this.request({ method: 'PUT', ...params });
    }

    static delete(params) {
        return this.request({ method: 'DELETE', ...params });
    }

    static patch(params) {
        return this.request({ method: 'PATCH', ...params });
    }

    static createFormData = (body, image, imageName, type) => {
        const formData = new FormData();

        const uri = image.uri;
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append(
            imageName,
            JSON.stringify({
                name: `${imageName}.${fileType}`,
                data: image.base64.trimRight()
            })
        );

        type && formData.append('type', type);

        if (!hasValue(body)) {
            return formData;
        }

        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                formData.append(key, body[key]);
            }
        }

        return formData;
    };

    static async request({
        path,
        method,
        body,
        headers = {},
        image,
        imageName = '',
        isPing = null,
        type = 'create',
        axiosProps
    }: IProps) {
        const reduxStore = store.getState();

        const { idToken } = reduxStore.auth;
        const { endpointApi, company } = reduxStore.global;

        let apiUrl = endpointApi ?? env.ENDPOINT_API;

        if (isPing) {
            apiUrl = isPing;
        }

        const url = `${apiUrl}${path}`;
        const isConnected = await checkConnection();

        if (!isConnected) {
            store.dispatch(
                NavigationActions.navigate({
                    routeName: ROUTES.LOST_CONNECTION
                })
            );
            return;
        }

        const defaultHeaders = {
            Authorization: `Bearer ${idToken}`,
            Accept: 'application/json',
            'Content-Type': image ? 'multipart/form-data' : 'application/json',
            company: company ? company.id : 1,
            ...headers
        };

        const params = !image
            ? JSON.stringify(body)
            : Request.createFormData(body, image, imageName, type);

        return axios({
            method,
            url,
            headers: defaultHeaders,
            data: params,
            ...axiosProps
        })
            .then(function(response) {
                const { data, status } = response;

                if (status === 401) {
                    store.dispatch(
                        NavigationActions.navigate({
                            routeName: ROUTES.AUTH
                        })
                    );
                    throw response;
                }

                if (status === 403 || status === 404 || status === 500) {
                    throw response;
                }
                return data;
            })
            .catch(function({ response }) {
                if (response?.status === 401) {
                    store.dispatch(
                        NavigationActions.navigate({
                            routeName: ROUTES.AUTH
                        })
                    );
                    throw response;
                }
                return response;
            });
    }
}
