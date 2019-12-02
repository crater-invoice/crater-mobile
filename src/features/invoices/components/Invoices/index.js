// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '../../../../components';
import Due from '../Tab/Due';
import Draft from '../Tab/Draft';
import All from '../Tab/All';

import { ROUTES } from '../../../../navigation/routes';
import {
    INVOICES_TABS,
    INVOICE_ADD,
    INVOICE_EDIT,
    INVOICE_SEARCH,
    FILTER_INVOICE_STATUS,
    TAB_NAME,
    FILTER_INVOICE_PAID_STATUS,
} from '../../constants';
import Lng from '../../../../api/lang/i18n';
import { IMAGES } from '../../../../config';
import { goBack, MOUNT } from '../../../../navigation/actions';

let params = {
    search: '',
    customer_id: '',
    invoice_number: '',
    from_date: '',
    to_date: '',
}

type IProps = {
    language: String,
    navigation: Object,
    invoices: Object,
    customers: Object,
    loading: Boolean,
    handleSubmit: Function,
    getCustomers: Function,
}

export class Invoices extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: INVOICES_TABS.DUE,
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
        const { navigation } = this.props
        this.getItems({ fresh: true, q: '', type: 'UNPAID' });
        goBack(MOUNT, navigation, { exit: true })
    }

    setActiveTab = (activeTab) => {
        const { refreshing, search } = this.state;

        this.setState({ filter: false })

        if (!refreshing) {
            let type = this.getActiveTab(activeTab)

            this.getItems({ fresh: true, type, q: search });

            this.setState({ activeTab });

            this.props.setInvoiceActiveTab({ activeTab: type })
        }
    };

    getItems = ({
        fresh = false,
        onResult,
        type,
        params,
        q = '',
        resetFilter = false
    } = {}) => {
        const { getInvoices } = this.props;
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

        getInvoices({
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

    setFormField = (field, value) => {
        this.props.dispatch(change(INVOICE_SEARCH, field, value));
    };

    onInvoiceSelect = (invoice) => {
        const { navigation } = this.props
        this.setActiveTab(INVOICES_TABS.ALL)
        this.onResetFilter(INVOICES_TABS.ALL)
        navigation.navigate(ROUTES.INVOICE,
            { id: invoice.id, type: INVOICE_EDIT }
        )
    };

    onSearch = (search) => {
        const type = this.getActiveTab()
        this.setState({ search })
        this.getItems({ fresh: true, type, q: search })
    };

    getActiveTab = (activeTab = this.state.activeTab) => {
        let type = '';

        if (activeTab == INVOICES_TABS.DUE) {
            type = 'UNPAID';
        } else if (activeTab == INVOICES_TABS.DRAFT) {
            type = 'DRAFT';
        }
        return type
    }


    getFilterStatusType = (filterType) => {
        let type = filterType
        if (type === INVOICES_TABS.DUE)
            type = 'UNPAID'
        return type
    }


    onResetFilter = (tab = '') => {
        const { filter } = this.state

        this.setState({ filter: false })

        if (filter && !tab) {
            this.getItems({ fresh: true, q: '', type: this.getActiveTab() });
        }
    }

    onSubmitFilter = ({ filterStatus = '', paid_status = '', from_date = '', to_date = '', invoice_number = '', customer_id = '' }) => {

        if (filterStatus || paid_status || from_date || to_date || invoice_number || customer_id) {

            if (filterStatus === INVOICES_TABS.DUE)
                this.setState({ activeTab: INVOICES_TABS.DUE });
            else if (filterStatus === INVOICES_TABS.DRAFT)
                this.setState({ activeTab: INVOICES_TABS.DRAFT });
            else
                this.setState({ activeTab: INVOICES_TABS.ALL });

            this.setState({ filter: true })


            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    invoice_number,
                    from_date,
                    to_date
                },
                type: filterStatus ? this.getFilterStatusType(filterStatus) : paid_status,
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
                paid_status = '',
                from_date = '',
                to_date = '',
                invoice_number = '',
                customer_id = ''
            }
        } = this.props

        if (filter) {

            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    invoice_number,
                    from_date,
                    to_date
                },
                type: filterStatus ? this.getFilterStatusType(filterStatus) : paid_status,
                filter: true
            })
        }
        else
            this.getItems({ type, q });
    }

    onAddInvoice = () => {
        const { navigation } = this.props
        this.setActiveTab(INVOICES_TABS.ALL)
        this.onResetFilter(INVOICES_TABS.ALL)
        navigation.navigate(ROUTES.INVOICE, { type: INVOICE_ADD })
    }

    render() {
        const {
            language,
            navigation,
            invoices,
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

        let filterRefs = {}

        let selectFields = [
            {
                name: "customer_id",
                apiSearch: true,
                hasPagination: true,
                getItems: getCustomers,
                items: customers,
                displayName: "name",
                label: Lng.t("invoices.customer", { locale: language }),
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
                label: Lng.t("invoices.fromDate", { locale: language }),
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
                label: Lng.t("invoices.toDate", { locale: language }),
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
            name: 'invoice_number',
            hint: Lng.t("invoices.invoiceNumber", { locale: language }),
            leftIcon: 'hashtag',
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true,
            },
            refLinkFn: (ref) => {
                filterRefs.invNumber = ref;
            }
        }]

        let dropdownFields = [
            {
                name: "filterStatus",
                label: Lng.t("invoices.status", { locale: language }),
                fieldIcon: 'align-center',
                items: FILTER_INVOICE_STATUS,
                onChangeCallback: (val) => {
                    this.setFormField('filterStatus', val)
                },
                defaultPickerOptions: {
                    label: Lng.t("invoices.statusPlaceholder", { locale: language }),
                    value: '',
                },
                containerStyle: styles.selectPicker
            },
            {
                name: "paid_status",
                label: Lng.t("invoices.paidStatus", { locale: language }),
                fieldIcon: 'align-center',
                items: FILTER_INVOICE_PAID_STATUS,
                onChangeCallback: (val) => {
                    this.setFormField('paid_status', val)
                },
                defaultPickerOptions: {
                    label: Lng.t("invoices.paidStatusPlaceholder", { locale: language }),
                    value: '',
                },
                onDonePress: () => filterRefs.invNumber.focus(),
                containerStyle: styles.selectPicker
            }
        ]

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        rightIcon: 'plus',
                        rightIconPress: () => {
                            this.onAddInvoice()
                        },
                        title: Lng.t("header.invoices", { locale: language }),
                    }}
                    onSearch={this.onSearch}
                    filterProps={{
                        onSubmitFilter: handleSubmit(this.onSubmitFilter),
                        selectFields: selectFields,
                        datePickerFields: datePickerFields,
                        inputFields: inputFields,
                        dropdownFields: dropdownFields,
                        clearFilter: this.props,
                        language: language,
                        onResetFilter: () => this.onResetFilter()
                    }}
                >
                    <Tabs
                        style={styles.Tabs}
                        activeTab={activeTab}
                        setActiveTab={this.setActiveTab}
                        tabs={[
                            {
                                Title: INVOICES_TABS.DUE,
                                tabName: TAB_NAME(INVOICES_TABS.DUE, language, Lng),
                                render: (
                                    <Due
                                        invoices={invoices}
                                        getInvoices={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onInvoiceSelect={this.onInvoiceSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddInvoice={this.onAddInvoice}
                                        filter={filter}
                                    />
                                ),
                            },
                            {
                                Title: INVOICES_TABS.DRAFT,
                                tabName: TAB_NAME(INVOICES_TABS.DRAFT, language, Lng),
                                render: (
                                    <Draft
                                        invoices={invoices}
                                        getInvoices={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onInvoiceSelect={this.onInvoiceSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddInvoice={this.onAddInvoice}
                                        fresh={fresh}
                                        filter={filter}
                                    />
                                ),
                            },
                            {
                                Title: INVOICES_TABS.ALL,
                                tabName: TAB_NAME(INVOICES_TABS.ALL, language, Lng),
                                render: (
                                    <All
                                        invoices={invoices}
                                        getInvoices={this.getItems}
                                        canLoadMore={canLoadMore}
                                        onInvoiceSelect={this.onInvoiceSelect}
                                        loading={loading}
                                        refreshing={refreshing}
                                        fresh={fresh}
                                        search={search}
                                        navigation={navigation}
                                        language={language}
                                        loadMoreItems={this.loadMoreItems}
                                        onAddInvoice={this.onAddInvoice}
                                        filter={filter}
                                    />
                                ),
                            },
                        ]}
                    />
                </MainLayout>
            </View >
        );
    }
}
