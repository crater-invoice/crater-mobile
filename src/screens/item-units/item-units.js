import React, {Component} from 'react';
import {View} from 'react-native';
import {change} from 'redux-form';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {alertMe, isEmpty} from '@/constants';
import {IProps, IStates} from './item-units-type.d';
import {ITEM_UNITS_FORM} from 'stores/item-unit/types';
import styles from './item-units-style';
import {
  ListView,
  InputModal,
  InfiniteScroll,
  BaseButtonGroup,
  BaseButton,
  MainLayout,
  BaseEmptyPlaceholder
} from '@/components';
import {
  addItemUnit,
  updateItemUnit,
  removeItemUnit
} from 'stores/item-unit/actions';
import {ARROW_ICON} from '@/assets';

export default class ItemUnits extends Component<IProps, IStates> {
  constructor(props) {
    super(props);
    this.scrollViewReference = React.createRef();
    this.modalReference = React.createRef();
    this.state = {isCreateMethod: true, search: ''};
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
      onSuccess: () => this.onToggle(),
      onFail: () => this.onToggle()
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
      desc: t('items.alert_unit'),
      showCancel: true,
      okPress: () =>
        dispatch(
          removeItemUnit({
            id,
            onSuccess: () => this.onToggle(),
            onFail: () => this.onToggle()
          })
        )
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

  onSearch = search => {
    this.setState({search});
    this.scrollViewReference?.getItems?.({
      queryString: {search},
      showLoader: true
    });
  };

  render() {
    const {
      navigation,
      units,
      fetchItemUnits,
      isSaving,
      isDeleting
    } = this.props;
    const {isCreateMethod, search} = this.state;
    const isAllowToEdit = isCreateMethod ? true : true;

    const bottomAction = (
      <BaseButtonGroup>
        <BaseButton onPress={() => this.openModal()}>
          {t('button.add')}
        </BaseButton>
      </BaseButtonGroup>
    );

    const getTitle = () => {
      let title = 'items.add_hint';
      if (!isCreateMethod && !isAllowToEdit) title = 'header.view_unit';
      if (!isCreateMethod && isAllowToEdit) title = 'items.edit_hint';

      return t(title);
    };

    const headerProps = {
      leftIcon: ARROW_ICON,
      leftIconPress: () => navigation.navigate(routes.SETTING_LIST),
      title: t('header.item_units'),
      placement: 'center',
      leftArrow: 'primary',
      hasCircle: false
    };

    return (
      <MainLayout
        headerProps={headerProps}
        bottomAction={bottomAction}
        onSearch={this.onSearch}
        bottomDivider
        bodyStyle="is-full-listView"
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
              emptyPlaceholder={
                <BaseEmptyPlaceholder {...this.props} search={search} />
              }
              itemContainer={styles.itemContainer}
            />
          </InfiniteScroll>
          <InputModal
            reference={ref => (this.modalReference = ref)}
            headerTitle={getTitle()}
            hint={t('items.unit_hint')}
            fieldName="unitName"
            onSubmit={this.onSave}
            onRemove={this.onRemove}
            showRemoveButton={!isCreateMethod}
            showSaveButton={isAllowToEdit}
            isSaving={isSaving}
            isDeleting={isDeleting}
          />
        </View>
      </MainLayout>
    );
  }
}
