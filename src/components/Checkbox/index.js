import React, {Component} from 'react';
import {CheckBox as RNCheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
import {styles} from './styles';
import {colors} from '@/styles';
import {BaseLabel} from '@/components';
import {commonSelector} from 'stores/common/selectors';

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
      onChangeCallback
    } = this.props;

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
        <BaseLabel numberOfLines={2} mt-10 style={hintStyle}>
          {hint}
        </BaseLabel>
        <RNCheckBox
          title={label}
          checked={value || false}
          size={25}
          onPress={this.toggleChecked}
          containerStyle={[
            styles.container,
            containerStyle && containerStyle,
            disabled && styles.disabledCheckbox
          ]}
          textStyle={[styles.label(theme), labelStyle]}
          checkedColor={colors.primaryLight}
          uncheckedColor={theme.viewLabel.secondaryColor}
          disabled={disabled}
          activeOpacity={0.4}
          {...checkBoxProps}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export const CtCheckbox = connect(mapStateToProps)(CheckBox);
