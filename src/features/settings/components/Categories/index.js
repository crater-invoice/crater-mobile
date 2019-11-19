// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import {
    MainLayout,
    ListView
} from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import Lng from '../../../../api/lang/i18n';
import { CATEGORY_ADD, CATEGORY_EDIT } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';


type IProps = {
    navigation: Object,
    getPayments: Function,
    payments: Object,
    loading: Boolean,
    language: String,
}

export class Categories extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            categoriesFilter: [],
            found: true,
            refreshing: false
        };
    }

    componentDidMount() {
        const { getExpenseCategories, navigation } = this.props
        getExpenseCategories()

        goBack(MOUNT, navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    onSelectCategory = (category) => {

        const { navigation } = this.props
        navigation.navigate(ROUTES.CATEGORY,
            { type: CATEGORY_EDIT, categoryId: category.id }
        )
    }

    onSearch = (search) => {

        const { categories } = this.props;
        let searchFields = ['name'];

        if (typeof categories !== 'undefined' && categories.length != 0) {

            let newData = categories.filter((category) => {
                let filterData = false

                searchFields.filter((field) => {
                    let itemField = category[field] ? category[field] : ''

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

            let categoriesFilter = this.itemList(newData)

            this.setState({
                categoriesFilter,
                found: categoriesFilter.length != 0 ? true : false,
                search
            })
        }
    };

    itemList = (categories) => {
        let categoriesList = []
        if (typeof categories !== 'undefined' && categories.length != 0) {
            categoriesList = categories.map((category) => {
                const { name, description } = category;

                return {
                    title: name || '',
                    subtitle: {
                        title: description,
                    },
                    fullItem: category,
                };
            });
        }
        return categoriesList
    }

    getFreshItems = (onHide) => {
        const { getExpenseCategories } = this.props
        getExpenseCategories()

        setTimeout(() => {
            onHide && onHide()
        }, 400);

    }

    render() {

        const {
            navigation,
            loading,
            language,
            categories,
        } = this.props;

        const {
            search,
            categoriesFilter,
            found,
            refreshing
        } = this.state

        let categoriesList = [];
        categoriesList = this.itemList(categories)

        let empty = (!search) ? {
            description: Lng.t("categories.empty.description", { locale: language }),
            buttonTitle: Lng.t("categories.empty.buttonTitle", { locale: language }),
            buttonPress: () => navigation.navigate(ROUTES.CATEGORY, { type: CATEGORY_ADD }),
        } : {}


        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.SETTING_LIST),
                        title: Lng.t("header.expenseCategory", { locale: language }),
                        titleStyle: styles.titleStyle,
                        placement: "center",
                        rightIcon: "plus",
                        rightIconPress: () => navigation.navigate(ROUTES.CATEGORY, { type: CATEGORY_ADD }),
                    }}
                    onSearch={this.onSearch}
                    bottomDivider
                    loadingProps={{ is: loading }}
                >

                    <View style={styles.listViewContainer}>
                        <ListView
                            items={categoriesFilter.length != 0 ?
                                categoriesFilter : found ? categoriesList : []
                            }
                            refreshing={refreshing}
                            getFreshItems={(onHide) => {
                                this.getFreshItems(onHide)
                            }}
                            onPress={this.onSelectCategory}
                            loading={loading}
                            isEmpty={found ? categoriesList.length <= 0 : true}
                            bottomDivider
                            emptyContentProps={{
                                title: found ?
                                    Lng.t("categories.empty.title", { locale: language }) :
                                    Lng.t("search.noResult", { locale: language, search }),
                                ...empty
                            }}
                        />
                    </View>

                </MainLayout>
            </View>
        );
    }
}

