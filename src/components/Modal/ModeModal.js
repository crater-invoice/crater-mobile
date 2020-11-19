import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import { InputModal } from '../InputModal';
import { createPaymentMode } from '@/features/settings/actions';
import Lng from '@/lang/i18n';
import { hasValue } from '@/constants';

interface IProps {
    locale: string;
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
        const { locale, handleSubmit, loading } = this.props;
        return (
            <InputModal
                reference={ref => (this.modalReference = ref)}
                locale={locale}
                headerTitle={Lng.t('payments.addMode', { locale })}
                hint={Lng.t('payments.modeHint', { locale })}
                fieldName="name"
                onSubmit={handleSubmit(this.onSubmit)}
                onSubmitLoading={loading}
            />
        );
    }
}

const mapStateToProps = ({ settings, global }) => ({
    locale: global?.locale,
    loading: settings?.loading?.paymentModeLoading
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
