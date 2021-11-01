import React, {Component, Fragment} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AnimateModal} from '../animate-modal';
import moment from 'moment';
import t from 'locales/use-translation';
import {CtButton} from '../button';
import {
  isIosPlatform,
  majorVersionIOS,
  TIME_FORMAT,
  TIME_FORMAT_MERIDIEM
} from '@/constants';
import {colors} from '@/styles';
import styles from './styles';
import {isDarkMode} from '@/utils';
import {BaseSelect} from '@/components';

export class TimePickerField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      timeStamp: new Date(),
      selectedTimeStamp: new Date(),
      displayMode: null
    };
  }

  componentDidMount() {
    this.setInitialTimeValue();
    this.setVersionCompatiblePicker();
  }

  setInitialTimeValue = () => {
    const {
      input: {value}
    } = this.props;

    if (value) {
      const split = value.split(':');
      const hour = split?.[0] ?? 0;
      const minute = split?.[1] ?? 0;
      const second = split?.[2] ?? 0;

      const displayTime = moment();
      displayTime.set({h: hour, m: minute, s: second});

      const timeStamp = new Date();
      timeStamp.setHours(hour);
      timeStamp.setMinutes(minute);
      timeStamp.setSeconds(second);

      this.setState({
        selectedTimeStamp: timeStamp,
        time: moment(displayTime).format(TIME_FORMAT_MERIDIEM)
      });
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

  onToggleModal = () => {
    const {visible, selectedTimeStamp} = this.state;

    if (this.props.disabled) {
      return;
    }

    if (!visible) {
      this.setState({timeStamp: selectedTimeStamp});
    }

    this.setState({
      visible: !visible
    });
  };

  onChange = (event, selectedDate) => {
    if (!isIosPlatform && event.type === 'dismissed') {
      this.setState({visible: false});
      return;
    }
    if (selectedDate) {
      isIosPlatform && this.setState({timeStamp: selectedDate});
      !isIosPlatform && this.onChangeTime(selectedDate);
    }
  };

  onChangeTime = timeStamp => {
    const {
      input: {onChange},
      onChangeCallback
    } = this.props;
    this.onToggleModal();
    this.setState({
      selectedTimeStamp: timeStamp,
      time: moment(timeStamp).format(TIME_FORMAT_MERIDIEM)
    });
    const timeFormat = moment(timeStamp).format(TIME_FORMAT);
    onChange?.(timeFormat);
    onChangeCallback?.(timeFormat);
  };

  renderPicker = () => {
    const {timeStamp, visible, displayMode} = this.state;

    if (!isIosPlatform) {
      if (visible) {
        return (
          <DateTimePicker
            testID="dateTimePicker"
            style={{backgroundColor: colors.veryLightGray}}
            value={timeStamp}
            mode={'time'}
            onChange={this.onChange}
          />
        );
      }
      return <Fragment />;
    }

    return (
      <AnimateModal
        visible={visible}
        onToggle={this.onToggleModal}
        style={{marginHorizontal: 30, overflow: 'hidden'}}
      >
        <DateTimePicker
          testID="dateTimePicker"
          style={{
            backgroundColor: isDarkMode() ? colors.dark : colors.veryLightGray
          }}
          value={timeStamp}
          mode={'time'}
          is24Hour={true}
          onChange={this.onChange}
          display={displayMode}
        />

        <CtButton
          onPress={() => this.onChangeTime(timeStamp)}
          btnTitle={t('button.change')}
          containerStyle={styles.button}
        />
      </AnimateModal>
    );
  };
  render() {
    const {
      label,
      placeholder = TIME_FORMAT,
      baseSelectProps,
      isRequired,
      meta,
      disabled
    } = this.props;
    const {time, displayMode} = this.state;

    if (!displayMode) {
      return null;
    }

    return (
      <>
        <BaseSelect
          label={label}
          icon={'clock'}
          isRequired={true}
          onChangeCallback={this.onToggleModal}
          values={time}
          placeholder={placeholder ?? ' '}
          isRequired={isRequired}
          meta={meta}
          disabled={disabled}
          {...baseSelectProps}
        />
        {this.renderPicker()}
      </>
    );
  }
}
