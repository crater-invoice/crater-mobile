import React, {useRef, useEffect} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {ListView, InfiniteScroll} from '@/components';
import {INVOICES_TABS} from '@/stores/invoices/types';
import {fetchInvoices} from '@/stores/invoices/actions';

type IProps = {
  reference: any,
  parentProps: any
};

export const Due = ({reference, parentProps}: IProps) => {
  let scrollViewReference = useRef(null);
  const {props, state, onSelect, getEmptyContentProps} = parentProps;
  const {invoices = [], route, dispatch} = props;
s  dispatch(fetchInvoices());
  const {search} = state;

  useEffect(() => {
    const values = parentProps?.props?.formValues;

    const queryString = {
      status: 'DUE',
      search,
      ...values
    };

    scrollViewReference?.getItems?.({
      queryString
    });
    return () => {};
  }, []);

  const isEmpty = invoices && invoices.length <= 0;

  return (
    <View style={styles.content}>
      <InfiniteScroll
        getItems={q => {
          dispatch(fetchInvoices(q));
        }}
        getItemsInMount={false}
        reference={ref => {
          scrollViewReference = ref;
          reference?.(ref);
        }}
      >
        <ListView
          items={invoices}
          onPress={onSelect}
          isEmpty={isEmpty}
          bottomDivider
          emptyContentProps={getEmptyContentProps(INVOICES_TABS.DUE)}
          route={route}
          isAnimated
        />
      </InfiniteScroll>
    </View>
  );
};
