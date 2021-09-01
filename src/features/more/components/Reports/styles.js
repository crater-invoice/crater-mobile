import { StyleSheet } from 'react-native';
import { fonts } from '@/styles';
import { defineSize } from '@/constants';

export default styles = StyleSheet.create({
    listViewTitle: theme => ({
        fontFamily: theme?.mode === 'light' ? fonts.regular : fonts.medium,
        color: theme?.listItem?.secondary?.color,
        textAlign: 'left'
    }),
    listViewContainer: {
        marginTop: defineSize(10, 15)
    }
});
