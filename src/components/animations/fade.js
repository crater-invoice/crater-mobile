import React, {Component} from 'react';
import {Animated} from 'react-native';
import {IProps, IStates} from './type.d';

export class FadeAnimation extends Component<IProps, IStates> {
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
