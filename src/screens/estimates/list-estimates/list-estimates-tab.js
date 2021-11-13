import React, {useRef} from 'react';
import {View} from 'react-native';
import {ListView, InfiniteScroll} from '@/components';
import {fetchEstimates} from 'stores/estimate/actions';
import {setEstimatesTabRef as setTabRef} from 'stores/common/helpers';
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
  const {estimates = [], dispatch, route} = props;

  return (
    <View style={{flex: 1}}>
      <InfiniteScroll
        getItems={q => dispatch(fetchEstimates(q))}
        getItemsInMount={false}
        reference={ref => {
          scrollViewReference = ref;
          setTabRef?.(ref);
        }}
      >
        <ListView
          items={estimates}
          onPress={onSelect}
          isEmpty={isEmpty(estimates)}
          bottomDivider
          emptyContentProps={getEmptyContentProps(activeTab)}
          route={route}
          isAnimated
        />
      </InfiniteScroll>
    </View>
  );
};
