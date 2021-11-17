import React from 'react';
import {WebView} from 'react-native-webview';
import * as queryString from 'query-string';
import {SCREEN_HEIGHT} from '@/helpers/size';

export default ({formValues, endpointApi, idToken, id, type}) => {
  const url = {
    invoice: `invoices/${id}/send`,
    estimate: `estimates/${id}/send`
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${idToken}`
  };

  const source = {
    uri: `${endpointApi}${url[type]}`,
    method: 'POST',
    headers,
    body: queryString.stringify({...formValues, is_preview: true})
  };

  return (
    <WebView
      source={source}
      headers={headers}
      startInLoadingState
      style={{width: '100%', height: SCREEN_HEIGHT / 1.4}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};
