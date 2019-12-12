// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '../../../../components';
import Sent from '../Tab/Sent';
import Draft from '../Tab/Draft';
import All from '../Tab/All';

import { ROUTES } from '../../../../navigation/routes';
import { ESTIMATES_TABS, ESTIMATE_ADD, ESTIMATE_EDIT, ESTIMATE_SEARCH, FILTER_ESTIMATE_STATUS, TAB_NAME } from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { IMAGES } from '../../../../config';

let params = {
    search: '',
    customer_id: '',
    estimate_number: '',
    from_date: '',
    to_date: '',
}


type IProps = {
    language: String,
    navigation: Object,
    estimates: Object,
    customers: Object,
    loading: Boolean,
    handleSubmit: Function,
    getCustomers: Function,
}
export class Estimates extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: ESTIMATES_TABS.DRAFT,
            refreshing: false,
            fresh: true,
            pagination: {
                page: 1,
                limit: 10,
                lastPage: 1,
            },
            search: '',
            filter: false,
            selectedFromDate: '',
            selectedToDate: '',
            selectedFromDateValue: '',
            selectedToDateValue: ''
        };
    }

    componentDidMount() {
        this.getItems({ fresh: true, q: '', type: 'DRAFT' });

        const { navigation } = this.props
        goBack(MOUNT, navigation, { route: ROUTES.MAIN_MORE })
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    setActiveTab = (activeTab) => {
        const { refreshing, search } = this.state;

        this.setState({ filter: false })

        if (!refreshing) {
            let type = this.getActiveTab(activeTab)

            this.getItems({ fresh: true, type, q: search });

            this.setState({ activeTab });
        }
    };


    getItems = ({
        fresh = false,
        onResult,
        type,
        params,
        q = '',
        resetFilter = false,
    } = {}) => {
        const { getEstimates } = this.props;
        const { refreshing, pagination } = this.state;

        if (refreshing) {
            return;
        }

        if (resetFilter)
            this.setState({ filter: false })

        this.setState({
            refreshing: true,
            fresh,
        });

        const paginationParams = fresh ? { ...pagination, page: 1 } : pagination;

        if (!fresh && paginationParams.lastPage < paginationParams.page) {
            return;
        }

        getEstimates({
            fresh,
            type,
            pagination: paginationParams,
            params: { ...params, search: q },
            onMeta: ({ last_page, current_page }) => {
                this.setState({
                    pagination: {
                        ...paginationParams,
                        lastPage: last_page,
                        page: current_page + 1,
                    },
                });
            },
            onResult: (val) => {
                this.setState({
                    refreshing: false,
                    fresh: !val,
                });
                onResult && onResult();
            },
        });
    };

    onEstimateSelect = (estimate) => {
        const { navigation } = this.props

        navigation.navigate(ROUTES.ESTIMATE, { id: estimate.id, type: ESTIMATE_EDIT })
        this.onResetFilter(ESTIMATES_TABS.ALL)
        this.setActiveTab(ESTIMATES_TABS.ALL)
    };

    onSearch = (search) => {
        const type = this.getActiveTab()
        this.setState({ search })
        this.getItems({ fresh: true, q: search, type })
    };

    getActiveTab = (activeTab = this.state.activeTab) => {
        let type = '';

        if (activeTab == ESTIMATES_TABS.SENT) {
            type = 'SENT';
        } else if (activeTab == ESTIMATES_TABS.DRAFT) {
            type = 'DRAFT';
        }
        return type
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(ESTIMATE_SEARCH, field, value));
    };

    onResetFilter = (tab = '') => {
        const { filter } = this.state

        this.setState({ filter: false })

        if (filter && !tab) {
            this.getItems({ fresh: true, q: '', type: this.getActiveTab() });
        }
    }

    onSubmitFilter = ({ filterStatus = '', from_date = '', to_date = '', estimate_number = '', customer_id = '' }) => {

        if (filterStatus || from_date || to_date || estimate_number || customer_id) {

            if (filterStatus === ESTIMATES_TABS.SENT)
                this.setState({ activeTab: ESTIMATES_TABS.SENT });
            else if (filterStatus === ESTIMATES_TABS.DRAFT)
                this.setState({ activeTab: ESTIMATES_TABS.DRAFT });
            else
                this.setState({ activeTab: ESTIMATES_TABS.ALL });

            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    estimate_number,
                    from_date,
                    to_date,
                },
                type: filterStatus,
            });

        }
        else
            this.onResetFilter()
    }

    loadMoreItems = ({ type, q }) => {
        const { filter } = this.state
        const {
            formValues: {
                filterStatus = '',
                from_date = '',
                to_date = '',
                estimate_number = '',
                customer_id = ''
            }
        } = this.props

        if (filter) {

            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    estimate_number,
                    from_date,
                    to_date,
                },
                type: filterStatus,
                filter: true
            })
        }
        else
            this.getItems({ type, q });
    }

    onAddEstimate = () => {
        const { navigation } = this.props
        this.setActiveTab(ESTIMATES_TABS.ALL)
        this.onResetFilter(ESTIMATES_TABS.ALL)
        navigation.navigate(ROUTES.ESTIMATE, { type: ESTIMATE_ADD })
    }

    render() {
        const {
            language,
            navigation,
            estimates,
            loading,
            handleSubmit,
            customers,
            getCustomers,
        } = this.props;

        const {
            activeTab,
            refreshing,
            pagination: { lastPage, page },
            fresh,
            search,
            selectedFromDate,
            selectedToDate,
            selectedFromDateValue,
            selectedToDateValue,
            filter
        } = this.state;

        const canLoadMore = lastPage >= page;

        let estimateItem = [];
        typeof estimates !== 'undefined' && (estimateItem = estimates);

        let selectFields = [
            {
                name: "customer_id",
                apiSearch: true,
                hasPagination: true,
                getItems: getCustomers,
                items: customers,
                displayName: "name",
                label: Lng.t("estimates.customer", { locale: language }),
                icon: 'user',
                placeholder: Lng.t("customers.placeholder", { locale: language }),
                navigation: navigation,
                compareField: "id",
                onSelect: (item) => this.setFormField('customer_id', item.id),
                headerProps: {
                    title: Lng.t("customers.title", { locale: language }),
                    rightIconPress: null
                },
                listViewProps: {
                    hasAvatar: true,
                },
                emptyContentProps: {
                    contentType: "customers",
                    image: IMAGES.EMPTY_CUSTOMERS,
                }
            }
        ]

        let datePickerFields = [
            {
                name: "from_date",
                label: Lng.t("estimates.fromDate", { locale: language }),
                onChangeCallback: (formDate, displayDate) => {
                    this.setState({
                        selectedFromDate: displayDate,
                        selectedFromDateValue: formDate
                    })
                },
                selectedDate: selectedFromDate,
                selectedDateValue: selectedFromDateValue
            },
            {
                name: "to_date",
                label: Lng.t("estimates.toDate", { locale: language }),
                onChangeCallback: (formDate, displayDate) => {
                    this.setState({
                        selectedToDate: displayDate,
                        selectedToDateValue: formDate
                    })
                },
                selectedDate: selectedToDate,
                selectedDateValue: selectedToDateValue
            }
        ]

        let inputFields = [{
            name: 'estimate_number',
            hint: Lng.t("estimates.estimateNumber", { locale: language }),
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true,
            }
        }]

        let dropdownFields = [{
            name: "filterStatus",
            label: Lng.t("estimates.status", { locale: language }),
            fieldIcon: 'align-center',
            items: FILTER_ESTIMATE_STATUS,
            onChangeCallback: (val) => {
                this.setFormField('filterStatus', val)
            },
            defaultPickerOptions: {
                label: Lng.t("estimates.statusPlaceholder", { locale: language }),
                value: '',
            },
            containerStyle: styles.selectPicker
        }]

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        title: Lng.t("header.estimates", { locale: language }),
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.MAIN_MORE),
                        title: Lng.t("header.estimates", { locale: language }),
                        titleStyle: styles.headerTitle,
                        placement: "center",
                        rightIcon: "plus",
                        rightIconPress: () => {
                            this.onAddEstimate()
                        },
                    }}
                    onSearch={this.onSearch}
                    filterProps={{
                        onSubmitFilter: handleSubmit(this.onSubmitFilter),
                        selectFields: selectFields,
                        datePickerFields: datePickerFields,
                        inputFields: inputFields,
                        dropdownFields: dropdownFields,
                        clearFilter: this.props,
                        onResetFilter: () => this.onResetFilter()
                    }}
                >
                    <Tabs
                        style={styles.Tabs}
                        activeTab={activeTab}
                        setActiveTab={this.setActiveTab}
                        tabs={[
                            {
                                Title: ESTIMATES_TABS.DRAFT,
                                tabName: TAB_NAME(ESTIMATES_TABS.DRAFT, language, Lng),
                                render: (
                                    <Draft
                                        estimates={estimateItem}
                                        getEstimates={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onEstimateSelect={this.onEstimateSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddEstimate={this.onAddEstimate}
                                        fresh={fresh}
                                        filter={filter}
                                    />
                                ),
                            },
                            {
                                Title: ESTIMATES_TABS.SENT,
                                tabName: TAB_NAME(ESTIMATES_TABS.SENT, language, Lng),
                                render: (
                                    <Sent
                                        estimates={estimateItem}
                                        getEstimates={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onEstimateSelect={this.onEstimateSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddEstimate={this.onAddEstimate}
                                        filter={filter}
                                    />
                                ),
                            },
                            {
                                Title: ESTIMATES_TABS.ALL,
                                tabName: TAB_NAME(ESTIMATES_TABS.ALL, language, Lng),
                                render: (
                                    <All
                                        estimates={estimateItem}
                                        getEstimates={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onEstimateSelect={this.onEstimateSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddEstimate={this.onAddEstimate}
                                        filter={filter}
                                    />
                                ),
                            },
                        ]}
                    />
                </MainLayout>
            </View>
        );
    }
}
