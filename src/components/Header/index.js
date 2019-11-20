// @flow

import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Header, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import { colors } from '../../styles/colors';
import { Filter } from '../Filter';

type IProps = {
    leftIcon: String,
    leftIconPress: Function,
    title: String,
    rightIcon: String,
    rightIconPress: Function,
    placement: String,
    transparent: Boolean,
    rightIconHint: String,
    titleStyle: Object,
    leftIconStyle: Object,
    noBorder: Boolean,
    hasCircle: Boolean,
    rightIconProps: Object,
    rightComponent: any,
    rightIconHintStyle: Object,
    titleOnPress: Object
};

export const CtHeader = ({
    leftIcon,
    leftIconPress,
    title,
    rightIcon,
    rightIconPress,
    placement,
    transparent,
    rightIconHint,
    titleStyle,
    leftIconStyle,
    hasCircle,
    noBorder,
    rightIconProps,
    rightComponent,
    rightIconHintStyle,
    filterProps,
    titleOnPress,
}: IProps) => {
    const hederTitle = {
        text: title,
        style: [
            {
                color: transparent ? colors.dark2 : colors.white,
            },
            styles.title,
            titleStyle && titleStyle,
        ],
    }

    const displayTitle = () => {

        if (titleOnPress) {
            return (
                <TouchableOpacity
                    onPress={() => titleOnPress()}
                >
                    <Text
                        style={[
                            {
                                color: transparent ? colors.dark2 : colors.white,
                            },
                            styles.title,
                            titleStyle && titleStyle,
                        ]}
                    >
                        {title}
                    </Text>
                </TouchableOpacity>
            )
        }

        return leftIcon && hederTitle
    }

    return (
        <Header
            placement={placement}
            leftComponent={
                leftIcon ? (
                    <TouchableOpacity
                        onPress={leftIconPress}
                        hitSlop={{
                            top: 13,
                            left: 13,
                            bottom: 13,
                            right: 13
                        }}
                    >
                        <Icon
                            name={leftIcon}
                            size={25}
                            style={[
                                {
                                    paddingLeft: 10,
                                    padding: 4,
                                    color: transparent ? colors.dark2 : colors.primary,
                                },
                                styles.leftIcon,
                                leftIconStyle && leftIconStyle,
                            ]}
                        />
                    </TouchableOpacity>
                ) : hederTitle
            }
            centerComponent={displayTitle()}
            rightComponent={!rightComponent ? (
                <View style={styles.rightContainer}>
                    {filterProps && (
                        <View style={styles.filterColumn}>
                            <Filter
                                {...filterProps}
                            />
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={rightIconPress && rightIconPress}
                        hitSlop={{
                            top: 13,
                            left: 13,
                            bottom: 13,
                            right: 13
                        }}
                    >
                        <View
                            style={[styles.rightBtn, hasCircle && styles.hasCircle]}
                        >
                            <View>
                                {rightIconHint && (
                                    <Text
                                        style={[styles.rightBtnTitle,
                                        rightIconHintStyle && rightIconHintStyle]}
                                    >
                                        {rightIconHint}
                                    </Text>
                                )}
                            </View>

                            <View>
                                {rightIconPress && !rightIconHint && (
                                    <Icon
                                        name={rightIcon}
                                        size={18}
                                        style={{
                                            color: transparent && hasCircle ? colors.white : colors.primary,
                                        }}
                                        {...rightIconProps}
                                    />
                                )}

                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : rightComponent
            }
            containerStyle={[
                styles.containerStyle,
                transparent && styles.transparent,
                noBorder && styles.borderBottom
            ]}
        />
    );
};
