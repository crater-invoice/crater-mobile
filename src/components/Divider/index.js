import React from 'react';
import {View} from 'react-native';
import {Divider} from 'react-native-elements';
import {Text} from '../Text';
import {styles} from './styles';

type IProps = {
  title?: String,
  dividerStyle?: Object,
  titleStyle?: Object,
  theme?: any
};

export const CtDivider = ({title, dividerStyle, titleStyle, theme}: IProps) => {
  return title ? (
    <View style={styles.dividerContainer}>
      <Divider style={[styles.divider, dividerStyle]} />

      <View style={styles.titleContainer}>
        <Text darkGray style={titleStyle}>
          {title}
        </Text>
      </View>
    </View>
  ) : (
    <Divider style={[styles.withoutTitle(theme), dividerStyle]} />
  );
};
