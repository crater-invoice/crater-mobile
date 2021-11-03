import React from 'react';
import {Loading} from '../loading';
import {Empty} from '../empty';
import {FadeAnimation} from '../animations';
import {IProps} from './type.d';

export const Content = ({
  children,
  withLoading = false,
  loadingProps,
  emptyProps,
  theme
}: IProps) => {
  if (emptyProps?.is) {
    return <Empty {...emptyProps} theme={theme} />;
  }

  if (withLoading) {
    return (
      <>
        {children}
        {loadingProps && loadingProps.is && (
          <Loading
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
            {...loadingProps}
            theme={theme}
          />
        )}
      </>
    );
  }

  if (loadingProps?.is) {
    return <Loading {...loadingProps} theme={theme} />;
  }

  return <FadeAnimation>{children}</FadeAnimation>;
};
