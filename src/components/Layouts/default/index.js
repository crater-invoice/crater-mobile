// @flow

import React from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { styles } from './styles';
import { Field } from 'redux-form';
import { InputField, CtHeader, CtDivider } from '../..';
import { Content } from '../../Content';
import Dropdown from '../../Dropdown';
import Toast from '../../Toast';

type IProps = {
    children?: Object,
    headerProps?: Object,
    hasRightButton?: Boolean,
    rightIcon?: String,
    bottomAction?: any,
    loadingProps?: Object,
    dropdownProps?: Object,
    toastProps?: Object
};

export const DefaultLayout = ({
    children,
    headerProps,
    rightIcon,
    bottomAction,
    loadingProps,
    dropdownProps,
    toastProps,
    hideScrollView = false
}: IProps) => {
    return (
        <View style={styles.page}>
            {toastProps && <Toast {...toastProps} />}

            <View style={styles.headerContainer}>
                <CtHeader
                    titleStyle={styles.headerTitleStyle}
                    placement="center"
                    leftIcon={'long-arrow-alt-left'}
                    rightIcon={rightIcon}
                    {...headerProps}
                    rightComponent={
                        dropdownProps && <Dropdown {...dropdownProps} />
                    }
                />
            </View>

            <Content loadingProps={loadingProps}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flex: 1 }}
                    keyboardVerticalOffset={0}
                    behavior="height"
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
        </View>
    );
};
