// @flow

import React from 'react';
import { View } from 'react-native';
import { Field, change } from 'redux-form';
import styles from './styles';
import { InputField, DefaultLayout, ActionButton } from '@/components';
import { goBack, MOUNT, UNMOUNT } from '@/navigation';
import Lng from '@/lang/i18n';
import { CATEGORY_EDIT, CATEGORY_ADD, CATEGORY_FORM } from '../../constants';
import { alertMe, MAX_LENGTH } from '@/constants';

type IProps = {
    navigation: Object,
    handleSubmit: Function,
    getEditCategory: Function,
    createCategory: Function,
    editCategory: Function,
    locale: String,
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
        const { navigation, getEditCategory, type } = this.props;

        if (type === CATEGORY_EDIT) {
            let id = navigation.getParam('categoryId', null);
            getEditCategory({
                id,
                onResult: val => {
                    const { name, description } = val;
                    this.setFormField('name', name);
                    this.setFormField('description', description);
                }
            });
        }

        goBack(MOUNT, navigation);
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(CATEGORY_FORM, field, value));
    };

    onSubmit = values => {
        const {
            type,
            createCategory,
            editCategory,
            navigation,
            categoryLoading
        } = this.props;

        if (!categoryLoading) {
            if (type === CATEGORY_ADD)
                createCategory({
                    params: values,
                    onResult: res => {
                        const onSelect = navigation.getParam('onSelect', null);
                        onSelect?.(res);
                        navigation.goBack(null);
                    }
                });
            else {
                let id = navigation.getParam('categoryId', null);
                editCategory({ id, params: values, navigation });
            }
        }
    };

    removeCategory = () => {
        const {
            removeCategory,
            navigation,
            locale,
            formValues: { name }
        } = this.props;

        alertMe({
            title: Lng.t('alert.title', { locale }),
            desc: Lng.t('categories.alertDescription', { locale }),
            showCancel: true,
            okPress: () =>
                removeCategory({
                    id: navigation.getParam('categoryId', null),
                    navigation,
                    onResult: () => {
                        alertMe({
                            title: `${name} ${Lng.t('categories.alreadyUsed', {
                                locale
                            })}`
                        });
                    }
                })
        });
    };

    render() {
        const {
            navigation,
            handleSubmit,
            locale,
            categoryLoading,
            getEditCategoryLoading,
            type
        } = this.props;

        let categoryRefs = {};
        const bottomAction = [
            {
                label: 'button.save',
                onPress: handleSubmit(this.onSubmit),
                loading: categoryLoading || getEditCategoryLoading
            },
            {
                label: 'button.remove',
                onPress: this.removeCategory,
                loading: categoryLoading || getEditCategoryLoading,
                bgColor: 'btn-danger',
                show: type === CATEGORY_EDIT
            }
        ];

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => navigation.goBack(null),
                    title:
                        type === CATEGORY_EDIT
                            ? Lng.t('header.editCategory', { locale })
                            : Lng.t('header.addCategory', { locale }),
                    placement: 'center',
                    rightIcon: 'save',
                    rightIconProps: {
                        solid: true
                    },
                    rightIconPress: handleSubmit(this.onSubmit)
                }}
                bottomAction={
                    <ActionButton locale={locale} buttons={bottomAction} />
                }
                loadingProps={{
                    is: getEditCategoryLoading
                }}
            >
                <View style={styles.bodyContainer}>
                    <Field
                        name="name"
                        component={InputField}
                        isRequired
                        hint={Lng.t('categories.title', { locale })}
                        inputFieldStyle={styles.inputFieldStyle}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            onSubmitEditing: () => {
                                categoryRefs.description.focus();
                            }
                        }}
                        validationStyle={styles.inputFieldValidation}
                    />

                    <Field
                        name="description"
                        component={InputField}
                        hint={Lng.t('categories.description', { locale })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            multiline: true,
                            maxLength: MAX_LENGTH
                        }}
                        height={100}
                        autoCorrect={true}
                        refLinkFn={ref => {
                            categoryRefs.description = ref;
                        }}
                    />
                </View>
            </DefaultLayout>
        );
    }
}
