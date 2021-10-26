import React from 'react';
import {MainLayout, ListView, InfiniteScroll} from '@/components';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {ARROW_ICON} from '@/assets';
import {IProps, IStates} from './categories-type';
import {isEmpty} from '@/constants';
import {fetchCategories} from 'stores/categories/actions';

export default class Categories extends React.Component<IProps, IStates> {
  scrollViewReference: any;
  focusListener: any;

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
    navigation.navigate(routes.CREATE_CATEGORY, {
      type: 'UPDATE',
      id: category.id
    });
  };

  addNewCategory = () =>
    this.props.navigation.navigate(routes.CREATE_CATEGORY, {type: 'ADD'});

  render() {
    const {navigation, categories, dispatch, route} = this.props;
    const {search} = this.state;

    const emptyTitle = search ? 'search.noResult' : 'categories.empty.title';
    const emptyContentProps = {
      title: t(emptyTitle, {search}),
      ...(!search && {
        description: t('categories.empty.description'),
        buttonTitle: t('categories.empty.buttonTitle'),
        buttonPress: this.addNewCategory
      })
    };

    const headerProps = {
      title: t('header.expenseCategory'),
      route,
      leftIcon: ARROW_ICON,
      leftIconPress: () => navigation.goBack(null),
      placement: 'center',
      rightIcon: 'plus',
      rightIconPress: this.addNewCategory
    };

    return (
      <MainLayout
        headerProps={headerProps}
        onSearch={this.onSearch}
        bottomDivider
        bodyStyle="is-full-listView"
      >
        <InfiniteScroll
          getItems={q => dispatch(fetchCategories(q))}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={false}
        >
          <ListView
            isAnimated
            bottomDivider
            route={route}
            items={categories}
            onPress={this.onSelect}
            isEmpty={isEmpty(categories)}
            emptyContentProps={emptyContentProps}
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
