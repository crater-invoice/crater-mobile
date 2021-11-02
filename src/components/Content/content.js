import React from 'react';
import {Loading, Empty} from '..';
import {FadeAnimation} from '../animations';
import {ITheme} from '@/interfaces';

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

interface IProps {
  /**
   * Either children or a render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  children?: React.ReactNode | any;

  /**
   * If true, show loader together with content.
   */
  withLoading?: boolean;

  /**
   * An additional loading accessibility.
   */
  loadingProps?: any;

  /**
   * An additional empty content accessibility.
   */
  emptyProps?: any;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;
}
