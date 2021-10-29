import {StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';

const styles = StyleSheet.create({
  tabs: theme => ({
    backgroundColor: theme?.backgroundColor,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  }),
  selectPicker: {
    marginTop: 12,
    marginBottom: 2
  }
});

const Container = styled(View)`
  flex: 1;
  background-color: ${props => props.theme?.backgroundColor};
`;

export {styles, Container};
