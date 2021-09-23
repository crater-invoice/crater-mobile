import React from 'react';
import {MainLayout, ListView, InfiniteScroll} from '@/components';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {formatCategories} from '@/utils';
import {ARROW_ICON} from '@/assets';

type IProps = {
  navigation: Object,
  getPayments: Function,
  payments: Object
};

export class Categories extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.scrollViewReference = React.createRef();
    this.state = {search: ''};
  }

  componentDidMount() {
    this.onFocus();
  }

  componentWillUnmount() {
    this.focusListener?.remove?.();
  }

  onFocus = () => {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      this.scrollViewReference?.getItems?.();
    });
  };

  onSearch = search => {
    this.setState({search});
    this.scrollViewReference?.getItems?.({
      queryString: {search},
      showLoader: true
    });
  };

  onSelect = category => {
    const {navigation} = this.props;
    navigation.navigate(routes.CATEGORY, {
      type: 'UPDATE',
      categoryId: category.id
    });
  };

  render() {
    const {navigation, categories, getExpenseCategories, route} = this.props;
    const {search} = this.state;
    const isEmpty = categories && categories.length <= 0;

    const emptyTitle = search ? 'search.noResult' : 'categories.empty.title';
    const emptyContentProps = {
      title: t(emptyTitle, {search}),
      ...(!search && {
        description: t('categories.empty.description'),
        buttonTitle: t('categories.empty.buttonTitle'),
        buttonPress: () => {
          navigation.navigate(routes.CATEGORY, {
            type: 'ADD'
          });
        }
      })
    };

    const headerProps = {
      title: t('header.expenseCategory'),
      route,
      leftIcon: ARROW_ICON,
      leftIconPress: () => navigation.navigate(routes.SETTING_LIST),
      placement: 'center',
      rightIcon: 'plus',
      rightIconPress: () =>
        navigation.navigate(routes.CATEGORY, {
          type: 'ADD'
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
            route={route}
            isAnimated
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
