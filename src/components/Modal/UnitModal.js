import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import { InputModal } from '../InputModal';
import { createItemUnit } from '@/features/settings/actions';
import t from 'locales/use-translation';
import { hasValue } from '@/constants';

interface IProps {
    loading: boolean;
    reference: any;
    handleSubmit: Function;
    createItemUnit: Function;
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
        this.props.dispatch(change('UNIT_FORM', field, value));
    };

    onSubmit = ({ name }) => {
        const { createItemUnit } = this.props;

        if (!hasValue(name)) {
            return;
        }

        createItemUnit({
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
                headerTitle={t('items.addUnit')}
                hint={t('items.unitHint')}
                fieldName="name"
                onSubmit={handleSubmit(this.onSubmit)}
                onSubmitLoading={loading}
            />
        );
    }
}

const mapStateToProps = ({ settings, global }) => ({
    locale: global?.locale,
    loading: settings?.loading?.itemUnitLoading
});

const mapDispatchToProps = {
    createItemUnit
};

//  Redux Form
const unitReduxForm = reduxForm({
    form: 'UNIT_FORM'
})(Modal);

//  connect
export const UnitModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(unitReduxForm);
