// @flow

import React from 'react';
import {change} from 'redux-form';
import {MainLayout, ListView, InfiniteScroll} from '@/components';
import {ROUTES} from '@/navigation';
import {ARROW_ICON, IMAGES} from '@/assets';
import t from 'locales/use-translation';
import {ITEM_SEARCH} from '../../constants';
import {goBack, MOUNT, UNMOUNT} from '@/navigation';
import {formatItems, isFilterApply} from '@/utils';
import {defineSize, hasTextLength} from '@/constants';
import filterFields from './filterFields';
import {itemsDescriptionStyle} from '@/styles';

type IProps = {
  navigation: Object,
  getItems: Function,
  items: Object
};

export class Items extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.scrollViewReference = React.createRef();
    this.state = {search: ''};
  }

  componentDidMount() {
    const {navigation} = this.props;
    goBack(MOUNT, navigation, {route: ROUTES.MAIN_MORE});
    this.onFocus();
  }

  componentWillUnmount() {
    goBack(UNMOUNT);
    this.focusListener?.remove?.();
  }

  onFocus = () => {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.scrollViewReference?.getItems?.();
    });
  };

  onSelect = ({id}) => {
    const {navigation} = this.props;
    navigation.navigate(ROUTES.GLOBAL_ITEM, {type: 'UPDATE', id});
  };

  onResetFilter = () => {
    const {search} = this.state;

    this.scrollViewReference?.getItems?.({
      queryString: {search},
      resetQueryString: true,
      showLoader: true
    });
  };

  onSubmitFilter = ({unit_id = '', name = '', price = ''}) => {
    const {search} = this.state;

    this.scrollViewReference?.getItems?.({
      queryString: {
        unit_id,
        price,
        search: hasTextLength(name) ? name : search
      },
      showLoader: true
    });
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(ITEM_SEARCH, field, value));
  };

  onSearch = search => {
    this.setState({search});
    this.scrollViewReference?.getItems?.({
      queryString: {search},
      showLoader: true
    });
  };

  render() {
    const {
      navigation,
      items,
      handleSubmit,
      formValues,
      getItems,
      currency
    } = this.props;

    const {search} = this.state;

    const headerProps = {
      title: t('header.items'),
      navigation,
      leftIcon: ARROW_ICON,
      leftIconPress: () => navigation.navigate(ROUTES.MAIN_MORE),
      rightIcon: 'plus',
      placement: 'center',
      rightIcon: 'plus',
      rightIconPress: () => {
        navigation.navigate(ROUTES.GLOBAL_ITEM, {
          type: 'ADD'
        });
      }
    };

    const filterProps = {
      onSubmitFilter: handleSubmit(this.onSubmitFilter),
      ...filterFields(this),
      clearFilter: this.props,
      onResetFilter: () => this.onResetFilter()
    };

    const isEmpty = items && items.length <= 0;
    const isFilter = isFilterApply(formValues);

    const emptyTitle = search
      ? 'search.noResult'
      : isFilter
      ? 'filter.empty.filterTitle'
      : 'items.empty.title';

    const emptyContentProps = {
      title: t(emptyTitle, {search}),
      image: IMAGES.EMPTY_ITEMS,
      ...(!search && {
        description: t('items.empty.description')
      }),
      ...(!search &&
        !isFilter && {
          buttonTitle: t('items.empty.buttonTitle'),
          buttonPress: () => {
            navigation.navigate(ROUTES.GLOBAL_ITEM, {
              type: 'ADD'
            });
          }
        })
    };

    return (
      <MainLayout
        headerProps={headerProps}
        onSearch={this.onSearch}
        bottomDivider
        filterProps={filterProps}
        bodyStyle="is-full-listView"
      >
        <InfiniteScroll
          getItems={getItems}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={false}
          paginationLimit={defineSize(15, 15, 15, 20)}
        >
          <ListView
            items={formatItems(items, currency)}
            onPress={this.onSelect}
            isEmpty={isEmpty}
            bottomDivider
            leftSubTitleStyle={itemsDescriptionStyle()}
            emptyContentProps={emptyContentProps}
            navigation={navigation}
            isAnimated
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
