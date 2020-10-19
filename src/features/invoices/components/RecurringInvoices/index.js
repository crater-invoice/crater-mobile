// @flow

import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '@/components';
import Due from '../Tab/Due';
import Draft from '../Tab/Draft';
import All from '../Tab/All';
import { goBack, MOUNT, ROUTES } from '@/navigation';
import {
    INVOICES_TABS,
    RECURRING_ADD,
    RECURRING_EDIT,
    RECURRING_INVOICES_FORM,
    TAB_NAME,
} from '../../constants';
import Lng from '@/lang/i18n';
import {invoicesFilterFields as filterFields } from '../Invoices/filterFields';

let params = {
    search: '',
    customer_id: '',
    invoice_number: '',
    from_date: '',
    to_date: '',
}

type IProps = {
    locale: String,
    navigation: Object,
    invoices: Object,
    customers: Object,
    loading: Boolean,
    handleSubmit: Function,
    getCustomers: Function,
}

export class RecurringInvoices extends React.Component<IProps> {
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
        };
    }

    componentDidMount() {
        const { navigation } = this.props
        this.getItems({ fresh: true, q: '', type: 'UNPAID' });
        goBack(MOUNT, navigation, { exit: true })
    }

    componentWillUpdate(nextProps, nextState) {

        const { navigation } = nextProps
        const isMailSend = navigation.getParam('mailSendMsg', null)

        isMailSend &&
            setTimeout(() => {
                navigation.setParams({ 'mailSendMsg': null })
            }, 2500);
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
        resetFilter = false
    } = {}) => {
        const { getRecurringInvoices } = this.props;
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

        getRecurringInvoices({
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
        this.props.dispatch(change(RECURRING_INVOICES_FORM, field, value));
    };

    onInvoiceSelect = (invoice) => {
        const { navigation } = this.props
        this.setActiveTab(INVOICES_TABS.ALL)
        this.onResetFilter(INVOICES_TABS.ALL)
        navigation.navigate(ROUTES.RECURRING_INVOICE,
            { id: invoice.id, type: RECURRING_EDIT }
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
        navigation.navigate(ROUTES.RECURRING_INVOICE, { type: RECURRING_ADD })
    }

    onChangeState = (field, value) => this.setState({ [field]: value })

    render() {
        const {
            locale,
            navigation,
            invoices,
            loading,
            handleSubmit,
            dueInvoices,
            draftInvoices,
            allInvoices,
        } = this.props;

        const {
            activeTab,
            refreshing,
            pagination: { lastPage, page },
            fresh,
            search,
            filter,
        } = this.state;

        const canLoadMore = lastPage >= page;

        let mailSendMsg = navigation.getParam('mailSendMsg', '')

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        leftIcon: "long-arrow-alt-left",
                        leftIconPress: () => navigation.navigate(ROUTES.MAIN_MORE),
                        title: Lng.t("header.recurringInvoice", { locale }),
                        placement: "center",
                        rightIcon: 'plus',
                        rightIconPress: () => this.onAddInvoice(),
                        titleStyle: styles.headerTitle,
                    }}
                    onSearch={this.onSearch}
                    filterProps={{
                        onSubmitFilter: handleSubmit(this.onSubmitFilter),
                        ...filterFields(this),
                        clearFilter: this.props,
                        locale,
                        onResetFilter: () => this.onResetFilter()
                    }}
                    toastProps={{
                        message: Lng.t(mailSendMsg, { locale }),
                        visible: mailSendMsg,
                        containerStyle: styles.toastContainer
                    }}
                >
                    <Tabs
                        style={styles.Tabs}
                        activeTab={activeTab}
                        setActiveTab={this.setActiveTab}
                        tabs={[
                            {
                                Title: INVOICES_TABS.DUE,
                                tabName: TAB_NAME(INVOICES_TABS.DUE, locale, Lng),
                                render: (
                                    <Due
                                        canLoadMore={canLoadMore}
                                        parentProps={this}
                                    />
                                ),
                            },
                            {
                                Title: INVOICES_TABS.DRAFT,
                                tabName: TAB_NAME(INVOICES_TABS.DRAFT, locale, Lng),
                                render: (
                                    <Draft
                                        canLoadMore={canLoadMore}
                                        parentProps={this}
                                    />
                                ),
                            },
                            {
                                Title: INVOICES_TABS.ALL,
                                tabName: TAB_NAME(INVOICES_TABS.ALL, locale, Lng),
                                render: (
                                    <All
                                        canLoadMore={canLoadMore}
                                        parentProps={this}
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
