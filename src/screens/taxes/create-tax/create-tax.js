import React, {Component} from 'react';
import {Field, initialize} from 'redux-form';
import {pick} from 'lodash';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-tax-type.d';
import {alertMe} from '@/constants';
import {keyboardType} from '@/helpers/keyboard';
import {CREATE_TAX_FORM} from 'stores/tax-type/types';
import {secondaryHeader} from 'utils/header';
import {
  addTax,
  updateTax,
  removeTax,
  fetchSingleTax
} from 'stores/tax-type/actions';
import {
  DefaultLayout,
  BaseInput,
  BaseButtonGroup,
  BaseButton,
  BaseSwitch
} from '@/components';

export default class CreateTax extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {isFetchingInitialData: true};
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const {isEditScreen, id, dispatch} = this.props;
    if (isEditScreen) {
      dispatch(fetchSingleTax(id, tax => this.setInitialData(tax)));
      return;
    }

    this.setState({isFetchingInitialData: false});
  };

  setInitialData = tax => {
    const {dispatch} = this.props;
    const data = pick(tax, ['name', 'percent', 'description', 'compound_tax']);
    dispatch(initialize(CREATE_TAX_FORM, data));
    this.setState({isFetchingInitialData: false});
  };

  onSave = values => {
    const {id, isCreateScreen, navigation, dispatch, route} = this.props;
    const {isFetchingInitialData} = this.state;

    if (this.props.isSaving || this.props.isDeleting || isFetchingInitialData) {
      return;
    }

    const onSuccess = res => {
      const onSelect = route?.params?.onSelect;
      onSelect?.([{...res, tax_type_id: res?.id}]);
      navigation.goBack(null);
    };
    const params = {id, params: values, onSuccess};

    isCreateScreen ? dispatch(addTax(params)) : dispatch(updateTax(params));
  };

  removeTax = () => {
    const {id, dispatch} = this.props;

    function confirmationAlert(remove) {
      alertMe({
        title: t('alert.title'),
        desc: t('taxes.alert_description'),
        showCancel: true,
        okPress: remove
      });
    }

    confirmationAlert(() => dispatch(removeTax(id)));
  };

  render() {
    const {
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      isSaving,
      isDeleting,
      handleSubmit
    } = this.props;
    const taxRefs: any = {};
    const {isFetchingInitialData} = this.state;
    const disabled = !isAllowToEdit;
    const headerProps = secondaryHeader({
      ...this.props,
      rightIconPress: handleSubmit(this.onSave)
    });

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          show={isAllowToEdit}
          loading={isSaving}
          disabled={isFetchingInitialData || isDeleting}
          onPress={handleSubmit(this.onSave)}
        >
          {t('button.save')}
        </BaseButton>
        <BaseButton
          type="danger"
          show={isEditScreen && isAllowToDelete}
          loading={isDeleting}
          disabled={isFetchingInitialData || isSaving}
          onPress={this.removeTax}
        >
          {t('button.remove')}
        </BaseButton>
      </BaseButtonGroup>
    );

    return (
      <DefaultLayout
        headerProps={headerProps}
        bottomAction={bottomAction}
        loadingProps={{is: isFetchingInitialData}}
      >
        <Field
          name="name"
          component={BaseInput}
          isRequired
          hint={t('taxes.type')}
          disabled={disabled}
          onSubmitEditing={() => taxRefs.percent.focus()}
        />

        <Field
          name="percent"
          isRequired
          component={BaseInput}
          hint={t('taxes.percentage') + ' (%)'}
          maxNumber={100}
          refLinkFn={ref => (taxRefs.percent = ref)}
          disabled={disabled}
          onSubmitEditing={() => taxRefs.description.focus()}
          keyboardType={keyboardType.DECIMAL}
        />

        <Field
          name="description"
          component={BaseInput}
          hint={t('taxes.description')}
          refLinkFn={ref => (taxRefs.description = ref)}
          height={80}
          disabled={disabled}
          inputProps={{multiline: true}}
        />

        <Field
          name="compound_tax"
          component={BaseSwitch}
          hint={t('taxes.compound_tax')}
          title-text-default
          disabled={disabled}
        />
      </DefaultLayout>
    );
  }
}
