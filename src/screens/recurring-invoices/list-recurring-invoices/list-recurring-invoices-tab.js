import React, {useRef} from 'react';
import {View} from 'react-native';
import {ListView, InfiniteScroll} from '@/components';
import {fetchRecurringInvoices} from 'stores/recurring-invoices/actions';
import {setTabRef} from 'stores/common/helpers';

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
  const isEmpty = invoices && invoices.length <= 0;
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
          isEmpty={isEmpty}
          bottomDivider
          emptyContentProps={getEmptyContentProps(activeTab)}
          route={route}
          isAnimated
        />
      </InfiniteScroll>
    </View>
  );
};
