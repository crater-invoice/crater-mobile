import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styled from 'styled-components/native';
import t from 'locales/use-translation';

import {routes} from './navigation-routes';
import {fonts} from '@/styles';
import {AssetSvg} from '@/components';
import {defineSize} from '@/helpers/size';
import {PermissionService} from '@/services';
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

export default (props: any) => {
  const {isKeyboardOpen, navigation, state, theme} = props;

  if (isKeyboardOpen) {
    return <React.Fragment />;
  }

  const getTab = route => {
    switch (route) {
      case routes.MAIN_INVOICES:
        return {
          label: 'tab_navigation.invoices',
          icon: INVOICES_ICON
        };

      case routes.MAIN_CUSTOMERS:
        return {
          label: 'tab_navigation.customers',
          icon: CUSTOMERS_ICON
        };

      case routes.MAIN_PAYMENTS:
        return {
          label: 'tab_navigation.payments',
          icon: PAYMENTS_ICON
        };

      case routes.MAIN_EXPENSES:
        return {
          label: 'tab_navigation.expenses',
          icon: EXPENSES_ICON
        };

      case routes.MAIN_MORE:
        return {
          label: 'tab_navigation.more',
          icon: MORE_ICON
        };

      default:
        return {
          label: 'tab_navigation.invoices',
          icon: INVOICES_ICON
        };
    }
  };

  return (
    <Container backgroundColor={theme?.tabNavigator?.backgroundColor}>
      {state &&
        state.routes.map((route, index) => {
          if (
            route.name !== routes.MAIN_MORE &&
            !PermissionService.isAllowToView(route.name)
          ) {
            return null;
          }

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const {label, icon} = getTab(route.name);

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
              <Label
                color={labelColor}
                style={labelStyle}
                allowFontScaling={false}
              >
                {t(label)}
              </Label>
            </Button>
          );
        })}
    </Container>
  );
};
