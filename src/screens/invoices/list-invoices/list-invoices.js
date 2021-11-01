import React from 'react';
import {change} from 'redux-form';
import {styles} from './list-invoices-styles';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {AssetImage, MainLayout, Tabs} from '@/components';
import {INVOICES_TABS, INVOICES_FORM, TAB_NAME} from 'stores/invoices/types';
import {isFilterApply} from '@/utils';
import {InvoiceServices} from 'stores/invoices/service';
import {openRatingReviewModal} from '@/utils';
import {PermissionService} from '@/services';
import {IProps, IStates} from './list-invoices-type';
import {invoicesFilterFields} from './list-invoices-filters';
import {Tab} from './list-invoices-tab';
import {tabRefs} from 'stores/common/helpers';

export default class Invoices extends React.Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: INVOICES_TABS.DUE,
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
    this.setActiveTab();
    this.focusListener = navigation.addListener('focus', () => {
      if (InvoiceServices.isFirstInvoiceCreated) {
        InvoiceServices.toggleIsFirstInvoiceCreated(false);
        openRatingReviewModal();
      }
    });
  };

  setActiveTab = (activeTab = INVOICES_TABS.DUE) => {
    this.setState({activeTab});
    const {search} = this.state;
    const {formValues} = this.props;
    const queryString = {
      status: activeTab !== 'ALL' ? activeTab : '',
      search,
      ...formValues
    };

    tabRefs?.getItems?.({
      queryString,
      showLoader: true
    });
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(INVOICES_FORM, field, value));
  };

  onSelect = invoice => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_INVOICE, {
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
    if (activeTab === INVOICES_TABS.DUE) {
      this.setActiveTab(INVOICES_TABS.DUE);
    } else if (activeTab === INVOICES_TABS.DRAFT) {
      this.setActiveTab(INVOICES_TABS.DRAFT);
    } else {
      this.setActiveTab(INVOICES_TABS.ALL);
    }
  };

  onSubmitFilter = ({
    filterStatus = '',
    from_date = '',
    to_date = '',
    invoice_number = '',
    customer_id = ''
  }) => {
    const {search} = this.state;
    this.changeTabOnFilter(filterStatus);
    tabRefs?.getItems?.({
      queryString: {
        status: filterStatus,
        search,
        customer_id,
        invoice_number,
        from_date,
        to_date
      },
      showLoader: true
    });
  };

  onAddInvoice = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_INVOICE, {type: 'ADD'});
  };

  getEmptyContentProps = activeTab => {
    const {navigation, formValues, theme} = this.props;
    const {search} = this.state;
    const isFilter = isFilterApply(formValues);
    let title = '';
    let description = '';

    if (activeTab === INVOICES_TABS.DUE) {
      title = 'invoices.empty.due.title';
      description = 'invoices.empty.due.description';
    } else if (activeTab === INVOICES_TABS.DRAFT) {
      title = 'invoices.empty.draft.title';
      description = 'invoices.empty.draft.description';
    } else {
      title = 'invoices.empty.all.title';
      description = 'invoices.empty.description';
    }

    const emptyTitle = search
      ? 'search.noResult'
      : isFilter
      ? 'filter.empty.filterTitle'
      : title;

    return {
      title: t(emptyTitle, {search}),
      image: AssetImage.images[(theme?.mode)].empty_invoices,
      ...(!search && {
        description: t(description)
      }),
      ...(!search &&
        !isFilter && {
          buttonTitle: t('invoices.empty.button_title'),
          buttonPress: () =>
            navigation.navigate(routes.CREATE_INVOICE, {
              type: 'ADD'
            })
        })
    };
  };

  render() {
    const {navigation, handleSubmit, theme} = this.props;
    const {activeTab} = this.state;

    const headerProps = {
      hasCircle: false,
      title: t('header.invoices')
    };

    const filterProps = {
      onSubmitFilter: handleSubmit(this.onSubmitFilter),
      ...invoicesFilterFields(this),
      clearFilter: this.props,
      onResetFilter: () => this.onResetFilter()
    };

    const tabs = [
      {
        Title: INVOICES_TABS.DUE,
        tabName: TAB_NAME.due,
        render: <Tab parentProps={this} />
      },
      {
        Title: INVOICES_TABS.DRAFT,
        tabName: TAB_NAME.draft,
        render: <Tab parentProps={this} />
      },
      {
        Title: INVOICES_TABS.ALL,
        tabName: TAB_NAME.all,
        render: <Tab parentProps={this} />
      }
    ];

    return (
      <MainLayout
        headerProps={headerProps}
        onSearch={this.onSearch}
        filterProps={filterProps}
        with-input-filter
        navigation={navigation}
        {...(PermissionService.isAllowToCreate(routes.MAIN_INVOICES) && {
          plusButtonOnPress: this.onAddInvoice
        })}
        {...(PermissionService.isSuperAdmin() && {'with-company': true})}
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
