import { isAndroidPlatform, isIosPlatform, isIPhoneX } from '@/constants';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { colors, fonts } from '@/styles';

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    header: {
        ...(isAndroidPlatform() && { marginTop: 15 }),
        ...(isIosPlatform() && {
            marginTop: isIPhoneX() ? 15 : 5
        })
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
        paddingBottom: 5,
        ...(isIosPlatform() && {
            marginTop: isIPhoneX() ? -13 : -6
        })
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
    }
});

const Container = styled(View)`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${props => props.theme?.backgroundColor};
`;

export { styles, Container };
