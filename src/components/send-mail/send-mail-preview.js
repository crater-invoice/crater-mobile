import React from 'react';
import {WebView} from 'react-native-webview';
import * as queryString from 'query-string';
import {SCREEN_HEIGHT} from '@/helpers/size';
import {Loading} from '../loading';

const minHeight = SCREEN_HEIGHT / 1.3;
const maxHeight = SCREEN_HEIGHT / 1.2;

export default ({formValues, endpointApi, idToken, id, type, theme}) => {
  const [isFetchingWebviewData, setIsFetchingWebviewData] = React.useState(
    true
  );

  const url = {
    invoice: `invoices/${id}/send/preview`,
    estimate: `estimates/${id}/send/preview`,
    payment: `payments/${id}/send/preview`
  };

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${idToken}`
  };

  const source = {
    uri: `${endpointApi}/${url[type]}?${queryString.stringify({
      ...formValues,
      is_preview: true
    })}`,
    method: 'GET',
    headers
  };

  return (
    <>
      {isFetchingWebviewData ? (
        <Loading style={{minHeight}} size="large" theme={theme} />
      ) : null}
      <WebView
        source={source}
        headers={headers}
        startInLoadingState
        style={{width: '100%', minHeight, maxHeight}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onLoad={() => setIsFetchingWebviewData(false)}
      />
    </>
  );
};
