// @flow

import React from 'react';
import {
    View,
    KeyboardAvoidingView,
    ScrollView,
    StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { styles, Container } from './styles';
import { CtHeader } from '../..';
import { Content } from '../../Content';
import Dropdown from '../../Dropdown';
import { ARROW_ICON } from '@/assets';
import { isIosPlatform } from '@/constants';
import { Toast } from '@/components';
import { STATUS_BAR_CONTENT } from '@/utils';

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

const Layout = ({
    children,
    headerProps,
    rightIcon,
    bottomAction,
    loadingProps,
    dropdownProps,
    hideScrollView = false,
    contentProps,
    keyboardProps,
    toastProps,
    theme
}: IProps) => {
    const keyboardVerticalOffset = isIosPlatform() ? 60 : 0;

    return (
        <Container>
            <StatusBar
                barStyle={STATUS_BAR_CONTENT[(theme?.mode)]}
                hidden={false}
                translucent={true}
                backgroundColor={theme?.secondaryBgColor}
            />

            <CtHeader
                titleStyle={{
                    ...styles.headerTitleStyle(theme),
                    ...headerProps?.withTitleStyle
                }}
                placement="center"
                leftIcon={ARROW_ICON}
                rightIcon={rightIcon}
                theme={theme}
                containerStyle={styles.header}
                {...headerProps}
                rightComponent={
                    dropdownProps && (
                        <Dropdown {...dropdownProps} theme={theme} />
                    )
                }
            />

            <Content
                {...contentProps}
                loadingProps={loadingProps}
                theme={theme}
            >
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

            {bottomAction}

            {toastProps && <Toast {...toastProps} />}
        </Container>
    );
};

const mapStateToProps = ({ global }) => ({
    locale: global?.locale,
    theme: global?.theme
});

export const DefaultLayout = connect(
    mapStateToProps,
    {}
)(Layout);
