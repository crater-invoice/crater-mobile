// @flow

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../styles/colors';

type IProps = {
    size: 'small' | 'large',
    color: string,
    style: Object,
};

export const Loading = ({ size = 'small', color = colors.veryDarkGray, style }: IProps) => (
    <ActivityIndicator size={size} style={{ flex: 1, ...style }} color={color} />
);
