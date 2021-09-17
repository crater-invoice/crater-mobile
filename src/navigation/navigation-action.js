import React from 'react';
import {TransitionPresets} from '@react-navigation/stack';

export const navigatorOptions = {
  animationEnabled: true,
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS
};

export let navigationRef: any = React.createRef();

export function navigateTo({route, params = {}}) {
  navigationRef?.current?.navigate?.(route, params);
}
