import React from 'react';
import {View as RNView} from 'react-native';
import styled, {css} from 'styled-components/native';
import {ifProp, prop} from 'styled-tools';
import {applyDivisionProp, applyProp, getClass, hasProp} from '@/utils';

const CtView = ({children, ...props}) => <RNView {...props}>{children}</RNView>;

const StyledView = styled(CtView)`
  ${ifProp(
    'width',
    css`
      width: ${prop('width')};
    `
  )};

  ${ifProp(
    'height',
    css`
      height: ${prop('height')};
    `
  )};

  ${ifProp(
    'background-color',
    css`
      background-color: ${prop('background-color')};
    `
  )};

  ${ifProp(
    'border-width',
    css`
      border-width: ${prop('border-width')};
    `
  )};

  ${ifProp(
    'border-color',
    css`
      border-color: ${prop('border-color')};
    `
  )};

  ${props =>
    hasProp(props, 'radius') &&
    css`
      border-radius: ${applyProp(props, 'radius')};
    `};

  ${ifProp(
    'overflow-hidden',
    css`
      overflow: hidden;
    `
  )};

  ${ifProp(
    'justify-center',
    css`
      justify-content: center;
    `
  )};

  ${ifProp(
    'justify-end',
    css`
      justify-content: flex-end;
    `
  )};

  ${ifProp(
    'justify-between',
    css`
      justify-content: space-between;
    `
  )};

  ${ifProp(
    'items-center',
    css`
      align-items: center;
    `
  )}

  ${ifProp(
    'items-end',
    css`
      align-items: flex-end;
    `
  )}

  ${ifProp(
    'flex-row',
    css`
      flex-direction: row;
    `
  )};

  ${ifProp(
    'flex',
    css`
      flex: ${prop('flex')};
    `
  )};

  ${props =>
    hasProp(props, 'opacity-') &&
    css`
      opacity: ${applyDivisionProp(props, 'opacity-')};
    `};

  ${/* Margin */ ''}
  ${props =>
    hasProp(props, 'mx-') &&
    css`
      margin-horizontal: ${applyProp(props, 'mx-')};
    `};

  ${props =>
    hasProp(props, 'lg:max-') &&
    css`
      margin-horizontal: ${applyProp(props, 'lg:max-')};
    `};

  ${props =>
    hasProp(props, 'my-') &&
    css`
      margin-vertical: ${applyProp(props, 'my-')};
    `};

  ${props =>
    hasProp(props, 'lg:my-') &&
    css`
      margin-vertical: ${applyProp(props, 'lg:my-')};
    `};

  ${props =>
    hasProp(props, 'mt-') &&
    css`
      margin-top: ${applyProp(props, 'mt-')};
    `};

  ${props =>
    hasProp(props, 'lg:mt-') &&
    css`
      margin-top: ${applyProp(props, 'lg:mt-')};
    `};

  ${props =>
    hasProp(props, 'mb-') &&
    css`
      margin-bottom: ${applyProp(props, 'mb-')};
    `};

  ${props =>
    hasProp(props, 'lg:mb-') &&
    css`
      margin-bottom: ${applyProp(props, 'lg:mb-')};
    `};

  ${props =>
    hasProp(props, 'ml-') &&
    css`
      margin-left: ${applyProp(props, 'ml-')};
    `};

  ${props =>
    hasProp(props, 'lg:ml-') &&
    css`
      margin-left: ${applyProp(props, 'lg:ml-')};
    `};

  ${props =>
    hasProp(props, 'mr-') &&
    css`
      margin-right: ${applyProp(props, 'mr-')};
    `};

  ${props =>
    hasProp(props, 'lg:mr-') &&
    css`
      margin-right: ${applyProp(props, 'lg:mr-')};
    `};

  ${/* Padding */ ''}
  ${props =>
    hasProp(props, 'px-') &&
    css`
      padding-horizontal: ${applyProp(props, 'px-')};
    `};

  ${props =>
    hasProp(props, 'lg:px-') &&
    css`
      padding-horizontal: ${applyProp(props, 'lg:px-')};
    `};

  ${props =>
    hasProp(props, 'py-') &&
    css`
      padding-vertical: ${applyProp(props, 'py-')};
    `};

  ${props =>
    hasProp(props, 'lg:py-') &&
    css`
      padding-vertical: ${applyProp(props, 'lg:py-')};
    `};

  ${props =>
    hasProp(props, 'pt-') &&
    css`
      padding-top: ${applyProp(props, 'pt-')};
    `};

  ${props =>
    hasProp(props, 'lg:pt-') &&
    css`
      padding-top: ${applyProp(props, 'lg:pt-')};
    `};

  ${props =>
    hasProp(props, 'pb-') &&
    css`
      padding-bottom: ${applyProp(props, 'pb-')};
    `};

  ${props =>
    hasProp(props, 'lg:pb-') &&
    css`
      padding-bottom: ${applyProp(props, 'lg:pb-')};
    `};

  ${props =>
    hasProp(props, 'pl-') &&
    css`
      padding-left: ${applyProp(props, 'pl-')};
    `};

  ${props =>
    hasProp(props, 'lg:pl-') &&
    css`
      padding-left: ${applyProp(props, 'lg:pl-')};
    `};

  ${props =>
    hasProp(props, 'pr-') &&
    css`
      padding-right: ${applyProp(props, 'pr-')};
    `};

  ${props =>
    hasProp(props, 'lg:pr-') &&
    css`
      padding-right: ${applyProp(props, 'lg:pr-')};
    `};

  ${prop('style')};
`;

export const View = props => {
  return (
    <StyledView {...getClass(props.class)} {...props}>
      {props.children}
    </StyledView>
  );
};
