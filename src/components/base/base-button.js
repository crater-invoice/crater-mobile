import React from 'react';
import {View as RNView, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {LinearGradient} from 'expo-linear-gradient';
import styled from 'styled-components/native';
import {View, Text, ButtonView, Loading} from '@/components';
import {commonSelector} from 'stores/common/selectors';
import {colors} from '@/styles';
import {ITheme} from '@/interfaces';
import {defineLargeSizeParam, defineSize, isEmpty} from '@/constants';

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
  type?: 'primary' | 'danger' | 'primary-gradient';

  /**
   * Size of button.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * If true, show base button.
   */
  show?: boolean;

  /**
   * The style of the content container(Button).
   */
  class?: string;

  /**
   * The style of the content container(Button).
   */
  style?: StyleProp<ViewStyle> | undefined;
}

export const Button = (props: IProps) => {
  const {
    onPress,
    theme,
    loading,
    disabled,
    type = 'primary',
    size = 'md',
    style
  } = props;

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
  const height = {
    sm: defineLargeSizeParam(33, 30),
    md: defineLargeSizeParam(41, 39),
    lg: defineLargeSizeParam(44, 42)
  };

  const label = (
    <Text white h5 medium>
      {props.children}
    </Text>
  );
  const spinner = <Loading size="small" color={colors.white} />;
  const children = !loading ? label : spinner;
  const gradientStyle = {
    colors: [colors.primary, colors.primaryLight],
    start: {x: 0, y: 0.5},
    end: {x: 1, y: 0.5},
    style: styles.gradient
  };

  return (
    <View class={props['base-class']}>
      <ButtonView
        onPress={onPress}
        background-color={bgColor?.[type]?.[theme?.mode]}
        radius-5
        width="100%"
        height={height[size]}
        class={`justify-center items-center overflow-hidden ${props.class}`}
        style={style}
        disabled={disabled || loading}
        opacity={disabled ? 0.7 : 1}
      >
        {type === 'primary-gradient' ? (
          <LinearGradient {...gradientStyle}>{children}</LinearGradient>
        ) : (
          children
        )}
      </ButtonView>
    </View>
  );
};

const mapStateToProps = state => commonSelector(state);

export const BaseButton = connect(mapStateToProps)(Button);

export const BaseButtonGroup = props => {
  const {children} = props;
  const isMoreThanTwo = children?.length >= 2;
  const baseButtons = [];

  const buttons = button => {
    const canCheckVisibility =
      button?.props && button.props.hasOwnProperty('show');
    if (canCheckVisibility) {
      button.props.show &&
        baseButtons.push(<View class="flex-1 mx-15">{button}</View>);
    } else {
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

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
