import React, {useState} from 'react';
import {WebView as RNWebview} from 'react-native-webview';
import {DefaultLayout, Loading, View} from '@/components';
import styles from './webview-style';
import {IProps} from './webview-type.d';
import {defineLargeSizeParam} from '@/helpers/size';

export default (props: IProps) => {
  const {navigation, theme, uri, idToken, method = 'GET', headerTitle} = props;
  const [isFetchingWebviewData, setIsFetchingWebviewData] = useState(true);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${idToken}`
  };

  const source = {uri, method, headers};

  const onBackPress = () => navigation.goBack();

  return (
    <DefaultLayout
      hideScrollView
      headerProps={{leftIconPress: onBackPress, title: headerTitle}}
    >
      {isFetchingWebviewData ? (
        <Loading style={styles.loader} size="large" theme={theme} />
      ) : null}
      <View
        class={`flex-1 pt-15 pb-${defineLargeSizeParam(30, 15)}`}
        background-color={theme?.backgroundColor}
      >
        <RNWebview
          source={source}
          headers={headers}
          style={{
            backgroundColor: theme?.backgroundColor
          }}
          onLoad={() => setIsFetchingWebviewData(false)}
        />
      </View>
    </DefaultLayout>
  );
};
