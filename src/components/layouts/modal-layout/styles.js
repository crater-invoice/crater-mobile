import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

const styles = StyleSheet.create({});

const Container = styled(View)`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${props => props.theme?.backgroundColor};
`;

export {styles, Container};
