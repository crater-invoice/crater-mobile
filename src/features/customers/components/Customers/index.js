import React from 'react';
import t from 'locales/use-translation';
import {ListView, MainLayout, InfiniteScroll} from '@/components';
import {routes} from '@/navigation';
import {customersFilterFields as filterFields} from './filterFields';
import {IMAGES} from '@/assets';
import {isFilterApply} from '@/utils';
import {PermissionService} from '@/services';

type IProps = {
  customers: Object,
  navigation: Object,
  formValues: any
};

export class Customers extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.scrollViewReference = React.createRef();
    this.state = {search: ''};
  }

  componentDidMount() {
    const {navigation} = this.props;

    this.focusListener = navigation.addListener('focus', () => {
      this.scrollViewReference?.getItems?.();
    });
  }

  componentWillUnmount() {
    this.focusListener?.remove?.();
  }

  onSearch = search => {
    this.setState({search});
    this.scrollViewReference?.getItems?.({
      queryString: {search},
      showLoader: true
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

  onSubmitFilter = ({name = '', contact_name = '', phone = ''}) => {
    const {search} = this.state;

    this.scrollViewReference?.getItems?.({
      queryString: {
        display_name: name,
        contact_name,
        phone,
        search
      },
      showLoader: true
    });
  };

  onSelect = customer => {
    const {navigation} = this.props;
    navigation.navigate(routes.CUSTOMER, {
      customerId: customer.id,
      type: 'UPDATE'
    });
  };

  render() {
    const {
      customers,
      navigation,
      handleSubmit,
      getCustomer,
      formValues
    } = this.props;

    const {search} = this.state;
    const isEmpty = customers && customers.length <= 0;
    const isFilter = isFilterApply(formValues);

    const emptyTitle = search
      ? 'search.noResult'
      : isFilter
      ? 'filter.empty.filterTitle'
      : 'customers.empty.title';

    const emptyContentProps = {
      title: t(emptyTitle, {search}),
      image: IMAGES.EMPTY_CUSTOMERS,
      ...(!search && {
        description: t('customers.empty.description')
      }),
      ...(!search &&
        !isFilter && {
          buttonTitle: t('customers.empty.buttonTitle'),
          buttonPress: () => {
            navigation.navigate(routes.CUSTOMER, {
              type: 'ADD'
            });
          }
        })
    };

    const headerProps = {
      rightIcon: 'plus',
      rightIconPress: () => {
        navigation.navigate(routes.CUSTOMER, {
          type: 'ADD'
        });
      },
      title: t('header.customers'),
      navigation
    };

    const filterProps = {
      onSubmitFilter: handleSubmit(this.onSubmitFilter),
      inputFields: filterFields(),
      clearFilter: this.props,
      onResetFilter: () => this.onResetFilter()
    };

    return (
      <MainLayout
        headerProps={headerProps}
        onSearch={this.onSearch}
        filterProps={filterProps}
        bottomDivider
      >
        <InfiniteScroll
          getItems={getCustomer}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={PermissionService.isAllowToView(
            routes.MAIN_CUSTOMERS
          )}
        >
          <ListView
            items={customers}
            onPress={this.onSelect}
            isEmpty={isEmpty}
            bottomDivider
            hasAvatar
            emptyContentProps={emptyContentProps}
            navigation={navigation}
            isAnimated
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
