import React, {Component} from 'react';
import {Field, change} from 'redux-form';
import t from 'locales/use-translation';
import {NUMBERING_SCHEME_TYPE} from 'stores/customize/helpers';
import {fetchNextNumber} from 'stores/customize/actions';
import {BaseDropdownPicker, InputField} from '@/components';
import {keyboardType} from '@/constants';

interface IProps {
  /**
   * Current key for params.
   */
  keyName?: String;

  /**
   * An object with data for number-scheme field.
   */
  numberSchemeField?: object;

  /**
   * An object with data for prefix field.
   */
  prefixField?: object;

  /**
   * An object with data for separator field.
   */
  separatorField?: object;

  /**
   * An object with data for number-length field.
   */
  numberLengthField?: any;

  /**
   * Dispatch change action.
   */
  dispatch?: (fun: object) => void;

  /**
   * Name of current form.
   */
  form?: String;
}

export class NumberScheme extends Component<IProps> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.onChangeNumber();
  }

  onChangeNumber = (
    numberSchemeField = this.props.numberSchemeField?.value
  ) => {
    const {
      keyName,
      prefixField,
      separatorField,
      numberLengthField,
      dispatch,
      form
    } = this.props;

    const params = {
      prefix: prefixField.value,
      separator: separatorField.value,
      number_length: numberLengthField.value,
      key: keyName
    };

    dispatch(
      fetchNextNumber({
        params,
        onSuccess: data => {
          const {prefix, separator, nextNumber} = data;
          const value = [
            numberSchemeField === 'company_level' ? prefix : 'CST',
            separator,
            nextNumber
          ].join(' ');
          dispatch(change(form, 'next_umber', value));
        }
      })
    );
  };

  render() {
    const {
      numberSchemeField,
      prefixField,
      separatorField,
      numberLengthField
    } = this.props;

    return (
      <>
        <Field
          name={numberSchemeField.name}
          label={t('customizes.numbering_scheme.title')}
          component={BaseDropdownPicker}
          fieldIcon="align-center"
          items={NUMBERING_SCHEME_TYPE}
          onChangeCallback={value => this.onChangeNumber(value)}
          callbackWhenMount={() => {}}
          isRequired
        />
        {numberSchemeField.value === 'company_level' && (
          <Field
            name={prefixField.name}
            component={InputField}
            hint={t('customizes.prefix')}
            inputProps={{autoCapitalize: 'characters'}}
            onChangeText={this.onChangeNumber}
            fieldName={t('customizes.prefix')}
            isRequired
            isDebounce
          />
        )}
        <Field
          name={separatorField.name}
          component={InputField}
          hint={t('customizes.separator')}
          onChangeText={this.onChangeNumber}
          fieldName={t('customizes.prefix')}
          isRequired
          isDebounce
        />
        <Field
          name={numberLengthField.name}
          component={InputField}
          maxNumber={2}
          hint={t('customizes.number_length')}
          keyboardType={keyboardType.NUMERIC}
          onChangeText={this.onChangeNumber}
          isRequired
          isDebounce
        />
        <Field
          name="next_umber"
          component={InputField}
          hint={t('customizes.next_number')}
          inputProps={{}}
          meta={{}}
          disabled
        />
      </>
    );
  }
}
