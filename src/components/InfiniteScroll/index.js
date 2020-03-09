// @flow

import React from 'react';
import { ScrollView, RefreshControl, ActivityIndicator, View, Text } from 'react-native';

import { styles } from './styles';
import { colors } from '../../styles/colors';

type IProps = {
    loading: boolean,
    loaderHeight: Number,
    children: any,
    canLoadMore: boolean,
    isEmpty: boolean,
    onEndReached: Function,
    onPullToRefresh: Function,
    refreshControlColor: string,
    contentContainerStyle: Object,
    style: Object,
};

type IState = {
    refreshing: boolean,
};

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 75;

    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

export class InfiniteScroll extends React.Component<IProps, IState> {
    state = {
        refreshing: false,
    };

    _onRefresh = () => {
        const { refreshing } = this.state;
        const { onPullToRefresh } = this.props;

        // check if promise
        if (onPullToRefresh && !refreshing) {
            this.setState({
                refreshing: true,
            });

            onPullToRefresh(() => {
                this.setState({
                    refreshing: false,
                });
            });
        }
    };

    render() {
        const {
            loading,
            children,
            canLoadMore,
            onEndReached,
            onPullToRefresh,
            isEmpty,
            refreshControlColor,
            contentContainerStyle,
            style,
            loaderHeight,
            size = 'large',
        } = this.props;
        const { refreshing } = this.state;

        return (
            <ScrollView
                style={[styles.container, style && style]}
                contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent) && !loading) {
                        if (typeof onEndReached === 'function' && canLoadMore && !refreshing) {
                            onEndReached();
                        }
                    }
                }}
                scrollEventThrottle={400}
                refreshControl={
                    onPullToRefresh ? (
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this._onRefresh}
                            tintColor={refreshControlColor || colors.veryDarkGray}
                            titleColor={refreshControlColor || colors.veryDarkGray}
                        />
                    ) : null
                }
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
                keyboardDismissMode='on-drag'
            >
                {children}

                {(!isEmpty && canLoadMore && loading) && (
                    <ActivityIndicator
                        size={size}
                        style={{
                            flex: 1,
                            minHeight: loaderHeight || 150,
                        }}
                        color={refreshControlColor}
                    />
                )}
            </ScrollView>
        );
    }
}
