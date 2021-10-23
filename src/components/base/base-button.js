import React from 'react';
import {View as RNView} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components/native';
import {View, Text, ButtonView, Loading} from '@/components';
import {commonSelector} from 'stores/common/selectors';
import {colors} from '@/styles';
import {ITheme} from '@/interfaces';
import {defineSize, isEmpty} from '@/constants';

interface IProps {
  /**
   * Click action.
   */
  onPress?: () => void;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;

  /**
   * The loading indicator for the button.
   */
  loading?: boolean;

  /**
   * If true, disable press event.
   */
  disabled?: boolean;

  /**
   * The component to render elements.
   */
  children: any;

  /**
   * Type of button.
   */
  type?: 'primary' | 'danger';

  /**
   * If true, show base button.
   */
  show?: boolean;
}

export const Button = (props: IProps) => {
  const {onPress, theme, loading, disabled, children, type = 'primary'} = props;

  const bgColor = {
    primary: {
      light: colors.primary,
      dark: colors.primaryLight
    },
    danger: {
      light: colors.danger,
      dark: colors.danger
    }
  };

  return (
    <ButtonView
      onPress={onPress}
      background-color={bgColor?.[type]?.[theme?.mode]}
      radius-5
      class="justify-center items-center"
      width="100%"
      height="39"
      disabled={disabled || loading}
      opacity={disabled ? 0.7 : 1}
    >
      {!loading ? (
        <Text white h5 medium>
          {children}
        </Text>
      ) : (
        <Loading size="small" color={colors.white} />
      )}
    </ButtonView>
  );
};

const mapStateToProps = state => commonSelector(state);

export const BaseButton = connect(mapStateToProps)(Button);

export const BaseButtonGroup = props => {
  const {children} = props;
  const isMoreThanTwo = children?.length >= 2;
  const baseButtons = [];

  const buttons = button => {
    if (button?.props && button.props.hasOwnProperty('show')) {
      button.props.show &&
        baseButtons.push(<View class="flex-1 mx-15">{button}</View>);
    }
  };

  if (!isMoreThanTwo) {
    buttons(children);
  } else {
    children.map(c => buttons(c));
  }

  if (isEmpty(baseButtons)) return null;

  return (
    <Container>
      <Row>{baseButtons}</Row>
    </Container>
  );
};

const Container = styled(RNView)`
  background-color: ${props => props.theme?.secondaryBgColor};
  border-color: ${props => props.theme?.input?.borderColor};
  padding-vertical: 15;
  padding-horizontal: 10;
  padding-bottom: ${defineSize(14, 14, 14, 35)};
  border-top-width: 1;
`;

const Row = styled(RNView)`
  flex-direction: row;
  justify-content: space-between;
`;
