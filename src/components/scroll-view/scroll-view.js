import React from 'react';
import {ScrollView as Scroll} from 'react-native';

export const ScrollView = ({children, scrollViewProps}) => {
  return (
    <Scroll
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      {...scrollViewProps}
    >
      {children}
    </Scroll>
  );
};
