import React, {Component} from 'react';
import {Field, initialize} from 'redux-form';
import {pick} from 'lodash';
import t from 'locales/use-translation';
import {IProps, IStates} from './create-category-type.d';
import {alertMe} from '@/constants';
import {CREATE_CATEGORY_FORM} from 'stores/category/types';
import {secondaryHeader} from 'utils/header';
import {
  DefaultLayout,
  BaseInput,
  BaseButtonGroup,
  BaseButton
} from '@/components';
import {
  addCategory,
  updateCategory,
  removeCategory,
  fetchSingleCategory
} from 'stores/category/actions';

export default class CreateCategory extends Component<IProps, IStates> {
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
        fetchSingleCategory(id, category => this.setInitialData(category))
      );
      return;
    }

    this.setState({isFetchingInitialData: false});
  };

  setInitialData = category => {
    const {dispatch} = this.props;
    const data = pick(category, ['name', 'description']);
    dispatch(initialize(CREATE_CATEGORY_FORM, data));
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
      ? dispatch(addCategory(params))
      : dispatch(updateCategory(params));
  };

  removeCategory = () => {
    const {id, dispatch} = this.props;

    function confirmationAlert(remove) {
      alertMe({
        title: t('alert.title'),
        desc: t('categories.alert_description'),
        showCancel: true,
        okPress: remove
      });
    }

    confirmationAlert(() => dispatch(removeCategory(id)));
  };

  render() {
    const {
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete,
      isSaving,
      isDeleting,
      handleSubmit
    } = this.props;
    const categoryRefs: any = {};
    const {isFetchingInitialData} = this.state;
    const disabled = !isAllowToEdit;
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
          onPress={this.removeCategory}
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
          isRequired
          hint={t('categories.title')}
          onSubmitEditing={() => categoryRefs.description.focus()}
          disabled={disabled}
        />

        <Field
          name="description"
          component={BaseInput}
          hint={t('categories.description')}
          inputProps={{multiline: true}}
          height={100}
          refLinkFn={ref => (categoryRefs.description = ref)}
          disabled={disabled}
        />
      </DefaultLayout>
    );
  }
}
