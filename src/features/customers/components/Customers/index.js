// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { ListView, MainLayout } from '../../../../components';
import { IMAGES } from '../../../../config';
import { ROUTES } from '../../../../navigation/routes';
import Lng from '../../../../api/lang/i18n';
import { CUSTOMER_ADD, CUSTOMER_EDIT } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';


type IProps = {
    customers: Object,
    navigation: Object,
    loading: Boolean,
    language: String,
}

let params = {
    search: '',
    display_name: '',
    contact_name: '',
    phone: '',
}

export class Customers extends React.Component<IProps> {
    constructor(props) {
        super(props)

        this.state = {
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
        goBack(MOUNT, navigation, { route: ROUTES.MAIN_INVOICES })
        this.getItems({ fresh: true });
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    getItems = ({
        fresh = false,
        params,
        onResult,
        filter = false
    } = {}) => {

        const { getCustomer } = this.props;
        const { refreshing, pagination } = this.state;

        if (refreshing) {
            return;
        }

        this.setState({
            refreshing: true,
            fresh,
        });

        const paginationParams = fresh ? { ...pagination, page: 1 } : pagination;

        if (!fresh && paginationParams.lastPage < paginationParams.page) {
            return;
        }

        getCustomer({
            fresh,
            pagination: paginationParams,
            params,
            filter,
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

    onSearch = (search) => {
        this.onResetFilter()
        this.setState({ search })
        this.getItems({ fresh: true, params: { ...params, search } })
    };

    onResetFilter = () => {
        this.setState({ filter: false })
    }

    onSubmitFilter = ({ name = '', contact_name = '', phone = '' }) => {

        if (name || contact_name || phone) {
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    display_name: name,
                    contact_name,
                    phone
                },
                filter: true
            })
        }
        else
            this.onResetFilter()
    }

    onCustomerSelect = (customer) => {
        const { navigation } = this.props
        navigation.navigate(ROUTES.CUSTOMER,
            { customerId: customer.id, type: CUSTOMER_EDIT }
        )
        this.onResetFilter()
    }

    loadMoreItems = () => {
        const { search, filter } = this.state

        const {
            formValues: {
                name = '',
                contact_name = '',
                phone = ''
            }

        } = this.props

        if (filter) {
            this.getItems({
                q: name,
                params: {
                    ...params,
                    display_name: name,
                    contact_name,
                    phone
                },
                contact_name,
                phone,
                filter: true
            })
        }
        else
            this.getItems({ params: { ...params, search } });
    }


    render() {
        const {
            customers,
            filterCustomers,
            navigation,
            loading,
            language,
            handleSubmit
        } = this.props

        let filterRefs = {}

        const {
            refreshing,
            pagination: { lastPage, page },
            fresh,
            search,
            filter,
        } = this.state;

        const canLoadMore = lastPage >= page;

        let inputFields = [
            {
                name: 'name',
                hint: Lng.t("customers.filterDisplayName", { locale: language }),
                inputProps: {
                    autoCorrect: true,
                    autoFocus: true,
                    onSubmitEditing: () => {
                        filterRefs.contactName.focus();
                    }
                }
            },
            {
                name: 'contact_name',
                hint: Lng.t("customers.filterContactName", { locale: language }),
                inputProps: {
                    autoCorrect: true,
                    onSubmitEditing: () => {
                        filterRefs.phone.focus();
                    }
                },
                refLinkFn: (ref) => {
                    filterRefs.contactName = ref;
                }
            },
            {
                name: 'phone',
                hint: Lng.t("customers.phone", { locale: language }),
                inputProps: {
                    keyboardType: 'phone-pad'
                },
                refLinkFn: (ref) => {
                    filterRefs.phone = ref;
                }
            }
        ]

        let empty = (!filter && !search) ? {
            description: Lng.t("customers.empty.description", { locale: language }),
            buttonTitle: Lng.t("customers.empty.buttonTitle", { locale: language }),
            buttonPress: () => {
                navigation.navigate(ROUTES.CUSTOMER, { type: CUSTOMER_ADD })
                this.onResetFilter()
            }
        } : {}

        let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
            : (!filter) ? Lng.t("customers.empty.title", { locale: language }) :
                Lng.t("filter.empty.filterTitle", { locale: language })

        let isLoading = navigation.getParam('loading', false)

        return (
            <View style={styles.container} >
                <MainLayout
                    headerProps={{
                        rightIcon: "plus",
                        rightIconPress: () => {
                            navigation.navigate(ROUTES.CUSTOMER, { type: CUSTOMER_ADD })
                            this.onResetFilter()
                        },
                        title: Lng.t("header.customers", { locale: language })
                    }}
                    onSearch={this.onSearch}
                    filterProps={{
                        onSubmitFilter: handleSubmit(this.onSubmitFilter),
                        inputFields: inputFields,
                        clearFilter: this.props,
                        language: language,
                        onResetFilter: () => this.onResetFilter()
                    }}
                    bottomDivider
                    loadingProps={{ is: isLoading || (loading && fresh) }}
                >

                    <View style={styles.listViewContainer}>
                        <ListView
                            items={!filter ? customers : filterCustomers}
                            onPress={this.onCustomerSelect}
                            refreshing={refreshing}
                            loading={loading}
                            isEmpty={!filter ? customers && customers.length <= 0 :
                                filterCustomers && filterCustomers.length <= 0
                            }
                            canLoadMore={canLoadMore}
                            getFreshItems={(onHide) => {
                                this.onResetFilter()
                                this.getItems({
                                    fresh: true,
                                    onResult: onHide,
                                    params: { ...params, search }
                                });
                            }}
                            getItems={() => {
                                this.loadMoreItems()
                            }}
                            bottomDivider
                            hasAvatar
                            emptyContentProps={{
                                title: emptyTitle,
                                image: IMAGES.EMPTY_CUSTOMERS,
                                ...empty
                            }}
                        />
                    </View>

                </MainLayout>
            </View>
        );
    }
}
