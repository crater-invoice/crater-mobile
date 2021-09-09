import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import { InputModal } from '../InputModal';
import { createPaymentMode } from 'stores/payment-modes/actions';
import t from 'locales/use-translation';
import { hasValue } from '@/constants';
import { commonSelector } from 'stores/common/selectors';

interface IProps {
    loading: boolean;
    reference: any;
    handleSubmit: Function;
    createPaymentMode: Function;
    dispatch: Function;
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

    onSubmit = ({ name }) => {
        const { createPaymentMode } = this.props;

        if (!hasValue(name)) {
            return;
        }

        createPaymentMode({
            params: { name },
            onSuccess: () => {
                this.setFormField('name', null);
                this.onToggle();
            }
        });
    };

    render() {
        const { handleSubmit, loading } = this.props;
        return (
            <InputModal
                reference={ref => (this.modalReference = ref)}
                headerTitle={t('payments.addMode')}
                hint={t('payments.modeHint')}
                fieldName="name"
                onSubmit={handleSubmit(this.onSubmit)}
                onSubmitLoading={loading}
            />
        );
    }
}

const mapStateToProps = state => ({
    ...commonSelector(state),
    loading: state.settings?.loading?.paymentModeLoading
});

const mapDispatchToProps = {
    createPaymentMode
};

//  Redux Form
const modeReduxForm = reduxForm({
    form: 'PAYMENT_MODE_FORM'
})(Modal);

//  connect
export const PaymentModeModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(modeReduxForm);
