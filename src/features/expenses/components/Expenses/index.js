// @flow

import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { MainLayout, ListView, InfiniteScroll } from '@/components';
import { IMAGES } from '@/assets';
import Lng from '@/lang/i18n';
import { EXPENSE_ADD, EXPENSE_EDIT, EXPENSE_SEARCH } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import expenseFilterFields from './filterFields';
import { isFilterApply } from '@/utils';

type IProps = {
    navigation: Object,
    getExpenses: Function,
    expenses: Object,
    locale: String
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
        this.onResetFilter();
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

    onSubmitFilter = ({ from_date, to_date, expense_category_id }) => {
        const { search } = this.state;

        this.scrollViewReference?.getItems?.({
            queryString: {
                expense_category_id,
                from_date,
                to_date,
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
            locale,
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
            title: Lng.t(emptyTitle, { locale, search }),
            image: IMAGES.EMPTY_EXPENSES,
            ...(!search && {
                description: Lng.t('expenses.empty.description', { locale })
            }),
            ...(!search &&
                !isFilter && {
                    buttonTitle: Lng.t('expenses.empty.buttonTitle', {
                        locale
                    }),
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
                this.onResetFilter();
            },
            title: Lng.t('header.expenses', { locale })
        };

        const filterProps = {
            onSubmitFilter: handleSubmit(this.onSubmitFilter),
            ...expenseFilterFields(this),
            clearFilter: this.props,
            locale,
            onResetFilter: () => this.onResetFilter()
        };

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={headerProps}
                    onSearch={this.onSearch}
                    bottomDivider
                    filterProps={filterProps}
                >
                    <View style={styles.listViewContainer}>
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
                            />
                        </InfiniteScroll>
                    </View>
                </MainLayout>
            </View>
        );
    }
}
