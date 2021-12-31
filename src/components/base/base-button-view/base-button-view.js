import React, {useState} from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import {getClass} from 'utils/class-styled';
import {IProps} from './type.d';

export const BaseButtonView = (props: IProps) => {
  const {show = true} = props;
  if (!show) {
    return <React.Fragment />;
  }
  const [animatedScale] = useState(new Animated.Value(1));

  const toggleAnimatedScale = toValue => {
    Animated.timing(animatedScale, {
      toValue,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  const styleClass = getClass(props, props.class);
  const styles = [styleClass, props.style];
  const animatedStyle = {
    transform: [{scale: animatedScale}]
  };

  let ActionButton = TouchableOpacity;
  props?.button && (ActionButton = props?.button);

  return (
    <Animated.View
      style={[animatedStyle, getClass(props, props['base-class'])]}
    >
      <ActionButton
        activeOpacity={0.7}
        onPressIn={() => toggleAnimatedScale(props?.scale ?? 0.98)}
        onPressOut={() => toggleAnimatedScale(1)}
        {...(props['with-hitSlop'] && {
          hitSlop: {top: 20, left: 20, bottom: 20, right: 20}
        })}
        {...props}
        style={styles}
      >
        {props.children}
      </ActionButton>
    </Animated.View>
  );
};
