import {definePlatformParam, isIosPlatform} from '@/constants';
import {StyleSheet} from 'react-native';

export const SymbolStyle = {
  fontFamily: definePlatformParam('Arial', 'sans-serif')
};

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  symbol: {
    ...(isIosPlatform && {marginBottom: -2})
  }
});
