import React, {Component} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import {colors} from '@/styles';
import {hasTextLength} from '@/constants';
import {commonSelector} from 'stores/common/selectors';
import {BaseSelect} from '@/components';

class DropdownPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedItemValue: ''};
  }

  componentDidMount() {
    const {
      input: {value, onChange},
      onChangeCallback,
      callbackWhenMount
    } = this.props;

    onChange?.(value);
    this.setState({selectedItemValue: value});
    callbackWhenMount ? callbackWhenMount?.() : onChangeCallback?.(value);
  }

  onChange = v => {
    const {
      onChangeCallback,
      input: {onChange}
    } = this.props;

    onChange?.(v);

    this.setState({selectedItemValue: v});
    onChangeCallback && onChangeCallback(v);
  };

  onDonePress = () => {
    const {onDonePress} = this.props;
    onDonePress?.();
  };

  render() {
    const {
      input: {value},
      meta,
      items,
      disabled,
      isRequired,
      refLinkFn,
      doneText,
      fieldIcon,
      defaultPickerOptions,
      label,
      findValueByForm = true,
      placeholderTextColor = colors.darkGray,
      baseSelectProps,
      customView,
      description
    } = this.props;

    const {selectedItemValue} = this.state;
    let selected = [];

    if (findValueByForm)
      selected = items && items.find(item => item.value === value);
    else
      selected = items && items.find(item => item.value === selectedItemValue);

    let selectedLabel = selected && (selected.displayLabel || selected.label);
    let selectedValue = selected && selected.value;

    let placeHolder = {
      ...{color: colors.darkGray},
      ...defaultPickerOptions
    };

    const placeholderText =
      defaultPickerOptions?.displayLabel ||
      defaultPickerOptions?.label ||
      label;
    const valuesText = hasTextLength(selectedLabel) ? selectedLabel : null;

    return (
      <RNPickerSelect
        placeholder={defaultPickerOptions && placeHolder}
        items={items.map(item => ({...item, color: colors.secondary}))}
        onValueChange={v => this.onChange(v)}
        value={typeof selectedValue !== 'undefined' && selectedValue}
        placeholderTextColor={placeholderTextColor}
        ref={(dropdownRef = {}) => {
          refLinkFn?.({
            ...dropdownRef,
            focus: () => dropdownRef?.togglePicker?.()
          });
        }}
        modalProps={{animationType: 'slide'}}
        disabled={disabled}
        onDonePress={() => this.onDonePress()}
        doneText={doneText}
      >
        {customView ? (
          customView({placeholderText, valuesText})
        ) : (
          <BaseSelect
            meta={meta}
            label={label}
            isRequired={isRequired}
            icon={fieldIcon}
            disabled={disabled}
            rightIcon={'angle-down'}
            disabled={disabled}
            placeholder={placeholderText}
            values={valuesText}
            description={description}
            {...baseSelectProps}
          />
        )}
      </RNPickerSelect>
    );
  }
}

const mapStateToProps = state => commonSelector(state);

export const BaseDropdownPicker = connect(mapStateToProps)(DropdownPicker);
