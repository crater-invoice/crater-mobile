import axios from 'axios';
import {store} from '@/stores';
import {routes} from '@/navigation';
import {checkConnection, hasValue} from '@/constants';
import {navigateTo} from '@/navigation/navigation-action';
import {logoutSuccess} from 'stores/auth/actions';

type IProps = {
  path: string,
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  headers?: Object,
  body?: Object,
  axiosProps?: any,
  withMultipartFormData?: boolean,
  image: any,
  imageName: string,
  isPing: boolean,
  type: string
};

export default class Request {
  static get(path, options = {}) {
    return this.request({method: 'GET', path, ...options});
  }

  static post(path, data, options = {}) {
    return this.request({method: 'POST', path, body: data, ...options});
  }

  static put(path, data, options = {}) {
    return this.request({method: 'PUT', path, body: data, ...options});
  }

  static delete(path, data, options = {}) {
    return this.request({method: 'DELETE', path, body: data, ...options});
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
        name: uri.includes('.') ? `${imageName}.${fileType}` : `${imageName}`,
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

  static async request(props: IProps) {
    const {
      path,
      method,
      body,
      headers = {},
      image,
      imageName = '',
      isPing = null,
      type = 'create',
      axiosProps,
      withMultipartFormData = false,
      throw_error = true
    } = props;
    const reduxStore = store.getState();
    const {idToken} = reduxStore.auth;
    const {endpointApi, endpointURL} = reduxStore.common;
    const {selectedCompany} = reduxStore.company;
    let apiUrl = props['base-url'] ? endpointURL : endpointApi;

    if (isPing) {
      apiUrl = isPing;
    }

    const url = `${apiUrl}${path}`;

    const isConnected = await checkConnection();

    if (!isConnected) {
      navigateTo({route: routes.LOST_CONNECTION});
      return;
    }

    const defaultHeaders = {
      Authorization: `Bearer ${idToken}`,
      Accept: 'application/json',
      'Content-Type': image ? 'multipart/form-data' : 'application/json',
      company: selectedCompany?.id ?? 1,
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

        if (data && data.hasOwnProperty('error') && throw_error) {
          throw {response: {data: {...data, status: 422}}};
        }

        return data;
      })
      .catch(function({response}) {
        const {status} = response;
        if (status === 401) {
          store?.dispatch?.(logoutSuccess());
        }

        throw response;
      });
  }
}
