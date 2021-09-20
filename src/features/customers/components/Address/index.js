import React, {Component} from 'react';
import {View, Keyboard, ScrollView} from 'react-native';
import {Field, change} from 'redux-form';
import {CUSTOMER_ADDRESS} from '../../constants';
import t from 'locales/use-translation';
import {MAX_LENGTH} from '@/constants';
import styles from './styles';
import {
  SlideModal,
  FakeInput,
  InputField,
  SelectField,
  ActionButton
} from '@/components';

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
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true
          }}
          disabled={disabled}
        />

        <Field
          name={country}
          items={countries ?? []}
          displayName="name"
          component={SelectField}
          label={t('customers.address.country')}
          placeholder={' '}
          rightIcon="angle-right"
          navigation={navigation}
          searchFields={['name']}
          compareField="id"
          isInternalSearch
          onSelect={({id}) => this.setFormField(country, id)}
          headerProps={{
            title: t('header.country'),
            rightIconPress: null
          }}
          listViewProps={{
            contentContainerStyle: {flex: 7}
          }}
          emptyContentProps={{
            contentType: 'countries'
          }}
          reference={ref => (this.countryReference = ref)}
          fakeInputProps={{disabled}}
          isEditable={!disabled}
        />

        <Field
          name={state}
          component={InputField}
          hint={t('customers.address.state')}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true,
            onSubmitEditing: () => addressRefs.city.focus()
          }}
          disabled={disabled}
        />

        <Field
          name={city}
          component={InputField}
          hint={t('customers.address.city')}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true,
            onSubmitEditing: () => addressRefs.street1.focus()
          }}
          refLinkFn={ref => (addressRefs.city = ref)}
          disabled={disabled}
        />

        <Field
          name={'address_street_1'}
          component={InputField}
          hint={t('customers.address.address')}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            placeholder: t('customers.address.street1'),
            autoCorrect: true,
            multiline: true,
            maxLength: MAX_LENGTH
          }}
          height={60}
          autoCorrect={true}
          refLinkFn={ref => (addressRefs.street1 = ref)}
          disabled={disabled}
        />

        <Field
          name={'address_street_2'}
          component={InputField}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            placeholder: t('customers.address.street2'),
            autoCorrect: true,
            multiline: true,
            maxLength: MAX_LENGTH
          }}
          height={60}
          autoCorrect={true}
          containerStyle={styles.addressStreetField}
          disabled={disabled}
        />

        <Field
          name={'phone'}
          component={InputField}
          hint={t('customers.address.phone')}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true,
            keyboardType: 'phone-pad',
            onSubmitEditing: () => addressRefs.zip.focus()
          }}
          refLinkFn={ref => (addressRefs.phone = ref)}
          disabled={disabled}
        />

        <Field
          name={'zip'}
          component={InputField}
          hint={t('customers.address.zipcode')}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true,
            onSubmitEditing: handleSubmit(this.saveAddress)
          }}
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
