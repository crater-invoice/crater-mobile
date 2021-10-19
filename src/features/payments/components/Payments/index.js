import React from 'react';
import {change} from 'redux-form';
import {MainLayout, ListView, InfiniteScroll, AssetImage} from '@/components';
import t from 'locales/use-translation';
import {PAYMENT_SEARCH} from '../../constants';
import {routes} from '@/navigation';
import paymentsFilterFields from './filterFields';
import {isFilterApply} from '@/utils';
import PaymentServices from '../../services';
import {PermissionService} from '@/services';

type IProps = {
  navigation: Object,
  getPayments: Function,
  payments: Object,
  formValues: any
};

export class Payments extends React.Component<IProps> {
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

      if (PaymentServices.isEmailSent) {
        PaymentServices.toggleIsEmailSent(false);
      }
    });
  };

  onSelect = payment => {
    const {navigation} = this.props;
    navigation.navigate(routes.PAYMENT, {
      id: payment.id,
      type: 'UPDATE'
    });
  };

  onSearch = search => {
    this.setState({search});

    this.scrollViewReference?.getItems?.({
      queryString: {search},
      showLoader: true
    });
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(PAYMENT_SEARCH, field, value));
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

  render() {
    const {
      navigation,
      payments,
      handleSubmit,
      getPayments,
      formValues,
      route
    } = this.props;

    const {search} = this.state;

    const isEmpty = payments && payments.length <= 0;
    const isFilter = isFilterApply(formValues);

    const emptyTitle = search
      ? 'search.noResult'
      : isFilter
      ? 'filter.empty.filterTitle'
      : 'payments.empty.title';

    const emptyContentProps = {
      title: t(emptyTitle, {search}),
      image: AssetImage.images.empty_payments,
      ...(!search && {
        description: t('payments.empty.description')
      }),
      ...(!search &&
        !isFilter && {
          buttonTitle: t('payments.empty.buttonTitle'),
          buttonPress: () => {
            navigation.navigate(routes.PAYMENT, {
              type: 'ADD'
            });
          }
        })
    };

    const headerProps = {
      rightIcon: 'plus',
      rightIconPress: () => {
        navigation.navigate(routes.PAYMENT, {
          type: 'ADD'
        });
      },
      title: t('header.payments'),
      route
    };

    const filterProps = {
      onSubmitFilter: handleSubmit(this.onSubmitFilter),
      ...paymentsFilterFields(this),
      clearFilter: this.props,
      onResetFilter: () => this.onResetFilter()
    };

    return (
      <MainLayout
        headerProps={headerProps}
        onSearch={this.onSearch}
        bottomDivider
        filterProps={filterProps}
      >
        <InfiniteScroll
          getItems={getPayments}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={PermissionService.isAllowToView(
            routes.MAIN_PAYMENTS
          )}
        >
          <ListView
            items={payments}
            onPress={this.onSelect}
            isEmpty={isEmpty}
            contentContainerStyle={{flex: 0}}
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
