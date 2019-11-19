// @flow

import React from 'react';
import { View, Alert } from 'react-native';
import styles from './styles';
import { MainLayout, ListView } from '../../../../components';
import { MORE_MENU } from '../../constants';
import { colors } from '../../../../styles/colors';
import Lng from '../../../../api/lang/i18n';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { ROUTES } from '../../../../navigation/routes';

export class More extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            endpointVisible: false
        }
    }

    componentDidMount() {
        const { navigation } = this.props
        goBack(MOUNT, navigation, ROUTES.MAIN_INVOICES)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    onSelectMenu = (item) => {
        const { navigation } = this.props

        if (item.route) {
            navigation.navigate(item.route)
        } else {
            this[item.action]()
        }
    }

    onLogout = () => {
        const { navigation, logout, language } = this.props

        Alert.alert(
            Lng.t("logout.confirmation", { locale: language }),
            '',
            [
                {
                    text: Lng.t("logout.title", { locale: language }),
                    onPress: () => logout({ navigation })
                },
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        );

    }

    toggleEndpointModal = () => {
        this.setState((state) => ({
            endpointVisible: !state.endpointVisible
        }))
    }

    render() {
        const { language } = this.props;

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        hasCircle: false,
                        title: Lng.t("header.more", { locale: language })
                    }}
                    bottomDivider
                    dividerStyle={styles.dividerStyle}
                    hasSearchField={false}
                >
                    <View style={styles.listViewContainer}>
                        <ListView
                            items={MORE_MENU(language, Lng)}
                            onPress={this.onSelectMenu}
                            hasAvatar
                            refreshing={false}
                            leftTitleStyle={styles.listViewTitle}
                            leftIconStyle={styles.listViewIcon}
                            itemContainer={styles.itemContainer}
                            listViewContainerStyle={styles.listViewScrollContainerStyle}
                            listItemProps={{
                                chevron: {
                                    size: 19,
                                    color: colors.darkGray,
                                    containerStyle: { marginTop: 5 },
                                },
                            }}
                        />
                    </View>

                </MainLayout>
            </View>
        );
    }
}
