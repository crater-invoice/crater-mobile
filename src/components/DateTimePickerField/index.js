import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { reduxForm, Field, change } from 'redux-form';
import { DatePickerField } from '../DatePickerField';
import { TimePickerField } from '../TimePickerField';
import styles from './styles';
import moment from 'moment';
import { DATE_FORMAT } from '@/api/consts';

const DATE_TIME_PICKER_FORM = 'DATE_TIME_PICKER_FORM';

class DateTimePickerFieldComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount() {
        const {
            input: { value }
        } = this.props;

        if (value) {
            const split = value.split(' ');
            this.setFormField('date', value);
            this.setFormField('time', split?.[1] ?? '00:00:00');

            this.setState({ loading: false });
        } else {
            this.setState({ loading: false });
        }
    }

    onChange = ({ date = null, time = null }) => {
        const {
            onChangeCallback,
            input: { onChange, value }
        } = this.props;
        let dateTimeValue = '';

        if (!value) {
            if (date) {
                dateTimeValue = `${date} 00:00:00`;
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
        const { loading } = this.state;
        const {
            label,
            labelStyle,
            input: { value }
        } = this.props;

        if (loading) return null;

        return (
            <View style={styles.container}>
                {label && (
                    <Text style={[styles.label, labelStyle]}>{label}</Text>
                )}

                <View style={styles.row}>
                    <View style={styles.dateColumn}>
                        <Field
                            name="date"
                            component={DatePickerField}
                            onChangeCallback={val =>
                                this.onChange({ date: val })
                            }
                            placeholder={this.getDefaultDateValue(value)}
                            formDateFormat="YYYY-MM-DD"
                        />
                    </View>
                    <View style={styles.timeColumn}>
                        <Field
                            name="time"
                            component={TimePickerField}
                            placeholder={this.getDefaultTimeValue(value)}
                            onChangeCallback={val =>
                                this.onChange({ time: val })
                            }
                        />
                    </View>
                </View>
            </View>
        );
    }
}

//  Redux Forms
export const DateTimePickerField = reduxForm({
    form: DATE_TIME_PICKER_FORM
})(DateTimePickerFieldComponent);
