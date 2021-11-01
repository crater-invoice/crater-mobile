import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleProp, ViewStyle} from 'react-native';

export const AssetIcon: FC<IProps> = props => {
  const {name, style, size, solid, color} = props;

  return (
    <Icon name={name} size={size} color={color} solid={solid} style={style} />
  );
};

interface IProps {
  /**
   * Name of font awesome icon.
   */
  name: string;

  /**
   * Size of font awesome icon.
   */
  size?: number;

  /**
   * Whether to check that is icon solid or outline.
   */
  solid?: boolean;

  /**
   * Color of font awesome icon.
   */
  color?: string;

  /**
   * The style of the content container(Icon).
   */
  style?: StyleProp<ViewStyle> | any;
}
