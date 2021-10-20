import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {
  definePlatformParam,
  defineSize,
  isAndroidPlatform,
  isIPhoneX
} from '@/constants';
import {headerTitle} from '@/styles';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: definePlatformParam(0, 16),
    marginBottom: defineSize(52, 52, 52, 82)
  },
  bottomView: theme => ({
    backgroundColor: theme?.secondaryBgColor,
    borderColor: theme?.input?.borderColor,
    paddingVertical: 15,
    paddingHorizontal: 10,
    paddingBottom: defineSize(14, 14, 14, 35),
    borderTopWidth: 1
  }),
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

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

export {styles, Container, Row};
