import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux';
import styles from './styles';
import { AssetImage } from '../AssetImage';
import { CtGradientButton } from '../Button';
import Lng from '@/lang/i18n';
import { checkConnection } from '@/constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { IMAGES } from '@/assets';
import { Text } from '../Text';

export class LostConnection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props
        goBack(MOUNT, navigation, { route: ROUTES.LOST_CONNECTION } )
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }


    onRetry = async () => {

        this.setState({ loading: true })

        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000);

        const { navigation } = this.props

        let isConnected = await checkConnection()
        !isConnected ? navigation.navigate(ROUTES.LOST_CONNECTION) :
            navigation.pop();
    }

    render() {

        const { locale } = this.props;
        const { loading } = this.state

        return (
            <View style={styles.container}>

                <View style={styles.main}>

                    <View style={styles.bodyContainer}>
                        <Text secondary bold2 h3 style={styles.title}>
                            {Lng.t("lostInternet.title", { locale })}
                        </Text>

                        <View style={styles.logoContainer}>
                            <AssetImage
                                imageSource={IMAGES.LOST_CONNECTION}
                                imageStyle={styles.imgLogo}
                            />
                        </View>

                        <Text veryDarkGray light center style={styles.description}>
                            {Lng.t("lostInternet.description", { locale })}
                        </Text>
                    </View>

                    <View style={{ marginTop: 25 }}>
                        <CtGradientButton
                            onPress={() => this.onRetry()}
                            btnTitle={Lng.t("button.retry", { locale })}
                            loading={loading}
                        />
                    </View>

                </View>

            </View>
        )
    }
}

const mapStateToProps = ({ global }) => ({
    locale: global?.locale,
});

const mapDispatchToProps = {};

//  connect
const LostConnectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LostConnection);

LostConnectionContainer.navigationOptions = () => ({
    header: null,
});


export default LostConnectionContainer;
