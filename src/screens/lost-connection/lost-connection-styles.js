import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {defineSize} from '@/helpers/size';

const styles = StyleSheet.create({
  title: {
    marginBottom: defineSize(30, 30, 40, 40)
  },
  description: {
    marginTop: defineSize(55, 55, 65, 65),
    fontSize: 14,
    paddingHorizontal: 35
  }
});

const Container = styled(View)`
  flex: 1;
  background-color: ${props => props.theme?.backgroundColor};
`;

const Center = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export {styles, Container, Center};
