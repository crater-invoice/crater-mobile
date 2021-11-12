import React, {Component} from 'react';
import {Animated} from 'react-native';
import styles from './styles';
import {colors} from '@/styles';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {AssetImage} from '../asset-image';
import {BUTTON_COLOR, BUTTON_TYPE} from '@/constants';
import {isAndroidPlatform} from '@/helpers/platform';
import {AssetIcon} from '../asset-icon';
import {commonSelector} from 'stores/common/selectors';

type IProps = {
  children?: any,
  onPress?: () => void,
  loading?: boolean,
  isLoading?: boolean,
  disabled?: boolean,
  whiteButton?: boolean,
  style?: Object,
  iconPlacement?: any,
  btnTitle?: string,
  type?: string,
  iconName?: string,
  imageIcon?: boolean,
  isGradient?: boolean,
  raised?: boolean,
  source?: string | any,
  buttonType?: string,
  containerStyle?: Object,
  buttonContainerStyle?: any
};

class ActionButton extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {
      buttonFocus: false,
      animatedScale: new Animated.Value(1)
    };
  }

  componentDidMount() {
    this.props.reference?.(this);
  }

  componentWillUnmount() {
    this.props.reference?.(undefined);
  }

  onBtnPress = async () => {
    await this.setState({buttonFocus: true});
    this.props?.onPress?.();
  };

  toggleFocus = status => {
    this.setState({buttonFocus: status});
  };

  toggleAnimatedScale = (toValue = 0.98) => {
    Animated.timing(this.state.animatedScale, {
      toValue,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  render() {
    const {
      style,
      iconPlacement,
      type = 'solid',
      loading = false,
      isLoading = false,
      btnTitle,
      iconName,
      imageIcon = false,
      source,
      raised,
      containerStyle,
      buttonContainerStyle,
      hasFocus = true,
      theme,
      titleStyle
    } = this.props;

    const {buttonFocus, animatedScale} = this.state;
    const isOutline = type === BUTTON_TYPE.OUTLINE;
    const animatedStyle = {
      transform: [{scale: animatedScale}]
    };
    const buttonColor = this.props.buttonColor
      ? this.props.buttonColor
      : theme?.mode === 'light'
      ? BUTTON_COLOR.PRIMARY
      : BUTTON_COLOR.PRIMARY_LIGHT;

    return (
      <Animated.View
        style={[animatedStyle, styles.buttonContainer, buttonContainerStyle]}
      >
        <Button
          icon={
            imageIcon ? (
              <AssetImage source={source} style={styles.imageIcon} />
            ) : (
              <AssetIcon name={iconName} size={15} color={colors.white} />
            )
          }
          {...iconPlacement}
          containerStyle={[
            styles.containerStyle,
            raised && styles.containerShadow,
            containerStyle && containerStyle
          ]}
          buttonStyle={[
            styles.buttonStyle,
            style,
            isOutline
              ? [{borderColor: colors[buttonColor]}, styles.buttonOutline]
              : {
                  backgroundColor: colors[buttonColor],
                  borderColor: colors[buttonColor]
                }
          ]}
          onPress={() => this.onBtnPress()}
          onPressIn={() => this.toggleAnimatedScale()}
          onPressOut={() => this.toggleAnimatedScale(1)}
          type={type}
          title={btnTitle}
          loading={(loading && buttonFocus) || isLoading}
          loadingStyle={{
            opacity: 1,
            ...(isAndroidPlatform && {paddingVertical: 1.6})
          }}
          loadingProps={{
            color: !isOutline ? colors.white : colors[buttonColor]
          }}
          titleStyle={[
            styles.titleStyle,
            titleStyle,
            isOutline && {
              color: colors[buttonColor]
            }
          ]}
          disabled={loading}
          disabledStyle={[
            styles.buttonStyle,
            style,
            isOutline
              ? [
                  {
                    borderColor: colors[buttonColor],
                    opacity: 0.7
                  },
                  styles.buttonOutline
                ]
              : {
                  backgroundColor: colors[buttonColor],
                  borderColor: colors[buttonColor],
                  opacity: 0.7
                }
          ]}
          disabledTitleStyle={
            (styles.titleStyle,
            {
              color: isOutline ? colors[buttonColor] : colors.white
            })
          }
        />
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export const CtButton = connect(mapStateToProps)(ActionButton);
