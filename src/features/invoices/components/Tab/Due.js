// @flow
import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { ListView, InfiniteScroll } from '@/components';
import { INVOICES_TABS } from '../../constants';

type IProps = {
    reference: any,
    parentProps: any
};

export const Due = ({ reference, parentProps }: IProps) => {
    let scrollViewReference = useRef(null);
    const { props, state, onSelect, getEmptyContentProps } = parentProps;
    const { dueInvoices = [], getInvoices } = props;
    const { search } = state;

    useEffect(() => {
        const values = parentProps?.props?.formValues;

        const queryString = {
            type: 'UNPAID',
            search,
            ...values
        };

        scrollViewReference?.getItems?.({
            queryString
        });
        return () => {};
    }, []);

    const isEmpty = dueInvoices.length <= 0;

    return (
        <View style={styles.content}>
            <InfiniteScroll
                getItems={getInvoices}
                hideRefreshControl={isEmpty}
                getItemsInMount={false}
                reference={ref => {
                    scrollViewReference = ref;
                    reference?.(ref);
                }}
            >
                <ListView
                    items={dueInvoices}
                    onPress={onSelect}
                    isEmpty={isEmpty}
                    bottomDivider
                    emptyContentProps={getEmptyContentProps(INVOICES_TABS.DUE)}
                />
            </InfiniteScroll>
        </View>
    );
};
