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

export const Sent = ({ reference, parentProps }: IProps) => {
    let scrollViewReference = useRef(null);
    const { props, state, onSelect, getEmptyContentProps } = parentProps;
    const { sentEstimates = [], getEstimates, navigation } = props;
    const { search } = state;

    useEffect(() => {
        const values = parentProps?.props?.formValues;

        const queryString = { status: 'SENT', search, ...values };
        scrollViewReference?.getItems?.({ queryString });
        return () => {};
    }, []);

    const isEmpty = sentEstimates && sentEstimates.length <= 0;

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
                    items={sentEstimates}
                    onPress={onSelect}
                    isEmpty={isEmpty}
                    bottomDivider
                    emptyContentProps={getEmptyContentProps(
                        ESTIMATES_TABS.SENT
                    )}
                    navigation={navigation}
                    isAnimated
                />
            </InfiniteScroll>
        </View>
    );
};
