// @flow

import React from 'react';
import {
    View,
    KeyboardAvoidingView,
    ScrollView,
    StatusBar
} from 'react-native';
import { styles } from './styles';
import { CtHeader } from '../..';
import { Content } from '../../Content';
import Dropdown from '../../Dropdown';
import { ARROW_ICON } from '@/assets';
import { isIosPlatform } from '@/constants';
import { Toast } from '@/components';

type IProps = {
    children?: Object,
    headerProps?: Object,
    hasRightButton?: Boolean,
    rightIcon?: String,
    bottomAction?: any,
    loadingProps?: Object,
    dropdownProps?: Object,
    contentProps?: any,
    hideScrollView?: boolean,
    keyboardProps?: any,
    toastProps?: any
};

export const DefaultLayout = ({
    children,
    headerProps,
    rightIcon,
    bottomAction,
    loadingProps,
    dropdownProps,
    hideScrollView = false,
    contentProps,
    keyboardProps,
    toastProps
}: IProps) => {
    const keyboardVerticalOffset = isIosPlatform() ? 60 : 0;

    return (
        <View style={styles.page}>
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                translucent={true}
            />

            <View style={styles.headerContainer}>
                <CtHeader
                    titleStyle={styles.headerTitleStyle}
                    placement="center"
                    leftIcon={ARROW_ICON}
                    rightIcon={rightIcon}
                    {...headerProps}
                    rightComponent={
                        dropdownProps && <Dropdown {...dropdownProps} />
                    }
                />
            </View>

            <Content {...contentProps} loadingProps={loadingProps}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flex: 1 }}
                    keyboardVerticalOffset={keyboardVerticalOffset}
                    behavior="height"
                    {...keyboardProps}
                >
                    {hideScrollView ? (
                        children
                    ) : (
                        <ScrollView keyboardShouldPersistTaps="handled">
                            {children}
                        </ScrollView>
                    )}
                </KeyboardAvoidingView>
            </Content>

            {bottomAction && (
                <View style={styles.bottomView}>{bottomAction}</View>
            )}

            {toastProps && <Toast {...toastProps} />}
        </View>
    );
};
