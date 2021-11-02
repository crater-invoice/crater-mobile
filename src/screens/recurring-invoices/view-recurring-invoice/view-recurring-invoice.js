import React, {Component} from 'react';
import t from 'locales/use-translation';
import {IProps, IStates} from './view-recurring-invoice-type';
import {routes} from '@/navigation';
import {alertMe, hasObjectLength, isArray} from '@/constants';
import {
  RECURRING_INVOICES_ACTIONS,
  RECURRING_INVOICE_DROPDOWN
} from 'stores/recurring-invoices/types';
import {
  DefaultLayout,
  ViewData,
  ListView,
  ScrollView,
  Text,
  View
} from '@/components';
import {
  fetchSingleRecurringInvoice,
  removeRecurringInvoice
} from 'stores/recurring-invoices/actions';
import styles from './view-recurring-invoice-styles';
import {formattedInvoices} from 'stores/recurring-invoices/selectors';
import {ARROW_ICON} from '@/assets';

export default class ViewRecurringInvoice extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {
      isFetchingInitialData: true,
      data: null
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {id, dispatch} = this.props;
    dispatch(
      fetchSingleRecurringInvoice(id, data =>
        this.setState({data, isFetchingInitialData: false})
      )
    );
  };

  onAddInvoice = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_RECURRING_INVOICE, {type: 'ADD'});
  };

  onSelectInvoice = invoice => {
    const {navigation} = this.props;

    navigation.navigate(routes.CREATE_INVOICE, {
      id: invoice?.id,
      type: 'UPDATE'
    });
  };

  editRecurringInvoice = () => {
    const {navigation, id} = this.props;

    navigation.navigate(routes.CREATE_RECURRING_INVOICE, {
      id,
      type: 'UPDATE'
    });
  };

  removeRecurringInvoice = () => {
    const {id, navigation, dispatch} = this.props;
    function onFail(error) {
      alertMe({
        title: error?.data?.message
      });
    }

    function confirmationAlert(remove) {
      alertMe({
        title: t('alert.title'),
        desc: t('recurring_invoices.alert_description'),
        showCancel: true,
        okPress: remove
      });
    }

    confirmationAlert(() =>
      dispatch(removeRecurringInvoice(id, navigation, onFail))
    );
  };

  onOptionSelect = action => {
    switch (action) {
      case RECURRING_INVOICES_ACTIONS.EDIT:
        this.editRecurringInvoice();
        break;

      case RECURRING_INVOICES_ACTIONS.DELETE:
        this.removeRecurringInvoice();
        break;

      default:
        break;
    }
  };

  BASIC_INFO = () => {
    const {
      data: {
        customer,
        formattedStartsAt,
        formattedNextInvoiceAt,
        limit_by,
        formattedLimitDate,
        limit_count,
        status,
        frequency
      }
    } = this.state;
    const limitCount = {
      label: t('recurring_invoices.limit_types.count'),
      values: limit_count
    };
    const limitDate = {
      label: t('recurring_invoices.limit_types.date'),
      values: formattedLimitDate
    };

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        <Text h4 mt-17 color={this.props.theme.text.fifthColor}>
          {t('recurring_invoices.basic_info')}
        </Text>
        <ViewData label={'Customer'} values={customer?.name} />
        <ViewData
          inPairs
          first={{
            label: t('recurring_invoices.start_date'),
            values: formattedStartsAt
          }}
          second={{
            label: t('recurring_invoices.next_invoice_at'),
            values: formattedNextInvoiceAt
          }}
        />
        <ViewData
          inPairs
          first={{label: t('recurring_invoices.limit_by'), values: limit_by}}
          second={limit_by === 'DATE' ? limitDate : limitCount}
        />
        <ViewData
          inPairs
          first={{
            label: t('recurring_invoices.status.title'),
            values: status
          }}
          second={{
            label: t('recurring_invoices.display_frequency'),
            values: frequency
          }}
        />
      </ScrollView>
    );
  };

  INVOICES = () => {
    const {theme} = this.props;
    const {
      data: {invoices}
    } = this.state;
    return (
      <View>
        <Text h4 mt-25 color={theme.text.fifthColor}>
          {t('recurring_invoices.invoices')}
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
        >
          <ListView
            items={formattedInvoices(invoices, theme)}
            onPress={this.onSelectInvoice}
            bottomDivider
            isAnimated
          />
        </ScrollView>
      </View>
    );
  };

  render() {
    const {navigation, route, isAllowToDelete, isAllowToEdit} = this.props;
    const {isFetchingInitialData, data} = this.state;

    const headerProps = {
      title: t('header.recurring_invoice'),
      leftIcon: ARROW_ICON,
      leftIconPress: () => navigation.navigate(routes.RECURRING_INVOICES),
      placement: 'center',
      route,
      rightIcon: 'ellipsis-h',
      rightIconPress: this.onAddInvoice
    };

    const options = RECURRING_INVOICE_DROPDOWN(isAllowToEdit, isAllowToDelete);
    const drownDownProps = {
      options,
      onSelect: this.onOptionSelect,
      cancelButtonIndex: options.length,
      destructiveButtonIndex: options.length - 1,
      ...((!isAllowToDelete || !isAllowToEdit) && {
        destructiveButtonIndex: options.length + 1
      })
    };

    return (
      <DefaultLayout
        headerProps={headerProps}
        loadingProps={{is: isFetchingInitialData}}
        dropdownProps={drownDownProps}
      >
        {hasObjectLength(data) && this.BASIC_INFO()}
        {isArray(data?.invoices) && this.INVOICES()}
      </DefaultLayout>
    );
  }
}
