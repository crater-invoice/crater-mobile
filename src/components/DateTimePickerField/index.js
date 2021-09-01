import React, {Component} from 'react';
import {View} from 'react-native';
import {reduxForm, Field, change} from 'redux-form';
import {connect} from 'react-redux';
import moment from 'moment';
import {DatePickerField} from '../DatePickerField';
import {TimePickerField} from '../TimePickerField';
import {DATE_FORMAT} from '@/constants';
import t from 'locales/use-translation';
import styles from './styles';
import {Text} from '../Text';
import {Label} from '../Label';
import {commonSelector} from 'stores/common/selectors';

const DATE_TIME_PICKER_FORM = 'DATE_TIME_PICKER_FORM';

type Props = {
  dateFieldName: String,
  timeFieldName: String,
  input: any,
  onChangeCallback: Function,
  hideError: Boolean,
  meta: any
};

class Picker extends Component<Props> {
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
    this.props.dispatch(change(DATE_TIME_PICKER_FORM, field, value));
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
        <Label
          h5
          isRequired={isRequired}
          theme={theme}
          style={[labelStyle, {marginBottom: -2}]}
        >
          {label}
        </Label>

        <View style={styles.row}>
          <View style={styles.dateColumn}>
            <Field
              name={dateFieldName}
              component={DatePickerField}
              onChangeCallback={val => this.onChange({date: val})}
              placeholder={this.getDefaultDateValue(value)}
              formDateFormat="YYYY-MM-DD"
              fakeInputProps={{
                fakeInputContainerStyle: hasError && styles.inputError
              }}
              disabled={disabled}
            />
          </View>
          <View style={styles.timeColumn(theme)}>
            <Field
              name={timeFieldName}
              component={TimePickerField}
              placeholder={this.getDefaultTimeValue(value)}
              onChangeCallback={val => this.onChange({time: val})}
              fakeInputProps={{
                fakeInputContainerStyle: hasError && styles.inputError
              }}
              disabled={disabled}
            />
          </View>
        </View>
        {hasError && (
          <View style={styles.validation}>
            <Text white h6>
              {t(error, {hint: label})}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const dateTimePickerForm = reduxForm({
  form: DATE_TIME_PICKER_FORM
})(Picker);

const mapStateToProps = state => ({
  ...commonSelector(state)
});

export const DateTimePickerField = connect(mapStateToProps)(dateTimePickerForm);
