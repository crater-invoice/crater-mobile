import React, {Component} from 'react';
import {Field, change, initialize, SubmissionError} from 'redux-form';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-recurring-invoice-type';
import {routes} from '@/navigation';
import {alertMe, KEYBOARD_TYPE} from '@/constants';
import {CREATE_RECURRING_INVOICE_FORM} from 'stores/recurring-invoices/types';
import {IMAGES} from '@/assets';
import headerTitle from 'utils/header';
import {DefaultLayout, InputField, ActionButton} from '@/components';
import {
  fetchSingleRecurringInvoice,
  addRecurringInvoice,
  updateRecurringInvoice,
  removeRecurringInvoice
} from 'stores/recurring-invoices/actions';

export default class CreateRecurringInvoice extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {isFetchingInitialData: true};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    console.log('this.props', this.props);
    const {isEditScreen, id, dispatch} = this.props;
    if (isEditScreen) {
      dispatch(
        fetchSingleRecurringInvoice(id, invoice => this.setInitialData(invoice))
      );
      return;
    }

    this.setState({isFetchingInitialData: false});
  };

  setInitialData = invoice => {
    const {dispatch} = this.props;
    dispatch(initialize(CREATE_RECURRING_INVOICE_FORM, invoice));
    this.setState({isFetchingInitialData: false});
  };

  throwError = errors => {
    let error: any = {};
    errors.email && (error.email = 'validation.alreadyTaken');
    errors.phone && (error.phone = 'validation.alreadyTaken');
    throw new SubmissionError(error);
  };

  onSave = values => {
    const {id, isCreateScreen, navigation, dispatch, handleSubmit} = this.props;
    const {isFetchingInitialData} = this.state;

    if (this.props.isSaving || this.props.isDeleting || isFetchingInitialData) {
      return;
    }

    const params = {
      id,
      params: values,
      navigation,
      submissionError: errors => handleSubmit(() => this.throwError(errors))()
    };

    isCreateScreen
      ? dispatch(addRecurringInvoice(params))
      : dispatch(updateRecurringInvoice(params));
  };

  removeRecurringInvoice = () => {
    const {id, navigation, dispatch} = this.props;
    function alreadyUsedAlert() {
      alertMe({
        title: t('users.text_already_used')
      });
    }

    function confirmationAlert(remove) {
      alertMe({
        title: t('alert.title'),
        desc: t('users.text_alert_description'),
        showCancel: true,
        okPress: remove
      });
    }

    confirmationAlert(() =>
      dispatch(
        removeRecurringInvoice(id, navigation, val => alreadyUsedAlert())
      )
    );
  };

  setFormField = (field, value) => {
    const {dispatch} = this.props;
    dispatch(change(CREATE_RECURRING_INVOICE_FORM, field, value));
  };

  navigateToRole = () => {
    const {navigation} = this.props;
    navigation.navigate(routes.CREATE_ROLE, {
      type: 'ADD',
      onSelect: item => this.setFormField(`role`, item.name)
    });
  };

  render() {
    const {
      roles,
      isEditScreen,
      isAllowToEdit,
      formValues,
      fetchRoles
    } = this.props;
    const {isFetchingInitialData} = this.state;
    const disabled = !isAllowToEdit;
    const loading =
      isFetchingInitialData || this.props.isSaving || this.props.isDeleting;

    const bottomAction = [
      {
        label: 'button.save',
        onPress: this.props.handleSubmit(this.onSave),
        show: isAllowToEdit,
        loading
      },
      {
        label: 'button.remove',
        onPress: this.removeRecurringInvoice,
        bgColor: 'btn-danger',
        show: isEditScreen && this.props.isAllowToDelete,
        loading
      }
    ];

    const headerProps = {
      leftIconPress: () => this.props.navigation.goBack(null),
      title: headerTitle(this.props),
      placement: 'center',
      ...(isAllowToEdit && {
        rightIcon: 'save',
        rightIconProps: {solid: true},
        rightIconPress: this.props.handleSubmit(this.onSave)
      })
    };

    return (
      <DefaultLayout
        headerProps={headerProps}
        bottomAction={<ActionButton buttons={bottomAction} />}
        loadingProps={{is: isFetchingInitialData}}
      ></DefaultLayout>
    );
  }
}
