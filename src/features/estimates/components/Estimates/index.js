// @flow

import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { Tabs, MainLayout } from '@/components';
import { Sent, Draft, All } from '../Tab';
import Lng from '@/lang/i18n';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import estimateFilterFields from './filterFields';
import { isFilterApply } from '@/utils';
import { ARROW_ICON, IMAGES } from '@/assets';
import {
    ESTIMATES_TABS,
    ESTIMATE_ADD,
    ESTIMATE_EDIT,
    ESTIMATE_SEARCH,
    TAB_NAME
} from '../../constants';
import EstimateServices from '../../services';

interface IProps {
    locale: String;
    navigation: any;
    estimates: Object;
    customers: Object;
    handleSubmit: Function;
    getCustomers: Function;
    dispatch: Function;
    formValues: any;
}

interface IStates {
    activeTab: string;
    search: string;
    isLoaded: boolean;
}

export class Estimates extends React.Component<IProps, IStates> {
    draftReference: any;
    sentReference: any;
    allReference: any;
    focusListener: any;
    toastReference: any;

    constructor(props) {
        super(props);
        this.draftReference = React.createRef();
        this.sentReference = React.createRef();
        this.allReference = React.createRef();
        this.toastReference = React.createRef();

        this.state = {
            isLoaded: false,
            activeTab: ESTIMATES_TABS.DRAFT,
            search: ''
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation, { exit: true });
        this.onFocus();
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
        this.focusListener?.remove?.();
    }

    onFocus = () => {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            if (EstimateServices.isEmailSent) {
                EstimateServices.toggleIsEmailSent(false);
                this.toastReference?.show?.(
                    'toast.send_estimate_successfully',
                    1500
                );
            }

            if (!this.state.isLoaded) {
                this.setState({ isLoaded: true });
                return;
            }

            const { ref } = this.getActiveTab();
            ref?.getItems?.();
        });
    };

    setActiveTab = activeTab => {
        this.setState({ activeTab });
    };

    onSelect = estimate => {
        const { navigation } = this.props;

        navigation.navigate(ROUTES.ESTIMATE, {
            id: estimate.id,
            type: ESTIMATE_EDIT
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
        if (activeTab == ESTIMATES_TABS.SENT) {
            return {
                status: 'SENT',
                ref: this.sentReference
            };
        }

        if (activeTab == ESTIMATES_TABS.DRAFT) {
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

    setFormField = (field, value) => {
        this.props.dispatch(change(ESTIMATE_SEARCH, field, value));
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

    changeTabBasedOnFilterStatusSelection = status => {
        if (status === ESTIMATES_TABS.SENT) {
            return {
                activeTab: ESTIMATES_TABS.SENT,
                ref: this.sentReference
            };
        }

        if (status === ESTIMATES_TABS.DRAFT) {
            return {
                activeTab: ESTIMATES_TABS.DRAFT,
                ref: this.draftReference
            };
        }

        return {
            activeTab: ESTIMATES_TABS.ALL,
            ref: this.allReference
        };
    };

    onSubmitFilter = ({
        filterStatus = '',
        from_date = '',
        to_date = '',
        estimate_number = '',
        customer_id = ''
    }) => {
        const { search } = this.state;

        const { activeTab, ref } = this.changeTabBasedOnFilterStatusSelection(
            filterStatus
        );

        this.setState({ activeTab });

        ref?.getItems?.({
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
        const { navigation } = this.props;
        navigation.navigate(ROUTES.ESTIMATE, { type: ESTIMATE_ADD });
    };

    getEmptyContentProps = activeTab => {
        const { locale, formValues } = this.props;
        const { search } = this.state;
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
            ? 'search.noResult'
            : isFilter
            ? 'filter.empty.filterTitle'
            : `estimates.empty.${type}.title`;

        return {
            title: Lng.t(emptyTitle, { locale, search }),
            image: IMAGES.EMPTY_ESTIMATES,
            ...(!search && {
                description: Lng.t(`estimates.empty.${type}.description`, {
                    locale
                })
            }),
            ...(!search &&
                !isFilter && {
                    buttonTitle: Lng.t('estimates.empty.buttonTitle', {
                        locale
                    }),
                    buttonPress: () => this.onAddEstimate()
                })
        };
    };

    render() {
        const { locale, navigation, handleSubmit } = this.props;

        const { activeTab } = this.state;

        const headerProps = {
            title: Lng.t('header.estimates', { locale }),
            leftIcon: ARROW_ICON,
            leftIconPress: () => navigation.navigate(ROUTES.MAIN_MORE),
            placement: 'center',
            rightIcon: 'plus',
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
                Title: ESTIMATES_TABS.DRAFT,
                tabName: TAB_NAME(ESTIMATES_TABS.DRAFT, locale),
                render: (
                    <Draft
                        parentProps={this}
                        reference={ref => (this.draftReference = ref)}
                    />
                )
            },
            {
                Title: ESTIMATES_TABS.SENT,
                tabName: TAB_NAME(ESTIMATES_TABS.SENT, locale),
                render: (
                    <Sent
                        parentProps={this}
                        reference={ref => (this.sentReference = ref)}
                    />
                )
            },
            {
                Title: ESTIMATES_TABS.ALL,
                tabName: TAB_NAME(ESTIMATES_TABS.ALL, locale),
                render: (
                    <All
                        parentProps={this}
                        reference={ref => (this.allReference = ref)}
                    />
                )
            }
        ];

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={headerProps}
                    onSearch={this.onSearch}
                    filterProps={filterProps}
                    toastProps={{
                        reference: ref => (this.toastReference = ref),
                        containerStyle: { bottom: 50 }
                    }}
                >
                    <Tabs
                        style={styles.Tabs}
                        activeTab={activeTab}
                        setActiveTab={this.setActiveTab}
                        tabs={tabs}
                    />
                </MainLayout>
            </View>
        );
    }
}
