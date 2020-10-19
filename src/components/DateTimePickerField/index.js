import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { reduxForm, Field, change } from 'redux-form';
import moment from 'moment';
import { DatePickerField } from '../DatePickerField';
import { TimePickerField } from '../TimePickerField';
import { DATE_FORMAT } from '@/constants';
import Lng from '@/lang/i18n';
import styles from './styles';


const DATE_TIME_PICKER_FORM = 'DATE_TIME_PICKER_FORM';

type Props = {
    dateFieldName: String,
    timeFieldName: String,
    input: any,
    onChangeCallback: Function,
    hideError: Boolean,
    meta: any
};

class DateTimePickerFieldComponent extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    static defaultProps = {
        dateFieldName: 'date',
        timeFieldName: 'time'
    };

    componentDidMount() {
        const {
            input: { value },
            dateFieldName,
            timeFieldName
        } = this.props;

        if (value) {
            const split = value.split(' ');
            this.setFormField(dateFieldName, value);
            this.setFormField(timeFieldName, split?.[1] ?? '00:00:00');

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
            isRequired,
            input: { value },
            meta: { error, submitFailed },
            meta,
            dateFieldName,
            timeFieldName,
            hideError,
            locale
        } = this.props;

        if (loading) return null;

        const hasError = !hideError && submitFailed && error;

        return (
            <View style={styles.container}>
                {label && (
                    <Text style={[styles.label, labelStyle]}>
                        {label}
                        {isRequired ? (
                            <Text style={styles.required}> *</Text>
                        ) : null}
                    </Text>
                )}

                <View style={styles.row}>
                    <View style={styles.dateColumn}>
                        <Field
                            name={dateFieldName}
                            component={DatePickerField}
                            onChangeCallback={val =>
                                this.onChange({ date: val })
                            }
                            placeholder={this.getDefaultDateValue(value)}
                            formDateFormat="YYYY-MM-DD"
                            fakeInputProps={{
                                fakeInputContainerStyle:
                                    hasError && styles.inputError
                            }}
                        />
                    </View>
                    <View style={styles.timeColumn}>
                        <Field
                            name={timeFieldName}
                            component={TimePickerField}
                            placeholder={this.getDefaultTimeValue(value)}
                            onChangeCallback={val =>
                                this.onChange({ time: val })
                            }
                            fakeInputProps={{
                                fakeInputContainerStyle:
                                    hasError && styles.inputError
                            }}
                        />
                    </View>
                </View>
                {hasError && (
                    <View style={styles.validation}>
                        <Text style={{ color: 'white', fontSize: 12 }}>
                            {Lng.t(error, { locale, hint: label })}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

//  Redux Forms
export const DateTimePickerField = reduxForm({
    form: DATE_TIME_PICKER_FORM
})(DateTimePickerFieldComponent);
