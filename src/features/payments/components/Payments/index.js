// @flow
import React from 'react';
import { View } from 'react-native';

import { change } from 'redux-form';
import styles from './styles';
import {
    MainLayout,
    ListView
} from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import { IMAGES } from '../../../../config';
import Lng from '../../../../api/lang/i18n';
import { PAYMENT_ADD, PAYMENT_EDIT, PAYMENT_SEARCH, PAYMENT_MODE } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';

let params = {
    search: '',
    payment_mode: '',
    payment_number: '',
    customer_id: '',
}

type IProps = {
    navigation: Object,
    getPayments: Function,
    payments: Object,
    loading: Boolean,
    language: String,
    getCustomers: Function,
}

export class Payments extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            fresh: true,
            pagination: {
                page: 1,
                limit: 10,
                lastPage: 1,
            },
            search: '',
            selectedPaymentMode: '',
            filter: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props
        goBack(MOUNT, navigation, ROUTES.MAIN_INVOICES)
    }

    componentWillUpdate(nextProps, nextState) {

        const { navigation } = nextProps
        const pagination = navigation.getParam('pagination', null)
        const apiCall = navigation.getParam('apiCall', false)

        if (pagination && !(apiCall)) {
            navigation.setParams({ 'pagination': null, apiCall: true })

            const { last_page, current_page } = pagination
            this.setState({
                pagination: {
                    ...this.state.pagination,
                    lastPage: last_page,
                    page: current_page + 1,
                }
            });
        }
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    onPaymentSelect = (payment) => {
        const { navigation } = this.props
        navigation.navigate(ROUTES.PAYMENT,
            { paymentId: payment.id, type: PAYMENT_EDIT }
        )
        this.onResetFilter()
    }

    onSearch = (search) => {
        this.onResetFilter()
        this.setState({ search })
        this.getItems({ fresh: true, params: { ...params, search } })
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(PAYMENT_SEARCH, field, value));

        if (field === 'payment_mode')
            this.setState({ selectedPaymentMode: value })
    };

    getItems = ({
        fresh = false,
        onResult,
        params,
        filter = false
    } = {}) => {

        const { getPayments } = this.props;
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

        getPayments({
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

    onResetFilter = () => {
        this.setState({ filter: false })
    }

    onSubmitFilter = ({ customer_id = '', payment_mode = '', payment_number = '' }) => {

        if (customer_id || payment_mode || payment_number) {
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    payment_mode,
                    payment_number,
                },
                filter: true
            })
        }
        else
            this.onResetFilter()
    }

    getPaymentsList = (payments) => {
        let paymentList = []
        if (typeof payments !== 'undefined' && payments.length != 0) {
            paymentList = payments.map((payment) => {
                const {
                    notes,
                    formattedPaymentDate,
                    amount,
                    payment_mode,
                    user: { name, currency }
                } = payment;

                return {
                    title: `${name}`,
                    subtitle: {
                        title: `${payment_mode ? '(' + payment_mode + ')' : ''}`,
                    },
                    amount,
                    currency,
                    rightSubtitle: formattedPaymentDate,
                    fullItem: payment,
                };
            });
        }
        return paymentList
    }

    loadMoreItems = () => {
        const { search, filter } = this.state

        const {
            formValues: {
                customer_id = '',
                payment_mode = '',
                payment_number = ''
            }
        } = this.props



        if (filter) {
            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    payment_mode,
                    payment_number,
                },
                filter: true
            })
        }
        else
            this.getItems({ params: { ...params, search } });

    }

    render() {

        const {
            navigation,
            payments,
            filterPayments,
            loading,
            language,
            handleSubmit,
            customers,
            getCustomers
        } = this.props;

        const {
            refreshing,
            pagination: { lastPage, page },
            fresh,
            search,
            selectedPaymentMode,
            filter,
        } = this.state;

        const canLoadMore = lastPage >= page;


        let paymentsItem = this.getPaymentsList(payments)
        let filterPaymentItem = this.getPaymentsList(filterPayments)

        let filterRefs = {}

        let selectFields = [
            {
                name: "customer_id",
                apiSearch: true,
                hasPagination: true,
                getItems: getCustomers,
                items: customers,
                displayName: "name",
                label: Lng.t("payments.customer", { locale: language }),
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

        let inputFields = [{
            name: 'payment_number',
            hint: Lng.t("payments.number", { locale: language }),
            leftIcon: 'hashtag',
            inputProps: {
                autoCapitalize: 'none',
                autoCorrect: true,
            },
            refLinkFn: (ref) => {
                filterRefs.paymentNumber = ref;
            }
        }]

        let dropdownFields = [{
            name: "payment_mode",
            label: Lng.t("payments.mode", { locale: language }),
            fieldIcon: 'align-center',
            items: PAYMENT_MODE,
            onChangeCallback: (val) => {
                this.setFormField('payment_mode', val)
            },
            defaultPickerOptions: {
                label: Lng.t("payments.modePlaceholder", { locale: language }),
                value: '',
            },
            selectedItem: selectedPaymentMode,
            onDonePress: () => filterRefs.paymentNumber.focus(),
            containerStyle: styles.selectPicker
        }]

        let empty = (!filter && !search) ? {
            description: Lng.t("payments.empty.description", { locale: language }),
            buttonTitle: Lng.t("payments.empty.buttonTitle", { locale: language }),
            buttonPress: () => {
                navigation.navigate(ROUTES.PAYMENT, { type: PAYMENT_ADD })
                this.onResetFilter()
            }
        } : {}

        let emptyTitle = search ? Lng.t("search.noResult", { locale: language, search })
            : (!filter) ? Lng.t("payments.empty.title", { locale: language }) :
                Lng.t("filter.empty.filterTitle", { locale: language })

        let isLoading = navigation.getParam('loading', false)

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        rightIcon: "plus",
                        rightIconPress: () => {
                            navigation.navigate(ROUTES.PAYMENT, { type: PAYMENT_ADD })
                            this.onResetFilter()
                        },
                        title: Lng.t("header.payments", { locale: language })
                    }}
                    onSearch={this.onSearch}
                    bottomDivider
                    filterProps={{
                        onSubmitFilter: handleSubmit(this.onSubmitFilter),
                        selectFields: selectFields,
                        inputFields: inputFields,
                        dropdownFields: dropdownFields,
                        clearFilter: this.props,
                        language: language,
                        onResetFilter: () => this.onResetFilter()
                    }}
                    loadingProps={{ is: isLoading || (loading && fresh) }}
                >

                    <View style={styles.listViewContainer}>

                        <ListView
                            items={!filter ? paymentsItem : filterPaymentItem}
                            onPress={this.onPaymentSelect}
                            refreshing={refreshing}
                            loading={loading}
                            isEmpty={!filter ? paymentsItem.length <= 0 :
                                filterPaymentItem.length <= 0
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
                            contentContainerStyle={{ flex: 0 }}
                            bottomDivider
                            emptyContentProps={{
                                title: emptyTitle,
                                image: IMAGES.EMPTY_PAYMENTS,
                                ...empty
                            }}
                        />

                    </View>
                </MainLayout>
            </View >
        );
    }
}
