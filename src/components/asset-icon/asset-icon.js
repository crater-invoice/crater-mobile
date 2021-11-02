import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleProp, ViewStyle} from 'react-native';

interface IProps {
  name: string;
  size?: number;
  solid?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const AssetIcon: FC<IProps> = props => {
  const {name, style, size, solid, color} = props;

  return (
    <Icon name={name} size={size} color={color} solid={solid} style={style} />
  );
};
