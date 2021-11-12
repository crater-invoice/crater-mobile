import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {defineLargeSizeParam, SCREEN_WIDTH} from '@/helpers/size';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -55
  },
  logo: {
    width: SCREEN_WIDTH - 150,
    height: 180,
    resizeMode: 'contain'
  },
  forgetPasswordContainer: {
    flexDirection: 'row',
    marginLeft: 2,
    marginTop: 8
  },
  forgetPassword: {
    fontSize: 15,
    paddingLeft: 3
  },
  inputField: {
    paddingVertical: 3,
    borderRadius: 4
  },
  biometryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'absolute',
    bottom: defineLargeSizeParam(50, 5),
    left: 0,
    right: 0
  },
  biometryText: {
    fontSize: 17,
    fontWeight: '500',
    opacity: 0.9
  },
  setting: {
    position: 'absolute',
    right: 20,
    top: defineLargeSizeParam(55, 30),
    transform: [{rotate: '-10deg'}],
    zIndex: 10,
    paddingTop: 20
  }
});

const Container = styled(View)`
  flex: 1;
  padding-horizontal: 25;
  justify-content: center;
  display: flex;
  background-color: ${props => props.theme?.backgroundColor};
`;

export {styles, Container};
