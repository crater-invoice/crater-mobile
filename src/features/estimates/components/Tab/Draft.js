// @flow
import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { ListView, InfiniteScroll } from '@/components';
import { ESTIMATES_TABS } from '../../constants';

type IProps = {
    reference: any,
    parentProps: any
};

export const Draft = ({ reference, parentProps }: IProps) => {
    let scrollViewReference = useRef(null);
    const { props, state, onSelect, getEmptyContentProps } = parentProps;
    const { draftEstimates = [], getEstimates } = props;
    const { search } = state;

    useEffect(() => {
        const values = parentProps?.props?.formValues;

        const queryString = { status: 'DRAFT', search, ...values };

        scrollViewReference?.getItems?.({ queryString });
        return () => {};
    }, []);

    const isEmpty = draftEstimates && draftEstimates.length <= 0;

    return (
        <View style={styles.content}>
            <InfiniteScroll
                getItems={getEstimates}
                getItemsInMount={false}
                reference={ref => {
                    scrollViewReference = ref;
                    reference?.(ref);
                }}
            >
                <ListView
                    items={draftEstimates}
                    onPress={onSelect}
                    isEmpty={isEmpty}
                    bottomDivider
                    emptyContentProps={getEmptyContentProps(
                        ESTIMATES_TABS.DRAFT
                    )}
                />
            </InfiniteScroll>
        </View>
    );
};
