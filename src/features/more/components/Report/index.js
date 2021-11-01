import React from 'react';
import {Field, change} from 'redux-form';
import {
  DefaultLayout,
  DatePickerField,
  View as CtView,
  ActionButton,
  BaseDropdownPicker
} from '@/components';
import {
  REPORT_FORM,
  SALES,
  PROFIT_AND_LOSS,
  EXPENSES,
  TAXES,
  DATE_RANGE_OPTION,
  REPORT_TYPE_OPTION,
  DATE_RANGE
} from '../../constants';
import t from 'locales/use-translation';
import moment from 'moment';
import * as Linking from 'expo-linking';
import QueryString from 'qs';
import {routes} from '@/navigation';
import {DATE_FORMAT} from '@/constants';
import {store} from '@/stores';

type IProps = {
  navigation: Object,
  taxTypes: Object,
  type: String,
  loading: Boolean,
  handleSubmit: Function
};

export class Report extends React.Component<IProps> {
  constructor(props) {
    super(props);

    this.state = {
      taxTypeList: [],
      displayFromDate: '',
      displayToDate: ''
    };
  }

  componentWillMount() {
    const {taxTypes} = this.props;
    this.setState({taxTypeList: taxTypes});
  }

  setFormField = (field, value) => {
    this.props.dispatch(change(REPORT_FORM, field, value));
  };

  saveReport = ({to_date, from_date, report_type}) => {
    const {endpointURL} = store.getState().common;

    const {company} = this.props;

    const params = {from_date, to_date};

    const report = this.getReport({reportType: report_type});

    Linking.openURL(
      `${endpointURL}/reports/${report}${
        company.unique_hash
      }?${QueryString.stringify(params)}`
    );
  };

  getThisDate = (type, time) => {
    const date = moment()[type](time);

    type === 'startOf' && this.setState({displayFromDate: date});
    type === 'endOf' && this.setState({displayToDate: date});

    return date.format(DATE_FORMAT);
  };

  getPreDate = (type, time) => {
    const date = moment()
      .subtract(1, time)
      [type](time);

    type === 'startOf' && this.setState({displayFromDate: date});
    type === 'endOf' && this.setState({displayToDate: date});

    return date.format(DATE_FORMAT);
  };

  getCurrentFiscalDate = (type, time) => {
    const {fiscalYear} = this.props;
    const firstMonth = JSON.parse(fiscalYear.split('-')[0]) - 1;
    const secondMonth = JSON.parse(fiscalYear.split('-')[1]) - 1;

    let date = moment();

    if (type === 'startOf') {
      date = date.month(firstMonth)[type]('month');
      this.setState({displayFromDate: date});
    } else {
      date = date
        .month(secondMonth)
        .add(time, 1)
        [type]('month');
      this.setState({displayToDate: date});
    }
    return date.format(DATE_FORMAT);
  };

  getPreFiscalDate = (type, time) => {
    const {fiscalYear} = this.props;
    const firstMonth = JSON.parse(fiscalYear.split('-')[0]) - 1;
    const secondMonth = JSON.parse(fiscalYear.split('-')[1]) - 1;

    let date = moment();

    if (type === 'startOf') {
      date = date
        .month(firstMonth)
        .subtract(time, 1)
        [type]('month');

      this.setState({displayFromDate: date});
    } else {
      date = date.month(secondMonth)[type]('month');

      this.setState({displayToDate: date});
    }

    return date.format(DATE_FORMAT);
  };

  onDateRangeChange = val => {
    this.setFormField('date_range', val);

    switch (val) {
      case DATE_RANGE.TODAY:
        const displayDate = moment();
        this.setFormField('from_date', displayDate.format(DATE_FORMAT));
        this.setState({displayFromDate: displayDate});
        this.setFormField('to_date', displayDate.format(DATE_FORMAT));
        this.setState({displayToDate: displayDate});
        break;

      case DATE_RANGE.THIS_WEEK:
        this.setFormField('from_date', this.getThisDate('startOf', 'isoWeek'));
        this.setFormField('to_date', this.getThisDate('endOf', 'isoWeek'));
        break;

      case DATE_RANGE.THIS_MONTH:
        this.setFormField('from_date', this.getThisDate('startOf', 'month'));
        this.setFormField('to_date', this.getThisDate('endOf', 'month'));
        break;

      case DATE_RANGE.THIS_QUARTER:
        this.setFormField('from_date', this.getThisDate('startOf', 'quarter'));
        this.setFormField('to_date', this.getThisDate('endOf', 'quarter'));
        break;

      case DATE_RANGE.THIS_YEAR:
        this.setFormField('from_date', this.getThisDate('startOf', 'year'));
        this.setFormField('to_date', this.getThisDate('endOf', 'year'));
        break;

      case DATE_RANGE.CURRENT_FISCAL_QUARTER:
        this.setFormField(
          'from_date',
          this.getCurrentFiscalDate('startOf', 'quarter')
        );
        this.setFormField(
          'to_date',
          this.getCurrentFiscalDate('endOf', 'quarter')
        );
        break;

      case DATE_RANGE.CURRENT_FISCAL_YEAR:
        this.setFormField(
          'from_date',
          this.getCurrentFiscalDate('startOf', 'year')
        );
        this.setFormField(
          'to_date',
          this.getCurrentFiscalDate('endOf', 'year')
        );
        break;

      case DATE_RANGE.PREVIOUS_WEEK:
        this.setFormField('from_date', this.getPreDate('startOf', 'isoWeek'));
        this.setFormField('to_date', this.getPreDate('endOf', 'isoWeek'));
        break;

      case DATE_RANGE.PREVIOUS_MONTH:
        this.setFormField('from_date', this.getPreDate('startOf', 'month'));
        this.setFormField('to_date', this.getPreDate('endOf', 'month'));
        break;

      case DATE_RANGE.PREVIOUS_QUARTER:
        this.setFormField('from_date', this.getPreDate('startOf', 'quarter'));
        this.setFormField('to_date', this.getPreDate('endOf', 'quarter'));
        break;

      case DATE_RANGE.PREVIOUS_YEAR:
        this.setFormField('from_date', this.getPreDate('startOf', 'year'));
        this.setFormField('to_date', this.getPreDate('endOf', 'year'));
        break;

      case DATE_RANGE.PREVIOUS_FISCAL_QUARTER:
        this.setFormField(
          'from_date',
          this.getPreFiscalDate('startOf', 'quarter')
        );
        this.setFormField('to_date', this.getPreFiscalDate('endOf', 'quarter'));
        break;

      case DATE_RANGE.PREVIOUS_FISCAL_YEAR:
        this.setFormField(
          'from_date',
          this.getPreFiscalDate('startOf', 'year')
        );
        this.setFormField('to_date', this.getPreFiscalDate('endOf', 'year'));
        break;

      default:
        break;
    }
  };

  getReport = ({isTitle, reportType = ''}) => {
    const {type} = this.props;

    let data = '';

    switch (type) {
      case SALES:
        const tp = reportType === 'byCustomer';

        data = isTitle
          ? t('header.sales_report')
          : tp
          ? 'sales/customers/'
          : 'sales/items/';
        break;

      case PROFIT_AND_LOSS:
        data = isTitle ? t('header.profit_and_lossReport') : 'profit-loss/';
        break;

      case EXPENSES:
        data = isTitle ? t('header.expenses_report') : 'expenses/';
        break;

      case TAXES:
        data = isTitle ? t('header.taxes_report') : 'tax-summary/';
        break;

      default:
        break;
    }

    return data;
  };

  render() {
    const {navigation, handleSubmit, loading, type} = this.props;
    const {displayFromDate, displayToDate} = this.state;
    const bottomAction = [
      {
        label: 'button.generateReport',
        onPress: handleSubmit(this.saveReport),
        loading
      }
    ];

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.navigate(routes.REPORTS),
          title: this.getReport({isTitle: true}),
          placement: 'center',
          leftArrow: 'primary'
        }}
        bottomAction={<ActionButton buttons={bottomAction} />}
        loadingProps={{is: loading}}
      >
        <Field
          name="date_range"
          label={t('reports.dateRange')}
          component={BaseDropdownPicker}
          isRequired
          fieldIcon="calendar-week"
          items={DATE_RANGE_OPTION()}
          onChangeCallback={this.onDateRangeChange}
        />

        <CtView flex={1} flex-row>
          <CtView flex={1} justify-between>
            <Field
              name={'from_date'}
              component={DatePickerField}
              isRequired
              displayValue={displayFromDate}
              label={t('reports.from_date')}
              formDateFormat={DATE_FORMAT}
              onChangeCallback={val => {
                this.setFormField('date_range', 'custom');
                this.setState({displayFromDate: ''});
              }}
            />
          </CtView>
          <CtView flex={0.07} />
          <CtView flex={1} justify-between>
            <Field
              name="to_date"
              component={DatePickerField}
              isRequired
              displayValue={displayToDate}
              label={t('reports.to_date')}
              formDateFormat={DATE_FORMAT}
              onChangeCallback={val => {
                this.setFormField('date_range', 'custom');
                this.setState({displayToDate: ''});
              }}
            />
          </CtView>
        </CtView>

        {type === SALES && (
          <Field
            name="report_type"
            label={t('reports.reportType')}
            component={BaseDropdownPicker}
            fieldIcon="vial"
            items={REPORT_TYPE_OPTION()}
            onChangeCallback={val => {
              this.setFormField('report_type', val);
            }}
          />
        )}
      </DefaultLayout>
    );
  }
}
