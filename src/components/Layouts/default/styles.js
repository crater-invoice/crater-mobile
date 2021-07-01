import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import {
    definePlatformParam,
    isAndroidPlatform,
    isIosPlatform,
    isIPhoneX
} from '@/constants';
import { headerTitle } from '@/styles';

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: definePlatformParam(0, 16),
        marginBottom: isIPhoneX() ? 82 : 52
    },
    bottomView: theme => ({
        backgroundColor: theme?.secondaryBgColor,
        borderColor: theme?.input?.borderColor,
        paddingVertical: 15,
        paddingHorizontal: 10,
        paddingBottom: isIPhoneX() ? 35 : 13,
        borderTopWidth: 1
    }),
    header: {
        ...(isAndroidPlatform() && { marginTop: 10 }),
        ...(isIPhoneX() && {
            height: 100,
            paddingTop: 40
        })
    },
    headerTitleStyle: theme => ({
        fontSize: 17,
        color: theme?.header?.secondary?.color,
        textAlign: 'left',
        ...headerTitle({ theme })
    }),
    inputField: {
        paddingHorizontal: 19,
        paddingVertical: 0,
        marginVertical: 8
    },
    searchFieldContainer: {
        // backgroundColor: colors.veryLightGray,
        paddingVertical: 10
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
