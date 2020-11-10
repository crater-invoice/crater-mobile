// @flow

import React from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { styles } from './styles';
import { InputField, CtHeader, CtDivider } from '../..';
import { Content } from '../../Content';
import Lng from '@/lang/i18n';

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
    searchFieldProps?: any
};

const MainLayoutComponent = ({
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
    searchFieldProps
}: IProps) => {
    let hasFilter = filterProps ? { ...filterProps } : null;

    return (
        <View style={styles.page}>
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                translucent={true}
            />

            <View style={styles.content}>
                <CtHeader
                    titleStyle={styles.headerTitleStyle}
                    placement="left"
                    transparent
                    noBorder
                    hasCircle
                    {...headerProps}
                    filterProps={hasFilter}
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
                            fieldStyle={styles.inputField}
                            {...searchFieldProps}
                        />
                    </View>
                )}

                {bottomDivider && (
                    <CtDivider dividerStyle={dividerStyle && dividerStyle} />
                )}

                <Content loadingProps={loadingProps}>{children}</Content>
            </View>

            {bottomAction && (
                <View style={styles.bottomView}>{bottomAction}</View>
            )}
        </View>
    );
};

const mapStateToProps = ({ global }) => ({
    locale: global?.locale
});

//  connect
export const MainLayout = connect(
    mapStateToProps,
    {}
)(MainLayoutComponent);
