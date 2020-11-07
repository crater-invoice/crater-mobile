// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ListView, DefaultLayout } from '@/components';
import { colors } from '@/styles';
import Lng from '@/lang/i18n';
import { SETTINGS_MENU } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { isRTL } from '@/utils';

export class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            endpointVisible: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation, { route: ROUTES.MAIN_MORE });
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    onSelectMenu = item => {
        const { navigation } = this.props;

        if (item.route) {
            item.route === ROUTES.ENDPOINTS_SETTINGS
                ? navigation.navigate(item.route, { skipEndpoint: true })
                : navigation.navigate(item.route);
        } else {
            this[item.action]();
        }
    };

    onLogout = () => {
        const { navigation, logout } = this.props;
        logout({ navigation });
    };

    render() {
        const { navigation, locale } = this.props;
        return (
            <View style={styles.container}>
                <DefaultLayout
                    headerProps={{
                        leftIconPress: () =>
                            navigation.navigate(ROUTES.MAIN_MORE),
                        title: Lng.t('header.settings', { locale }),
                        leftIconStyle: { color: colors.dark2 }
                    }}
                    hasSearchField={false}
                >
                    <View style={styles.listViewContainer}>
                        <ListView
                            items={SETTINGS_MENU(locale, Lng)}
                            onPress={this.onSelectMenu}
                            leftTitleStyle={styles.listViewTitle}
                            leftIconStyle={styles.listViewIcon}
                            itemContainer={styles.itemContainer}
                            hasAvatar
                            listItemProps={{
                                chevron: {
                                    size: 18,
                                    color: colors.darkGray,
                                    containerStyle: {
                                        marginTop: 5,
                                        ...(isRTL() && {
                                            transform: [{ rotate: '180deg' }],
                                            marginLeft: 8
                                        })
                                    }
                                }
                            }}
                        />
                    </View>
                </DefaultLayout>
            </View>
        );
    }
}
