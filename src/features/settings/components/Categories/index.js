// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { MainLayout, ListView } from '@/components';
import Lng from '@/lang/i18n';
import { CATEGORY_ADD, CATEGORY_EDIT } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';


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
            refreshing: false,
            pagination: {
                page: 1,
                limit: 10,
                isLastPage: false
            },
            fresh: true,
        };
    }

    componentDidMount() {
        const { navigation } = this.props
        this.getItems({ fresh: true })
        goBack(MOUNT, navigation)
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    getItems = ({ fresh = false, onResult = null , search = null }: any = {}) => {
        const { getExpenseCategories } = this.props;
        const { refreshing, pagination } = this.state;

        if (refreshing) { return; }

        this.setState({
            refreshing: true,
            fresh,
        });

        const paginationParams = fresh ? { ...pagination, page: 1 } : pagination;
        
        if (!fresh && paginationParams.lastPage < paginationParams.page) {
            return;
        }

        getExpenseCategories({
            fresh,
            pagination: paginationParams,
            search,
            onMeta: ({ last_page, current_page}) => {
                this.setState({
                    pagination: {
                        ...paginationParams,
                        lastPage: last_page,
                        page: current_page + 1,
                    },
                });
            },
            onResult: () => {
                this.setState({ refreshing: false });
                onResult?.();
            }
        });
    };

    onSelectCategory = (category) => {

        const { navigation } = this.props
        navigation.navigate(ROUTES.CATEGORY,
            { type: CATEGORY_EDIT, categoryId: category.id }
        )
    }

    onSearch = (search) => {
        this.setState({ search })
        this.getItems({ fresh: true, search })
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

    loadMoreItems = () => {
        const { search } = this.state
        this.getItems({ search } );
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
            refreshing,
            pagination: { lastPage, page },
            fresh
        } = this.state

        let categoriesList = [];
        categoriesList = this.itemList(categories)

        let empty = (!search) ? {
            description: Lng.t("categories.empty.description", { locale: language }),
            buttonTitle: Lng.t("categories.empty.buttonTitle", { locale: language }),
            buttonPress: () => navigation.navigate(ROUTES.CATEGORY, { type: CATEGORY_ADD }),
        } : {}

        const canLoadMore = lastPage >= page;
      
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
                    loadingProps={{ is: loading && fresh }}
                >

                    <View style={styles.listViewContainer}>
                        <ListView
                            items={categoriesList}
                            loading={loading}
                            refreshing={refreshing}
                            getFreshItems={(onHide) => {
                                this.getItems({
                                    fresh: true,
                                    onResult: onHide,
                                    search
                                });
                            }}
                            getItems={() => {
                                console.log('getItems')
                                this.loadMoreItems()
                            }}
                            onPress={this.onSelectCategory}
                            isEmpty={categoriesList.length <= 0}
                            bottomDivider
                            canLoadMore={canLoadMore}
                            emptyContentProps={{
                                title: search ?
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

