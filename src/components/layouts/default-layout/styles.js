import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {headerTitle} from '@/styles';
import {
  isIPhoneX,
  defineSize,
  definePlatformParam,
  isAndroidPlatform
} from '@/helpers/platform';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: definePlatformParam(0, 16),
    marginBottom: defineSize(52, 52, 52, 82)
  },
  header: {
    ...(isAndroidPlatform && {marginTop: 10}),
    ...(isIPhoneX() && {
      height: 100,
      paddingTop: 40
    })
  },
  headerTitleStyle: theme => ({
    fontSize: 17,
    color: theme?.header?.secondary?.color,
    textAlign: 'left',
    ...headerTitle({theme})
  }),
  inputField: {
    paddingHorizontal: 19,
    paddingVertical: 0,
    marginVertical: 8
  },
  searchFieldContainer: {
    paddingVertical: 10
  }
});

const Container = styled(View)`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${props => props.theme?.backgroundColor};
`;

export {styles, Container};
