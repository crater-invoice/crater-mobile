import React, {Component} from 'react';
import {Field, initialize} from 'redux-form';
import t from 'locales/use-translation';
import {IProps, IStates} from './customer-address-type.d';
import {SHIPPING_ADDRESS_FORM} from 'stores/customer/types';
import {fetchSalesTaxRate} from 'stores/taxation/actions';
import {taxationTypes} from 'stores/taxation/helper';
import {
  BaseButton,
  ModalLayout,
  BaseInput,
  BaseButtonGroup
} from '@/components';

export default class CustomerAddress extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.state = {isFetchingInitialData: true};
  }

  componentDidMount(): void {
    this.loadData();
  }

  loadData = () => {
    const {dispatch, address} = this.props;
    dispatch(initialize(SHIPPING_ADDRESS_FORM, address));
    this.setState({isFetchingInitialData: false});
  };

  onSave = address => {
    const {dispatch, parentForm} = this.props;
    const params = {
      form: parentForm,
      type: taxationTypes.CUSTOMER_LEVEL,
      goBack: true,
      address
    };
    dispatch(fetchSalesTaxRate(params));
  };

  render() {
    const {handleSubmit, isSaving} = this.props;
    const {isFetchingInitialData} = this.state;

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          loading={isSaving}
          disabled={isFetchingInitialData}
          onPress={handleSubmit(this.onSave)}
        >
          {t('button.save')}
        </BaseButton>
      </BaseButtonGroup>
    );

    return (
      <ModalLayout
        title={t('modal.shipping_address')}
        sub-title={t('modal.sales_tax_heading')}
        bottomAction={bottomAction}
        loadingProps={{is: isFetchingInitialData}}
      >
        <Field
          name="address_street_1"
          component={BaseInput}
          hint={t('settings.company.address')}
          height={60}
          inputProps={{multiline: true}}
          isRequired
        />

        {/* <Field
          name="address_street_2"
          component={BaseInput}
          height={60}
          placeholder={t('settings.company.street_2')}
          inputProps={{multiline: true}}
          containerStyle={{marginTop: -15}}
        /> */}

        <Field
          name="city"
          component={BaseInput}
          hint={t('customers.address.city')}
          isRequired
        />

        <Field
          name="state"
          component={BaseInput}
          hint={t('customers.address.state')}
          isRequired
        />

        <Field
          name="zip"
          component={BaseInput}
          hint={t('settings.company.zip_code')}
          isRequired
        />
      </ModalLayout>
    );
  }
}
