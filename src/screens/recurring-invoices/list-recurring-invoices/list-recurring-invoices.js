import React from 'react';
import {styles} from './list-recurring-invoices-styles';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {AssetImage, MainLayout, BaseTabs} from '@/components';
import {
  RECURRING_INVOICES_FORM,
  RECURRING_INVOICES_TABS,
  TAB_NAME
} from 'stores/recurring-invoice/types';
import {isFilterApply, primaryHeader} from '@/utils';
import {IProps, IStates} from './list-recurring-invoices-type.d';
import {recurringInvoicesFilterFields} from './list-recurring-invoices-filters';
import {Tab} from './list-recurring-invoices-tab';
import {change} from 'redux-form';
import {recurringTabRefs as tabRefs} from 'stores/common/helpers';

export default class RecurringInvoices extends React.Component<
  IProps,
  IStates
> {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: RECURRING_INVOICES_TABS.ALL,
      search: ''
    };
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
      tabRefs?.getItems?.();
    });
    this.setActiveTab();
  };

  setActiveTab = (activeTab = RECURRING_INVOICES_TABS.ALL) => {
    this.setState({activeTab});
    const {search} = this.state;
    const {formValues} = this.props;
    const queryString = {
      status: activeTab !== 'ALL' ? activeTab : '',
      search,
      ...formValues
    };

    tabRefs?.getItems?.({queryString, showLoader: true, hideLoader: true});
  };

  onSelect = invoice => {
    const {navigation} = this.props;

    navigation.navigate(routes.VIEW_RECURRING_INVOICE, {
      id: invoice?.id,
      type: 'UPDATE'
    });
  };

  onSearch = search => {
    const {activeTab} = this.state;
    this.setState({search});
    tabRefs?.getItems?.({
      queryString: {status: activeTab !== 'ALL' ? activeTab : '', search},
      showLoader: true
    });
  };

  setFormField = (field, value) => {
    const {dispatch} = this.props;
    dispatch(change(RECURRING_INVOICES_FORM, field, value));
  };

  onResetFilter = () => {
    const {search, activeTab} = this.state;

    tabRefs?.getItems?.({
      queryString: {status: activeTab !== 'ALL' ? activeTab : '', search},
      resetQueryString: true,
      resetParams: true,
      showLoader: true
    });
  };

  changeTabOnFilter = (activeTab = this.state.activeTab) => {
    if (activeTab === RECURRING_INVOICES_TABS.ACTIVE) {
      this.setActiveTab(RECURRING_INVOICES_TABS.ACTIVE);
    } else if (activeTab === RECURRING_INVOICES_TABS.ON_HOLD) {
      this.setActiveTab(RECURRING_INVOICES_TABS.ON_HOLD);
    } else {
      this.setActiveTab(RECURRING_INVOICES_TABS.ALL);
    }
  };

  onSubmitFilter = ({
    filterStatus = '',
    from_date = '',
    to_date = '',
    customer_id = ''
  }) => {
    const {search} = this.state;
    this.changeTabOnFilter(filterStatus);
    tabRefs?.getItems?.({
      queryString: {
        status: filterStatus,
        search,
        customer_id,
        from_date,
        to_date
      },
      showLoader: true
    });
  };

  onAddInvoice = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_RECURRING_INVOICE, {type: 'ADD'});
  };

  getEmptyContentProps = activeTab => {
    const {navigation, formValues, theme} = this.props;
    const {search} = this.state;
    const isFilter = isFilterApply(formValues);
    let title = '';
    let description = '';

    if (activeTab === RECURRING_INVOICES_TABS.ACTIVE) {
      title = 'recurring_invoices.empty.active.title';
      description = 'recurring_invoices.empty.active.description';
    } else if (activeTab === RECURRING_INVOICES_TABS.ON_HOLD) {
      title = 'recurring_invoices.empty.on_hold.title';
      description = 'recurring_invoices.empty.on_hold.description';
    } else {
      title = 'recurring_invoices.empty.all.title';
      description = 'recurring_invoices.empty.description';
    }

    const emptyTitle = search
      ? 'search.no_result'
      : isFilter
      ? 'filter.empty.filter_title'
      : title;

    return {
      title: t(emptyTitle, {search}),
      image: AssetImage.images[(theme?.mode)]?.empty_invoices,
      ...(!search && {
        description: t(description)
      }),
      ...(!search &&
        !isFilter && {
          buttonTitle: t('recurring_invoices.empty.button_title'),
          buttonPress: () =>
            navigation.navigate(routes.CREATE_RECURRING_INVOICE, {
              type: 'ADD'
            })
        })
    };
  };

  render() {
    const {navigation, handleSubmit, theme, route} = this.props;
    const {activeTab} = this.state;

    const filterProps = {
      onSubmitFilter: handleSubmit(this.onSubmitFilter),
      ...recurringInvoicesFilterFields(this),
      clearFilter: this.props,
      onResetFilter: () => this.onResetFilter()
    };

    const tabs = [
      {
        Title: RECURRING_INVOICES_TABS.ALL,
        tabName: TAB_NAME.all,
        render: <Tab parentProps={this} />
      },
      {
        Title: RECURRING_INVOICES_TABS.ACTIVE,
        tabName: TAB_NAME.active,
        render: <Tab parentProps={this} />
      },
      {
        Title: RECURRING_INVOICES_TABS.ON_HOLD,
        tabName: TAB_NAME.on_hold,
        render: <Tab parentProps={this} />
      }
    ];

    return (
      <MainLayout
        headerProps={primaryHeader({route})}
        onSearch={this.onSearch}
        filterProps={filterProps}
        navigation={navigation}
      >
        <BaseTabs
          style={styles.tabs(theme)}
          activeTab={activeTab}
          setActiveTab={this.setActiveTab}
          tabs={tabs}
          theme={theme}
        />
      </MainLayout>
    );
  }
}
