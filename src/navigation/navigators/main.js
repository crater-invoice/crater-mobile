import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import styled from 'styled-components/native';
import t from 'locales/use-translation';
import InvoicesContainer from '../../features/invoices/containers/Invoices';
import CustomersContainer from '../../features/customers/containers/Customers';
import MoreContainer from '../../features/more/containers/More';
import ExpensesContainer from '../../features/expenses/containers/Expenses';
import PaymentsContainer from '../../features/payments/containers/Payments';
import {routes} from '../routes';
import {fonts} from '@/styles';
import {AssetSvg} from '@/components';
import {defineSize, isEmpty} from '@/constants';
import {PermissionService} from '@/services';
import {commonSelector} from 'stores/common/selectors';
import {
  CUSTOMERS_ICON,
  EXPENSES_ICON,
  INVOICES_ICON,
  MORE_ICON,
  PAYMENTS_ICON
} from '@/assets';

const Container = styled(View)`
  flex-direction: row;
  padding-bottom: ${defineSize(0, 0, 0, 30)};
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
  font-family: ${fonts.medium};
  color: ${props => props.color};
  padding-top: 3.5;
  text-align: center;
  align-self: center;
  ${props => props.style};
`;

const Tab = (props: any) => {
  const {navigation, theme} = props;

  const getTab = route => {
    switch (route) {
      case routes.MAIN_INVOICES:
        return {
          label: 'tabNavigation.invoices',
          icon: INVOICES_ICON
        };

      case routes.MAIN_CUSTOMERS:
        return {
          label: 'tabNavigation.customers',
          icon: CUSTOMERS_ICON
        };

      case routes.MAIN_PAYMENTS:
        return {
          label: 'tabNavigation.payments',
          icon: PAYMENTS_ICON
        };

      case routes.MAIN_EXPENSES:
        return {
          label: 'tabNavigation.expenses',
          icon: EXPENSES_ICON
        };

      case routes.MAIN_MORE:
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

  if (isEmpty(PermissionService.permissions)) {
    return null;
  }

  return (
    <Container backgroundColor={theme?.tabNavigator?.backgroundColor}>
      {navigation?.state &&
        navigation?.state.routes.map((route, index) => {
          if (
            route.routeName !== routes.MAIN_MORE &&
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

          const {label, icon} = getTab(route.routeName);

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
                  textShadowOffset: {width: 0.1, height: 0},
                  textShadowRadius: 0.1
                }
              : {};

          return (
            <Button
              accessibilityRole="button"
              onPress={onPress}
              activeOpacity={0.7}
              key={index}
              backgroundColor={theme?.tabNavigator?.backgroundColor}
            >
              <AssetSvg name={icon} fill={iconColor} />
              <Label color={labelColor} style={labelStyle}>
                {t(label)}
              </Label>
            </Button>
          );
        })}
    </Container>
  );
};

const mapStateToProps = state => ({
  ...commonSelector(state)
});

const BottomTab = connect(mapStateToProps)(Tab);

export default createBottomTabNavigator(
  {
    [routes.MAIN_INVOICES]: {
      screen: InvoicesContainer
    },
    [routes.MAIN_CUSTOMERS]: {
      screen: CustomersContainer
    },
    [routes.MAIN_PAYMENTS]: {
      screen: PaymentsContainer
    },
    [routes.MAIN_EXPENSES]: {
      screen: ExpensesContainer
    },
    [routes.MAIN_MORE]: {
      screen: MoreContainer
    }
  },
  {
    initialRouteName: routes.MAIN_INVOICES,
    lazy: false,
    navigationOptions: {
      header: null,
      headerTitleAllowFontScaling: false
    },
    tabBarComponent: BottomTab
  }
);
