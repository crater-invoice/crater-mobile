import React, { Component } from 'react';
import { Text, Animated } from 'react-native';
import { styles } from './styles';
import Lng from '@/lang/i18n';

interface IProps {
    reference: any;
    containerStyle: Object;
}

export class Toast extends Component<IProps> {
    constructor() {
        super();
        this.animateOpacityValue = new Animated.Value(0);
        this.state = { message: '' };
    }

    componentDidMount() {
        this.props.reference?.(this);
    }

    componentWillUnmount() {
        this.timerID && clearTimeout(this.timerID);
        this.props.reference?.(undefined);
    }

    showToast = async (message = '') => {
        await this.setState({ message });
        const duration = 1000;
        Animated.timing(this.animateOpacityValue, {
            toValue: 0.8,
            duration: 200
        }).start(this.hideToast(duration));
    };

    hideToast = duration => {
        this.timerID = setTimeout(() => {
            Animated.timing(this.animateOpacityValue, {
                toValue: 0,
                duration: 200
            }).start(() => {
                clearTimeout(this.timerID);
            });
        }, duration);
    };

    render() {
        const { containerStyle, locale } = this.props;

        return (
            <Animated.View
                style={[
                    styles.animatedToastView,
                    { opacity: this.animateOpacityValue },
                    containerStyle && containerStyle
                ]}
            >
                <Text numberOfLines={2} style={styles.title}>
                    {Lng.t(this.state.message, { locale })}
                </Text>
            </Animated.View>
        );
    }
}
