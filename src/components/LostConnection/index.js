import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { AssetImage } from '../AssetImage';
import { CtGradientButton } from '../Button';
import Lng from '@/lang/i18n';
import { checkConnection } from '@/constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { IMAGES } from '@/assets';
import { Text } from '../Text';
import { styles, Container } from './styles';

export class LostConnection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation, { route: ROUTES.LOST_CONNECTION });
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    onRetry = async () => {
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);

        const { navigation } = this.props;

        let isConnected = await checkConnection();
        !isConnected
            ? navigation.navigate(ROUTES.LOST_CONNECTION)
            : navigation.pop();
    };

    render() {
        const { locale, theme } = this.props;
        const { loading } = this.state;

        return (
            <Container>
                <View style={styles.main}>
                    <View style={styles.bodyContainer}>
                        <Text
                            bold2
                            h3
                            style={styles.title}
                            color={theme?.text?.secondaryColor}
                        >
                            {Lng.t('lostInternet.title', { locale })}
                        </Text>

                        <View style={styles.logoContainer}>
                            <AssetImage
                                imageSource={IMAGES.LOST_CONNECTION}
                                imageStyle={styles.imgLogo}
                            />
                        </View>

                        <Text
                            light
                            center
                            style={styles.description}
                            color={theme?.text?.thirdColor}
                        >
                            {Lng.t('lostInternet.description', { locale })}
                        </Text>
                    </View>

                    <View style={{ marginTop: 25 }}>
                        <CtGradientButton
                            onPress={() => this.onRetry()}
                            btnTitle={Lng.t('button.retry', { locale })}
                            loading={loading}
                            style={{ paddingVertical: 8 }}
                        />
                    </View>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = ({ global }) => ({
    locale: global?.locale,
    theme: global?.theme
});

const LostConnectionContainer = connect(
    mapStateToProps,
    {}
)(LostConnection);

LostConnectionContainer.navigationOptions = () => ({
    header: null
});

export default LostConnectionContainer;
