import React, {useRef} from 'react';
import {View} from 'react-native';
import {ListView, InfiniteScroll} from '@/components';
import {fetchRecurringInvoices} from 'stores/recurring-invoice/actions';
import {setRecurringTabRef as setTabRef} from 'stores/common/helpers';
import {isEmpty} from '@/constants';

type IProps = {
  parentProps: any
};

export const Tab = ({parentProps}: IProps) => {
  let scrollViewReference = useRef(null);
  const {
    props = {},
    state: {activeTab},
    getEmptyContentProps,
    onSelect
  } = parentProps;
  const {invoices = [], dispatch, route} = props;

  return (
    <View style={{flex: 1}}>
      <InfiniteScroll
        getItems={q => dispatch(fetchRecurringInvoices(q))}
        getItemsInMount={false}
        reference={ref => {
          scrollViewReference = ref;
          setTabRef?.(ref);
        }}
      >
        <ListView
          items={invoices}
          onPress={onSelect}
          isEmpty={isEmpty(invoices)}
          bottomDivider
          emptyContentProps={getEmptyContentProps(activeTab)}
          route={route}
          isAnimated
        />
      </InfiniteScroll>
    </View>
  );
};
