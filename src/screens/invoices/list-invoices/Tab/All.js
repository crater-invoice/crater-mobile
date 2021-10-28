import React, {useRef, useEffect} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {ListView, InfiniteScroll} from '@/components';
import {fetchInvoices} from 'stores/invoices/actions';

type IProps = {
  reference: any,
  parentProps: any
};

export const All = ({reference, parentProps}: IProps) => {
  let scrollViewReference = useRef(null);
  const {props, state, onSelect, getEmptyContentProps} = parentProps;
  const {invoices = [], route, dispatch} = props;
  const {search} = state;

  useEffect(() => {
    const values = parentProps?.props?.formValues;

    const status = values?.filterStatus;
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

  const isEmpty = invoices && invoices.length <= 0;

  return (
    <View style={styles.content}>
      <InfiniteScroll
        getItems={q => dispatch(fetchInvoices(q))}
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
          emptyContentProps={getEmptyContentProps()}
          route={route}
          isAnimated
        />
      </InfiniteScroll>
    </View>
  );
};
