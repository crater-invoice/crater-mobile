import React from 'react';
import { SvgXml } from 'react-native-svg';

interface IProps {
    name: String;
    fill?: String;
    width?: Number | String;
    height?: Number | String;
}

export const AssetSvg = ({
    name,
    fill,
    width = '22',
    height = '22'
}: IProps) => {
    return <SvgXml xml={name} width={width} height={height} fill={fill} />;
};

export default AssetSvg
