// @flow

import React from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { styles, Container } from './styles';
import { InputField, CtHeader, CtDivider } from '../..';
import { Content } from '../../Content';
import Lng from '@/lang/i18n';
import { Toast } from '@/components';
import { STATUS_BAR_CONTENT } from '@/utils';

type IProps = {
    children: any,
    headerProps?: any,
    onSearch?: Function,
    bottomDivider?: Boolean,
    hasSearchField?: Boolean,
    onToggleFilter?: Function,
    filterProps?: Object,
    inputProps?: Object,
    dividerStyle?: Object,
    loadingProps?: Object,
    searchFieldProps?: any,
    toastProps?: any
};

const Layout = ({
    children,
    headerProps,
    onSearch,
    bottomDivider,
    hasSearchField = true,
    bottomAction,
    filterProps,
    inputProps,
    dividerStyle,
    loadingProps,
    locale,
    searchFieldProps,
    toastProps,
    theme
}: IProps) => {
    let hasFilter = filterProps ? { ...filterProps } : null;

    return (
        <Container>
            <StatusBar
                barStyle={STATUS_BAR_CONTENT[(theme?.mode)]}
                hidden={false}
                translucent={true}
                backgroundColor={theme?.backgroundColor}
            />

            <View style={styles.content}>
                <CtHeader
                    titleStyle={{
                        ...styles.headerTitleStyle(
                            theme,
                            headerProps?.leftIcon || headerProps?.leftIconPress
                        ),
                        ...headerProps?.withTitleStyle
                    }}
                    placement="left"
                    transparent
                    noBorder
                    hasCircle
                    {...((headerProps?.leftIcon ||
                        headerProps?.leftIconPress) && {
                        leftArrow: 'secondary'
                    })}
                    containerStyle={styles.header}
                    {...headerProps}
                    filterProps={hasFilter}
                    theme={theme}
                />

                {hasSearchField && (
                    <View style={styles.searchFieldContainer}>
                        <Field
                            name="search"
                            component={InputField}
                            inputProps={{
                                returnKeyType: 'next',
                                autoCapitalize: 'none',
                                placeholder: Lng.t('search.title', { locale }),
                                autoCorrect: true,
                                ...inputProps
                            }}
                            onChangeText={onSearch}
                            height={40}
                            rounded
                            fieldStyle={{
                                ...styles.inputField,
                                ...searchFieldProps?.inputFieldStyle
                            }}
                            {...searchFieldProps}
                        />
                    </View>
                )}

                {bottomDivider && (
                    <CtDivider
                        dividerStyle={dividerStyle && dividerStyle}
                        theme={theme}
                    />
                )}

                <Content loadingProps={loadingProps} theme={theme}>
                    {children}
                </Content>
            </View>

            {bottomAction && (
                <View style={styles.bottomView(theme)}>{bottomAction}</View>
            )}

            {toastProps && (
                <Toast containerStyle={{ bottom: 20 }} {...toastProps} />
            )}
        </Container>
    );
};

const mapStateToProps = ({ global }) => ({
    locale: global?.locale,
    theme: global?.theme
});

//  connect
export const MainLayout = connect(
    mapStateToProps,
    {}
)(Layout);
