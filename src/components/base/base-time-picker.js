import React, {Component, Fragment} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AnimateModal} from '../animate-modal';
import moment from 'moment';
import t from 'locales/use-translation';
import {colors} from '@/styles';
import {isDarkMode} from '@/utils';
import {BaseButton, BaseSelect} from '@/components';
import {isIosPlatform, majorVersionIOS} from '@/helpers/platform';
import {TIME_FORMAT, TIME_FORMAT_MERIDIEM} from '@/constants';

export class BaseTimePicker extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      timeStamp: new Date(),
      selectedTimeStamp: new Date(),
      displayMode: null,
      time: null
    };
  }

  componentDidMount() {
    this.setInitialTimeValue();
    this.setVersionCompatiblePicker();
  }

  setInitialTimeValue = () => {
    const {input} = this.props;

    if (input?.value) {
      const split = input?.value.split(':');
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
    const {input, onChangeCallback} = this.props;
    this.onToggleModal();
    this.setState({
      selectedTimeStamp: timeStamp,
      time: moment(timeStamp).format(TIME_FORMAT_MERIDIEM)
    });
    const timeFormat = moment(timeStamp).format(TIME_FORMAT);
    input?.onChange?.(timeFormat);
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

        <BaseButton
          onPress={() => this.onChangeTime(timeStamp)}
          additionalProps={{scale: 1}}
        >
          {t('button.change')}
        </BaseButton>
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

interface IProps {
  /**
   * Label of date picker view.
   */
  label?: string;

  /**
   * Showing placeholder text until date not selecting.
   */
  placeholder?: string;

  /**
   * Additional props to pass to the BaseSelect.
   */
  baseSelectProps?: any;

  /**
   * If true, required validation message shows.
   */
  isRequired?: boolean;

  /**
   * Redux form built-in input events.
   */
  input?: any;

  /**
   * Redux form built-in meta validation events.
   */
  meta?: any;

  /**
   * If true the user won't be able to press.
   * @default false
   */
  disabled?: boolean;

  /**
   * Invoked with the the change event as an argument when the value changes.
   */
  onChangeCallback?: (callback: any) => void;
}

interface IStates {
  /**
   * If true the modal is showing.
   */
  visible?: boolean;

  /**
   * Selected date value.
   */
  selectedTimeStamp: Date | string;

  /**
   * Selected date actual value.
   */
  time: Date | string;

  /**
   * The currently selected date.
   */
  timeStamp: Date | string | any;

  /**
   * The display options.
   */
  displayMode: 'spinner' | 'default' | 'clock' | 'calendar' | any;
}
