import { StyleSheet, Platform, View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '@/styles';
import { defineSize, isIPhoneX, SCREEN_HEIGHT } from '@/constants';

const customStyleSheet = StyleSheet.create({
    closeButton: {
        paddingRight: 22,
        paddingVertical: 30
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    bottomAction: {
        marginTop: 10,
        marginHorizontal: 22
    },
    body: {
        paddingBottom: isIPhoneX() ? 40 : 25
    }
});

const Styles = {
    Modal: styled(View)`
        background-color: ${colors.veryLightGray};
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-top-left-radius: 15;
        border-top-right-radius: 15;
        max-height: ${defineSize(SCREEN_HEIGHT - 70, SCREEN_HEIGHT - 100)};
    `,

    FlexEnd: styled(View)`
        justify-content: flex-end;
        align-items: flex-end;
    `,

    Item: styled(View)`
        flex-direction: row;
        align-items: center;
    `,

    ...customStyleSheet
};

export default Styles;
