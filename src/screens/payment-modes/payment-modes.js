import React, {Component} from 'react';
import {View} from 'react-native';
import {change} from 'redux-form';
import t from 'locales/use-translation';
import {formatListByName} from '@/utils';
import styles from './payment-modes-style';
import {alertMe, defineSize, isEmpty} from '@/constants';
import {ListView, InputModal, InfiniteScroll} from '@/components';
import {PAYMENT_MODES_FORM} from 'stores/payment-modes/types';
import {
  addPaymentMode,
  updatePaymentMode,
  removePaymentMode
} from 'stores/payment-modes/actions';

export class PaymentModes extends Component {
  constructor(props) {
    super(props);
    this.scrollViewReference = React.createRef();
    this.modalReference = React.createRef();
    this.state = {isCreateMethod: true};
  }

  componentDidMount() {
    this.props.reference?.(this);
  }

  componentWillUnmount() {
    this.props.reference?.(undefined);
  }

  onToggle = () => this?.modalReference?.onToggle?.();

  onSave = () => {
    const {isCreateMethod} = this.state;
    const {dispatch, formValues: values, isSaving, isDeleting} = this.props;

    if (!values?.methodName || isSaving || isDeleting) {
      return;
    }

    const params = {
      params: {
        id: values?.methodId,
        name: values?.methodName
      },
      onSuccess: () => this.onToggle(),
      onFail: () => this.onToggle()
    };

    isCreateMethod
      ? dispatch(addPaymentMode(params))
      : dispatch(updatePaymentMode(params));
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(PAYMENT_MODES_FORM, field, value));
  };

  onRemoveMethod = () => {
    const {
      dispatch,
      formValues: {methodId: id}
    } = this.props;

    alertMe({
      title: t('alert.title'),
      desc: t('payments.alert_mode'),
      showCancel: true,
      okPress: () =>
        dispatch(
          removePaymentMode({
            id,
            onSuccess: () => this.onToggle(),
            onFail: () => this.onToggle()
          })
        )
    });
  };

  onSelectPaymentMode = ({name, id}) => {
    this.setFormField('methodId', id);
    this.openModal(name);
  };

  openModal = (name = '') => {
    this.setState({isCreateMethod: name ? false : true});
    this.setFormField('methodName', name);
    this.onToggle();
  };

  render() {
    const {
      paymentModes,
      fetchPaymentModes,
      isSaving,
      isDeleting,
      isAllowToEdit
    } = this.props;
    const {isCreateMethod} = this.state;

    const getTitle = () => {
      let title = 'payments.add_mode';
      if (!isCreateMethod && !isAllowToEdit) title = 'header.view_payment_mode';
      if (!isCreateMethod && isAllowToEdit) title = 'payments.edit_mode';

      return t(title);
    };

    return (
      <View style={styles.childContainer}>
        <InfiniteScroll
          getItems={fetchPaymentModes}
          reference={ref => (this.scrollViewReference = ref)}
          paginationLimit={defineSize(15, 15, 15, 20)}
        >
          <ListView
            items={formatListByName(paymentModes)}
            getFreshItems={onHide => onHide?.()}
            onPress={this.onSelectPaymentMode}
            isEmpty={isEmpty(paymentModes)}
            isAnimated
            bottomDivider
            contentContainerStyle={styles.contentContainerStyle}
            emptyContentProps={{title: t('payments.empty.mode_title')}}
            itemContainer={styles.itemContainer}
          />
        </InfiniteScroll>

        <InputModal
          reference={ref => (this.modalReference = ref)}
          headerTitle={getTitle()}
          hint={t('payments.mode_hint')}
          fieldName="methodName"
          onSubmit={this.onSave}
          onRemove={this.onRemoveMethod}
          showRemoveButton={!isCreateMethod}
          showSaveButton={isAllowToEdit}
          isSaving={isSaving}
          isDeleting={isDeleting}
        />
      </View>
    );
  }
}
