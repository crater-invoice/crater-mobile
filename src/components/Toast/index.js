import React, { Component } from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import t from 'locales/use-translation';
import { Text } from '../Text';
import { commonSelector } from 'stores/common/selectors';

interface IProps {
    reference: any;
    containerStyle: Object;
}

export class ToastComponent extends Component<IProps> {
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

    show = async (message = '', duration = 2000) => {
        await this.setState({ message });

        Animated.timing(this.animateOpacityValue, {
            toValue: 0.9,
            duration: 200,
            useNativeDriver: true
        }).start(this.hide(duration));
    };

    hide = duration => {
        this.timerID = setTimeout(() => {
            Animated.timing(this.animateOpacityValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start(() => clearTimeout(this.timerID));
        }, duration);
    };

    render() {
        const { containerStyle, theme } = this.props;

        return (
            <Animated.View
                style={[
                    styles.animatedToastView(theme),
                    { opacity: this.animateOpacityValue },
                    containerStyle && containerStyle
                ]}
            >
                <Text
                    center
                    color={theme?.toast?.textColor}
                    medium={theme?.mode === 'dark'}
                    numberOfLines={2}
                    style={styles.title}
                >
                    {t(this.state.message)}
                </Text>
            </Animated.View>
        );
    }
}

const mapStateToProps = state => ({
    ...commonSelector(state)
});

export const Toast = connect(mapStateToProps)(ToastComponent);
