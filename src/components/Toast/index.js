import React, { Component } from 'react'
import { Text, Animated } from 'react-native';
import { styles } from './styles';

type IProps = {
    visible: Boolean,
    message: String,
    containerStyle: Object
};


export class Toast extends Component<IProps> {
    constructor() {
        super();
        this.animateOpacityValue = new Animated.Value(0);
    }

    componentWillUnmount() {
        this.timerID && clearTimeout(this.timerID);
    }

    ShowToastFunction(duration = 1000) {
        Animated.timing
            (
                this.animateOpacityValue,
                {
                    toValue: 0.8,
                    duration: 200
                }
            ).start(this.HideToastFunction(duration))

    }

    HideToastFunction = (duration) => {
        this.timerID = setTimeout(() => {
            Animated.timing
                (
                    this.animateOpacityValue,
                    {
                        toValue: 0,
                        duration: 200
                    }
                ).start(() => {
                    clearTimeout(this.timerID);
                })
        }, duration);
    }

    render() {
        const { visible = false, message, containerStyle } = this.props
        visible && this.ShowToastFunction()

        if (visible) {
            return (
                <Animated.View
                    style={[
                        styles.animatedToastView,
                        { opacity: this.animateOpacityValue },
                        containerStyle && containerStyle
                    ]}
                >

                    <Text
                        numberOfLines={2}
                        style={styles.title}
                    >
                        {message}
                    </Text>

                </Animated.View>
            );
        }
        else {
            return null;
        }
    }
}

export default Toast