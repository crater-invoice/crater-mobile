import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import Lng from '@/lang/i18n';
import InvoicesContainer from '../../features/invoices/containers/Invoices';
import CustomersContainer from '../../features/customers/containers/Customers';
import MoreContainer from '../../features/more/containers/More';
import ExpensesContainer from '../../features/expenses/containers/Expenses';
import PaymentsContainer from '../../features/payments/containers/Payments';
import { ROUTES } from '../routes';
import { fonts } from '@/styles';
import { AssetSvg } from '@/components';
import { isIPhoneX } from '@/constants';
import { PermissionService } from '@/services';
import {
    CUSTOMERS_ICON,
    EXPENSES_ICON,
    INVOICES_ICON,
    MORE_ICON,
    PAYMENTS_ICON
} from '@/assets';

const Container = styled(View)`
    flex-direction: row;
    padding-bottom: ${isIPhoneX() ? 30 : 0};
    background-color: ${props => props.backgroundColor};
`;

const Button = styled(TouchableOpacity)`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-top: 15;
    padding-bottom: 11;
    background-color: ${props => props.backgroundColor};
`;

const Label = styled(Text)`
    margin-top: 4px;
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.7;
    font-family: ${fonts.poppinsMedium};
    color: ${props => props.color};
    padding-top: 3.5;
    text-align: center;
    align-self: center;
    ${props => props.style};
`;

const Tab = (props: any) => {
    const { navigation, locale, theme } = props;

    const getTab = route => {
        switch (route) {
            case ROUTES.MAIN_INVOICES:
                return {
                    label: 'tabNavigation.invoices',
                    icon: INVOICES_ICON
                };

            case ROUTES.MAIN_CUSTOMERS:
                return {
                    label: 'tabNavigation.customers',
                    icon: CUSTOMERS_ICON
                };

            case ROUTES.MAIN_PAYMENTS:
                return {
                    label: 'tabNavigation.payments',
                    icon: PAYMENTS_ICON
                };

            case ROUTES.MAIN_EXPENSES:
                return {
                    label: 'tabNavigation.expenses',
                    icon: EXPENSES_ICON
                };

            case ROUTES.MAIN_MORE:
                return {
                    label: 'tabNavigation.more',
                    icon: MORE_ICON
                };

            default:
                return {
                    label: 'tabNavigation.invoices',
                    icon: INVOICES_ICON
                };
        }
    };

    return (
        <Container backgroundColor={theme?.tabNavigator?.backgroundColor}>
            {navigation?.state &&
                navigation?.state.routes.map((route, index) => {
                    if (
                        route.routeName !== ROUTES.MAIN_MORE &&
                        !PermissionService.isAllowToView(route.routeName)
                    ) {
                        return null;
                    }

                    const isFocused = navigation?.state.index === index;

                    const onPress = () => {
                        if (!isFocused) {
                            navigation.navigate(route.routeName);
                        }
                    };

                    const { label, icon } = getTab(route.routeName);

                    const iconColor = isFocused
                        ? theme?.tabNavigator?.activeIconColor
                        : theme?.tabNavigator?.inActiveIconColor;

                    const labelColor = isFocused
                        ? theme?.tabNavigator?.activeTextColor
                        : theme?.tabNavigator?.inActiveTextColor;

                    const labelStyle =
                        theme?.mode === 'dark'
                            ? {
                                  textShadowColor: labelColor,
                                  textShadowOffset: { width: 0.1, height: 0 },
                                  textShadowRadius: 0.1
                              }
                            : {};

                    return (
                        <Button
                            accessibilityRole="button"
                            onPress={onPress}
                            activeOpacity={0.7}
                            key={index}
                            backgroundColor={
                                theme?.tabNavigator?.backgroundColor
                            }
                        >
                            <AssetSvg name={icon} fill={iconColor} />
                            <Label color={labelColor} style={labelStyle}>
                                {Lng.t(label, { locale })}
                            </Label>
                        </Button>
                    );
                })}
        </Container>
    );
};

const BottomTab = connect(
    ({ global }) => ({
        theme: global?.theme,
        locale: global?.locale
    }),
    {}
)(Tab);

export default createBottomTabNavigator(
    {
        [ROUTES.MAIN_INVOICES]: {
            screen: InvoicesContainer
        },
        [ROUTES.MAIN_CUSTOMERS]: {
            screen: CustomersContainer
        },
        [ROUTES.MAIN_PAYMENTS]: {
            screen: PaymentsContainer
        },
        [ROUTES.MAIN_EXPENSES]: {
            screen: ExpensesContainer
        },
        [ROUTES.MAIN_MORE]: {
            screen: MoreContainer
        }
    },
    {
        initialRouteName: ROUTES.MAIN_INVOICES,
        navigationOptions: {
            header: null,
            headerTitleAllowFontScaling: false
        },
        tabBarComponent: BottomTab
    }
);
