// @flow

import React from 'react';
import { View } from 'react-native';
import { Field, change } from 'redux-form';
import styles from './styles';
import {
    CtButton,
    DefaultLayout,
    DatePickerField,
    SelectPickerField,
} from '../../../../components';
import { ROUTES } from '../../../../navigation/routes';
import {
    REPORT_FORM,
    SALES,
    PROFIT_AND_LOSS,
    EXPENSES, TAXES,
    DATE_RANGE_OPTION,
    REPORT_TYPE_OPTION,
    DATE_RANGE
} from '../../constants';
import { DATE_FORMAT, REPORT_DATE_FORMAT } from '../../../../api/consts/core';
import Lng from '../../../../api/lang/i18n';
import moment from 'moment';
import { Linking } from 'expo';
import { env } from '../../../../config';
import QueryString from 'qs';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import { headerTitle } from '../../../../api/helper';
import { store } from '../../../../store';

type IProps = {
    navigation: Object,
    taxTypes: Object,
    language: String,
    type: String,
    loading: Boolean,
    handleSubmit: Function,
}
export class Report extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.state = {
            taxTypeList: [],
            displayFromDate: '',
            displayToDate: '',
        }
    }

    componentWillMount() {
        const { taxTypes } = this.props;
        this.setState({ taxTypeList: taxTypes })
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation)
    }
    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(REPORT_FORM, field, value));
    };

    saveReport = ({ to_date, from_date, report_type }) => {

        const { endpointURL } = store.getState().global;

        const { company } = this.props

        const params = { from_date, to_date }

        const report = this.getReport({ reportType: report_type })

        Linking.openURL(`${endpointURL}/reports/${report}${company.unique_hash}?${QueryString.stringify(params)}`);

    };

    getThisDate = (type, time) => {
        const date = moment()[type](time)

        type === 'startOf' && this.setState({ displayFromDate: date })
        type === 'endOf' && this.setState({ displayToDate: date })

        return date.format(DATE_FORMAT)
    }

    getPreDate = (type, time) => {
        const date = moment().subtract(1, time)[type](time)

        type === 'startOf' && this.setState({ displayFromDate: date })
        type === 'endOf' && this.setState({ displayToDate: date })

        return date.format(DATE_FORMAT)
    }

    getCurrentFiscalDate = (type, time) => {
        const { fiscalYear } = this.props
        const firstMonth = JSON.parse(fiscalYear.split('-')[0]) - 1
        const secondMonth = JSON.parse(fiscalYear.split('-')[1]) - 1

        let date = moment()

        if (type === 'startOf') {
            date = date.month(firstMonth)[type]('month')
            this.setState({ displayFromDate: date })
        } else {
            date = date.month(secondMonth).add(time, 1)[type]('month')
            this.setState({ displayToDate: date })
        }
        return date.format(DATE_FORMAT)
    }

    getPreFiscalDate = (type, time) => {
        const { fiscalYear } = this.props
        const firstMonth = JSON.parse(fiscalYear.split('-')[0]) - 1
        const secondMonth = JSON.parse(fiscalYear.split('-')[1]) - 1

        let date = moment()

        if (type === 'startOf') {
            date = date.month(firstMonth).subtract(time, 1)[type]('month')

            this.setState({ displayFromDate: date })
        } else {
            date = date.month(secondMonth)[type]('month')

            this.setState({ displayToDate: date })
        }

        return date.format(DATE_FORMAT)
    }

    onDateRangeChange = (val) => {
        this.setFormField('date_range', val)

        switch (val) {
            case DATE_RANGE.TODAY:
                const displayDate = moment()
                this.setFormField('from_date', displayDate.format(DATE_FORMAT))
                this.setState({ displayFromDate: displayDate })
                this.setFormField('to_date', displayDate.format(DATE_FORMAT))
                this.setState({ displayToDate: displayDate })
                break;

            case DATE_RANGE.THIS_WEEK:
                this.setFormField('from_date', this.getThisDate('startOf', 'isoWeek'))
                this.setFormField('to_date', this.getThisDate('endOf', 'isoWeek'))
                break;

            case DATE_RANGE.THIS_MONTH:
                this.setFormField('from_date', this.getThisDate('startOf', 'month'))
                this.setFormField('to_date', this.getThisDate('endOf', 'month'))
                break;

            case DATE_RANGE.THIS_QUARTER:
                this.setFormField('from_date', this.getThisDate('startOf', 'quarter'))
                this.setFormField('to_date', this.getThisDate('endOf', 'quarter'))
                break;

            case DATE_RANGE.THIS_YEAR:
                this.setFormField('from_date', this.getThisDate('startOf', 'year'))
                this.setFormField('to_date', this.getThisDate('endOf', 'year'))
                break;

            case DATE_RANGE.CURRENT_FISCAL_QUARTER:
                this.setFormField('from_date', this.getCurrentFiscalDate('startOf', 'quarter'))
                this.setFormField('to_date', this.getCurrentFiscalDate('endOf', 'quarter'))
                break;

            case DATE_RANGE.CURRENT_FISCAL_YEAR:
                this.setFormField('from_date', this.getCurrentFiscalDate('startOf', 'year'))
                this.setFormField('to_date', this.getCurrentFiscalDate('endOf', 'year'))
                break;

            case DATE_RANGE.PREVIOUS_WEEK:
                this.setFormField('from_date', this.getPreDate('startOf', 'isoWeek'))
                this.setFormField('to_date', this.getPreDate('endOf', 'isoWeek'))
                break;

            case DATE_RANGE.PREVIOUS_MONTH:
                this.setFormField('from_date', this.getPreDate('startOf', 'month'))
                this.setFormField('to_date', this.getPreDate('endOf', 'month'))
                break;

            case DATE_RANGE.PREVIOUS_QUARTER:
                this.setFormField('from_date', this.getPreDate('startOf', 'quarter'))
                this.setFormField('to_date', this.getPreDate('endOf', 'quarter'))
                break;

            case DATE_RANGE.PREVIOUS_YEAR:
                this.setFormField('from_date', this.getPreDate('startOf', 'year'))
                this.setFormField('to_date', this.getPreDate('endOf', 'year'))
                break;

            case DATE_RANGE.PREVIOUS_FISCAL_QUARTER:
                this.setFormField('from_date', this.getPreFiscalDate('startOf', 'quarter'))
                this.setFormField('to_date', this.getPreFiscalDate('endOf', 'quarter'))
                break;

            case DATE_RANGE.PREVIOUS_FISCAL_YEAR:
                this.setFormField('from_date', this.getPreFiscalDate('startOf', 'year'))
                this.setFormField('to_date', this.getPreFiscalDate('endOf', 'year'))
                break;

            default:
                break;
        }
    }

    BOTTOM_ACTION = (handleSubmit) => {
        const { language, loading } = this.props

        return (
            <View style={styles.submitButton}>
                <View style={{ flex: 1 }}>
                    <CtButton
                        onPress={handleSubmit(this.saveReport)}
                        btnTitle={Lng.t("button.generateReport", { locale: language })}
                        containerStyle={styles.handleBtn}
                        loading={loading}
                    />
                </View>
            </View>
        )
    }

    getReport = ({ isTitle, reportType = '' }) => {
        const { type, language } = this.props

        let data = ''

        switch (type) {
            case SALES:
                const tp = (reportType === 'byCustomer')

                data = isTitle ?
                    Lng.t("header.salesReport", { locale: language }) :
                    (tp ? 'sales/customers/' : 'sales/items/')
                break;

            case PROFIT_AND_LOSS:
                data = isTitle ?
                    Lng.t("header.profitAndLossReport", { locale: language }) : 'profit-loss/'
                break;

            case EXPENSES:
                data = isTitle ?
                    Lng.t("header.expensesReport", { locale: language }) : 'expenses/'
                break;

            case TAXES:
                data = isTitle ?
                    Lng.t("header.taxesReport", { locale: language }) : 'tax-summary/'
                break;

            default:
                break;
        }

        return data
    }

    render() {
        const {
            navigation,
            handleSubmit,
            loading,
            language,
            initialValues,
            type
        } = this.props;

        const { displayFromDate, displayToDate } = this.state

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.navigate(ROUTES.REPORTS),
                    title: this.getReport({ isTitle: true }),
                    titleStyle: headerTitle({ marginLeft: -26, marginRight: -50 }),
                    placement: "center",
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{
                    is: loading,
                }}
            >
                <View style={styles.bodyContainer}>
                    <Field
                        name="date_range"
                        label={Lng.t("reports.dateRange", { locale: language })}
                        component={SelectPickerField}
                        isRequired
                        fieldIcon='calendar-week'
                        items={DATE_RANGE_OPTION(language, Lng)}
                        onChangeCallback={this.onDateRangeChange}
                        fakeInputContainerStyle={styles.selectPickerField}
                    />

                    <View style={styles.dateFieldContainer}>
                        <View style={styles.dateField}>
                            <Field
                                name={'from_date'}
                                component={DatePickerField}
                                isRequired
                                displayValue={displayFromDate}
                                label={Lng.t("reports.fromDate", { locale: language })}
                                onChangeCallback={(val) => {
                                    this.setFormField('date_range', 'custom')
                                    this.setState({ displayFromDate: '' })
                                }}
                            />
                        </View>
                        <View style={styles.dateField}>
                            <Field
                                name="to_date"
                                component={DatePickerField}
                                isRequired
                                displayValue={displayToDate}
                                label={Lng.t("reports.toDate", { locale: language })}
                                onChangeCallback={(val) => {
                                    this.setFormField('date_range', 'custom')
                                    this.setState({ displayToDate: '' })
                                }}
                            />
                        </View>
                    </View>

                    {type === SALES && (
                        <Field
                            name="report_type"
                            label={Lng.t("reports.reportType", { locale: language })}
                            component={SelectPickerField}
                            fieldIcon='vial'
                            items={REPORT_TYPE_OPTION(language, Lng)}
                            onChangeCallback={(val) => {
                                this.setFormField('report_type', val)
                            }}
                            fakeInputContainerStyle={styles.selectPickerField}
                        />
                    )}
                </View>

            </DefaultLayout>

        );
    }
}