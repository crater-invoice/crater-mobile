// @flow

import React from 'react';
import { change } from 'redux-form';
import { MainLayout, ListView, InfiniteScroll } from '@/components';
import { IMAGES } from '@/assets';
import t from 'locales/use-translation';
import { EXPENSE_ADD, EXPENSE_EDIT, EXPENSE_SEARCH } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import expenseFilterFields from './filterFields';
import { isFilterApply } from '@/utils';

type IProps = {
    navigation: Object,
    getExpenses: Function,
    expenses: Object
};

export class Expenses extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.scrollViewReference = React.createRef();
        this.state = { search: '' };
    }

    componentDidMount() {
        const { navigation } = this.props;

        goBack(MOUNT, navigation, { route: ROUTES.MAIN_INVOICES });
        this.onFocus();
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
        this.focusListener?.remove?.();
    }

    onFocus = () => {
        const { navigation } = this.props;

        this.focusListener = navigation.addListener('didFocus', () => {
            this.scrollViewReference?.getItems?.();
        });
    };

    onSelect = ({ id }) => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.EXPENSE, { type: EXPENSE_EDIT, id });
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(EXPENSE_SEARCH, field, value));
    };

    onSearch = search => {
        this.setState({ search });

        this.scrollViewReference?.getItems?.({
            queryString: { search },
            showLoader: true
        });
    };

    onResetFilter = () => {
        const { search } = this.state;
        this.scrollViewReference?.getItems?.({
            queryString: { search },
            resetQueryString: true,
            showLoader: true
        });
    };

    onSubmitFilter = ({
        from_date,
        to_date,
        expense_category_id,
        customer_id
    }) => {
        const { search } = this.state;

        this.scrollViewReference?.getItems?.({
            queryString: {
                expense_category_id,
                from_date,
                to_date,
                customer_id,
                search
            },
            showLoader: true
        });
    };

    render() {
        const { search } = this.state;
        const {
            navigation,
            expenses,
            handleSubmit,
            getExpenses,
            formValues
        } = this.props;

        const isEmpty = expenses && expenses.length <= 0;
        const isFilter = isFilterApply(formValues);

        const emptyTitle = search
            ? 'search.noResult'
            : isFilter
            ? 'filter.empty.filterTitle'
            : 'expenses.empty.title';

        const emptyContentProps = {
            title: t(emptyTitle, { search }),
            image: IMAGES.EMPTY_EXPENSES,
            ...(!search && {
                description: t('expenses.empty.description')
            }),
            ...(!search &&
                !isFilter && {
                    buttonTitle: t('expenses.empty.buttonTitle'),
                    buttonPress: () => {
                        navigation.navigate(ROUTES.EXPENSE, {
                            type: EXPENSE_ADD
                        });
                    }
                })
        };

        const headerProps = {
            rightIcon: 'plus',
            rightIconPress: () => {
                navigation.navigate(ROUTES.EXPENSE, {
                    type: EXPENSE_ADD
                });
            },
            title: t('header.expenses'),
            navigation
        };

        const filterProps = {
            onSubmitFilter: handleSubmit(this.onSubmitFilter),
            ...expenseFilterFields(this),
            clearFilter: this.props,
            onResetFilter: () => this.onResetFilter()
        };

        return (
            <MainLayout
                headerProps={headerProps}
                onSearch={this.onSearch}
                bottomDivider
                filterProps={filterProps}
            >
                <InfiniteScroll
                    getItems={getExpenses}
                    reference={ref => (this.scrollViewReference = ref)}
                >
                    <ListView
                        items={expenses}
                        onPress={this.onSelect}
                        isEmpty={isEmpty}
                        contentContainerStyle={{ flex: 1 }}
                        bottomDivider
                        emptyContentProps={emptyContentProps}
                        leftSubTitleStyle={{ textAlign: 'justify' }}
                        isAnimated
                    />
                </InfiniteScroll>
            </MainLayout>
        );
    }
}
