import React, {Component} from 'react';
import {View} from 'react-native';
import {change} from 'redux-form';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {alertMe, isEmpty} from '@/constants';
import {IProps, IStates} from './item-units-type';
import {ITEM_UNITS_FORM} from 'stores/item-units/types';
import styles from './item-units-style';
import {
  ListView,
  InputModal,
  InfiniteScroll,
  DefaultLayout,
  ActionButton
} from '@/components';
import {
  addItemUnit,
  updateItemUnit,
  removeItemUnit
} from 'stores/item-units/actions';

export default class ItemUnits extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.scrollViewReference = React.createRef();
    this.modalReference = React.createRef();
    this.state = {isCreateMethod: true};
  }

  onToggle = () => this?.modalReference?.onToggle?.();

  onSave = () => {
    const {isCreateMethod} = this.state;
    const {dispatch, formValues: values, isSaving, isDeleting} = this.props;

    if (!values?.unitName || isSaving || isDeleting) {
      return;
    }

    const params = {
      params: {
        id: values?.unitId,
        name: values?.unitName
      },
      onSuccess: () => this.onToggle()
    };

    isCreateMethod
      ? dispatch(addItemUnit(params))
      : dispatch(updateItemUnit(params));
  };

  onRemove = () => {
    const {
      dispatch,
      formValues: {unitId: id}
    } = this.props;

    alertMe({
      title: t('alert.title'),
      desc: t('items.alertUnit'),
      showCancel: true,
      okPress: () =>
        dispatch(removeItemUnit({id, onSuccess: () => this.onToggle()}))
    });
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
      units,
      fetchItemUnits,
      isSaving,
      isDeleting
    } = this.props;
    const {isCreateMethod} = this.state;
    const loading = isSaving || isDeleting;
    const isAllowToEdit = isCreateMethod ? true : true;
    const bottomAction = [
      {label: 'button.add', onPress: this.openModal, loading}
    ];

    const getTitle = () => {
      let title = 'items.addUnit';
      if (!isCreateMethod && !isAllowToEdit) title = 'header.viewUnit';
      if (!isCreateMethod && isAllowToEdit) title = 'items.editUnit';

      return t(title);
    };

    const headerProps = {
      leftIconPress: () => navigation.navigate(routes.CUSTOMIZE_LIST),
      title: t('header.units'),
      rightIconPress: null,
      placement: 'center',
      leftArrow: 'primary'
    };

    return (
      <DefaultLayout
        hideScrollView
        headerProps={headerProps}
        bottomAction={<ActionButton buttons={bottomAction} />}
      >
        <View style={styles.childContainer}>
          <InfiniteScroll
            getItems={fetchItemUnits}
            reference={ref => (this.scrollViewReference = ref)}
            paginationLimit={20}
          >
            <ListView
              items={units}
              onPress={this.onSelectUnit}
              isEmpty={isEmpty(units)}
              bottomDivider
              contentContainerStyle={styles.contentContainerStyle}
              emptyContentProps={{title: t('payments.empty.modeTitle')}}
              itemContainer={styles.itemContainer}
            />
          </InfiniteScroll>
          <InputModal
            reference={ref => (this.modalReference = ref)}
            headerTitle={getTitle()}
            hint={t('items.unitHint')}
            fieldName="unitName"
            onSubmit={this.onSave}
            onRemove={this.onRemove}
            showRemoveButton={!isCreateMethod}
            showSaveButton={isAllowToEdit}
            onSubmitLoading={loading}
            onRemoveLoading={loading}
          />
        </View>
      </DefaultLayout>
    );
  }
}
