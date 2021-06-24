import { isAndroidPlatform, isIPhoneX } from '@/constants';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { colors, fonts } from '@/styles';

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    header: {
        ...(isAndroidPlatform() && { marginTop: 15 })
    },
    headerTitleStyle: (theme, medium) => ({
        fontSize: medium ? 17 : 30,
        fontFamily: fonts.poppinsMedium,
        textAlign: 'left',
        color: theme?.header?.primary?.color
    }),
    inputField: {
        paddingHorizontal: 20,
        paddingVertical: 0,
        marginVertical: 8
    },
    searchFieldContainer: {
        paddingBottom: 5
    },
    bottomView: theme => ({
        backgroundColor: theme?.secondaryBgColor,
        borderColor: theme?.input?.borderColor,
        paddingVertical: 15,
        paddingHorizontal: 10,
        paddingBottom: isIPhoneX() ? 35 : 13,
        borderTopWidth: 1
    }),
    columnSearch: {
        flex: 7
    },
    columnIcon: {
        flex: 1,
        justifyContent: 'center'
    },
    floatingAction: theme => ({
        position: 'absolute',
        bottom: 20,
        right: 15,
        height: 31,
        width: 31,
        borderRadius: 31,
        zIndex: 9999,
        paddingLeft: 1,
        paddingTop: 1,

        shadowColor: theme.text.primaryColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5
    })
});

const Container = styled(View)`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${props => props.theme?.backgroundColor};
`;

export { styles, Container };
