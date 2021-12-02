import React from 'react';
import {change} from 'redux-form';
import {
  MainLayout,
  ListView,
  InfiniteScroll,
  BaseEmptyPlaceholder
} from '@/components';
import t from 'locales/use-translation';
import {EXPENSES_FORM} from 'stores/expense/types';
import {routes} from '@/navigation';
import expensesFilter from './list-expenses-filter';
import {PermissionService} from '@/services';
import {isEmpty} from '@/constants';
import {IProps, IStates} from './list-expenses-type.d';
import {fetchExpenses} from 'stores/expense/actions';

export default class Expenses extends React.Component<IProps, IStates> {
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

  onSelect = expense => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_EXPENSE, {
      id: expense.id,
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
    this.props.dispatch(change(EXPENSES_FORM, field, value));
  };

  onResetFilter = () => {
    const {search} = this.state;
    this.scrollViewReference?.getItems?.({
      queryString: {search},
      resetQueryString: true,
      showLoader: true
    });
  };

  onSubmitFilter = value => {
    const {
      from_date = '',
      to_date = '',
      expense_category_id = '',
      customer_id = ''
    } = value;
    const {search} = this.state;

    this.scrollViewReference?.getItems?.({
      queryString: {
        expense_category_id,
        from_date,
        to_date,
        customer_id,
        search
      },
      showLoader: true
    });
  };

  onAddExpense = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_EXPENSE, {type: 'ADD'});
  };

  render() {
    const {expenses, handleSubmit, route, dispatch, navigation} = this.props;
    const {search} = this.state;

    const filterProps = {
      onSubmitFilter: handleSubmit(this.onSubmitFilter),
      ...expensesFilter(this),
      clearFilter: this.props,
      onResetFilter: () => this.onResetFilter()
    };

    return (
      <MainLayout
        headerProps={{title: t('header.expenses')}}
        onSearch={this.onSearch}
        bottomDivider
        filterProps={filterProps}
        with-input-filter
        with-company
        navigation={navigation}
        route={route}
        plusButtonOnPress={this.onAddExpense}
      >
        <InfiniteScroll
          getItems={q => dispatch(fetchExpenses(q))}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={PermissionService.isAllowToView(
            routes.MAIN_EXPENSES
          )}
        >
          <ListView
            items={expenses}
            onPress={this.onSelect}
            isEmpty={isEmpty(expenses)}
            contentContainerStyle={{flex: 1}}
            bottomDivider
            emptyPlaceholder={
              <BaseEmptyPlaceholder {...this.props} search={search} />
            }
            leftSubTitleStyle={{textAlign: 'justify'}}
            route={route}
            isAnimated
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
