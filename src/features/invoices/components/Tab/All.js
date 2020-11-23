// @flow
import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { ListView, InfiniteScroll } from '@/components';
import { getFilterStatusType } from '../../constants';

type IProps = {
    reference: any,
    parentProps: any
};

export const All = ({ reference, parentProps }: IProps) => {
    let scrollViewReference = useRef(null);
    const { props, state, onSelect, getEmptyContentProps } = parentProps;
    const { allInvoices = [], getInvoices } = props;
    const { search } = state;

    useEffect(() => {
        const values = parentProps?.props?.formValues;

        const status = values?.filterStatus
            ? getFilterStatusType(values?.filterStatus)
            : values?.paid_status;

        const queryString = {
            status: status ?? '',
            search,
            ...values
        };

        scrollViewReference?.getItems?.({
            queryString
        });
        return () => {};
    }, []);

    const isEmpty = allInvoices && allInvoices.length <= 0;

    return (
        <View style={styles.content}>
            <InfiniteScroll
                getItems={getInvoices}
                getItemsInMount={false}
                reference={ref => {
                    scrollViewReference = ref;
                    reference?.(ref);
                }}
            >
                <ListView
                    items={allInvoices}
                    onPress={onSelect}
                    isEmpty={isEmpty}
                    bottomDivider
                    emptyContentProps={getEmptyContentProps()}
                    isAnimated
                />
            </InfiniteScroll>
        </View>
    );
};
