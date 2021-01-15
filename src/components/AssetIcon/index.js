import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

type IProps = {
    name: string,
    style?: object,
    size?: number,
    solid?: boolean,
    color?: string
};

export const AssetIcon: FC<IProps> = ({ name, style, size, solid, color }) => (
    <Icon name={name} size={size} color={color} solid={solid} style={style} />
);

export default AssetIcon;
