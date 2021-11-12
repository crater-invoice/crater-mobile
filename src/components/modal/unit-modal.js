import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import {InputModal} from '../input-modal';
import {addItemUnit} from 'stores/item-unit/actions';
import t from 'locales/use-translation';
import {hasValue} from '@/constants';
import {commonSelector} from 'stores/common/selectors';
import {loadingSelector} from 'stores/item-unit/selectors';

interface IProps {
  isSaving: boolean;
  reference: any;
  handleSubmit: () => void;
  addItemUnit: () => void;
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
    this.props.dispatch(change('UNIT_FORM', field, value));
  };

  onSubmit = ({name}) => {
    const {addItemUnit} = this.props;

    if (!hasValue(name)) {
      return;
    }

    addItemUnit({
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
        headerTitle={t('items.add_hint')}
        hint={t('items.unit_hint')}
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
  addItemUnit
};

const unitForm = reduxForm({
  form: 'UNIT_FORM'
})(Modal);

export const UnitModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(unitForm);
