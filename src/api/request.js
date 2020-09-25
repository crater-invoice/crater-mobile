// @flow

import { AsyncStorage } from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob'

import { NavigationActions } from 'react-navigation';
import { store } from '../store';
import { env } from '../config';
import { NAVIGATION_PERSIST_KEY } from './consts/core';
import { ROUTES } from '../navigation/routes';
import { isIosPlatform, checkConnection, checkExpiredToken } from './helper';
import { resetIdToken } from '../features/authentication/actions';

type IProps = {
    path: string,
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    headers?: Object,
    body?: Object,
};

export default class Request {
    static async getIdToken() {
        const data = await AsyncStorage.getItem(NAVIGATION_PERSIST_KEY);

        return data ? JSON.parse(data).auth.idToken : null;
    }

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
    static async request({
        path,
        method,
        body,
        headers = {},
        image,
        fullResponse = false,
        imageName = '',
        isAuthRequired = true,
        isPing = null,
        type = 'create',
    }: IProps) {
        const reduxStore = store.getState();

        const { idToken, expiresIn = null } = reduxStore.auth;
        const { endpointApi, company } = reduxStore.global;

        let apiUrl = (endpointApi !== null && typeof endpointApi !== 'undefined') ? endpointApi : env.ENDPOINT_API

        if (isPing) {
            apiUrl = isPing
        }

        const url = `${apiUrl}${path}`;
        const isConnected = await checkConnection()

        const isExpired = checkExpiredToken(expiresIn)

        if (!isConnected) {
            store.dispatch(
                NavigationActions.navigate({
                    routeName: ROUTES.LOST_CONNECTION,
                }),
            );
            return
        }

        if (isExpired && isAuthRequired) {
            store.dispatch(resetIdToken());
            store.dispatch(
                NavigationActions.navigate({
                    routeName: ROUTES.AUTH,
                }),
            );
            return
        }


        const ID_TOKEN = await this.getIdToken();
        const defaultHeaders = image
            ? {
                Authorization: `Bearer ${idToken}` || `Bearer ${ID_TOKEN}`,
                company: company ? company.id : 1,
                Accept: 'application/json'
            }
            : {
                Authorization: `Bearer ${idToken}` || `Bearer ${ID_TOKEN}`,
                'Content-Type': 'application/json',
                company: company ? company.id : 1,
                Accept: 'application/json'
            };

        const formData = new FormData();

        if (image) {
            const uri = image.uri;
            const uriParts = uri.split('.');
            const fileType = uriParts[uriParts.length - 1];

            formData.append(imageName, JSON.stringify({
                name: `${imageName}.${fileType}`,
                data: image.base64.trimRight()
            }))

            type && formData.append('type', type)

            for (const key in body) {
                if (body.hasOwnProperty && body.hasOwnProperty(key)) {
                    formData.append(key, body[key]);
                }
            }
        }

        let options = {
            method,
            body: image ? formData : JSON.stringify(body),
            headers: { ...defaultHeaders, ...headers },
        };

        return fetch(url, options).then((response) => {
            const {
                headers: { map },
            } = response;

            if (response.status === 500) {
                throw response;
            }

            if (response.status === 401) {
                store.dispatch(
                    NavigationActions.navigate({
                        routeName: ROUTES.AUTH,
                    }),
                );
            }

            if (response.status === 403 || response.status === 404) {

                throw response;
            }

            if (response.ok) {
                if (response.status === 204) {
                    return Promise.resolve();
                } else {
                    if (fullResponse) {
                        return response;
                    }

                    return response.json().then((v) => v);
                }
            }
            throw response;
        });
    }
}
