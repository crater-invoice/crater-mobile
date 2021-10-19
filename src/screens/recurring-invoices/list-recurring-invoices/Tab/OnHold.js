import React, {useRef, useEffect} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {ListView, InfiniteScroll} from '@/components';
import {RECURRING_INVOICES_TABS} from 'stores/recurring-invoices/types';
import {fetchRecurringInvoices} from 'stores/recurring-invoices/actions';

type IProps = {
  reference: any,
  parentProps: any
};

export const OnHold = ({reference, parentProps}: IProps) => {
  let scrollViewReference = useRef(null);
  const {props, state, onSelect, getEmptyContentProps} = parentProps;
  const {invoices = [], dispatch, route} = props;
  const {search} = state;

  useEffect(() => {
    const values = parentProps?.props?.formValues;

    const queryString = {
      status: 'ON_HOLD',
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
        getItems={q => dispatch(fetchRecurringInvoices(q))}
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
          emptyContentProps={getEmptyContentProps(
            RECURRING_INVOICES_TABS.ON_HOLD
          )}
          route={route}
          isAnimated
        />
      </InfiniteScroll>
    </View>
  );
};
