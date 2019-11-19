// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { styles } from './styles';

type IProps = {
    title: String,
    dividerStyle: Object,
    titleStyle: Object,
};

export const CtDivider = ({ title, dividerStyle, titleStyle }: IProps) => {
    return title ? (
        <View style={styles.dividerContainer}>
            <Divider style={[styles.divider, dividerStyle]} />

            <View style={styles.titleContainer}>
                <Text style={[styles.title, titleStyle]}>{title}</Text>
            </View>
        </View>
    ) : (
        <Divider style={[styles.withoutTitle, dividerStyle]} />
    );
};
