import React from 'react';
import {Field} from 'redux-form';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {alertMe, keyboardType, MAX_LENGTH} from '@/constants';
import {
  DefaultLayout,
  InputField,
  ToggleSwitch,
  ActionButton
} from '@/components';

export class Tax extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      endpointVisible: false
    };
  }

  onSave = tax => {
    const {
      addTax,
      navigation,
      isCreateScreen,
      editTax,
      loading,
      route
    } = this.props;

    if (loading) {
      return;
    }

    const onResult = res => {
      const onSelect = route?.params?.onSelect;
      onSelect?.([{...res, tax_type_id: res?.id}]);
      navigation.goBack(null);
    };

    isCreateScreen ? addTax({tax, onResult}) : editTax({tax, onResult});
  };

  removeTax = () => {
    const {
      id,
      removeTax,
      navigation,
      initialValues: {name}
    } = this.props;

    const remove = () => {
      removeTax({id, onResult: val => navigation.navigate(routes.TAXES)});
    };

    alertMe({
      title: t('alert.title'),
      desc: t('taxes.alert_description'),
      showCancel: true,
      okPress: remove
    });
  };

  render() {
    const {
      navigation,
      handleSubmit,
      loading,
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete
    } = this.props;

    let taxRefs = {};
    const disabled = !isAllowToEdit;

    const getTitle = () => {
      let title = 'header.add_taxes';
      if (isEditScreen && !isAllowToEdit) title = 'header.view_tax';
      if (isEditScreen && isAllowToEdit) title = 'header.edit_taxes';

      return t(title);
    };

    const bottomAction = [
      {
        label: 'button.save',
        onPress: handleSubmit(this.onSave),
        show: isAllowToEdit,
        loading
      },
      {
        label: 'button.remove',
        onPress: this.removeTax,
        bgColor: 'btn-danger',
        show: isEditScreen && isAllowToDelete,
        loading
      }
    ];

    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.goBack(null),
          title: getTitle(),
          placement: 'center',
          ...(isAllowToEdit && {
            rightIcon: 'save',
            rightIconProps: {solid: true},
            rightIconPress: handleSubmit(this.onSave)
          })
        }}
        bottomAction={<ActionButton buttons={bottomAction} />}
      >
        <Field
          name="name"
          component={InputField}
          isRequired
          hint={t('taxes.type')}
          disabled={disabled}
          onSubmitEditing={() => taxRefs.percent.focus()}
        />

        <Field
          name="percent"
          isRequired
          component={InputField}
          hint={t('taxes.percentage') + ' (%)'}
          maxNumber={100}
          refLinkFn={ref => (taxRefs.percent = ref)}
          disabled={disabled}
          onSubmitEditing={() => taxRefs.description.focus()}
          keyboardType={keyboardType.DECIMAL}
        />

        <Field
          name="description"
          component={InputField}
          hint={t('taxes.description')}
          refLinkFn={ref => (taxRefs.description = ref)}
          height={80}
          disabled={disabled}
          inputProps={{
            multiline: true,
            maxLength: MAX_LENGTH
          }}
        />

        <Field
          name="compound_tax"
          component={ToggleSwitch}
          hint={t('taxes.compound_tax')}
          title-text-default
          disabled={disabled}
        />
      </DefaultLayout>
    );
  }
}
