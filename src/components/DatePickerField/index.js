// @flow

import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './styles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {FakeInput} from '../FakeInput';
import {connect} from 'react-redux';
import {DATE_FORMAT, isIosPlatform, majorVersionIOS} from '@/constants';
import {commonSelector} from 'stores/common/selectors';

type IProps = {
  label: String,
  icon: String,
  onChangeCallback: Function,
  containerStyle: Object,
  rightIcon: String,
  displayValue: Boolean,
  isRequired: Boolean,
  formDateFormat: string,
  input: any,
  dateFormat: string,
  selectedDate: string,
  selectedDateValue: string,
  meta: any,
  placeholder: string,
  fakeInputProps: any,
  filter: any
};

type IStates = {
  isDateTimePickerVisible: boolean,
  value: string,
  displayMode: any
};

export class DatePickerComponent extends Component<IProps, IStates> {
  pickerDateValue: any;
  displayValue: any;

  constructor(props) {
    super(props);
    this.pickerDateValue = new Date();
    this.displayValue = null;
    this.state = {
      isDateTimePickerVisible: false,
      value: '',
      displayMode: null
    };
  }

  static defaultProps = {
    formDateFormat: DATE_FORMAT
  };

  componentDidMount() {
    this.setVersionCompatiblePicker();
    this.setInitialDateValue();
  }

  setInitialDateValue = () => {
    const {
      input: {value, onChange},
      dateFormat,
      selectedDate,
      selectedDateValue,
      formDateFormat
    } = this.props;

    if (selectedDate && !value === false) {
      this.setState({value: selectedDate});
      this.pickerDateValue = selectedDate;
      onChange(selectedDateValue);
    } else {
      if (value) {
        let displayDate = moment(value).format(dateFormat);
        let formDate = moment(value).format(formDateFormat);

        this.setState({value: displayDate});

        onChange(formDate);

        this.pickerDateValue = formDate;
      }
    }
  };

  setVersionCompatiblePicker = () => {
    if (isIosPlatform && majorVersionIOS >= 14) {
      this.setState({displayMode: 'spinner'});
      return;
    }

    if (isIosPlatform) {
      this.setState({displayMode: 'inline'});
      return;
    }

    this.setState({displayMode: 'default'});
  };

  showHideDateTimePicker = () => {
    const {isDateTimePickerVisible} = this.state;
    this.setState({isDateTimePickerVisible: !isDateTimePickerVisible});
  };

  handleDatePicked = date => {
    const {
      onChangeCallback,
      dateFormat,
      input: {onChange},
      filter,
      formDateFormat
    } = this.props;

    let displayDate = moment(date).format(dateFormat);

    let formDate = moment(date).format(formDateFormat);

    isIosPlatform
      ? this.setState({value: displayDate})
      : (this.displayValue = displayDate);

    this.pickerDateValue = formDate;

    this.showHideDateTimePicker();

    onChange(formDate);

    if (filter) {
      onChangeCallback && onChangeCallback(formDate, displayDate);
    } else onChangeCallback && onChangeCallback(formDate);
  };

  getDate = displayValue => {
    const {dateFormat} = this.props;
    if (displayValue) {
      return displayValue.format(dateFormat);
    }
    return null;
  };

  getPickerOption = () => {
    const {displayValue} = this.props;
    const dateValue = displayValue || this.pickerDateValue;

    if (dateValue) {
      try {
        return {date: new Date(dateValue)};
      } catch (e) {
        return {};
      }
    }

    return {};
  };

  getDisplayValue = () => {
    const {displayValue, input} = this.props;

    if (displayValue) {
      return this.getDate(displayValue);
    }

    return input?.value ? this.displayValue ?? this.state.value ?? '' : '';
  };

  render() {
    const {
      label,
      containerStyle,
      meta,
      isRequired = false,
      placeholder = ' ',
      fakeInputProps,
      disabled,
      theme
    } = this.props;

    const {isDateTimePickerVisible, displayMode} = this.state;

    let pickerOption = this.getPickerOption();

    if (!displayMode) {
      return null;
    }

    return (
      <View style={styles.container}>
        <FakeInput
          label={label}
          icon={'calendar-alt'}
          values={this.getDisplayValue()}
          placeholder={placeholder}
          onChangeCallback={() => !disabled && this.showHideDateTimePicker()}
          meta={meta}
          isRequired={isRequired}
          containerStyle={containerStyle}
          disabled={disabled}
          {...fakeInputProps}
        />

        <DateTimePicker
          mode="date"
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.showHideDateTimePicker}
          display={displayMode}
          isDarkModeEnabled={theme?.mode === 'dark'}
          {...pickerOption}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  dateFormat: state.common?.dateFormat,
  ...commonSelector(state)
});

export const DatePickerField = connect(mapStateToProps)(DatePickerComponent);
