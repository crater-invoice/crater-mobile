// @flow

import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { FakeInput } from '../FakeInput';
import { connect } from 'react-redux';
import { DATE_FORMAT } from '@/constants';

type IProps = {
    label: String,
    icon: String,
    onChangeCallback: Function,
    containerStyle: Object,
    rightIcon: String,
    displayValue: Boolean,
    isRequired: Boolean,
    formDateFormat: String
};

export class DatePickerComponent extends Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            isDateTimePickerVisible: false,
            value: ''
        };
    }

    static defaultProps = {
        formDateFormat: DATE_FORMAT
    };

    componentDidMount() {
        const {
            input: { value, onChange },
            dateFormat,
            selectedDate,
            selectedDateValue,
            formDateFormat
        } = this.props;

        if (selectedDate && !value === false) {
            this.setState({ value: selectedDate });
            onChange(selectedDateValue);
        } else {
            if (value) {
                let displayDate = moment(value).format(dateFormat);
                let formDate = moment(value).format(formDateFormat);

                this.setState({
                    value: displayDate
                });

                onChange(formDate);
            }
        }
    }

    showHideDateTimePicker = () => {
        this.setState(prevState => {
            return {
                isDateTimePickerVisible: !prevState.isDateTimePickerVisible
            };
        });
    };

    handleDatePicked = date => {
        const {
            onChangeCallback,
            dateFormat,
            input: { onChange },
            filter,
            formDateFormat
        } = this.props;

        let displayDate = moment(date).format(dateFormat);

        let formDate = moment(date).format(formDateFormat);

        this.setState({
            value: displayDate
        });

        this.showHideDateTimePicker();

        onChange(formDate);

        if (filter) {
            onChangeCallback && onChangeCallback(formDate, displayDate);
        } else onChangeCallback && onChangeCallback(formDate);
    };

    getDate = displayValue => {
        const { dateFormat } = this.props;
        if (displayValue) {
            return displayValue.format(dateFormat);
        }
        return null;
    };

    render() {
        const {
            label,
            containerStyle,
            meta,
            displayValue,
            isRequired = false,
            input,
            placeholder = ' ',
            fakeInputProps
        } = this.props;

        const { isDateTimePickerVisible, value } = this.state;
        const dateValue = displayValue || value;

        let pickerOption = {};

        if (dateValue) {
            pickerOption = { date: new Date(dateValue) };
        }

        return (
            <View style={styles.container}>
                <FakeInput
                    label={label}
                    icon={'calendar-alt'}
                    values={
                        (displayValue && this.getDate(displayValue)) ||
                        (input.value ? value : '')
                    }
                    placeholder={placeholder}
                    onChangeCallback={() => this.showHideDateTimePicker()}
                    meta={meta}
                    isRequired={isRequired}
                    containerStyle={containerStyle}
                    {...fakeInputProps}
                />

                <DateTimePicker
                    isVisible={isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    {...pickerOption}
                    onCancel={this.showHideDateTimePicker}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ global }) => ({
    dateFormat: global.dateFormat
});

const mapDispatchToProps = {};

export const DatePickerField = connect(
    mapStateToProps,
    mapDispatchToProps
)(DatePickerComponent);
