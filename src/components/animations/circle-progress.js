import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Animated, ViewPropTypes, Easing} from 'react-native';

const ViewPropTypesStyle = ViewPropTypes
  ? ViewPropTypes.style
  : View.propTypes.style;

export class AnimatedCircularProgress extends React.PureComponent {
  static propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    startDeg: PropTypes.number,
    endDeg: PropTypes.number,
    radius: PropTypes.number,
    innerRadius: PropTypes.number,
    innerBackgroundColor: PropTypes.string,
    duration: PropTypes.number,
    children: PropTypes.node,
    style: ViewPropTypesStyle
  };

  static defaultProps = {
    backgroundColor: '#eeeeee',
    color: '#1e88e5',
    startDeg: 0,
    endDeg: 360,
    radius: 100,
    innerRadius: 80,
    innerBackgroundColor: 'transparent',
    duration: 1000,
    children: null,
    style: null
  };

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      showCircle: false
    };
  }

  componentDidMount() {
    this.props?.reference?.(this);
  }

  componentWillUnmount() {
    this.props?.reference?.(undefined);
  }

  showCircleView = status => {
    this.setState({showCircle: status});
  };

  start = callBack => {
    const {duration, startDeg, endDeg} = this.props;
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: (duration / 360) * (endDeg - startDeg),
      useNativeDriver: false,
      easing: Easing.linear
    }).start(() => callBack?.());
  };

  renderHalf = (color, transforms = [], otherStyle = {}) => {
    const {radius} = this.props;
    return (
      <Animated.View
        style={[
          styles.half,
          {
            backgroundColor: color,
            width: radius,
            height: radius * 2
          },
          {
            transform: [
              {translateX: radius / 2},
              ...transforms,
              {translateX: -radius / 2}
            ]
          },
          otherStyle
        ]}
      />
    );
  };

  renderCircle = ({
    backgroundColor,
    //
    color1,
    zIndex1 = 0,
    rotate1,
    //
    color2,
    zIndex2,
    rotate2,
    //
    color3,
    zIndex3 = 0,
    rotate3
  }) => {
    const {
      radius,
      innerRadius,
      style,
      children,
      innerBackgroundColor
    } = this.props;

    return (
      <View
        style={[
          styles.outerStyle,
          {
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            backgroundColor
          },
          style
        ]}
      >
        {this.renderHalf(color1, [{rotate: rotate1}], {
          zIndex: zIndex1
        })}
        {this.renderHalf(color2, [{rotate: rotate2}], {
          zIndex: zIndex2
        })}
        {this.renderHalf(color3, [{rotate: rotate3}], {
          zIndex: zIndex3
        })}
        <View
          style={[
            styles.innerStyle,
            {
              width: innerRadius * 2,
              height: innerRadius * 2,
              borderRadius: innerRadius,
              left: radius - innerRadius,
              top: radius - innerRadius,
              backgroundColor: innerBackgroundColor
            }
          ]}
        >
          {children}
        </View>
      </View>
    );
  };

  render() {
    const {backgroundColor, color, startDeg, endDeg} = this.props;
    const {showCircle} = this.state;

    let circleBg;
    let color1;
    let color2;
    let color3;

    let zIndex2;

    let rotate1;
    let rotate2;
    let rotate3;

    if (startDeg <= 180 && endDeg <= 180) {
      rotate1 = '0deg';
      rotate2 = '180deg';
      rotate3 = this.animatedValue.interpolate({
        inputRange: LIST_TIMING_ANIMATION_INPUT_2_VALUE,
        outputRange: [`${180 + startDeg}deg`, `${180 + endDeg}deg`]
      });

      color1 = backgroundColor;
      color2 = color;
      color3 = backgroundColor;

      zIndex2 = 0;
    } else if (startDeg > 180 && endDeg > 180) {
      circleBg = color;
      rotate1 = this.animatedValue.interpolate({
        inputRange: LIST_TIMING_ANIMATION_INPUT_2_VALUE,
        outputRange: [`${180 + startDeg}deg`, `${180 + endDeg}deg`]
      });
      rotate2 = '180deg';
      rotate3 = '180deg';

      color1 = backgroundColor;
      color2 = color;
      color3 = color;

      zIndex2 = 0;
    } else {
      const total = endDeg - startDeg;
      const part1 = 180 - startDeg;

      const listTimingAnimationInput = [
        0,
        part1 / total,
        part1 / total,
        part1 / total,
        1
      ];

      rotate1 = '0deg';
      rotate2 = '180deg';
      rotate3 = this.animatedValue.interpolate({
        inputRange: listTimingAnimationInput,
        outputRange: [
          `${180 + startDeg}deg`,
          `${180 + 180}deg`,
          `${180 + 180}deg`,
          `${180 + 180}deg`,
          `${180 + endDeg}deg`
        ]
      });

      color1 = this.animatedValue.interpolate({
        inputRange: listTimingAnimationInput,
        outputRange: [backgroundColor, backgroundColor, color, color, color]
      });

      color2 = color;
      color3 = backgroundColor;

      zIndex2 = this.animatedValue.interpolate({
        inputRange: listTimingAnimationInput,
        outputRange: [0, 0, 0, 1, 1]
      });
    }

    if (!showCircle) {
      return null;
    }

    return this.renderCircle({
      backgroundColor: circleBg,
      //
      color1,
      rotate1,
      //
      color2,
      zIndex2,
      rotate2,
      //
      color3,
      rotate3
    });
  }
}

const LIST_TIMING_ANIMATION_INPUT_2_VALUE = [0, 1];

const styles = StyleSheet.create({
  outerStyle: {
    overflow: 'hidden'
  },
  half: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  innerStyle: {
    position: 'absolute',
    backgroundColor: '#fff',
    zIndex: 2
  }
});
