import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '@/styles';
import {SCREEN_WIDTH} from '@/helpers/size';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 25,
    justifyContent: 'center'
  },
  logoContainer: {
    paddingBottom: 30,
    alignItems: 'center',
    marginTop: -70
  },
  imgLogo: {
    width: SCREEN_WIDTH - 150,
    height: 120,
    resizeMode: 'contain'
  },
  bodyContainer: {
    textAlign: 'center',
    alignItems: 'center'
  },
  title: {
    paddingBottom: 10
  },
  subTitle: {
    paddingTop: 5,
    color: colors.primaryLight
  },
  description: {
    paddingHorizontal: 10,
    paddingTop: 18
  }
});

const Container = styled(View)`
  flex: 1;
  justify-content: flex-start;
  display: flex;
  background-color: ${props => props.theme?.backgroundColor};
`;

export {styles, Container};
