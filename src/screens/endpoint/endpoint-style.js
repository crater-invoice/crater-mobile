import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {isIosPlatform} from '@/helpers/platform';
import {SCREEN_WIDTH} from '@/helpers/size';

const styles = StyleSheet.create({
  logoContainer: {
    paddingBottom: 40,
    alignItems: 'center',
    marginTop: -30
  },
  logo: {
    width: SCREEN_WIDTH - 150,
    height: 120,
    resizeMode: 'contain'
  },
  title: {
    marginLeft: -10,
    marginTop: isIosPlatform ? -1 : 2
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
