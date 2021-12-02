import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {isIosPlatform, isAndroidPlatform} from '@/helpers/platform';
import {defineSize} from '@/helpers/size';
import {fonts} from '@/styles';

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  header: {
    ...(isAndroidPlatform && {marginTop: 15}),
    ...(isIosPlatform && {
      marginTop: defineSize(5, 5, 5, 15)
    })
  },
  headerTitleStyle: (theme, medium) => ({
    fontSize: medium ? 17 : 30,
    fontFamily: fonts.medium,
    textAlign: 'left',
    color: theme?.header?.primary?.color
  }),
  inputField: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    marginVertical: 8
  },
  searchFieldContainer: {
    paddingBottom: 5,
    ...(isIosPlatform && {
      marginTop: defineSize(-6, -6, -6, -13)
    })
  },
  columnSearch: {
    flex: 7
  },
  columnIcon: {
    flex: 1,
    justifyContent: 'center'
  },
  floatingActionView: {
    zIndex: 10,
    position: 'absolute',
    bottom: 20,
    right: 15
  },
  floatingAction: theme => ({
    height: 40,
    width: 40,
    borderRadius: 40,
    elevation: 3,
    ...(isIosPlatform && {
      paddingLeft: 1,
      paddingTop: 1,
      shadowColor: theme.text.primaryColor,
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.3,
      shadowRadius: 5
    })
  })
});

const Container = styled(View)`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${props => props.theme?.backgroundColor};
`;

export {styles, Container};
