import React, { Component } from 'react';
import { Animated } from 'react-native';

interface IState {
    opacityAnimate: any;
}

export class FadeIn extends Component<{}, IState> {
    constructor(props) {
        super(props);
        this.state = {
            opacityAnimate: new Animated.Value(0)
        };
    }

    componentDidMount() {
        this.fadeIn();
    }

    fadeIn = () => {
        Animated.timing(this.state.opacityAnimate, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start(() => {});
    };

    render() {
        return (
            <Animated.View
                style={{ flex: 1, opacity: this.state.opacityAnimate }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}
