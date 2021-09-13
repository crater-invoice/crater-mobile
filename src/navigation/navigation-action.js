import * as React from 'react';
import {TransitionPresets} from '@react-navigation/stack';

export const navigatorOptions = {
  animationEnabled: true,
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS
};


export const navigationRef: any = React.createRef<any>();