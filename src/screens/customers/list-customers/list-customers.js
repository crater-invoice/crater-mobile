import React from 'react';
import {routes} from '@/navigation';
import {IProps, IStates} from './list-customers-type.d';
import {isEmpty} from '@/constants';
import {isFilterApply} from '@/utils';
import filterFields from './list-customers-filters';
import t from 'locales/use-translation';
import {fetchCustomers} from 'stores/customer/actions';
import {
  MainLayout,
  ListView,
  InfiniteScroll,
  BaseEmptyPlaceholder
} from '@/components';

export default class Customers extends React.Component<IProps, IStates> {
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
      showLoader: true,
      queryString: {
        display_name: name,
        contact_name,
        phone,
        search
      }
    });
  };

  onSelect = customer => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_CUSTOMER, {
      id: customer.id,
      type: 'UPDATE'
    });
  };

  onAddCustomer = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_CUSTOMER, {type: 'ADD'});
  };

  render() {
    const {
      customers,
      navigation,
      handleSubmit,
      formValues,
      route,
      dispatch
    } = this.props;
    const {search} = this.state;
    const isFilter = isFilterApply(formValues);

    const filterProps = {
      onSubmitFilter: handleSubmit(this.onSubmitFilter),
      inputFields: filterFields,
      clearFilter: this.props,
      onResetFilter: () => this.onResetFilter()
    };

    return (
      <MainLayout
        headerProps={{title: t('header.customers')}}
        onSearch={this.onSearch}
        filterProps={filterProps}
        bottomDivider
        with-input-filter
        with-company
        navigation={navigation}
        route={route}
        plusButtonOnPress={this.onAddCustomer}
      >
        <InfiniteScroll
          getItems={q => dispatch(fetchCustomers(q))}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={false}
        >
          <ListView
            isAnimated
            hasAvatar
            items={customers}
            onPress={this.onSelect}
            isEmpty={isEmpty(customers)}
            bottomDivider
            emptyPlaceholder={
              <BaseEmptyPlaceholder
                {...this.props}
                search={search}
                isFilter={isFilter}
              />
            }
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
