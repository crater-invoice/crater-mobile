// @flow

import React from 'react';
import { Loading, Empty } from '..';
import { FadeIn } from '../FadeIn';

type IProps = {
    withLoading?: Boolean,
    loadingProps?: any,
    emptyProps?: any
};

export const Content = ({
    children,
    withLoading = false,
    loadingProps,
    emptyProps
}: IProps) => {
    if (emptyProps?.is) {
        return <Empty {...emptyProps} />;
    }

    if (withLoading) {
        return (
            <>
                {children}
                {loadingProps && loadingProps.is && (
                    <Loading {...loadingProps} />
                )}
            </>
        );
    }

    if (loadingProps?.is) {
        return <Loading {...loadingProps} />;
    }

    return <FadeIn>{children}</FadeIn>;
};
