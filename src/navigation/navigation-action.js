import React from 'react';
import {TransitionPresets} from '@react-navigation/stack';
import {PermissionService} from '@/services';
import {routes} from './navigation-routes';

export const navigatorOptions = {
  animationEnabled: true,
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS
};

export let navigationRef: any = React.createRef();

export function navigateTo({route, params = {}}) {
  navigationRef?.current?.navigate?.(route, params);
}

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
