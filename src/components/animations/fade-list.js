import React, {Component} from 'react';
import {Animated} from 'react-native';
import {IProps, IStates} from './type.d';

export class FadeListAnimation extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {opacity: new Animated.Value(0)};
  }

  componentDidMount() {
    this.fadeIn();
  }

  fadeIn = () => {
    const {delay = 0} = this.props;
    const timeout = callback => setTimeout(() => callback(), delay);

    timeout(() => {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start(() => {});
    });
  };

  render() {
    const {children} = this.props;
    const {opacity} = this.state;

    const contentOffsetY = opacity.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [15, 5, 0]
    });

    return (
      <Animated.View
        style={{
          opacity: opacity,
          transform: [{translateY: contentOffsetY}]
        }}
      >
        {children}
      </Animated.View>
    );
  }
}
