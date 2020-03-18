// @flow

import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { MainLayout, ListView } from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import { IMAGES } from '../../../../config';
import Lng from '../../../../api/lang/i18n';
import { EXPENSE_ADD, EXPENSE_EDIT, EXPENSE_SEARCH } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import expenseFilterFields from './filterFields'

let params = {
    search: '',
    expense_category_id: '',
    from_date: '',
    to_date: '',
}

type IProps = {
    navigation: Object,
    getExpenses: Function,
    expenses: Object,
    loading: Boolean,
    language: String,
}

export class Expenses extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            fresh: true,
            pagination: {
                page: 1,
                limit: 10,
                lastPage: 1,
            },
            search: '',
            selectedCategory: '',
            filter: false
        };
    }

    componentDidMount() {
        const { getCategories, navigation } = this.props

        getCategories()

        this.getItems({ fresh: true });

        goBack(MOUNT, navigation, { route: ROUTES.MAIN_INVOICES })
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    onExpenseSelect = ({ id }) => {
        const { navigation } = this.props

        navigation.navigate(ROUTES.EXPENSE, { type: EXPENSE_EDIT, id })
        this.onResetFilter()
    }


    getItems = ({
        fresh = false,
        onResult,
        filter = false,
        params,
    } = {}) => {
        const { getExpenses } = this.props;
        const { refreshing, pagination } = this.state;

        if (refreshing) {
            return;
        }

        this.setState({
            refreshing: true,
            fresh,
        });

        const paginationParams = fresh ? { ...pagination, page: 1 } : pagination;

        if (!fresh && paginationParams.lastPage < paginationParams.page) {
            return;
        }

        getExpenses({
            fresh,
            pagination: paginationParams,
            params,
            filter,
            onMeta: ({ last_page, current_page }) => {
                this.setState({
                    pagination: {
                        ...paginationParams,
                        lastPage: last_page,
                        page: current_page + 1,
                    },
                });
            },
            onResult: (val) => {
                this.setState({
                    refreshing: false,
                    fresh: !val,
                });
                onResult && onResult();
            },
        });
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(EXPENSE_SEARCH, field, value));

        if (field === 'expense_category_id')
            this.setState({ selectedCategory: value })
    };

    onSearch = (search) => {
        this.onResetFilter()
        this.setState({ search })
        this.getItems({ fresh: true, params: { ...params, search } })
    };

    onResetFilter = () => {
        this.setState({ filter: false })
    }

    onSubmitFilter = ({ from_date, to_date, expense_category_id }) => {

        if (from_date || to_date || expense_category_id) {
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    expense_category_id,
                    from_date,
                    to_date,
                },
                filter: true
            })
        }
        else
            this.onResetFilter()
    }


    loadMoreItems = () => {
        const { search, filter } = this.state
        const {
            formValues: {
                from_date = '',
                to_date = '',
                expense_category_id = ''
            }
        } = this.props


        if (filter) {

            this.getItems({
                params: {
                    ...params,
                    expense_category_id,
                    from_date,
                    to_date,
                },
                filter: true
            })
        }
        else
            this.getItems({ params: { ...params, search } });

    }

    render() {

        const {
            navigation,
            expenses,
            filterExpenses,
            loading,
            language,
            handleSubmit,
        } = this.props;
        const {
            refreshing,
            pagination: { lastPage, page },
            fresh,
            search,
            filter,
        } = this.state;

        const canLoadMore = lastPage >= page;

        let empty = (!filter && !search) ? {
            description: Lng.t("expenses.empty.description", { locale: language }),
            buttonTitle: Lng.t("expenses.empty.buttonTitle", { locale: language }),
            buttonPress: () => {
                navigation.navigate(ROUTES.EXPENSE, { type: EXPENSE_ADD })
                this.onResetFilter()
            }
        } : {}

        let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
            : (!filter) ? Lng.t("expenses.empty.title", { locale: language }) :
                Lng.t("filter.empty.filterTitle", { locale: language })

        let isLoading = navigation.getParam('loading', false)

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        rightIcon: "plus",
                        rightIconPress: () => {
                            navigation.navigate(ROUTES.EXPENSE, { type: EXPENSE_ADD })
                            this.onResetFilter()
                        },
                        title: Lng.t("header.expenses", { locale: language })
                    }}
                    onSearch={this.onSearch}
                    bottomDivider
                    filterProps={{
                        onSubmitFilter: handleSubmit(this.onSubmitFilter),
                        ...expenseFilterFields(this),
                        clearFilter: this.props,
                        language: language,
                        onResetFilter: () => this.onResetFilter()
                    }}
                    loadingProps={{ is: isLoading || (loading && fresh) }}
                >

                    <View style={styles.listViewContainer} >
                        <ListView
                            items={!filter ? expenses : filterExpenses}
                            onPress={this.onExpenseSelect}
                            refreshing={refreshing}
                            loading={loading}
                            isEmpty={!filter ? expenses.length <= 0 :
                                filterExpenses.length <= 0
                            }
                            canLoadMore={canLoadMore}
                            getFreshItems={(onHide) => {
                                this.onResetFilter()
                                this.getItems({
                                    fresh: true,
                                    onResult: onHide,
                                    params: { ...params, search }
                                });
                            }}
                            getItems={() => this.loadMoreItems()}
                            contentContainerStyle={{ flex: 1 }}
                            bottomDivider
                            emptyContentProps={{
                                title: emptyTitle,
                                image: IMAGES.EMPTY_EXPENSES,
                                ...empty
                            }}
                            leftSubTitleStyle={{ textAlign: "justify" }}
                        />
                    </View>

                </MainLayout>
            </View>
        );
    }
}
