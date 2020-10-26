// @flow

import React from 'react';
import {
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    StyleProp,
    ViewStyle
} from 'react-native';
import debounce from 'lodash/debounce';
import { styles } from './styles';
import { colors } from '@/styles/colors';
import Empty from '../Empty';
import { Content } from '../Content';
import { hasValue } from '@/constants';

interface IProps {
    style?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    isEmpty?: boolean;
    refreshControlColor?: string;
    emptyContentProps?: any;
    reference?: any;
    hideRefreshControl?: boolean;
    getItems: Function;
    getItemsInMount: boolean;
    onMount: Function;
    hideLoader: Boolean;
}

interface IState {
    loading: boolean;
    refreshing: boolean;
    isMore: boolean;
    page: Number;
    limit: Number;
}

const isScrollToEnd = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 65;

    return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    );
};

export class InfiniteScroll extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.isLoading = false;
        this.allParams = {};
        this.allQueryStrings = {
            orderByField: 'created_at',
            orderBy: 'desc'
        };
        this.state = {
            loading: props?.hideLoader ? false : true,
            refreshing: false,
            isMore: false,
            page: 1,
            limit: 10
        };
    }

    static defaultProps = {
        getItemsInMount: true,
        hideLoader: false
    };

    componentDidMount() {
        const { getItemsInMount, reference, onMount } = this.props;

        reference?.(this);
        getItemsInMount && this.getItems();
        setTimeout(() => {
            this.getItems = debounce(this.getItems, 300);
        }, 1500);

        onMount?.();
    }

    componentWillUnmount() {
        this.props.reference?.(undefined);
    }

    getItems = ({
        fresh = true,
        params,
        queryString,
        onSuccess,
        resetQueryString = false,
        resetParams = false,
        showLoader = false
    } = {}) => {
        if (this.isLoading) {
            return;
        }

        if (!fresh && !this.state.isMore) {
            return;
        }

        if (!this.props?.getItems) {
            return;
        }

        if (showLoader) {
            this.setState({ loading: true });
        }

        this.isLoading = true;

        this.updateParamsValues(resetParams, params);
        this.updateQueryStringValues(resetQueryString, queryString);

        const getItemProps = {
            queryString: this.getQueryStringValue(
                resetQueryString,
                queryString,
                fresh
            ),
            ...(!resetParams && this.allParams),
            ...params
        };

        this.props?.getItems?.({
            fresh,
            ...getItemProps,
            onSuccess: res => {
                this.updateInitialState(res);
                onSuccess?.(res);
            }
        });
    };

    getQueryStringValue = (resetQueryString, queryString, fresh) => {
        const { page, limit } = this.state;

        return {
            ...(!resetQueryString
                ? this.allQueryStrings
                : { orderByField: 'created_at', orderBy: 'desc' }),
            ...queryString,
            limit,
            page: fresh ? 1 : page
        };
    };

    updateParamsValues = (reset, params) => {
        this.allParams = { ...(!reset && this.allParams), ...params };
    };

    updateQueryStringValues = (reset, queryString) => {
        this.allQueryStrings = !reset
            ? { ...this.allQueryStrings, ...queryString }
            : { orderByField: 'created_at', orderBy: 'desc', ...queryString };
    };

    updateInitialState = ({ next_page_url, current_page }) => {
        this.setState({
            loading: false,
            refreshing: false,
            isMore: hasValue(next_page_url),
            page: current_page + 1
        });
        this.isLoading = false;
    };

    onRefresh = () => {
        this.setState({ refreshing: true });
        this.getItems();
    };

    render() {
        const { loading, refreshing, isMore } = this.state;
        const {
            style,
            contentContainerStyle,
            isEmpty,
            refreshControlColor,
            emptyContentProps,
            children,
            hideRefreshControl
        } = this.props;

        const refreshControl =
            !loading && !hideRefreshControl ? (
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={this.onRefresh}
                    tintColor={refreshControlColor || colors.veryDarkGray}
                />
            ) : null;

        const loader = (
            <ActivityIndicator
                size={'large'}
                color={refreshControlColor}
                style={styles.loader}
            />
        );

        return (
            <ScrollView
                style={[styles.container, style]}
                contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
                scrollEventThrottle={400}
                refreshControl={refreshControl}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                onScroll={({ nativeEvent }) => {
                    if (isScrollToEnd(nativeEvent) && !loading && !refreshing) {
                        this.getItems({ fresh: false });
                    }
                }}
            >
                <Content loadingProps={{ is: loading }}>
                    {!isEmpty ? children : <Empty {...emptyContentProps} />}

                    {!loading && !refreshing && isMore && loader}
                </Content>
            </ScrollView>
        );
    }
}
