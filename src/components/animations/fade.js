import React, {Component} from 'react';
import {Animated} from 'react-native';

export class FadeAnimation extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {opacity: new Animated.Value(0)};
  }

  componentDidMount() {
    this.fadeIn();
  }

  fadeIn = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: this.props.duration ?? 200,
      useNativeDriver: true
    }).start(() => {});
  };

  render() {
    return (
      <Animated.View style={{flex: 1, opacity: this.state.opacity}}>
        {this.props.children}
      </Animated.View>
    );
  }
}

interface IState {
  /**
   * Animate the touchable to a new opacity.
   * Defaults to 0
   */
  opacity: any;
}

interface IProps {
  /**
   * Duration of fade in animation in ms.
   * Defaults to 200
   */
  duration?: Number;
}
