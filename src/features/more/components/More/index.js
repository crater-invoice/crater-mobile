// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { MainLayout, ListView } from '@/components';
import { MORE_MENU } from '../../constants';
import Lng from '@/lang/i18n';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { alertMe } from '@/constants';

export class More extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            endpointVisible: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation, { route: ROUTES.MAIN_INVOICES });
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    onSelectMenu = item => {
        const { navigation } = this.props;

        if (item.route) {
            navigation.navigate(item.route);
        } else {
            this[item.action]();
        }
    };

    onLogout = () => {
        const { navigation, logout, locale } = this.props;

        alertMe({
            title: Lng.t('logout.confirmation', { locale }),
            showCancel: true,
            okText: Lng.t('logout.title', { locale }),
            okPress: () => logout({ navigation })
        });
    };

    toggleEndpointModal = () => {
        this.setState(state => ({
            endpointVisible: !state.endpointVisible
        }));
    };

    render() {
        const { locale } = this.props;

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        hasCircle: false,
                        title: Lng.t('header.more', { locale })
                    }}
                    bottomDivider
                    dividerStyle={styles.dividerStyle}
                    hasSearchField={false}
                >
                    <View style={styles.listViewContainer}>
                        <ListView
                            items={MORE_MENU(locale, Lng)}
                            onPress={this.onSelectMenu}
                            hasAvatar
                            refreshing={false}
                            leftTitleStyle={styles.listViewTitle}
                            leftIconStyle={styles.listViewIcon}
                            itemContainer={styles.itemContainer}
                            rightArrowIcon
                            listViewContainerStyle={
                                styles.listViewScrollContainerStyle
                            }
                        />
                    </View>
                </MainLayout>
            </View>
        );
    }
}
