import React from 'react';
import {change} from 'redux-form';
import {MainLayout, ListView, InfiniteScroll, AssetImage} from '@/components';
import {routes} from '@/navigation';
import {ARROW_ICON} from '@/assets';
import t from 'locales/use-translation';
import {ITEMS_FORM} from 'stores/item/types';
import {isFilterApply} from '@/utils';
import {hasTextLength, isEmpty} from '@/constants';
import filterFields from './list-items-filter';
import {itemsDescriptionStyle} from '@/styles';
import {IProps, IStates} from './list-items-type.d';
import {fetchItems} from 'stores/item/actions';
import {defineSize} from '@/helpers/size';

export default class Items extends React.Component<IProps, IStates> {
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

  onSelect = item => {
    const {
      navigation,
      isAllowToEdit,
      currency,
      discount_per_item,
      tax_per_item
    } = this.props;
    if (!isAllowToEdit) {
      return;
    }
    navigation.navigate(routes.CREATE_ITEM, {
      item,
      screen: 'item',
      currency,
      tax_per_item,
      type: 'UPDATE',
      discount_per_item
    });
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
    this.props.dispatch(change(ITEMS_FORM, field, value));
  };

  onSearch = search => {
    this.setState({search});
    this.scrollViewReference?.getItems?.({
      queryString: {search},
      showLoader: true
    });
  };

  onCreateItem = () => {
    const {navigation, currency, discount_per_item, tax_per_item} = this.props;
    navigation.navigate(routes.CREATE_ITEM, {
      screen: 'item',
      type: 'ADD',
      currency,
      discount_per_item,
      tax_per_item
    });
  };

  render() {
    const {
      navigation,
      items,
      handleSubmit,
      formValues,
      route,
      dispatch
    } = this.props;

    const {search} = this.state;

    const headerProps = {
      title: t('header.items'),
      route,
      leftIcon: ARROW_ICON,
      leftIconPress: () => navigation.navigate(routes.MAIN_MORE),
      rightIcon: 'plus',
      placement: 'center',
      rightIcon: 'plus',
      rightIconPress: this.onCreateItem
    };

    const filterProps = {
      onSubmitFilter: handleSubmit(this.onSubmitFilter),
      ...filterFields(this),
      clearFilter: this.props,
      onResetFilter: () => this.onResetFilter()
    };

    const isFilter = isFilterApply(formValues);

    const emptyTitle = search
      ? 'search.no_result'
      : isFilter
      ? 'filter.empty.filter_title'
      : 'items.empty.title';

    const emptyContentProps = {
      title: t(emptyTitle, {search}),
      image: AssetImage.images.empty_items,
      ...(!search && {
        description: t('items.empty.description')
      }),
      ...(!search &&
        !isFilter && {
          buttonTitle: t('items.empty.button_title'),
          buttonPress: this.onCreateItem
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
          getItems={q => dispatch(fetchItems(q))}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={false}
          paginationLimit={defineSize(15, 15, 15, 20)}
        >
          <ListView
            items={items}
            onPress={this.onSelect}
            isEmpty={isEmpty(items)}
            bottomDivider
            leftSubTitleStyle={itemsDescriptionStyle()}
            emptyContentProps={emptyContentProps}
            route={route}
            isAnimated
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
