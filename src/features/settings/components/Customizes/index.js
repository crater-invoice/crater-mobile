// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ListView, DefaultLayout } from '@/components';
import { colors } from '@/styles';
import Lng from '@/lang/i18n';
import { CUSTOMIZES_MENU } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';

export class Customizes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {

        const {
            navigation,
            getCustomizeSettings,
            getPaymentModes,
            getItemUnits
        } = this.props

        getCustomizeSettings()
        goBack(MOUNT, navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    onSelectMenu = ({ route, type = null }) => {
        const { navigation } = this.props

        if (route) {
            navigation.navigate(route, { type })
        }
    }

    render() {
        const {
            navigation,
            locale,
            paymentModesLoading,
            itemUnitsLoading
        } = this.props;

        let loading = paymentModesLoading || itemUnitsLoading

        return (
            <View style={styles.container}>
                <DefaultLayout
                    headerProps={{
                        leftIconPress: () => navigation.navigate(ROUTES.SETTING_LIST),
                        title: Lng.t("header.customize", { locale }),
                        leftIconStyle: { color: colors.dark2 }
                    }}
                    hasSearchField={false}
                    loadingProps={{ is: loading }}
                >
                    <View style={styles.listViewContainer}>
                        <ListView
                            items={CUSTOMIZES_MENU(locale, Lng)}
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
