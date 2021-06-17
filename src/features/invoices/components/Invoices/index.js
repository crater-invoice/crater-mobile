// @flow

import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import { styles, Container } from './styles';
import { All, Draft, Due } from '../Tab';
import { invoicesFilterFields as FilterFields } from './filterFields';
import { goBack, MOUNT } from '@/navigation';
import Lng from '@/lang/i18n';
import { ROUTES } from '@/navigation';
import { MainLayout, Tabs } from '@/components';
import { IMAGES } from '@/assets';
import {
    getFilterStatusType,
    INVOICES_TABS,
    INVOICE_ADD,
    INVOICE_EDIT,
    INVOICE_SEARCH,
    TAB_NAME
} from '../../constants';
import { isFilterApply } from '@/utils';
import InvoiceServices from '../../services';
import { openRatingReviewModal } from '@/utils';

type IProps = {
    locale: String,
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
        this.toastReference = React.createRef();

        this.state = {
            activeTab: INVOICES_TABS.DUE,
            search: ''
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation, { exit: true });
        this.onFocus();
    }

    componentWillUnmount() {
        this.focusListener?.remove?.();
    }

    onFocus = () => {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            const { ref } = this.getActiveTab();
            ref?.getItems?.();

            if (InvoiceServices.isEmailSent) {
                InvoiceServices.toggleIsEmailSent(false);
                this.toastReference?.show?.('toast.send_invoice_successfully');
            }

            if (InvoiceServices.isFirstInvoiceCreated) {
                InvoiceServices.toggleIsFirstInvoiceCreated(false);
                openRatingReviewModal();
            }
        });
    };

    setActiveTab = activeTab => {
        this.setState({ activeTab });
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(INVOICE_SEARCH, field, value));
    };

    onSelect = invoice => {
        const { navigation } = this.props;

        navigation.navigate(ROUTES.INVOICE, {
            id: invoice?.id,
            type: INVOICE_EDIT
        });
    };

    onSearch = search => {
        const { status, ref } = this.getActiveTab();

        this.setState({ search });

        ref?.getItems?.({
            queryString: { status, search },
            showLoader: true
        });
    };

    getActiveTab = (activeTab = this.state.activeTab) => {
        if (activeTab == INVOICES_TABS.DUE) {
            return {
                status: 'UNPAID',
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
        const { search } = this.state;
        const { status, ref } = this.getActiveTab();

        ref?.getItems?.({
            queryString: { status, search },
            resetQueryString: true,
            resetParams: true,
            showLoader: true
        });
    };

    changeTabBasedOnFilterStatusSelection = (status, paid_status) => {
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
        paid_status = '',
        from_date = '',
        to_date = '',
        invoice_number = '',
        customer_id = ''
    }) => {
        const { search } = this.state;

        const status = filterStatus
            ? getFilterStatusType(filterStatus)
            : paid_status;

        const { activeTab, ref } = this.changeTabBasedOnFilterStatusSelection(
            filterStatus,
            paid_status
        );

        this.setState({ activeTab });

        ref?.getItems?.({
            queryString: {
                status,
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
        const { navigation } = this.props;
        navigation.navigate(ROUTES.INVOICE, { type: INVOICE_ADD });
    };

    onChangeState = (field, value) => this.setState({ [field]: value });

    getEmptyContentProps = activeTab => {
        const { locale, navigation, formValues,theme } = this.props;
        const { search } = this.state;
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
            title: Lng.t(emptyTitle, { locale, search }),
            image: IMAGES[theme?.mode]?.EMPTY_INVOICES,
            ...(!search && {
                description: Lng.t(description, { locale })
            }),
            ...(!search &&
                !isFilter && {
                    buttonTitle: Lng.t('invoices.empty.buttonTitle', {
                        locale
                    }),
                    buttonPress: () =>
                        navigation.navigate(ROUTES.INVOICE, {
                            type: INVOICE_ADD
                        })
                })
        };
    };

    render() {
        const { locale, navigation, handleSubmit, theme } = this.props;

        const { activeTab } = this.state;

        const headerProps = {
            rightIcon: 'plus',
            rightIconPress: () => this.onAddInvoice(),
            title: Lng.t('header.invoices', { locale })
        };

        const filterProps = {
            onSubmitFilter: handleSubmit(this.onSubmitFilter),
            ...FilterFields(this),
            clearFilter: this.props,
            locale,
            onResetFilter: () => this.onResetFilter()
        };

        const tabs = [
            {
                Title: INVOICES_TABS.DUE,
                tabName: TAB_NAME(INVOICES_TABS.DUE, locale),
                render: (
                    <Due
                        parentProps={this}
                        reference={ref => (this.dueReference = ref)}
                    />
                )
            },
            {
                Title: INVOICES_TABS.DRAFT,
                tabName: TAB_NAME(INVOICES_TABS.DRAFT, locale),
                render: (
                    <Draft
                        parentProps={this}
                        reference={ref => (this.draftReference = ref)}
                    />
                )
            },
            {
                Title: INVOICES_TABS.ALL,
                tabName: TAB_NAME(INVOICES_TABS.ALL, locale),
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
