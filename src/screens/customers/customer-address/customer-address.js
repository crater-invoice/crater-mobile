import React, {Component} from 'react';
import {Field, initialize, change} from 'redux-form';
import {Keyboard} from 'react-native';
import t from 'locales/use-translation';
import {IProps, IStates} from './customer-address-type.d';
import {hasObjectLength} from '@/constants';
import {keyboardType} from '@/helpers/keyboard';
import {ADDRESS_FORM} from 'stores/customer/types';
import {CountrySelectModal} from '@/select-modal';
import {
  DefaultLayout,
  BaseInput,
  BaseButtonGroup,
  BaseButton,
  BaseSelect
} from '@/components';

export default class Address extends Component<IProps, IStates> {
  keyboardShowListener: any;
  keyboardHideListener: any;

  constructor(props) {
    super(props);
    this.state = {isFetchingInitialData: true, isKeyboardVisible: false};
  }

  componentDidMount() {
    this.loadData();
    this.keyboardListener();
  }

  keyboardListener = () => {
    this.keyboardShowListener = Keyboard?.addListener?.('keyboardDidShow', () =>
      this.setState({isKeyboardVisible: true})
    );
    this.keyboardHideListener = Keyboard?.addListener?.('keyboardDidHide', () =>
      this.setState({isKeyboardVisible: false})
    );
  };

  componentWillUnmount = () => {
    this.keyboardShowListener?.remove?.();
    this.keyboardHideListener?.remove?.();
  };

  loadData = () => {
    const {initialData} = this.props;

    if (hasObjectLength(initialData)) {
      this.setInitialData(initialData);
      return;
    }

    this.setState({isFetchingInitialData: false});
  };

  setInitialData = data => {
    if (!hasObjectLength(data)) {
      return;
    }

    const {dispatch} = this.props;
    dispatch(initialize(ADDRESS_FORM, data));
    this.setState({isFetchingInitialData: false});
  };

  onSave = values => {
    const {callback, navigation} = this.props;
    callback?.(values);
    navigation.goBack();
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(ADDRESS_FORM, field, value));
  };

  copyFromBilling = () => {
    this.setInitialData(this.props.billingAddress);
  };

  render() {
    const {
      navigation,
      isBilling,
      handleSubmit,
      disabled,
      theme,
      countries
    } = this.props;
    const {isFetchingInitialData, isKeyboardVisible} = this.state;
    const addressRefs: any = {};
    const headerProps = {
      leftIconPress: () => navigation.goBack(null),
      title: isBilling
        ? t('header.billing_address')
        : t('header.shipping_address'),
      placement: 'center',
      hasCircle: false,
      noBorder: false,
      transparent: false
    };
    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton
          onPress={handleSubmit(this.onSave)}
          show={!isKeyboardVisible && !disabled}
          disabled={isFetchingInitialData}
        >
          {t('button.done')}
        </BaseButton>
      </BaseButtonGroup>
    );

    return (
      <DefaultLayout
        headerProps={headerProps}
        bottomAction={bottomAction}
        loadingProps={{is: isFetchingInitialData}}
      >
        {!isBilling && !disabled && (
          <BaseSelect
            icon="copy"
            color={theme?.text?.fourthColor}
            leftIconSolid={false}
            values={t('customers.address.same_as')}
            valueStyle={{color: theme?.text?.primaryColor}}
            onChangeCallback={this.copyFromBilling}
          />
        )}

        <Field
          name="name"
          component={BaseInput}
          hint={t('customers.address.name')}
          disabled={disabled}
        />

        <Field
          name="country_id"
          countries={countries}
          component={CountrySelectModal}
          onSelect={({id}) => this.setFormField('country_id', id)}
          theme={theme}
          disabled={disabled}
        />

        <Field
          name="state"
          component={BaseInput}
          hint={t('customers.address.state')}
          onSubmitEditing={() => addressRefs.city.focus()}
          disabled={disabled}
        />

        <Field
          name="city"
          component={BaseInput}
          hint={t('customers.address.city')}
          onSubmitEditing={() => addressRefs.street1.focus()}
          refLinkFn={ref => (addressRefs.city = ref)}
          disabled={disabled}
        />

        <Field
          name="address_street_1"
          component={BaseInput}
          hint={t('customers.address.address')}
          placeholder={t('customers.address.street_1')}
          inputProps={{multiline: true}}
          height={60}
          refLinkFn={ref => (addressRefs.street1 = ref)}
          disabled={disabled}
        />

        <Field
          name="address_street_2"
          component={BaseInput}
          placeholder={t('customers.address.street_2')}
          inputProps={{multiline: true}}
          height={60}
          containerStyle={{marginTop: -15}}
          disabled={disabled}
        />

        <Field
          name="phone"
          component={BaseInput}
          hint={t('customers.address.phone')}
          onSubmitEditing={() => addressRefs.zip.focus()}
          keyboardType={keyboardType.PHONE}
          refLinkFn={ref => (addressRefs.phone = ref)}
          disabled={disabled}
        />

        <Field
          name="zip"
          component={BaseInput}
          hint={t('customers.address.zip_code')}
          refLinkFn={ref => (addressRefs.zip = ref)}
          disabled={disabled}
        />
      </DefaultLayout>
    );
  }
}
