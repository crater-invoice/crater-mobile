import React, {Component} from 'react';
import {View} from 'react-native';
import t from 'locales/use-translation';
import {
  ListView,
  InputModal,
  InfiniteScroll,
  DefaultLayout,
  ActionButton
} from '@/components';
import {ROUTES} from '@/navigation';
import {alertMe} from '@/constants';
import {IProps, IStates} from './item-units-type';
import {ITEM_UNITS_FORM} from '@/stores/item-units/types';
import {change} from 'redux-form';
import {
  createItemUnit,
  editItemUnit,
  removeItemUnit
} from 'stores/item-units/actions';

export default class ItemUnits extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.scrollViewReference = React.createRef();
    this.modalReference = React.createRef();
    this.state = {
      isCreateMethod: true
    };
  }
  onToggle = () => this?.modalReference?.onToggle?.();

  onSave = () => {
    const {isCreateMethod} = this.state;
    const {
      formValues: {unitName = '', unitId = null},
      dispatch
    } = this.props;

    const params = {
      params: {
        id: unitId,
        name: unitName
      },
      onSuccess: () => this.onToggle()
    };

    if (unitName) {
      isCreateMethod
        ? dispatch(createItemUnit(params))
        : dispatch(editItemUnit(params));
    }
  };

  onRemove = () => {
    const {
      dispatch,
      formValues: {unitId = null}
    } = this.props;

    alertMe({
      title: t('alert.title'),
      desc: t('items.alertUnit'),
      showCancel: true,
      okPress: () => {
        dispatch(
          removeItemUnit({
            id: unitId,
            onSuccess: () => this.onToggle()
          })
        );
      }
    });
  };

  INPUT_MODAL = () => {
    const {isCreateMethod} = this.state;
    const {itemUnitLoading} = this.props;

    const isAllowToEdit = isCreateMethod ? true : true;

    const getTitle = () => {
      let title = 'items.addUnit';
      if (!isCreateMethod && !isAllowToEdit) title = 'header.viewUnit';
      if (!isCreateMethod && isAllowToEdit) title = 'items.editUnit';

      return t(title);
    };

    return (
      <InputModal
        reference={ref => (this.modalReference = ref)}
        headerTitle={getTitle()}
        hint={t('items.unitHint')}
        fieldName="unitName"
        onSubmit={() => this.onSave()}
        onRemove={() => this.onRemove()}
        showRemoveButton={!isCreateMethod}
        showSaveButton={isAllowToEdit}
        onSubmitLoading={itemUnitLoading}
        onRemoveLoading={itemUnitLoading}
      />
    );
  };

  onSelectUnit = ({name, id}) => {
    this.setFormField('unitId', id);
    this.openModal(name);
  };
  setFormField = (field, value) => {
    this.props.dispatch(change(ITEM_UNITS_FORM, field, value));
  };

  openModal = (name = '') => {
    this.setState({isCreateMethod: name ? false : true});
    this.setFormField('unitName', name);
    this.onToggle();
  };
  render() {
    const {
      navigation,
      handleSubmit,
      loading,
      formValues,
      dispatch,
      units,
      getItemUnits
    } = this.props;

    const bottomAction = [
      {
        label: 'button.add',
        onPress: () => this.openModal(),
        loading: this.props.loading
      }
    ];
    return (
      <DefaultLayout
        headerProps={{
          leftIconPress: () => navigation.navigate(ROUTES.CUSTOMIZE_LIST),
          title: t('header.units'),
          rightIconPress: null,
          placement: 'center',
          leftArrow: 'primary'
        }}
        bottomAction={<ActionButton buttons={bottomAction} />}
        loadingProps={{is: loading}}
        hideScrollView
        toastProps={{
          reference: ref => (this.toastReference = ref)
        }}
      >
        <View style={{paddingTop: 10, flex: 1}}>
          {this.INPUT_MODAL()}
          <InfiniteScroll
            getItems={getItemUnits}
            reference={ref => (this.scrollViewReference = ref)}
            paginationLimit={20}
          >
            <ListView
              items={units}
              onPress={this.onSelectUnit}
              isEmpty={units ? units.length <= 0 : true}
              bottomDivider
              contentContainerStyle={{
                flex: 3
              }}
              emptyContentProps={{
                title: t('payments.empty.modeTitle')
              }}
              itemContainer={{
                paddingVertical: 14,
                paddingHorizontal: 22
              }}
            />
          </InfiniteScroll>
        </View>
      </DefaultLayout>
    );
  }
}
