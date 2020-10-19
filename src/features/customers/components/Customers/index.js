// @flow
import React from 'react';
import { View } from 'react-native';
import { omit } from 'lodash';
import Lng from '@/lang/i18n';
import { ListView, MainLayout, InfiniteScroll } from '@/components';
import { ROUTES } from '@/navigation';
import { CUSTOMER_ADD, CUSTOMER_EDIT } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import styles from './styles';
import { customersFilterFields as filterFields } from './filterFields';
import { IMAGES } from '@/assets';
import { hasObjectLength } from '@/constants';

type IProps = {
    customers: Object,
    navigation: Object,
    locale: String,
    formValues: any
};

export class Customers extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.scrollViewReference = React.createRef();
        this.state = { search: '' };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation, { route: ROUTES.MAIN_INVOICES });

        this.focusListener = navigation.addListener('didFocus', () => {
            this.scrollViewReference?.getItems?.();
        });
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
        this.focusListener?.remove?.();
    }

    onSearch = search => {
        this.setState({ search });
        this.scrollViewReference?.getItems?.({
            queryString: { search },
            showLoader: true
        });
    };

    onResetFilter = () => {
        const { search } = this.state;

        this.scrollViewReference?.getItems?.({
            queryString: { search },
            resetQueryString: true,
            showLoader: true
        });
    };

    onSubmitFilter = ({ name = '', contact_name = '', phone = '' }) => {
        const { search } = this.state;

        this.scrollViewReference?.getItems?.({
            queryString: {
                display_name: name,
                contact_name,
                phone,
                search
            },
            showLoader: true
        });
    };

    onCustomerSelect = customer => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.CUSTOMER, {
            customerId: customer.id,
            type: CUSTOMER_EDIT
        });
    };

    isFilterApply = () => {
        const { formValues } = this.props;

        if (!formValues) return false;

        const values = omit(formValues, 'search');
        return hasObjectLength(values);
    };

    render() {
        const {
            customers,
            navigation,
            locale,
            handleSubmit,
            getCustomer
        } = this.props;

        const { search } = this.state;
        const isEmpty = customers && customers.length <= 0;

        const emptyTitle = search
            ? 'search.noResult'
            : this.isFilterApply()
            ? 'filter.empty.filterTitle'
            : 'customers.empty.title';

        const emptyContentProps = {
            title: Lng.t(emptyTitle, { locale, search }),
            image: IMAGES.EMPTY_CUSTOMERS,
            ...(!search && {
                description: Lng.t('customers.empty.description', {
                    locale
                })
            }),
            ...(!search &&
                !this.isFilterApply() && {
                    buttonTitle: Lng.t('customers.empty.buttonTitle', {
                        locale
                    }),
                    buttonPress: () => {
                        navigation.navigate(ROUTES.CUSTOMER, {
                            type: CUSTOMER_ADD
                        });
                    }
                })
        };

        const headerProps = {
            rightIcon: 'plus',
            rightIconPress: () => {
                navigation.navigate(ROUTES.CUSTOMER, {
                    type: CUSTOMER_ADD
                });
            },
            title: Lng.t('header.customers', { locale })
        };

        const filterProps = {
            onSubmitFilter: handleSubmit(this.onSubmitFilter),
            inputFields: filterFields(locale),
            clearFilter: this.props,
            locale: locale,
            onResetFilter: () => this.onResetFilter()
        };

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={headerProps}
                    onSearch={this.onSearch}
                    filterProps={filterProps}
                    bottomDivider
                >
                    <View style={styles.listViewContainer}>
                        <InfiniteScroll
                            getItems={getCustomer}
                            reference={ref => (this.scrollViewReference = ref)}
                        >
                            <ListView
                                items={customers}
                                onPress={this.onCustomerSelect}
                                isEmpty={isEmpty}
                                bottomDivider
                                hasAvatar
                                emptyContentProps={emptyContentProps}
                            />
                        </InfiniteScroll>
                    </View>
                </MainLayout>
            </View>
        );
    }
}
