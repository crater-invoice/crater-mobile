import React, {Component} from 'react';
import {View, Keyboard, ScrollView} from 'react-native';
import {Field, change} from 'redux-form';
import {CUSTOMER_ADDRESS} from '../../constants';
import t from 'locales/use-translation';
import {keyboardType, MAX_LENGTH} from '@/constants';
import styles from './styles';
import {SlideModal, FakeInput, InputField, ActionButton} from '@/components';
import {CountrySelectModal} from '@/select-modal';

type IProps = {
  label: String,
  icon: String,
  onChangeCallback: Function,
  placeholder: String,
  containerStyle: Object,
  rightIcon: String,
  leftIcon: String,
  color: String,
  value: String,
  items: Object,
  rightIcon: String,
  hasBillingAddress: Boolean,
  meta: Object,
  handleSubmit: Function,
  type: String
};

let country = 'country_id';
let state = 'state';
let city = 'city';

let addressField = [
  'name',
  'address_street_1',
  'address_street_2',
  'phone',
  'zip',
  'country_id',
  'state',
  'city',
  'type'
];

export class Address extends Component<IProps> {
  countryReference: any;

  constructor(props) {
    super(props);
    this.countryReference = React.createRef();

    this.state = {
      visible: false,
      values: '',
      status: false,
      isKeyboardVisible: false
    };
  }

  componentDidMount = () => {
    this.keyboardDidShowListener = Keyboard?.addListener?.(
      'keyboardDidShow',
      () => {
        this.setState({isKeyboardVisible: true});
      }
    );
    this.keyboardDidHideListener = Keyboard?.addListener?.(
      'keyboardDidHide',
      () => {
        this.setState({isKeyboardVisible: false});
      }
    );
  };

  componentWillUnmount = () => {
    this.keyboardDidShowListener?.remove?.();
    this.keyboardDidHideListener?.remove?.();
  };

  fillShippingAddress = status => {
    if (status) {
      this.setState({status});
      const {autoFillValue} = this.props;

      if (typeof autoFillValue !== 'undefined') {
        addressField.map(field => {
          this.setFormField(field, autoFillValue[field]);
        });

        if (autoFillValue?.country_id) {
          this.countryReference?.changeDisplayValueByUsingCompareField?.(
            autoFillValue?.country_id
          );
        }
      }
    } else {
      this.setState({status});
      this.clearFormField();
    }
  };

  onToggle = () => {
    const {visible, status} = this.state;
    const {addressValue, hasBillingAddress, autoFillValue} = this.props;

    if (!visible) {
      if (typeof addressValue !== 'undefined') {
        addressField.map(field => {
          this.setFormField(field, addressValue[field]);
        });
      }

      if (
        !hasBillingAddress &&
        status === true &&
        typeof addressValue === 'undefined'
      ) {
        if (typeof autoFillValue !== 'undefined') {
          addressField.map(field => {
            this.setFormField(field, autoFillValue[field]);
          });
        }
      }
    } else {
      if (typeof addressValue === 'undefined') this.clearFormField();
    }
    this.setState(({visible}) => ({visible: !visible}));
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(CUSTOMER_ADDRESS, field, value));
  };

  clearFormField = () => {
    addressField.map(field => {
      this.setFormField(field, '');
    });
  };

  saveAddress = address => {
    const {onChangeCallback} = this.props;
    this.onToggle();

    onChangeCallback(address);
    this.clearFormField();
  };

  Screen = () => {
    const {
      handleSubmit,
      hasBillingAddress,
      navigation,
      countries,
      theme,
      disabled
    } = this.props;

    const {status, isKeyboardVisible} = this.state;

    let addressRefs = {};

    return (
      <ScrollView
        style={[{paddingBottom: 15}, isKeyboardVisible && {paddingBottom: 120}]}
        keyboardShouldPersistTaps="handled"
      >
        {!hasBillingAddress && !disabled && (
          <FakeInput
            icon={'copy'}
            color={theme?.text?.fourthColor}
            leftIconSolid={false}
            values={t('customers.address.sameAs')}
            valueStyle={{color: theme?.text?.primaryColor}}
            onChangeCallback={() => this.fillShippingAddress(!status)}
          />
        )}

        <Field
          name={'name'}
          component={InputField}
          hint={t('customers.address.name')}
          disabled={disabled}
        />

        <Field
          name={country}
          countries={countries}
          component={CountrySelectModal}
          onSelect={({id}) => this.setFormField(country, id)}
          reference={ref => (this.countryReference = ref)}
          theme={theme}
          disabled={disabled}
        />

        <Field
          name={state}
          component={InputField}
          hint={t('customers.address.state')}
          onSubmitEditing={() => addressRefs.city.focus()}
          disabled={disabled}
        />

        <Field
          name={city}
          component={InputField}
          hint={t('customers.address.city')}
          onSubmitEditing={() => addressRefs.street1.focus()}
          refLinkFn={ref => (addressRefs.city = ref)}
          disabled={disabled}
        />

        <Field
          name={'address_street_1'}
          component={InputField}
          hint={t('customers.address.address')}
          placeholder={t('customers.address.street1')}
          inputProps={{
            multiline: true,
            maxLength: MAX_LENGTH
          }}
          height={60}
          refLinkFn={ref => (addressRefs.street1 = ref)}
          disabled={disabled}
        />

        <Field
          name={'address_street_2'}
          component={InputField}
          placeholder={t('customers.address.street2')}
          inputProps={{
            multiline: true,
            maxLength: MAX_LENGTH
          }}
          height={60}
          containerStyle={styles.addressStreetField}
          disabled={disabled}
        />

        <Field
          name={'phone'}
          component={InputField}
          hint={t('customers.address.phone')}
          onSubmitEditing={() => addressRefs.zip.focus()}
          keyboardType={keyboardType.PHONE}
          refLinkFn={ref => (addressRefs.phone = ref)}
          disabled={disabled}
        />

        <Field
          name={'zip'}
          component={InputField}
          hint={t('customers.address.zipcode')}
          onSubmitEditing={handleSubmit(this.saveAddress)}
          refLinkFn={ref => (addressRefs.zip = ref)}
          disabled={disabled}
        />
      </ScrollView>
    );
  };

  render() {
    const {
      containerStyle,
      label,
      icon,
      placeholder,
      meta,
      rightIcon,
      hasBillingAddress,
      handleSubmit,
      fakeInputProps,
      theme,
      mainContainerStyle,
      disabled
    } = this.props;

    const {visible, values, isKeyboardVisible} = this.state;
    const bottomAction = [
      {
        label: 'button.done',
        onPress: handleSubmit(this.saveAddress),
        show: !isKeyboardVisible && !disabled
      }
    ];

    return (
      <View style={[styles.container(theme), mainContainerStyle]}>
        <FakeInput
          label={label}
          icon={icon}
          rightIcon={rightIcon}
          values={values || placeholder}
          placeholder={placeholder}
          onChangeCallback={this.onToggle}
          containerStyle={containerStyle}
          meta={meta}
          {...fakeInputProps}
        />

        <SlideModal
          defaultLayout
          visible={visible}
          onToggle={this.onToggle}
          headerProps={{
            leftIconPress: () => this.onToggle(),
            title: hasBillingAddress
              ? t('header.billingAddress')
              : t('header.shippingAddress'),
            placement: 'center',
            hasCircle: false,
            noBorder: false,
            transparent: false
          }}
          bottomAction={<ActionButton buttons={bottomAction} />}
        >
          {this.Screen()}
        </SlideModal>
      </View>
    );
  }
}
