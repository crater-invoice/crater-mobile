import { StyleSheet, Dimensions, View } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 25,
        justifyContent: 'center'
    },
    inputField: {
        height: 44
    },
    logoContainer: {
        paddingBottom: 40,
        alignItems: 'center',
        marginTop: -30
    },
    imgLogo: {
        width: width - 150,
        height: 120,
        resizeMode: 'contain'
    },
    endpointTextTitle: {
        marginTop: 15
    },
    SendingMailContainer: {
        alignItems: 'center'
    },
    buttonContainer: {
        marginHorizontal: -5,
        marginTop: 55
    },
    buttonStyle: {
        paddingVertical: 10
    },
    skipButtonStyle: {
        marginTop: 5,
        marginHorizontal: -5
    }
});

const Container = styled(View)`
    flex: 1;
    justify-content: flex-start;
    display: flex;
    padding-horizontal: 5;
    background-color: ${props => props.theme?.backgroundColor};
`;

export { styles, Container };
