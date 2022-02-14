import React from 'react';
import {StackActions} from '@react-navigation/native';
import {TransitionPresets} from '@react-navigation/stack';
import {CommonActions} from '@react-navigation/native';
import {PermissionService} from '@/services';
import {routes} from './navigation-routes';
import {SCREEN_WIDTH} from '@/helpers/size';

export const navigatorOptions = {
  animationEnabled: true,
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
  gestureResponseDistance: {horizontal: SCREEN_WIDTH * 0.9, vertical: 200}
};

export let navigationRef: any = React.createRef();

export function navigateTo({route, params = {}}) {
  navigationRef?.current?.navigate?.(route, params);
}

export function resetNavigation() {
  navigationRef?.current?.dispatch?.(StackActions.replace(routes.MAIN_TABS));
}

export function goBack() {
  navigationRef?.current?.goBack?.(null);
}

export const navigation = {
  navigateTo,
  goBack
};

export const getActiveMainTab = () => {
  if (PermissionService.isAllowToView(routes.MAIN_INVOICES)) {
    return routes.MAIN_INVOICES;
  }

  if (PermissionService.isAllowToView(routes.MAIN_CUSTOMERS)) {
    return routes.MAIN_CUSTOMERS;
  }

  if (PermissionService.isAllowToView(routes.MAIN_PAYMENTS)) {
    return routes.MAIN_PAYMENTS;
  }

  if (PermissionService.isAllowToView(routes.MAIN_EXPENSES)) {
    return routes.MAIN_EXPENSES;
  }

  return routes.MAIN_MORE;
};

export const dismissRoute = (route, callback = null) => {
  navigationRef?.current?.dispatch?.(state => {
    const filteredRoutes = state.routes.filter(r => r.name !== route);

    return CommonActions.reset({
      ...state,
      routes: filteredRoutes,
      index: filteredRoutes.length - 1
    });
  });

  setTimeout(() => callback?.(), 100);
};
