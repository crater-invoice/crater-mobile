import React from 'react';
import {View as RNView, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {LinearGradient} from 'expo-linear-gradient';
import styled from 'styled-components/native';
import {View, Text, ButtonView, Loading} from '@/components';
import {commonSelector} from 'stores/common/selectors';
import {colors} from '@/styles';
import {ITheme} from '@/interfaces';
import {isEmpty} from '@/constants';
import {isAndroidPlatform} from '@/helpers/platform';
import {defineSize, defineLargeSizeParam} from '@/helpers/size';

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
  sm: defineLargeSizeParam(32, 30),
  md: defineLargeSizeParam(42, 40),
  lg: defineLargeSizeParam(44, 42)
};

export const Button = (props: IProps) => {
  const {
    onPress,
    theme,
    loading,
    disabled,
    type = 'primary',
    size = 'md',
    style,
    additionalProps,
    labelComponent
  } = props;
  const isOutline = type.includes('outline');
  const label = !labelComponent ? (
    <Text
      h5
      white
      medium
      style={[styles.text, isOutline && styles.outlineText(props)]}
    >
      {props.children}
    </Text>
  ) : (
    labelComponent
  );
  const spinner = (
    <Loading
      size="small"
      color={
        !isOutline ? colors.white : bgColor?.[outlineType(type)]?.[theme?.mode]
      }
    />
  );
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
        style={isOutline && styles.outlineView(props)}
        {...additionalProps}
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

  const buttons = (button, i = 0) => {
    const canCheckVisibility =
      button?.props && button.props.hasOwnProperty('show');
    if (canCheckVisibility) {
      button.props.show &&
        baseButtons.push(
          <View class="flex-1 mx-15" key={i}>
            {button}
          </View>
        );
    } else {
      baseButtons.push(
        <View class="flex-1 mx-15" key={i}>
          {button}
        </View>
      );
    }
  };

  if (!isMoreThanTwo) {
    buttons(children);
  } else {
    children.map((c, i) => buttons(c, i));
  }

  if (isEmpty(baseButtons)) return null;

  if (props?.['hide-container-style']) {
    return <Row>{baseButtons}</Row>;
  }

  return (
    <Container>
      <Row>{baseButtons}</Row>
    </Container>
  );
};

const Container = styled(RNView)`
  background-color: ${props => props.theme?.secondaryBgColor};
  border-color: ${props => props.theme?.input?.borderColor};
  padding-horizontal: 10;
  padding-top: ${defineSize(16, 16, 16, 18)};
  padding-bottom: ${defineSize(15, 15, 15, 35)};
  border-top-width: 1;
`;

const Row = styled(RNView)`
  flex-direction: row;
  justify-content: space-between;
`;

const outlineType = type => (type ? type.split('-')[0] : 'primary');

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  outlineView: ({type, theme}) => ({
    borderWidth: 1,
    borderColor: bgColor?.[outlineType(type)]?.[theme?.mode]
  }),
  text: {
    ...(isAndroidPlatform && {
      paddingTop: 2
    })
  },
  outlineText: ({type, theme}) => ({
    color: bgColor?.[outlineType(type)]?.[theme?.mode]
  })
});

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
   * If true the user won't be able to press.
   * @default false
   */
  disabled?: boolean;

  /**
   * The component to render elements.
   */
  children?: any;

  /**
   * Type of button.
   */
  type?:
    | 'primary'
    | 'primary-gradient'
    | 'primary-outline'
    | 'danger'
    | 'danger-outline';

  /**
   * Size of button.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * If true, show base button.
   */
  show?: boolean;

  /**
   * Styling for the button container via class.
   */
  class?: string;

  /**
   * Styling for the button container.
   */
  style?: StyleProp<ViewStyle> | any;

  /**
   * Additional props to pass to the button.
   */
  additionalProps?: any;

  /**
   * Either children or a render prop that receives a boolean reflecting whether
   * the component is currently pressed.
   */
  labelComponent?: React.ReactNode | any;
}
