import { StyleSheet } from 'react-native';
import { headerTitle } from '@/styles';

export default styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 20
    },
    addressStreetField: {
        marginTop: -20
    },
    titleStyle: {
        ...headerTitle({ marginLeft: -12, marginRight: -15 })
    }
});
