// @flow

import React from 'react';
import { Loading, Empty } from '..';
import { FadeAnimation } from '@/components';

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
                    <Loading
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%'
                        }}
                        {...loadingProps}
                    />
                )}
            </>
        );
    }

    if (loadingProps?.is) {
        return <Loading {...loadingProps} />;
    }

    return <FadeAnimation>{children}</FadeAnimation>;
};
