import React from 'react';
import {change} from 'redux-form';
import {styles} from './styles';
import {All, Draft, Due} from '../Tab';
import {invoicesFilterFields as FilterFields} from './filterFields';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {AssetImage, MainLayout, Tabs} from '@/components';
import {IMAGES} from '@/assets';
import {INVOICES_TABS, INVOICE_SEARCH, TAB_NAME} from '../../constants';
import {isFilterApply} from '@/utils';
import InvoiceServices from '../../services';
import {openRatingReviewModal} from '@/utils';
import {PermissionService} from '@/services';

type IProps = {
  navigation: Object,
  invoices: Object,
  customers: Object,
  loading: Boolean,
  handleSubmit: Function,
  getCustomers: Function,
  formValues: any
};

export class Invoices extends React.Component<IProps> {
  constructor(props) {
    super(props);

    this.dueReference = React.createRef();
    this.draftReference = React.createRef();
    this.allReference = React.createRef();

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
    this.focusListener = navigation.addListener('focus', () => {
      const {ref} = this.getActiveTab();
      ref?.getItems?.();

      if (InvoiceServices.isEmailSent) {
        InvoiceServices.toggleIsEmailSent(false);
      }

      if (InvoiceServices.isFirstInvoiceCreated) {
        InvoiceServices.toggleIsFirstInvoiceCreated(false);
        openRatingReviewModal();
      }
    });
  };

  setActiveTab = activeTab => {
    this.setState({activeTab});
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(INVOICE_SEARCH, field, value));
  };

  onSelect = invoice => {
    const {navigation} = this.props;

    navigation.navigate(routes.INVOICE, {
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
    if (activeTab == INVOICES_TABS.DUE) {
      return {
        status: INVOICES_TABS.DUE,
        ref: this.dueReference
      };
    }

    if (activeTab == INVOICES_TABS.DRAFT) {
      return {
        status: 'DRAFT',
        ref: this.draftReference
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
    if (status === INVOICES_TABS.DUE) {
      return {
        activeTab: INVOICES_TABS.DUE,
        ref: this.dueReference
      };
    }

    if (status === INVOICES_TABS.DRAFT) {
      return {
        activeTab: INVOICES_TABS.DRAFT,
        ref: this.draftReference
      };
    }

    return {
      activeTab: INVOICES_TABS.ALL,
      ref: this.allReference
    };
  };

  onSubmitFilter = ({
    filterStatus = '',
    from_date = '',
    to_date = '',
    invoice_number = '',
    customer_id = ''
  }) => {
    const {search} = this.state;

    const {activeTab, ref} = this.changeTabBasedOnFilterStatusSelection(
      filterStatus
    );

    this.setState({activeTab});

    ref?.getItems?.({
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
    navigation.navigate(routes.INVOICE, {type: 'ADD'});
  };

  onChangeState = (field, value) => this.setState({[field]: value});

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
          buttonTitle: t('invoices.empty.buttonTitle'),
          buttonPress: () =>
            navigation.navigate(routes.INVOICE, {
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
      ...FilterFields(this),
      clearFilter: this.props,
      onResetFilter: () => this.onResetFilter()
    };

    const tabs = [
      {
        Title: INVOICES_TABS.DUE,
        tabName: TAB_NAME(INVOICES_TABS.DUE),
        render: (
          <Due
            parentProps={this}
            reference={ref => (this.dueReference = ref)}
          />
        )
      },
      {
        Title: INVOICES_TABS.DRAFT,
        tabName: TAB_NAME(INVOICES_TABS.DRAFT),
        render: (
          <Draft
            parentProps={this}
            reference={ref => (this.draftReference = ref)}
          />
        )
      },
      {
        Title: INVOICES_TABS.ALL,
        tabName: TAB_NAME(INVOICES_TABS.ALL),
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
