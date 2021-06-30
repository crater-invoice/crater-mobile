import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import { styles } from './styles';
import { colors } from '@/styles';
import { Text } from '../Text';

type IProps = {
    label: String,
    containerStyle: Object,
    input: Object,
    onChangeCallback: Function
};

export class CtCheckbox extends Component<IProps> {
    toggleChecked = () => {
        const {
            input: { onChange, value },
            onChangeCallback
        } = this.props;

        onChange(!value);
        onChangeCallback && onChangeCallback(!value);
    };

    render() {
        const {
            input: { value },
            label,
            containerStyle,
            checkBoxProps,
            disable = false,
            hint,
            hintStyle
        } = this.props;

        return (
            <>
                {hint && (
                    <Text
                        secondary
                        h5
                        numberOfLines={2}
                        style={[styles.hint, hintStyle && hintStyle]}
                    >
                        {hint}
                    </Text>
                )}
                <CheckBox
                    title={label}
                    checked={value || false}
                    size={25}
                    onPress={() => !disable && this.toggleChecked()}
                    containerStyle={[
                        styles.container,
                        containerStyle && containerStyle
                    ]}
                    textStyle={styles.label}
                    checkedColor={colors.primaryLight}
                    uncheckedColor={colors.secondary}
                    {...checkBoxProps}
                    activeOpacity={disable ? 1 : 0.4}
                />
            </>
        );
    }
}

CtCheckbox.defaultProps = {
    label: ''
};
