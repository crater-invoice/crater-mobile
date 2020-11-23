// @flow

import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { MainLayout, ListView } from '@/components';
import Lng from '@/lang/i18n';
import {
    CURRENCIES_FORM,
    CREATE_CURRENCY_TYPE,
    EDIT_CURRENCY_TYPE
} from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { formatListByName } from '@/utils';
import { hasLength, hasValue } from '@/constants';
import { itemsDescriptionStyle } from '@/styles';
import { ARROW_ICON } from '@/assets';

type IProps = {
    navigation: Object,
    items: Object,
    getCurrencies: Function,
    currencies: Object,
    loading: Boolean,
    locale: String
};

export class Currencies extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            fresh: true,
            pagination: {
                page: 1,
                limit: 10,
                lastPage: 1
            },
            search: '',
            found: true,
            currenciesFilter: []
        };
    }

    componentDidMount() {
        this.getItems({ fresh: true });
        goBack(MOUNT, this.props.navigation);
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    onSelect = currency => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.CURRENCY, {
            type: EDIT_CURRENCY_TYPE,
            currency
        });
    };

    getItems = ({ fresh = false, onResult, search, filter = false } = {}) => {
        const { getCurrencies } = this.props;
        const { refreshing, pagination } = this.state;

        if (refreshing) {
            return;
        }

        this.setState({
            refreshing: true,
            fresh
        });

        const paginationParams = fresh
            ? { ...pagination, page: 1 }
            : pagination;

        if (!fresh && paginationParams.lastPage < paginationParams.page) {
            return;
        }

        getCurrencies({
            fresh,
            pagination: paginationParams,
            search,
            filter,
            onMeta: ({ last_page, current_page }) => {
                this.setState({
                    pagination: {
                        ...paginationParams,
                        lastPage: last_page,
                        page: current_page + 1
                    }
                });
            },
            onResult: val => {
                this.setState({
                    refreshing: false,
                    fresh: !val
                });
                onResult && onResult();
            }
        });
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(CURRENCIES_FORM, field, value));
    };

    onSearch = search => {
        const { globalCurrencies } = this.props;
        let searchFields = ['name'];

        if (hasValue(globalCurrencies) && hasLength(globalCurrencies)) {
            let newData = globalCurrencies.filter(currency => {
                let filterData = false;

                searchFields.filter(field => {
                    let itemField = currency[field] ? currency[field] : '';

                    if (hasValue(itemField)) {
                        itemField = itemField.toLowerCase();

                        let searchData = search.toString().toLowerCase();

                        if (itemField.indexOf(searchData) > -1) {
                            filterData = true;
                        }
                    }
                });
                return filterData;
            });

            let currenciesFilter = formatListByName(newData);

            this.setState({
                currenciesFilter,
                found: hasLength(currenciesFilter),
                search
            });
        }
    };

    loadMoreItems = () => this.getItems({ search: this.state.search });

    render() {
        const { navigation, currencies, loading, locale } = this.props;

        const {
            refreshing,
            pagination: { lastPage, page },
            fresh,
            search,
            currenciesFilter,
            found
        } = this.state;

        const canLoadMore = lastPage >= page;

        let empty = !search
            ? {
                  description: Lng.t('currencies.empty.description', {
                      locale
                  }),
                  buttonTitle: Lng.t('currencies.empty.buttonTitle', {
                      locale
                  }),
                  buttonPress: () => {
                      navigation.navigate(ROUTES.CURRENCY, {
                          type: CREATE_CURRENCY_TYPE
                      });
                  }
              }
            : {};

        let emptyTitle = search
            ? Lng.t('search.noResult', { locale, search })
            : Lng.t('currencies.empty.title', { locale });

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t('header.currencies', { locale }),
                        leftIcon: ARROW_ICON,
                        leftIconPress: () => navigation.goBack(null),
                        titleStyle: styles.headerTitle,
                        rightIcon: 'plus',
                        placement: 'center',
                        rightIcon: 'plus',
                        rightIconPress: () => {
                            navigation.navigate(ROUTES.CURRENCY, {
                                type: CREATE_CURRENCY_TYPE
                            });
                        }
                    }}
                    onSearch={this.onSearch}
                    bottomDivider
                    loadingProps={{ is: loading && fresh }}
                >
                    <View style={styles.listViewContainer}>
                        <ListView
                            items={
                                hasLength(currenciesFilter)
                                    ? currenciesFilter
                                    : found
                                    ? formatListByName(currencies)
                                    : []
                            }
                            onPress={this.onSelect}
                            refreshing={refreshing}
                            loading={loading}
                            isEmpty={found ? !hasLength(currencies) : true}
                            canLoadMore={canLoadMore}
                            getFreshItems={onHide => {
                                this.getItems({
                                    fresh: true,
                                    onResult: onHide,
                                    search
                                });
                            }}
                            getItems={() => {
                                this.loadMoreItems();
                            }}
                            bottomDivider
                            leftSubTitleStyle={itemsDescriptionStyle()}
                            emptyContentProps={{
                                title: emptyTitle,
                                ...empty
                            }}
                        />
                    </View>
                </MainLayout>
            </View>
        );
    }
}
