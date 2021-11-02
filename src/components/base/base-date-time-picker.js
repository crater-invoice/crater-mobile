import React, {Component} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {reduxForm, Field, change} from 'redux-form';
import {connect} from 'react-redux';
import moment from 'moment';
import {BaseDatePicker, BaseTimePicker} from '../base';
import {DATE_FORMAT} from '@/constants';
import {colors} from '@/styles';
import {BaseError, BaseLabel} from '@/components';
import {commonSelector} from 'stores/common/selectors';
import {ITheme} from '@/interfaces';

class DateTimePicker extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  static defaultProps = {
    dateFieldName: 'date',
    timeFieldName: 'time'
  };

  componentDidMount() {
    const {
      input: {value, onChange},
      dateFieldName,
      timeFieldName,
      callOnChangeInMount = false,
      removeSecond = false
    } = this.props;

    if (value) {
      const split = value.split(' ');
      this.setFormField(dateFieldName, value);
      this.setFormField(timeFieldName, split?.[1] ?? '00:00');

      if (callOnChangeInMount) {
        if (removeSecond) {
          if (value.split(':').length === 3) {
            const afterRemoveSecond = value.slice(0, -3);
            onChange?.(afterRemoveSecond);
          }
        }
      }

      this.setState({loading: false});
    } else {
      this.setState({loading: false});
    }
  }

  onChange = ({date = null, time = null}) => {
    const {
      onChangeCallback,
      input: {onChange, value}
    } = this.props;
    let dateTimeValue = '';

    if (!value) {
      if (date) {
        dateTimeValue = `${date} 00:00`;
      } else if (time) {
        const todayDate = moment().format(DATE_FORMAT);
        dateTimeValue = `${todayDate} ${time}`;
      }
    } else {
      const valueParts = value.split(' ');
      valueParts[0] = date ?? valueParts[0];
      valueParts[1] = time ?? valueParts[1];
      dateTimeValue = valueParts.join(' ');
    }

    onChange?.(dateTimeValue);
    onChangeCallback?.(dateTimeValue);
  };

  setFormField = (field, value) => {
    this.props.dispatch(change('DATE_TIME_PICKER_FORM', field, value));
  };

  getDefaultDateValue = value => {
    if (!value) return ' ';
    const valueParts = value.split(' ');
    return valueParts?.[0] ?? '';
  };

  getDefaultTimeValue = value => {
    if (!value) return ' ';
    const valueParts = value.split(' ');
    return valueParts?.[1] ?? '';
  };

  render() {
    const {loading} = this.state;
    const {
      label,
      labelStyle,
      isRequired,
      input: {value},
      meta: {error, submitFailed},
      dateFieldName,
      timeFieldName,
      hideError,
      theme,
      disabled
    } = this.props;

    if (loading) return null;

    const hasError = !hideError && submitFailed && error;
    return (
      <View style={styles.container}>
        <BaseLabel isRequired={isRequired} style={labelStyle}>
          {label}
        </BaseLabel>

        <View style={styles.row}>
          <View style={styles.dateColumn}>
            <Field
              name={dateFieldName}
              component={BaseDatePicker}
              onChangeCallback={val => this.onChange({date: val})}
              placeholder={this.getDefaultDateValue(value)}
              formDateFormat="YYYY-MM-DD"
              baseSelectProps={{
                baseSelectContainerStyle: hasError && styles.inputError
              }}
              disabled={disabled}
            />
          </View>
          <View style={styles.timeColumn(theme)}>
            <Field
              name={timeFieldName}
              component={BaseTimePicker}
              placeholder={this.getDefaultTimeValue(value)}
              onChangeCallback={val => this.onChange({time: val})}
              baseSelectProps={{
                baseSelectContainerStyle: hasError && styles.inputError
              }}
              disabled={disabled}
            />
          </View>
        </View>
        <BaseError {...this.props} style={styles.validation} />
      </View>
    );
  }
}

const dateTimePickerForm = reduxForm({form: 'DATE_TIME_PICKER_FORM'})(
  DateTimePicker
);

const mapStateToProps = state => commonSelector(state);

export const BaseDateTimePicker = connect(mapStateToProps)(dateTimePickerForm);

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  row: {
    flexDirection: 'row',
    marginTop: -8
  },
  dateColumn: {
    flex: 1.2
  },
  timeColumn: theme => ({
    flex: 1,
    marginLeft: theme?.mode === 'light' ? 0 : 1
  }),
  validation: {
    marginTop: -10
  },
  inputError: {
    borderColor: colors.dangerLight
  }
});

interface IProps {
  /**
   * Name of the date picker field to access current date value.
   */
  dateFieldName: string;

  /**
   * Name of the time picker field to access current time value.
   */
  timeFieldName: string;

  /**
   * Redux form built-in input events.
   */
  input?: any;

  /**
   * Invoked with the the change event as an argument when the value changes.
   */
  onChangeCallback?: (callback: any) => void;

  /**
   * If true, the validation message not showing.
   */
  hideError: boolean;

  /**
   * Redux form built-in meta validation events.
   */
  meta?: any;

  /**
   * If true, update the date-time value instantly.
   */
  callOnChangeInMount?: boolean;

  /**
   * If true, ignore seconds from the current time value.
   */
  removeSecond?: boolean;

  /**
   * dispatch change action.
   */
  dispatch: (fun: object) => void;

  /**
   * Label of date time picker view.
   */
  label?: string;

  /**
   * Styles for the container surrounding the title.
   */
  labelStyle?: StyleProp<ViewStyle> | any;

  /**
   * If true, required validation message shows.
   */
  isRequired?: boolean;

  /**
   * An active theme object.
   * @see ITheme
   */
  theme: ITheme;

  /**
   * If true the user won't be able to press.
   * @default false
   */
  disabled?: boolean;
}

interface IStates {
  /**
   * The loading indicator for the screen, displayed until the screen is ready to be displayed.
   */
  loading?: boolean;
}
