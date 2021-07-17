import React, {Component} from 'react';
import {CheckBox as RNCheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
import {styles} from './styles';
import {colors} from '@/styles';
import {Text} from '../Text';
import {Label} from '../Label';

type IProps = {
  label: String,
  containerStyle: Object,
  input: Object,
  onChangeCallback: Function
};

class CheckBox extends Component<IProps> {
  toggleChecked = () => {
    const {
      input: {onChange, value},
      onChangeCallback,
      disabled = false,
      disabledOnPress
    } = this.props;

    if (disabled) {
      disabledOnPress?.(!value);
      return;
    }

    onChange(!value);
    onChangeCallback && onChangeCallback(!value);
  };

  render() {
    const {
      input: {value},
      label = '',
      containerStyle,
      checkBoxProps,
      disabled = false,
      hint,
      hintStyle,
      labelStyle,
      theme
    } = this.props;

    return (
      <>
        <Label theme={theme} h5 numberOfLines={2} mt-15 style={hintStyle}>
          {hint}
        </Label>
        <RNCheckBox
          title={label}
          checked={value || false}
          size={25}
          onPress={this.toggleChecked}
          containerStyle={[styles.container, containerStyle && containerStyle]}
          textStyle={[styles.label(theme), labelStyle]}
          checkedColor={colors.primaryLight}
          uncheckedColor={theme.viewLabel.secondaryColor}
          {...checkBoxProps}
          activeOpacity={disabled ? 0.8 : 0.4}
        />
      </>
    );
  }
}

export const CtCheckbox = connect(
  ({global}) => ({theme: global?.theme}),
  {}
)(CheckBox);
