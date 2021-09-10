import React, {Component} from 'react';
import {View} from 'react-native';
import {ListView, InputModal, InfiniteScroll} from '@/components';
import t from 'locales/use-translation';
import {formatListByName} from '@/utils';
import {alertMe, isIPhoneX} from '@/constants';
import {PAYMENT_MODES_FORM} from 'stores/payment-modes/types';
import {change} from 'redux-form';
import {
  addPaymentMode,
  updatePaymentMode,
  removePaymentMode,
  fetchPaymentModes
} from 'stores/payment-modes/actions';

export class PaymentModes extends Component {
  constructor(props) {
    super(props);
    this.scrollViewReference = React.createRef();
    this.modalReference = React.createRef();

    this.state = {
      isCreateMethod: true
    };
  }

  componentDidMount() {
    this.props.reference?.(this);
  }

  componentWillUnmount() {
    this.props.reference?.(undefined);
  }

  onToggle = () => this?.modalReference?.onToggle?.();

  onSaveMethod = () => {
    const {isCreateMethod} = this.state;
    const {
      formValues: {methodName = '', methodId = null},
      dispatch
    } = this.props;

    const params = {
      params: {
        id: methodId,
        name: methodName
      },
      onSuccess: () => this.onToggle()
    };

    if (methodName) {
      isCreateMethod
        ? dispatch(addPaymentMode(params))
        : dispatch(updatePaymentMode(params));
    }
  };
  setFormField = (field, value) => {
    this.props.dispatch(change(PAYMENT_MODES_FORM, field, value));
  };

  onRemoveMethod = () => {
    const {
      dispatch,
      formValues: {methodId = null}
    } = this.props;

    alertMe({
      title: t('alert.title'),
      desc: t('payments.alertMode'),
      showCancel: true,
      okPress: () => {
        dispatch(
          removePaymentMode({
            id: methodId,
            onSuccess: () => this.onToggle()
          })
        );
      }
    });
  };

  INPUT_MODAL = () => {
    const {isCreateMethod} = this.state;
    const {paymentModeLoading = false} = this.props;

    const isAllowToEdit = true;
    const disabled = !isAllowToEdit;

    const getTitle = () => {
      let title = 'payments.addMode';
      if (!isCreateMethod && !isAllowToEdit) title = 'header.viewPaymentMode';
      if (!isCreateMethod && isAllowToEdit) title = 'payments.editMode';

      return t(title);
    };

    return (
      <InputModal
        reference={ref => (this.modalReference = ref)}
        headerTitle={getTitle()}
        hint={t('payments.modeHint')}
        fieldName="methodName"
        onSubmit={() => this.onSaveMethod()}
        onRemove={() => this.onRemoveMethod()}
        showRemoveButton={!isCreateMethod}
        showSaveButton={isAllowToEdit}
        onSubmitLoading={paymentModeLoading}
        onRemoveLoading={paymentModeLoading}
        disabled={disabled}
      />
    );
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
    const {paymentModes, fetchPaymentModes} = this.props;

    return (
      <View style={{paddingTop: 10, flex: 1}}>
        {this.INPUT_MODAL()}
        <InfiniteScroll
          getItems={fetchPaymentModes}
          reference={ref => (this.scrollViewReference = ref)}
          paginationLimit={isIPhoneX ? 20 : 15}
        >
          <ListView
            items={formatListByName(paymentModes)}
            getFreshItems={onHide => {
              onHide && onHide();
            }}
            onPress={this.onSelectPaymentMode}
            isEmpty={paymentModes ? paymentModes.length <= 0 : true}
            bottomDivider
            contentContainerStyle={{flex: 3}}
            emptyContentProps={{
              title: t('payments.empty.modeTitle')
            }}
            itemContainer={{
              paddingHorizontal: 35
            }}
            isAnimated
          />
        </InfiniteScroll>
      </View>
    );
  }
}
