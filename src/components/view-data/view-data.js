import React from 'react';
import {View, Text} from '@/components';
import {commonSelector} from 'stores/common/selectors';
import {connect} from 'react-redux';
import {IProps} from './type.d';

export const ViewDataContainer = (props: IProps) => {
  const {label, inPairs, values, theme, first, second} = props;

  const Label = ({label}) => {
    return (
      <Text h5 color={theme?.text?.secondaryColor} theme={theme}>
        {label}
      </Text>
    );
  };

  const Value = ({value}) => {
    return (
      <Text
        h5
        mt-2
        color={theme?.text?.sixthColor}
        numberOfLines={1}
        medium={theme?.mode === 'dark'}
      >
        {value}
      </Text>
    );
  };

  return (
    <View mt-20>
      {inPairs ? (
        <View flex-row>
          <View flex={1} justify-between>
            <Label label={first?.label} />
            <Value value={first?.values} />
          </View>
          <View flex={1} justify-between>
            <Label label={second?.label} />
            <Value value={second?.values} />
          </View>
        </View>
      ) : (
        <>
          <Label label={label} />
          <Value value={values} />
        </>
      )}
    </View>
  );
};

const mapStateToProps = state => commonSelector(state);

export const ViewData = connect(mapStateToProps)(ViewDataContainer);
