import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, change} from 'redux-form';
import debounce from 'lodash/debounce';
import t from 'locales/use-translation';
import {commonSelector} from 'stores/common/selectors';
import {NUMBERING_SCHEME_TYPE} from 'stores/customize/helpers';
import {fetchNextNumber} from 'stores/customize/actions';
import {ITheme} from '@/interfaces';
import {
  ToggleSwitch,
  InputField,
  CtDivider,
  Editor,
  PLACEHOLDER_TYPES as TYPE,
  Text,
  ActionButton,
  SelectPickerField
} from '@/components';

interface IProps {
  keyName?: String;
  numberSchemeField?: object;
  prefixField?: object;
  separatorField?: object;
  numberLengthField?: any;
  dispatch?: (fun: object) => void;
  form?: String;
  theme?: ITheme;
}

export class NumberScheme extends Component<IProps> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.onChangeNumber();
  }

  onChangeNumber = () => {
    const {
      keyName,
      numberSchemeField,
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
            numberSchemeField.value === 'company_level' ? prefix : 'CST',
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
          onChangeCallback={this.onChangeNumber}
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
