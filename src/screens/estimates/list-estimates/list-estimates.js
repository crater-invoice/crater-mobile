import React from 'react';
import {change} from 'redux-form';
import styles from './list-estimates-styles';
import {BaseTabs, MainLayout, AssetImage} from '@/components';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import estimateFilterFields from './list-estimates-filters';
import {isFilterApply} from '@/utils';
import {ARROW_ICON} from '@/assets';
import {ESTIMATES_TABS, ESTIMATES_FORM, TAB_NAME} from 'stores/estimate/types';
import {IProps, IStates} from './list-estimates-type.d';
import {Tab} from './list-estimates-tab';
import {estimatesTabRefs as tabRefs} from 'stores/common/helpers';

export default class Estimates extends React.Component<IProps, IStates> {
  focusListener: any;

  constructor(props) {
    super(props);
    this.state = {
      activeTab: ESTIMATES_TABS.ALL,
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
      tabRefs?.getItems?.();
    });
  };

  setActiveTab = (activeTab = ESTIMATES_TABS.ALL) => {
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

  onSelect = estimate => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_ESTIMATE, {
      id: estimate.id,
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
    this.props.dispatch(change(ESTIMATES_FORM, field, value));
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
    if (activeTab === ESTIMATES_TABS.DRAFT) {
      this.setActiveTab(ESTIMATES_TABS.DRAFT);
    } else if (activeTab === ESTIMATES_TABS.SENT) {
      this.setActiveTab(ESTIMATES_TABS.SENT);
    } else {
      this.setActiveTab(ESTIMATES_TABS.ALL);
    }
  };

  onSubmitFilter = ({
    filterStatus = '',
    from_date = '',
    to_date = '',
    estimate_number = '',
    customer_id = ''
  }) => {
    const {search} = this.state;
    this.changeTabOnFilter(filterStatus);
    tabRefs?.getItems?.({
      queryString: {
        status: filterStatus,
        search,
        customer_id,
        estimate_number,
        from_date,
        to_date
      },
      showLoader: true
    });
  };

  onAddEstimate = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_ESTIMATE, {type: 'ADD'});
  };

  getEmptyContentProps = activeTab => {
    const {formValues} = this.props;
    const {search} = this.state;
    const isFilter = isFilterApply(formValues);
    let type = '';

    if (activeTab === ESTIMATES_TABS.DRAFT) {
      type = 'draft';
    } else if (activeTab === ESTIMATES_TABS.SENT) {
      type = 'sent';
    } else {
      type = 'all';
    }

    const emptyTitle = search
      ? 'search.no_result'
      : isFilter
      ? 'filter.empty.filter_title'
      : `estimates.empty.${type}.title`;

    return {
      title: t(emptyTitle, {search}),
      image: AssetImage.images.empty_estimates,
      ...(!search && {
        description: t(`estimates.empty.${type}.description`)
      }),
      ...(!search &&
        !isFilter && {
          buttonTitle: t('estimates.empty.button_title'),
          buttonPress: () => this.onAddEstimate()
        })
    };
  };

  render() {
    const {navigation, handleSubmit, theme, route} = this.props;
    const {activeTab} = this.state;

    const headerProps = {
      title: t('header.estimates'),
      leftIcon: ARROW_ICON,
      leftIconPress: () => navigation.navigate(routes.MAIN_MORE),
      placement: 'center',
      rightIcon: 'plus',
      route,
      rightIconPress: () => {
        this.onAddEstimate();
      }
    };

    const filterProps = {
      onSubmitFilter: handleSubmit(this.onSubmitFilter),
      ...estimateFilterFields(this),
      clearFilter: this.props,
      onResetFilter: () => this.onResetFilter()
    };

    const tabs = [
      {
        Title: ESTIMATES_TABS.ALL,
        tabName: TAB_NAME.ALL,
        render: <Tab parentProps={this} />
      },
      {
        Title: ESTIMATES_TABS.DRAFT,
        tabName: TAB_NAME.DRAFT,
        render: <Tab parentProps={this} />
      },
      {
        Title: ESTIMATES_TABS.SENT,
        tabName: TAB_NAME.SENT,
        render: <Tab parentProps={this} />
      }
    ];

    return (
      <MainLayout
        headerProps={headerProps}
        onSearch={this.onSearch}
        filterProps={filterProps}
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
