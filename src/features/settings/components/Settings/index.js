// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ListView, DefaultLayout } from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import { colors } from '../../../../styles/colors';
import Lng from '../../../../api/lang/i18n';
import { SETTINGS_MENU } from '../../constants';
import { MOUNT, goBack, UNMOUNT } from '../../../../navigation/actions';

export class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            endpointVisible: false
        }
    }

    componentDidMount() {
        const { navigation } = this.props
        goBack(MOUNT, navigation, { route: ROUTES.MAIN_MORE })
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    onSelectMenu = (item) => {
        const { navigation } = this.props

        if (item.route) {
            (item.route === ROUTES.ENDPOINTS_SETTINGS)
                ? navigation.navigate(item.route, { skipEndpoint: true }) :
                navigation.navigate(item.route)
        } else {
            this[item.action]()
        }
    }

    onLogout = () => {
        const { navigation, logout } = this.props
        logout({ navigation })
    }

    render() {
        const { navigation, language } = this.props;

        const { endpointVisible } = this.state;

        return (
            <View style={styles.container}>
                <DefaultLayout
                    headerProps={{
                        leftIconPress: () => navigation.navigate(ROUTES.MAIN_MORE),
                        title: Lng.t("header.settings", { locale: language }),
                        leftIconStyle: { color: colors.dark2 }
                    }}
                    hasSearchField={false}
                >
                    <View style={styles.listViewContainer}>
                        <ListView
                            items={SETTINGS_MENU(language, Lng)}
                            onPress={this.onSelectMenu}
                            leftTitleStyle={styles.listViewTitle}
                            leftIconStyle={styles.listViewIcon}
                            itemContainer={styles.itemContainer}
                            hasAvatar
                            listItemProps={{
                                chevron: {
                                    size: 18,
                                    color: colors.darkGray,
                                    containerStyle: { marginTop: 5 }
                                }
                            }}
                        />
                    </View>
                </DefaultLayout>
            </View>
        );
    }
}
