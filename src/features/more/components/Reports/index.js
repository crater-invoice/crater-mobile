// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ListView, DefaultLayout } from '@/components';
import Lng from '@/lang/i18n';
import { REPORTS_MENU } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';

export class Reports extends React.Component {
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

    onSelectMenu = ({ route, type }) => {
        const { navigation } = this.props;

        if (route) {
            navigation.navigate(route, { type });
        }
    };

    render() {
        const { navigation, locale, theme } = this.props;

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.navigate(ROUTES.MAIN_MORE),
                    title: Lng.t('header.reports', { locale }),
                    leftArrow: 'primary'
                }}
                hasSearchField={false}
            >
                <View style={styles.listViewContainer}>
                    <ListView
                        items={REPORTS_MENU(locale, Lng)}
                        onPress={this.onSelectMenu}
                        leftTitleStyle={styles.listViewTitle(theme)}
                        rightArrowIcon
                        rightArrowIconStyle={{ marginTop: 5 }}
                    />
                </View>
            </DefaultLayout>
        );
    }
}
