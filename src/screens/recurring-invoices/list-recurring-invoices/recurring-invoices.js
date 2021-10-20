import React from 'react';
import {change} from 'redux-form';
import {styles} from './recurring-invoices-styles';
import {All, OnHold, Active} from './Tab';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {AssetImage, MainLayout, Tabs} from '@/components';
import {ARROW_ICON} from '@/assets';
import {
  RECURRING_INVOICES_TABS,
  TAB_NAME
} from 'stores/recurring-invoices/types';
import {isFilterApply} from '@/utils';
import {IProps, IStates} from './recurring-invoices-type';
import {recurringInvoicesFilterFields} from './filterFields';

export default class RecurringInvoices extends React.Component<
  IProps,
  IStates
> {
  constructor(props) {
    super(props);

    this.activeReference = React.createRef();
    this.onHoldReference = React.createRef();
    this.allReference = React.createRef();
    this.toastReference = React.createRef();

    this.state = {
      activeTab: RECURRING_INVOICES_TABS.ACTIVE,
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
      const {ref} = this.getActiveTab();
      ref?.getItems?.();
    });
  };

  setActiveTab = activeTab => {
    this.setState({activeTab});
  };

  onSelect = invoice => {
    const {navigation} = this.props;

    navigation.navigate(routes.VIEW_RECURRING_INVOICE, {
      id: invoice?.id,
      type: 'UPDATE'
    });
  };

  onSearch = search => {
    const {status, ref} = this.getActiveTab();

    this.setState({search});

    ref?.getItems?.({
      queryString: {status, search},
      showLoader: true
    });
  };

  getActiveTab = (activeTab = this.state.activeTab) => {
    if (activeTab == RECURRING_INVOICES_TABS.ACTIVE) {
      return {
        status: RECURRING_INVOICES_TABS.ACTIVE,
        ref: this.activeReference
      };
    }

    if (activeTab == RECURRING_INVOICES_TABS.ON_HOLD) {
      return {
        status: RECURRING_INVOICES_TABS.ON_HOLD,
        ref: this.onHoldReference
      };
    }

    return {
      status: '',
      ref: this.allReference
    };
  };

  onResetFilter = () => {
    const {search} = this.state;
    const {status, ref} = this.getActiveTab();

    ref?.getItems?.({
      queryString: {status, search},
      resetQueryString: true,
      resetParams: true,
      showLoader: true
    });
  };

  changeTabBasedOnFilterStatusSelection = status => {
    if (status === RECURRING_INVOICES_TABS.ACTIVE) {
      return {
        activeTab: RECURRING_INVOICES_TABS.ACTIVE,
        ref: this.activeReference
      };
    }

    if (status === RECURRING_INVOICES_TABS.ON_HOLD) {
      return {
        activeTab: RECURRING_INVOICES_TABS.ON_HOLD,
        ref: this.onHoldReference
      };
    }

    return {
      activeTab: RECURRING_INVOICES_TABS.ALL,
      ref: this.allReference
    };
  };

  onSubmitFilter = ({
    filterStatus = '',
    from_date = '',
    to_date = '',
    customer_id = ''
  }) => {
    const {search} = this.state;

    const {activeTab, ref} = this.changeTabBasedOnFilterStatusSelection(
      filterStatus
    );

    this.setState({activeTab});

    ref?.getItems?.({
      queryString: {
        filterStatus,
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
      ? 'search.noResult'
      : isFilter
      ? 'filter.empty.filterTitle'
      : title;

    return {
      title: t(emptyTitle, {search}),
      image: AssetImage.images[(theme?.mode)]?.empty_invoices,
      ...(!search && {
        description: t(description)
      }),
      ...(!search &&
        !isFilter && {
          buttonTitle: t('recurring_invoices.empty.buttonTitle'),
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

    const headerProps = {
      title: t('header.recurring_invoices'),
      leftIcon: ARROW_ICON,
      leftIconPress: () => navigation.navigate(routes.MAIN_MORE),
      placement: 'center',
      route,
      rightIcon: 'plus',
      rightIconPress: this.onAddInvoice
    };

    const filterProps = {
      onSubmitFilter: handleSubmit(this.onSubmitFilter),
      ...recurringInvoicesFilterFields(this),
      clearFilter: this.props,
      onResetFilter: () => this.onResetFilter()
    };

    const tabs = [
      {
        Title: RECURRING_INVOICES_TABS.ACTIVE,
        tabName: TAB_NAME.active,
        render: (
          <Active
            parentProps={this}
            reference={ref => (this.activeReference = ref)}
          />
        )
      },
      {
        Title: RECURRING_INVOICES_TABS.ON_HOLD,
        tabName: TAB_NAME.on_hold,
        render: (
          <OnHold
            parentProps={this}
            reference={ref => (this.onHoldReference = ref)}
          />
        )
      },
      {
        Title: RECURRING_INVOICES_TABS.ALL,
        tabName: TAB_NAME.all,
        render: (
          <All
            parentProps={this}
            reference={ref => (this.allReference = ref)}
          />
        )
      }
    ];

    return (
      <MainLayout
        headerProps={headerProps}
        onSearch={this.onSearch}
        filterProps={filterProps}
        toastProps={{
          reference: ref => (this.toastReference = ref)
        }}
        navigation={navigation}
      >
        <Tabs
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
