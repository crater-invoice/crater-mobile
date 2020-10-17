// @flow
import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { MainLayout, ListView } from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import { IMAGES } from '../../../../config';
import Lng from '../../../../api/lang/i18n';
import { PAYMENT_ADD, PAYMENT_EDIT, PAYMENT_SEARCH } from '../../constants';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import paymentsFilterFields from './filterFields'

let params = {
    search: '',
    payment_method_id: '',
    payment_number: '',
    customer_id: '',
}

type IProps = {
    navigation: Object,
    getPayments: Function,
    payments: Object,
    loading: Boolean,
    locale: String,
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
        const { navigation, getPaymentModes } = this.props

        this.getItems({ fresh: true });
        getPaymentModes()

        goBack(MOUNT, navigation, { route: ROUTES.MAIN_INVOICES })
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

        if (field === 'payment_method_id')
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

    onSubmitFilter = ({ customer_id = '', payment_method_id = '', payment_number = '' }) => {

        if (customer_id || payment_method_id || payment_number) {
            this.setState({ filter: true })

            this.getItems({
                fresh: true,
                params: {
                    ...params,
                    customer_id,
                    payment_method_id,
                    payment_number,
                },
                filter: true
            })
        }
        else
            this.onResetFilter()
    }

    loadMoreItems = () => {
        const { search, filter } = this.state

        const {
            formValues: {
                customer_id = '',
                payment_method_id = '',
                payment_number = ''
            }
        } = this.props

        if (filter) {
            this.getItems({
                params: {
                    ...params,
                    customer_id,
                    payment_method_id,
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
            locale,
            handleSubmit,
            paymentModesLoading,
        } = this.props;

        const {
            refreshing,
            pagination: { lastPage, page },
            fresh,
            search,
            filter,
        } = this.state;

        const canLoadMore = lastPage >= page;

        let empty = (!filter && !search) ? {
            description: Lng.t("payments.empty.description", { locale }),
            buttonTitle: Lng.t("payments.empty.buttonTitle", { locale }),
            buttonPress: () => {
                navigation.navigate(ROUTES.PAYMENT, { type: PAYMENT_ADD })
                this.onResetFilter()
            }
        } : {}

        let emptyTitle = search ? Lng.t("search.noResult", { locale, search })
            : (!filter) ? Lng.t("payments.empty.title", { locale }) :
                Lng.t("filter.empty.filterTitle", { locale })

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={{
                        rightIcon: "plus",
                        rightIconPress: () => {
                            navigation.navigate(ROUTES.PAYMENT, { type: PAYMENT_ADD })
                            this.onResetFilter()
                        },
                        title: Lng.t("header.payments", { locale })
                    }}
                    onSearch={this.onSearch}
                    bottomDivider
                    filterProps={{
                        onSubmitFilter: handleSubmit(this.onSubmitFilter),
                        ...paymentsFilterFields(this),
                        clearFilter: this.props,
                        locale,
                        onResetFilter: () => this.onResetFilter()
                    }}
                    loadingProps={{ is: paymentModesLoading || (loading && fresh) }}
                >

                    <View style={styles.listViewContainer}>

                        <ListView
                            items={!filter ? payments : filterPayments}
                            onPress={this.onPaymentSelect}
                            refreshing={refreshing}
                            loading={loading}
                            isEmpty={!filter ? payments.length <= 0 :
                                filterPayments.length <= 0
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
                            getItems={() => this.loadMoreItems()}
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
