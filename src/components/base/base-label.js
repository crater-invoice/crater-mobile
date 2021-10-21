import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {colors} from '@/styles';
import {Text} from '../Text';
import {commonSelector} from 'stores/common/selectors';

interface IProps {
  children?: any;
  theme?: any;
  isRequired?: boolean;
  style?: any;
}

const Label: FC<IProps> = props => {
  const {children, theme, isRequired, style, ...rest} = props;

  if (!children) {
    return null;
  }

  return (
    <Text
      h5
      left
      medium={theme?.mode === 'dark'}
      color={theme?.viewLabel?.primaryColor}
      style={{...styles.label, ...style}}
      {...rest}
      //   style={!hasObjectLength(rest) ? {...styles.label, ...style} : style}
      //   bold2={theme?.mode === 'dark'}
    >
      {children}
      {isRequired ? <Text danger> *</Text> : null}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    paddingBottom: 7
  }
});

const mapStateToProps = state => commonSelector(state);

export const BaseLabel = connect(mapStateToProps)(Label);
