import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import {InputModal} from '../input-modal';
import {addPaymentMode} from 'stores/payment-mode/actions';
import t from 'locales/use-translation';
import {hasValue} from '@/constants';
import {commonSelector} from 'stores/common/selectors';
import {loadingSelector} from 'stores/payment-mode/selectors';

interface IProps {
  isSaving: boolean;
  reference: any;
  handleSubmit: () => void;
  addPaymentMode: () => void;
  dispatch: () => void;
}

class Modal extends Component<IProps> {
  modalReference: any;

  constructor(props) {
    super(props);
    this.modalReference = React.createRef();
  }

  componentDidMount() {
    this.props.reference?.(this);
  }

  componentWillUnmount() {
    this.props.reference?.(undefined);
  }

  onToggle = () => {
    this?.modalReference?.onToggle?.();
  };

  setFormField = (field, value) => {
    this.props.dispatch(change('PAYMENT_MODE_FORM', field, value));
  };

  onSubmit = ({name}) => {
    const {addPaymentMode} = this.props;

    if (!hasValue(name)) {
      return;
    }

    addPaymentMode({
      params: {name},
      onSuccess: () => {
        this.setFormField('name', null);
        this.onToggle();
      },
      onFail: () => {
        this.setFormField('name', null);
        this.onToggle();
      }
    });
  };

  render() {
    const {handleSubmit, isSaving} = this.props;
    return (
      <InputModal
        reference={ref => (this.modalReference = ref)}
        headerTitle={t('payments.add_mode')}
        hint={t('payments.mode_hint')}
        fieldName="name"
        onSubmit={handleSubmit(this.onSubmit)}
        isSaving={isSaving}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...commonSelector(state),
  ...loadingSelector(state)
});

const mapDispatchToProps = {
  addPaymentMode
};

const modeForm = reduxForm({
  form: 'PAYMENT_MODE_FORM'
})(Modal);

export const PaymentModeModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(modeForm);
