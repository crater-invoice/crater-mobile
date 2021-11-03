import React from 'react';
import {change} from 'redux-form';
import {MainLayout, ListView, InfiniteScroll, AssetImage} from '@/components';
import t from 'locales/use-translation';
import {EXPENSE_SEARCH} from '../../constants';
import {routes} from '@/navigation';
import expenseFilterFields from './filterFields';
import {isFilterApply} from '@/utils';
import {PermissionService} from '@/services';

type IProps = {
  navigation: Object,
  getExpenses: () => void,
  expenses: Object
};

export class Expenses extends React.Component<IProps> {
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

  onSelect = ({id}) => {
    const {navigation} = this.props;
    navigation.navigate(routes.EXPENSE, {type: 'UPDATE', id});
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(EXPENSE_SEARCH, field, value));
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

  onSubmitFilter = ({from_date, to_date, expense_category_id, customer_id}) => {
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

  render() {
    const {search} = this.state;
    const {
      navigation,
      expenses,
      handleSubmit,
      getExpenses,
      formValues,
      route
    } = this.props;

    const isEmpty = expenses && expenses.length <= 0;
    const isFilter = isFilterApply(formValues);

    const emptyTitle = search
      ? 'search.no_result'
      : isFilter
      ? 'filter.empty.filter_title'
      : 'expenses.empty.title';

    const emptyContentProps = {
      title: t(emptyTitle, {search}),
      image: AssetImage.images.empty_expenses,
      ...(!search && {
        description: t('expenses.empty.description')
      }),
      ...(!search &&
        !isFilter && {
          buttonTitle: t('expenses.empty.button_title'),
          buttonPress: () => {
            navigation.navigate(routes.EXPENSE, {
              type: 'ADD'
            });
          }
        })
    };

    const headerProps = {
      rightIcon: 'plus',
      rightIconPress: () => {
        navigation.navigate(routes.EXPENSE, {
          type: 'ADD'
        });
      },
      title: t('header.expenses'),
      route
    };

    const filterProps = {
      onSubmitFilter: handleSubmit(this.onSubmitFilter),
      ...expenseFilterFields(this),
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
          getItems={getExpenses}
          reference={ref => (this.scrollViewReference = ref)}
          getItemsInMount={PermissionService.isAllowToView(
            routes.MAIN_EXPENSES
          )}
        >
          <ListView
            items={expenses}
            onPress={this.onSelect}
            isEmpty={isEmpty}
            contentContainerStyle={{flex: 1}}
            bottomDivider
            emptyContentProps={emptyContentProps}
            leftSubTitleStyle={{textAlign: 'justify'}}
            route={route}
            isAnimated
          />
        </InfiniteScroll>
      </MainLayout>
    );
  }
}
