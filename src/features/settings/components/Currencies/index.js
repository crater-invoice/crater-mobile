import React from 'react';
import {View} from 'react-native';
import {change} from 'redux-form';
import styles from './styles';
import {MainLayout, ListView} from '@/components';
import t from 'locales/use-translation';
import {
  CURRENCIES_FORM,
  CREATE_CURRENCY_TYPE,
  EDIT_CURRENCY_TYPE
} from '../../constants';
import {routes} from '@/navigation';
import {formatListByName} from '@/utils';
import {hasValue, isEmpty} from '@/constants';
import {itemsDescriptionStyle} from '@/styles';
import {ARROW_ICON} from '@/assets';

type IProps = {
  navigation: Object,
  items: Object,
  getCurrencies: Function,
  currencies: Object,
  loading: Boolean
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
    this.getItems({fresh: true});
  }

  onSelect = currency => {
    const {navigation} = this.props;
    navigation.navigate(routes.CURRENCY, {
      type: EDIT_CURRENCY_TYPE,
      currency
    });
  };

  getItems = ({fresh = false, onResult, search, filter = false} = {}) => {
    const {getCurrencies} = this.props;
    const {refreshing, pagination} = this.state;

    if (refreshing) {
      return;
    }

    this.setState({
      refreshing: true,
      fresh
    });

    const paginationParams = fresh ? {...pagination, page: 1} : pagination;

    if (!fresh && paginationParams.lastPage < paginationParams.page) {
      return;
    }

    getCurrencies({
      fresh,
      pagination: paginationParams,
      search,
      filter,
      onMeta: ({last_page, current_page}) => {
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
    const {globalCurrencies} = this.props;
    let searchFields = ['name'];

    if (!isEmpty(globalCurrencies)) {
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
        found: !isEmpty(currenciesFilter),
        search
      });
    }
  };

  loadMoreItems = () => this.getItems({search: this.state.search});

  render() {
    const {navigation, currencies, loading} = this.props;

    const {
      refreshing,
      pagination: {lastPage, page},
      fresh,
      search,
      currenciesFilter,
      found
    } = this.state;

    const canLoadMore = lastPage >= page;

    let empty = !search
      ? {
          description: t('currencies.empty.description'),
          buttonTitle: t('currencies.empty.buttonTitle'),
          buttonPress: () => {
            navigation.navigate(routes.CURRENCY, {
              type: CREATE_CURRENCY_TYPE
            });
          }
        }
      : {};

    let emptyTitle = search
      ? t('search.noResult', {search})
      : t('currencies.empty.title');

    return (
      <View style={styles.container}>
        <MainLayout
          headerProps={{
            title: t('header.currencies'),
            leftIcon: ARROW_ICON,
            leftIconPress: () => navigation.goBack(null),
            rightIcon: 'plus',
            placement: 'center',
            rightIcon: 'plus',
            rightIconPress: () => {
              navigation.navigate(routes.CURRENCY, {
                type: CREATE_CURRENCY_TYPE
              });
            }
          }}
          onSearch={this.onSearch}
          bottomDivider
          loadingProps={{is: loading && fresh}}
        >
          <ListView
            items={
              !isEmpty(currenciesFilter)
                ? currenciesFilter
                : found
                ? formatListByName(currencies)
                : []
            }
            onPress={this.onSelect}
            refreshing={refreshing}
            loading={loading}
            isEmpty={found ? isEmpty(currencies) : true}
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
        </MainLayout>
      </View>
    );
  }
}
