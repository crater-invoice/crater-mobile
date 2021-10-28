import React, {useRef, useEffect} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {ListView, InfiniteScroll} from '@/components';
import {ESTIMATES_TABS} from 'stores/estimates/types';
import {fetchEstimates} from 'stores/estimates/actions';

type IProps = {
  reference: any,
  parentProps: any
};

export const Sent = ({reference, parentProps}: IProps) => {
  let scrollViewReference = useRef(null);
  const {props, state, onSelect, getEmptyContentProps} = parentProps;
  const {estimates = [], dispatch, route} = props;
  const {search} = state;

  useEffect(() => {
    const values = parentProps?.props?.formValues;
    const queryString = {status: 'SENT', search, ...values};
    scrollViewReference?.getItems?.({queryString});
    return () => {};
  }, []);

  const isEmpty = estimates && estimates.length <= 0;

  return (
    <View style={styles.content}>
      <InfiniteScroll
        getItems={q => dispatch(fetchEstimates(q))}
        getItemsInMount={false}
        reference={ref => {
          scrollViewReference = ref;
          reference?.(ref);
        }}
      >
        <ListView
          items={estimates}
          onPress={onSelect}
          isEmpty={isEmpty}
          bottomDivider
          emptyContentProps={getEmptyContentProps(ESTIMATES_TABS.SENT)}
          route={route}
          isAnimated
        />
      </InfiniteScroll>
    </View>
  );
};
