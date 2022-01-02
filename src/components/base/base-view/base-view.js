import React from 'react';
import {View as RNView} from 'react-native';
import {getClass} from 'utils/class-styled';
import {IProps} from './type.d';

export const BaseView = (props: IProps) => {
  const {show = true} = props;
  if (!show) {
    return <React.Fragment />;
  }
  const styleClass = getClass(props, props.class);
  const styles = [styleClass, props.style];

  return (
    <RNView {...props} style={styles}>
      {props.children}
    </RNView>
  );
};
