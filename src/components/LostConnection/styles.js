import { StyleSheet, Dimensions, View } from 'react-native';
import styled from 'styled-components/native';
import { defineSize } from '@/constants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 25,
        justifyContent: 'center'
    },
    logoContainer: {},
    imgLogo: {
        width: width,
        height: 140,
        resizeMode: 'cover'
    },
    bodyContainer: {
        textAlign: 'center',
        alignItems: 'center'
    },
    title: {
        marginBottom: defineSize(30, 40)
    },
    internetIcon: {
        marginTop: 15,
        marginBottom: 10
    },
    description: {
        marginTop: defineSize(55, 65),
        fontSize: 14,
        paddingHorizontal: 10
    }
});

const Container = styled(View)`
    flex: 1;
    justify-content: flex-start;
    display: flex;
    background-color: ${props => props.theme?.backgroundColor};
`;

export { styles, Container };
