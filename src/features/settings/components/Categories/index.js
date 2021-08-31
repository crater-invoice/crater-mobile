// @flow

import React from 'react';
import { MainLayout, ListView, InfiniteScroll } from '@/components';
import t from 'locales/use-translation';
import { CATEGORY_ADD, CATEGORY_EDIT } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { formatCategories } from '@/utils';
import { ARROW_ICON } from '@/assets';

type IProps = {
    navigation: Object,
    getPayments: Function,
    payments: Object
};

export class Categories extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.scrollViewReference = React.createRef();
        this.state = { search: '' };
    }

    componentDidMount() {
        const { navigation } = this.props;

        goBack(MOUNT, navigation);
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

    onSearch = search => {
        this.setState({ search });
        this.scrollViewReference?.getItems?.({
            queryString: { search },
            showLoader: true
        });
    };

    onSelect = category => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.CATEGORY, {
            type: CATEGORY_EDIT,
            categoryId: category.id
        });
    };

    render() {
        const { navigation, categories, getExpenseCategories } = this.props;
        const { search } = this.state;
        const isEmpty = categories && categories.length <= 0;

        const emptyTitle = search
            ? 'search.noResult'
            : 'categories.empty.title';
        const emptyContentProps = {
            title: t(emptyTitle, { search }),
            ...(!search && {
                description: t('categories.empty.description'),
                buttonTitle: t('categories.empty.buttonTitle'),
                buttonPress: () => {
                    navigation.navigate(ROUTES.CATEGORY, {
                        type: CATEGORY_ADD
                    });
                }
            })
        };

        const headerProps = {
            title: t('header.expenseCategory'),
            navigation,
            leftIcon: ARROW_ICON,
            leftIconPress: () => navigation.navigate(ROUTES.SETTING_LIST),
            placement: 'center',
            rightIcon: 'plus',
            rightIconPress: () =>
                navigation.navigate(ROUTES.CATEGORY, {
                    type: CATEGORY_ADD
                })
        };

        return (
            <MainLayout
                headerProps={headerProps}
                onSearch={this.onSearch}
                bottomDivider
                bodyStyle="is-full-listView"
            >
                <InfiniteScroll
                    getItems={getExpenseCategories}
                    reference={ref => (this.scrollViewReference = ref)}
                    getItemsInMount={false}
                >
                    <ListView
                        items={formatCategories(categories)}
                        onPress={this.onSelect}
                        isEmpty={isEmpty}
                        bottomDivider
                        emptyContentProps={emptyContentProps}
                        isAnimated
                    />
                </InfiniteScroll>
            </MainLayout>
        );
    }
}
