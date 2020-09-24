// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ListView, MainLayout } from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import Lng from '../../../../api/lang/i18n';
import { EDIT_TAX, ADD_TAX } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { itemsDescriptionStyle } from '../../../invoices/components/Invoice/styles';

export class Taxes extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            refreshing: false,
            search: '',
            found: true,
            taxesFilter: []
        };
    }

    componentDidMount() {
        const { navigation } = this.props
        goBack(MOUNT, navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    onSearch = (search) => {

        const { taxTypes } = this.props;
        let searchFields = [
            'name',
            'percent'
        ];

        if (typeof taxTypes !== 'undefined' && taxTypes.length != 0) {

            let newData = taxTypes.filter(({ fullItem }) => {
                let filterData = false

                searchFields.filter((field) => {
                    let itemField = fullItem[field] ? fullItem[field] : ''

                    if (typeof itemField === 'number') {
                        itemField = itemField.toString()
                    }

                    if (itemField !== null && itemField !== 'undefined') {
                        itemField = itemField.toLowerCase()

                        let searchData = search.toString().toLowerCase()

                        if (itemField.indexOf(searchData) > -1) {
                            filterData = true
                        }
                    }
                })
                return filterData
            });

            this.setState({
                taxesFilter: newData,
                found: newData.length != 0 ? true : false,
                search
            })
        }
    }


    onTaxSelect = (tax) => {
        const { navigation } = this.props
        navigation.navigate(ROUTES.TAX, { tax, type: EDIT_TAX })
    }

    render() {
        const {
            taxTypes,
            navigation,
            loading,
            language,
            getTaxes
        } = this.props

        const {
            refreshing,
            search,
            found,
            taxesFilter,
        } = this.state

        let emptyTitle = Lng.t("taxes.empty.title", { locale: language })

        let empty = (!search) ? {
            description: Lng.t("taxes.empty.description", { locale: language }),
            buttonTitle: Lng.t("taxes.empty.buttonTitle", { locale: language }),
            buttonPress: () => {
                navigation.navigate(ROUTES.TAX, { type: ADD_TAX })
            },
        } : {}

        return (

            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.SETTING_LIST),
                        title: Lng.t("header.taxes", { locale: language }),
                        titleStyle: styles.headerTitle,
                        placement: "center",
                        rightIcon: "plus",
                        rightIconPress: () => navigation.navigate(ROUTES.TAX, { type: ADD_TAX }),
                    }}
                    onSearch={this.onSearch}
                    bottomDivider
                >

                    <View style={styles.listViewContainer}>
                        <ListView
                            items={taxesFilter.length !== 0 ?
                                taxesFilter : found ? taxTypes : []
                            }
                            refreshing={refreshing}
                            getFreshItems={(onHide) => {
                                onHide && onHide()
                                getTaxes();
                            }}
                            onPress={this.onTaxSelect}
                            loading={loading}
                            isEmpty={found ? taxTypes.length <= 0 : true}
                            bottomDivider
                            contentContainerStyle={{ flex: 3 }}
                            leftSubTitleStyle={itemsDescriptionStyle(45)}
                            emptyContentProps={{
                                title: found ? emptyTitle :
                                    search ?
                                        Lng.t("search.noResult", { locale: language, search })
                                        : emptyTitle,
                                ...empty
                            }}
                        />
                    </View>

                </MainLayout>
            </View>
        );
    }
}

