import React, {Component} from 'react';
import {Field, change, initialize} from 'redux-form';
import {View} from 'react-native';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-custom-field-type.d';
import {alertMe, hasValue} from '@/constants';
import {keyboardType} from '@/helpers/keyboard';
import {CREATE_CUSTOM_FIELD_FORM} from 'stores/custom-field/types';
import {secondaryHeader} from 'utils/header';
import {dataTypeList, modalTypeList} from 'stores/custom-field/helpers';
import styles from './create-custom-field-style';
import options from './create-custom-field-options';
import {
  DefaultLayout,
  BaseInput,
  BaseButtonGroup,
  BaseButton,
  BaseSwitch,
  Text,
  BaseDropdownPicker
} from '@/components';
import {
  addCustomField,
  updateCustomField,
  removeCustomField,
  fetchSingleCustomField
} from 'stores/custom-field/actions';

export default class CreateCustomField extends Component<IProps, IStates> {
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
      dispatch(
        fetchSingleCustomField(id, customField =>
          this.setInitialData(customField)
        )
      );
      return;
    }

    this.setState({isFetchingInitialData: false});
  };

  setInitialData = customField => {
    const {dispatch} = this.props;
    const data = {
      ...customField,
      default_answer: customField.defaultAnswer || customField.default_answer
    };
    dispatch(initialize(CREATE_CUSTOM_FIELD_FORM, data));
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
      onSelect?.(res);
      navigation.goBack(null);
    };
    const params = {id, params: values, onSuccess};

    isCreateScreen
      ? dispatch(addCustomField(params))
      : dispatch(updateCustomField(params));
  };

  removeCustomField = () => {
    const {id, dispatch} = this.props;

    function confirmationAlert(remove) {
      alertMe({
        title: t('alert.title'),
        desc: t('custom_fields.remove_alert_description'),
        showCancel: true,
        okPress: remove
      });
    }

    confirmationAlert(() => dispatch(removeCustomField(id)));
  };

  setFormField = (field, value) => {
    this.props.dispatch(change(CREATE_CUSTOM_FIELD_FORM, field, value));
  };

  getOptionsValue = options => {
    return options.filter(option => hasValue(option) && option !== '');
  };

  render() {
    const {
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      isSaving,
      isDeleting,
      handleSubmit,
      formValues,
      theme
    } = this.props;
    const {isFetchingInitialData} = this.state;
    const disabled = !isAllowToEdit;
    const alreadyInUsed = formValues?.in_use;
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
          onPress={this.removeCustomField}
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
          hint={t('custom_fields.name')}
          isRequired
          disabled={disabled}
        />

        <Field
          name="model_type"
          component={BaseDropdownPicker}
          label={t('custom_fields.model')}
          fieldIcon="align-center"
          items={modalTypeList}
          disabled={disabled || alreadyInUsed}
          description={alreadyInUsed && t('custom_fields.already_in_use')}
          isRequired
          defaultPickerOptions={{
            label: t('custom_fields.model_placeholder'),
            value: ''
          }}
        />

        <View style={styles.row}>
          <View style={styles.positionView}>
            <Text
              h4
              color={theme?.viewLabel?.secondaryColor}
              medium={theme?.mode === 'dark'}
              style={{marginLeft: 3}}
            >
              {t('custom_fields.required')}
            </Text>
          </View>

          <View style={styles.column}>
            <Field
              name="is_required"
              component={BaseSwitch}
              switchStyle={{marginRight: 100}}
              hintStyle={styles.leftText}
              disabled={!isAllowToEdit}
            />
          </View>
        </View>

        <Field
          name="type"
          label={t('custom_fields.type')}
          component={BaseDropdownPicker}
          isRequired
          fieldIcon="align-center"
          items={dataTypeList}
          disabled={disabled || alreadyInUsed}
          description={alreadyInUsed && t('custom_fields.already_in_use')}
          defaultPickerOptions={{
            label: t('custom_fields.type_placeholder'),
            value: ''
          }}
          onChangeCallback={() => {
            this.setFormField('default_answer', '');
            this.setFormField('placeholder', '');
            this.setFormField('options', []);
          }}
          callbackWhenMount={() => {}}
        />

        <Field
          name="label"
          component={BaseInput}
          isRequired
          hint={t('custom_fields.label')}
          disabled={disabled}
          fieldStyle={{marginTop: 15}}
        />

        {options(this.props)}

        <Field
          name="order"
          component={BaseInput}
          isRequired
          hint={t('custom_fields.order')}
          keyboardType={keyboardType.NUMERIC}
          disabled={disabled}
          inputProps={{selectTextOnFocus: true}}
        />
      </DefaultLayout>
    );
  }
}
