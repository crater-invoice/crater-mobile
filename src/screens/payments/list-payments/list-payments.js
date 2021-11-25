import React from 'react';
import {change} from 'redux-form';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {isEmpty} from '@/constants';
import {isFilterApply} from '@/utils';
import filterFields from './list-payments-filters';
import {fetchPayments} from 'stores/payment/actions';
import {PAYMENTS_FORM} from 'stores/payment/types';
import {IProps, IStates} from './list-payments-type.d';
import {
  MainLayout,
  ListView,
  InfiniteScroll,
  BaseEmptyPlaceholder
} from '@/components';

export default class Payments extends React.Component<IProps, IStates> {
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

  setFormField = (field, value) => {
    this.props.dispatch(change(PAYMENTS_FORM, field, value));
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

  onSubmitFilter = ({
    customer_id = '',
    payment_method_id = '',
    payment_number = ''
  }) => {
    const {search} = this.state;

    this.scrollViewReference?.getItems?.({
      queryString: {
        customer_id,
        payment_method_id,
        payment_number,
        search
      },
      showLoader: true
    });
  };

  onSelect = payment => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_PAYMENT, {
      id: payment.id,
      paymentInvoiceId: payment?.invoice?.id,
      type: 'UPDATE'
    });
  };

  onAddPayment = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_PAYMENT, {type: 'ADD'});
  };

  render() {
    const {
      payments,
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
      ...filterFields(this),
      clearFilter: this.props,
      onResetFilter: () => this.onResetFilter()
    };

    return (
      <MainLayout
        headerProps={{title: t('header.payments')}}
        onSearch={this.onSearch}
        filterProps={filterProps}
        bottomDivider
        with-input-filter
        with-company
        navigation={navigation}
        route={route}
        plusButtonOnPress={this.onAddPayment}
      >
        <InfiniteScroll
          getItems={q => dispatch(fetchPayments(q))}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={false}
        >
          <ListView
            isAnimated
            bottomDivider
            items={payments}
            onPress={this.onSelect}
            isEmpty={isEmpty(payments)}
            contentContainerStyle={{flex: 0}}
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
