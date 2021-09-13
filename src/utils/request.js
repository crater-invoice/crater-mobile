// @flow
import axios from 'axios';
import {store} from '@/stores';
import {hasValue} from '@/constants';

type IProps = {
  path: string,
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  headers?: Object,
  body?: Object,
  axiosProps?: any,
  withMultipartFormData?: Boolean,
  image: any,
  imageName: string,
  isPing: boolean,
  type: string
};

export default class Request {
  static get(params) {
    return this.request({method: 'GET', ...params});
  }

  static post(params) {
    return this.request({method: 'POST', ...params});
  }

  static put(params) {
    return this.request({method: 'PUT', ...params});
  }

  static delete(params) {
    return this.request({method: 'DELETE', ...params});
  }

  static patch(params) {
    return this.request({method: 'PATCH', ...params});
  }

  static createFormData = (body, withMultipartFormData) => {
    if (!withMultipartFormData) {
      return JSON.stringify(body);
    }

    const formData = new FormData();
    if (!hasValue(body)) {
      return formData;
    }
    for (const key in body) {
      body.hasOwnProperty(key) && formData.append(key, body[key]);
    }
    return formData;
  };

  static createImageFormData = (body, image, imageName, type) => {
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
      body.hasOwnProperty(key) && formData.append(key, body[key]);
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
    axiosProps,
    withMultipartFormData = false
  }: IProps) {
    const reduxStore = store.getState();
    const {idToken} = reduxStore.auth;
    const {endpointApi, company} = reduxStore.common;
    let apiUrl = endpointApi;

    if (isPing) {
      apiUrl = isPing;
    }

    if (!isPing && !endpointApi) {
      // store.dispatch(NavigationActions.navigate({routeName: routes.ENDPOINTS}));
      return;
    }

    const url = `${apiUrl}${path}`;

    const defaultHeaders = {
      Authorization: `Bearer ${idToken}`,
      Accept: 'application/json',
      'Content-Type': image ? 'multipart/form-data' : 'application/json',
      company: company ? company.id : 1,
      ...headers
    };

    const params = !image
      ? Request.createFormData(body, withMultipartFormData)
      : Request.createImageFormData(body, image, imageName, type);

    return axios({
      method,
      url,
      headers: defaultHeaders,
      data: params,
      ...axiosProps
    })
      .then(function(response) {
        const {data} = response;
        return data;
      })
      .catch(function({response}) {
        const {status} = response;
        if (status === 401) {
          // store.dispatch(NavigationActions.navigate({routeName: routes.AUTH}));
          throw response;
        }
        if (status === 403 || status === 404 || status === 500) {
          throw response;
        }
        return response;
      });
  }
}
