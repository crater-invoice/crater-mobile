import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '@/styles';
import {isIosPlatform} from '@/helpers/platform';
import {defineLargeSizeParam, SCREEN_WIDTH} from '@/helpers/size';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 25,
    justifyContent: 'center'
  },
  headerTitle: {
    marginLeft: -10,
    marginTop: isIosPlatform ? -1 : 2
  },
  inputField: {
    paddingVertical: 3
  },
  logoContainer: {
    paddingBottom: 40,
    alignItems: 'center',
    marginTop: -35
  },
  logo: {
    width: SCREEN_WIDTH - 150,
    height: 120,
    resizeMode: 'contain'
  },
  envelop: {
    width: SCREEN_WIDTH - 150,
    height: 100,
    resizeMode: 'contain',
    marginTop: -15
  },
  close: {
    paddingHorizontal: 10,
    paddingVertical: defineLargeSizeParam(35, 10)
  },
  forgotTextTitle: {
    marginTop: 10
  },
  SendingMailContainer: {
    alignItems: 'center'
  },
  emailSendTitle: {
    paddingBottom: 10,
    color: colors.primary
  },
  emailSendDescription: {
    paddingHorizontal: 10,
    paddingTop: 18
  }
});

const Container = styled(View)`
  flex: 1;
  justify-content: flex-start;
  display: flex;
  padding-horizontal: 5;
  background-color: ${props => props.theme?.backgroundColor};
`;

export {styles, Container};
