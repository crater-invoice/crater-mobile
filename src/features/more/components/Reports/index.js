// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ListView, DefaultLayout } from '@/components';
import { colors } from '@/styles';
import Lng from '@/lang/i18n';
import { REPORTS_MENU } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';

export class Reports extends React.Component {
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

    onSelectMenu = ({ route, type }) => {
        const { navigation } = this.props

        if (route) {
            navigation.navigate(route, { type })
        }
    }

    render() {
        const { navigation, locale } = this.props;

        return (
            <View style={styles.container}>
                <DefaultLayout
                    headerProps={{
                        leftIconPress: () => navigation.navigate(ROUTES.MAIN_MORE),
                        title: Lng.t("header.reports", { locale }),
                        leftIconStyle: { color: colors.dark2 }
                    }}
                    hasSearchField={false}
                >
                    <View style={styles.listViewContainer}>
                        <ListView
                            items={REPORTS_MENU(locale, Lng)}
                            onPress={this.onSelectMenu}
                            leftTitleStyle={styles.listViewTitle}
                            listItemProps={{
                                chevron: {
                                    size: 18,
                                    color: colors.darkGray,
                                    containerStyle: { marginTop: 5 }
                                },
                            }}
                        />
                    </View>
                </DefaultLayout>
            </View>
        );
    }
}
