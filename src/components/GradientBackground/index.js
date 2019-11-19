// @flow

import React from 'react';
import { Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/colors';

type IProps = {
    children: any,
};

export const GradientBackground = ({ children }: IProps) => {
    return (
        <LinearGradient
            colors={[colors.primary, colors.primaryLight]}
            style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}
        >
            {children}
        </LinearGradient>
    );
};
