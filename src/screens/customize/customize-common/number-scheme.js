import React, {Component} from 'react';
import {Field, change} from 'redux-form';
import debounce from 'lodash/debounce';
import t from 'locales/use-translation';
import {NUMBERING_SCHEME_TYPE} from 'stores/customize/helpers';
import {fetchNextNumber} from 'stores/customize/actions';
import {ITheme} from '@/interfaces';
import {InputField, Text, SelectPickerField} from '@/components';

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

  /**
   * An active theme object.
   * @see ITheme
   */
  theme?: ITheme;
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
      theme,
      numberSchemeField,
      prefixField,
      separatorField,
      numberLengthField
    } = this.props;

    return (
      <>
        <Field
          name={numberSchemeField.name}
          label={t('customizes.numberingScheme.title')}
          component={SelectPickerField}
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
            inputProps={{
              returnKeyType: 'next',
              autoCorrect: true,
              autoCapitalize: 'characters'
            }}
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
          inputProps={{
            returnKeyType: 'next'
          }}
          onChangeText={this.onChangeNumber}
          fieldName={t('customizes.prefix')}
          isRequired
          isDebounce
        />

        <Field
          name={numberLengthField.name}
          component={InputField}
          maxNumber={2}
          hint={t('customizes.numberLength')}
          inputProps={{
            returnKeyType: 'next',
            keyboardType: 'numeric'
          }}
          onChangeText={this.onChangeNumber}
          isRequired
          isDebounce
        />

        <Field
          name="next_umber"
          component={InputField}
          hint={t('customizes.nextNumber')}
          inputProps={{}}
          meta={{}}
          disabled
        />
      </>
    );
  }
}
