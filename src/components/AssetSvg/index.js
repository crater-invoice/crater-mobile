import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface IProps {
    name: String;
    fill?: String;
    width?: Number | String;
    height?: Number | String;
    style?: StyleProp<ViewStyle>;
}

export const AssetSvg = ({
    name,
    fill,
    width = '22',
    height = '22',
    style
}: IProps) => {
    return (
        <SvgXml
            xml={name}
            width={width}
            height={height}
            fill={fill}
            style={style}
        />
    );
};

export default AssetSvg;
