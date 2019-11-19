// @flow

import React, { Fragment } from 'react';
import { View } from 'react-native';
import { Loading, Empty } from '..';

type IProps = {
    loading: boolean,
    error: string,
    children: any,
    empty: string,
    onRetry: Function,
};

export const Content = ({
    children,
    withLoading = false,
    loading,
    loadingProps,
    emptyProps,
}: IProps) => {
    if (emptyProps && emptyProps.is) {
        return <Empty {...emptyProps} />;
    }

    if (withLoading) {
        return (
            <Fragment>
                {children}
                {loadingProps && loadingProps.is && <Loading {...loadingProps} />}
            </Fragment>
        );
    }

    return loadingProps && loadingProps.is ? <Loading {...loadingProps} /> : children;
};
