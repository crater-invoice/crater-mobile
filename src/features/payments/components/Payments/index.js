// @flow
import React from 'react';
import { View } from 'react-native';
import { change } from 'redux-form';
import styles from './styles';
import { MainLayout, ListView, InfiniteScroll } from '@/components';
import { IMAGES } from '@/assets';
import Lng from '@/lang/i18n';
import { PAYMENT_ADD, PAYMENT_EDIT, PAYMENT_SEARCH } from '../../constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import paymentsFilterFields from './filterFields';
import { isFilterApply } from '@/utils';
import PaymentServices from '../../services';

type IProps = {
    navigation: Object,
    getPayments: Function,
    payments: Object,
    locale: String,
    formValues: any
};

export class Payments extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.scrollViewReference = React.createRef();
        this.toastReference = React.createRef();

        this.state = { search: '' };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation, { route: ROUTES.MAIN_INVOICES });
        this.onFocus();
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
        this.focusListener?.remove?.();
    }

    onFocus = () => {
        const { navigation } = this.props;

        this.focusListener = navigation.addListener('didFocus', () => {
            this.scrollViewReference?.getItems?.();

            if (PaymentServices.isEmailSent) {
                PaymentServices.toggleIsEmailSent(false);
                this.toastReference?.show?.('toast.send_payment_successfully');
            }
        });
    };

    onSelect = payment => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.PAYMENT, {
            paymentId: payment.id,
            type: PAYMENT_EDIT
        });
    };

    onSearch = search => {
        this.setState({ search });

        this.scrollViewReference?.getItems?.({
            queryString: { search },
            showLoader: true
        });
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(PAYMENT_SEARCH, field, value));
    };

    onResetFilter = () => {
        const { search } = this.state;

        this.scrollViewReference?.getItems?.({
            queryString: { search },
            resetQueryString: true,
            showLoader: true
        });
    };

    onSubmitFilter = ({
        customer_id = '',
        payment_method_id = '',
        payment_number = ''
    }) => {
        const { search } = this.state;

        this.scrollViewReference?.getItems?.({
            queryString: {
                customer_id,
                payment_method_id,
                payment_number,
                search
            },
            showLoader: true
        });
    };

    render() {
        const {
            navigation,
            payments,
            locale,
            handleSubmit,
            getPayments,
            formValues
        } = this.props;

        const { search } = this.state;

        const isEmpty = payments && payments.length <= 0;
        const isFilter = isFilterApply(formValues);

        const emptyTitle = search
            ? 'search.noResult'
            : isFilter
            ? 'filter.empty.filterTitle'
            : 'payments.empty.title';

        const emptyContentProps = {
            title: Lng.t(emptyTitle, { locale, search }),
            image: IMAGES.EMPTY_PAYMENTS,
            ...(!search && {
                description: Lng.t('payments.empty.description', { locale })
            }),
            ...(!search &&
                !isFilter && {
                    buttonTitle: Lng.t('payments.empty.buttonTitle', {
                        locale
                    }),
                    buttonPress: () => {
                        navigation.navigate(ROUTES.PAYMENT, {
                            type: PAYMENT_ADD
                        });
                    }
                })
        };

        const headerProps = {
            rightIcon: 'plus',
            rightIconPress: () => {
                navigation.navigate(ROUTES.PAYMENT, {
                    type: PAYMENT_ADD
                });
            },
            title: Lng.t('header.payments', { locale }),
            navigation
        };

        const filterProps = {
            onSubmitFilter: handleSubmit(this.onSubmitFilter),
            ...paymentsFilterFields(this),
            clearFilter: this.props,
            locale,
            onResetFilter: () => this.onResetFilter()
        };

        return (
            <View style={styles.container}>
                <MainLayout
                    headerProps={headerProps}
                    onSearch={this.onSearch}
                    bottomDivider
                    filterProps={filterProps}
                    toastProps={{
                        reference: ref => (this.toastReference = ref)
                    }}
                >
                    <View style={styles.listViewContainer}>
                        <InfiniteScroll
                            getItems={getPayments}
                            reference={ref => (this.scrollViewReference = ref)}
                        >
                            <ListView
                                items={payments}
                                onPress={this.onSelect}
                                isEmpty={isEmpty}
                                contentContainerStyle={{ flex: 0 }}
                                bottomDivider
                                emptyContentProps={emptyContentProps}
                                isAnimated
                            />
                        </InfiniteScroll>
                    </View>
                </MainLayout>
            </View>
        );
    }
}
