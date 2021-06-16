import { hasObjectLength } from '@/constants';
import { colors } from '@/styles';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../Text';

interface IProps {
    children?: any;
    isRequired?: boolean;
    style?: any;
}

export const Label: FC<IProps> = ({ children, isRequired, style, ...rest }) => {
    if (!children) {
        return null;
    }

    return (
        <Text
            left
            style={
                !hasObjectLength(rest) ? { ...styles.label, ...style } : style
            }
            color={colors.dark2}
            {...rest}
        >
            {children}
            {isRequired ? <Text danger> *</Text> : null}
        </Text>
    );
};

const styles = StyleSheet.create({
    label: {
        paddingBottom: 7,
        fontSize: 14
    }
});
