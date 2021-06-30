// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { MainLayout, ListView, InfiniteScroll } from '@/components';
import Lng from '@/lang/i18n';
import { CATEGORY_ADD, CATEGORY_EDIT } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { formatCategories } from '@/utils';
import { ARROW_ICON } from '@/assets';

type IProps = {
    navigation: Object,
    getPayments: Function,
    payments: Object,
    locale: String
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
        const {
            navigation,
            locale,
            categories,
            getExpenseCategories
        } = this.props;

        const { search } = this.state;
        const isEmpty = categories && categories.length <= 0;

        const emptyTitle = search
            ? 'search.noResult'
            : 'categories.empty.title';
        const emptyContentProps = {
            title: Lng.t(emptyTitle, { locale, search }),
            ...(!search && {
                description: Lng.t('categories.empty.description', { locale }),
                buttonTitle: Lng.t('categories.empty.buttonTitle', { locale }),
                buttonPress: () => {
                    navigation.navigate(ROUTES.CATEGORY, {
                        type: CATEGORY_ADD
                    });
                }
            })
        };

        const headerProps = {
            leftIcon: ARROW_ICON,
            leftIconPress: () => navigation.navigate(ROUTES.SETTING_LIST),
            title: Lng.t('header.expenseCategory', { locale }),
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
            >
                <View style={styles.listViewContainer}>
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
                </View>
            </MainLayout>
        );
    }
}
