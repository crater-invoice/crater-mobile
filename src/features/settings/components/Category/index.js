import React from 'react';
import {Field, change} from 'redux-form';
import styles from './styles';
import {InputField, DefaultLayout, ActionButton} from '@/components';
import t from 'locales/use-translation';
import {CATEGORY_FORM} from '../../constants';
import {alertMe, MAX_LENGTH} from '@/constants';

type IProps = {
  navigation: Object,
  handleSubmit: Function,
  getEditCategory: Function,
  createCategory: Function,
  editCategory: Function,
  type: String,
  getEditCategoryLoading: Boolean,
  categoryLoading: Boolean
};

export class Category extends React.Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {getEditCategory, isEditScreen, route} = this.props;

    if (isEditScreen) {
      let id = route?.params?.categoryId;
      getEditCategory({
        id,
        onResult: val => {
          const {name, description} = val;
          this.setFormField('name', name);
          this.setFormField('description', description);
        }
      });
    }
  }

  setFormField = (field, value) => {
    this.props.dispatch(change(CATEGORY_FORM, field, value));
  };

  onSubmit = values => {
    const {
      createCategory,
      editCategory,
      navigation,
      categoryLoading,
      isCreateScreen,
      route
    } = this.props;

    if (!categoryLoading) {
      if (isCreateScreen)
        createCategory({
          params: values,
          onResult: res => {
            const onSelect = route?.params?.onSelect;
            onSelect?.(res);
            navigation.goBack(null);
          }
        });
      else {
        let id = route?.params?.categoryId;
        editCategory({id, params: values, navigation});
      }
    }
  };

  removeCategory = () => {
    const {
      removeCategory,
      navigation,
      formValues: {name},
      route
    } = this.props;

    alertMe({
      title: t('alert.title'),
      desc: t('categories.alertDescription'),
      showCancel: true,
      okPress: () =>
        removeCategory({
          id: route?.params?.categoryId,
          navigation,
          onResult: () => {
            alertMe({
              title: `${name} ${t('categories.alreadyUsed')}`
            });
          }
        })
    });
  };

  render() {
    const {
      navigation,
      handleSubmit,
      categoryLoading,
      getEditCategoryLoading,
      isEditScreen,
      isAllowToEdit,
      isAllowToDelete
    } = this.props;

    let categoryRefs = {};
    const disabled = !isAllowToEdit;

    const getTitle = () => {
      let title = 'header.addCategory';
      if (isEditScreen && !isAllowToEdit) title = 'header.viewCategory';
      if (isEditScreen && isAllowToEdit) title = 'header.editCategory';

      return t(title);
    };

    const bottomAction = [
      {
        label: 'button.save',
        onPress: handleSubmit(this.onSubmit),
        loading: categoryLoading || getEditCategoryLoading,
        show: isAllowToEdit
      },
      {
        label: 'button.remove',
        onPress: this.removeCategory,
        bgColor: 'btn-danger',
        show: isEditScreen && isAllowToDelete,
        loading: categoryLoading || getEditCategoryLoading
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
            rightIconPress: handleSubmit(this.onSubmit)
          })
        }}
        bottomAction={<ActionButton buttons={bottomAction} />}
        loadingProps={{
          is: getEditCategoryLoading
        }}
      >
        <Field
          name="name"
          component={InputField}
          isRequired
          hint={t('categories.title')}
          inputFieldStyle={styles.inputFieldStyle}
          inputProps={{
            returnKeyType: 'next',
            autoCorrect: true,
            onSubmitEditing: () => {
              categoryRefs.description.focus();
            }
          }}
          validationStyle={styles.inputFieldValidation}
          disabled={disabled}
        />

        <Field
          name="description"
          component={InputField}
          hint={t('categories.description')}
          inputProps={{
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoCorrect: true,
            multiline: true,
            maxLength: MAX_LENGTH
          }}
          height={100}
          autoCorrect={true}
          refLinkFn={ref => (categoryRefs.description = ref)}
          disabled={disabled}
        />
      </DefaultLayout>
    );
  }
}
