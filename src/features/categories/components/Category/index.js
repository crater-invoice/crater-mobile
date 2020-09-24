// @flow

import React from 'react';
import { View } from 'react-native';
import { Field, change } from 'redux-form';
import styles from './styles';
import {
    InputField,
    CtButton,
    DefaultLayout
} from '../../../../components';
import { BUTTON_COLOR } from '../../../../api/consts/core';
import { goBack, MOUNT, UNMOUNT } from '../../../../navigation/actions';
import Lng from '../../../../api/lang/i18n';
import { CATEGORY_EDIT, CATEGORY_ADD, CATEGORY_FORM } from '../../constants';
import { ROUTES } from '../../../../navigation/routes';
import { MAX_LENGTH, alertMe } from '../../../../api/global';

type IProps = {
    navigation: Object,
    handleSubmit: Function,
    getEditCategory: Function,
    createCategory: Function,
    editCategory: Function,
    language: String,
    type: String,
    getEditCategoryLoading: Boolean,
    categoryLoading: Boolean,
}

export class Category extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const {
            navigation,
            getEditCategory,
            type,
            onFirstTimeCreateExpense,
        } = this.props;

        if (type === CATEGORY_EDIT) {

            let id = navigation.getParam('categoryId', null)
            getEditCategory({
                id,
                onResult: (val) => {

                    const { name, description } = val
                    this.setFormField('name', name)
                    this.setFormField('description', description)
                }
            });
        }

        !onFirstTimeCreateExpense ?
            goBack(MOUNT, navigation) :
            goBack(MOUNT, navigation, { route: ROUTES.MAIN_EXPENSES })
    }

    componentWillUnmount() {
        goBack(UNMOUNT)
    }

    setFormField = (field, value) => {
        this.props.dispatch(change(CATEGORY_FORM, field, value));
    };

    onSubmitCategory = (values) => {

        const {
            type,
            createCategory,
            editCategory,
            navigation,
            categoryLoading,
            onFirstTimeCreateExpense
        } = this.props

        if (!categoryLoading) {
            if (type === CATEGORY_ADD)
                createCategory({
                    params: values,
                    onResult: (res) => {
                        onFirstTimeCreateExpense && onFirstTimeCreateExpense(res)

                        navigation.goBack(null)
                    }
                })
            else {
                let id = navigation.getParam('categoryId', null);
                editCategory({ id, params: values, navigation })
            }
        }
    };

    removeCategory = () => {

        const { removeCategory, navigation, language, formValues: { name } } = this.props

        alertMe({
            title: Lng.t("alert.title", { locale: language }),
            desc: Lng.t("categories.alertDescription", { locale: language }),
            showCancel: true,
            okPress: () => removeCategory({
                id: navigation.getParam('categoryId', null),
                navigation,
                onResult: () => {
                    alertMe({ title: `${name} ${Lng.t("categories.alreadyUsed", { locale: language })}` })
                }
            })
        })
    }

    BOTTOM_ACTION = (handleSubmit) => {

        const {
            language,
            categoryLoading,
            type
        } = this.props

        return (
            <View style={[styles.submitButton, type === CATEGORY_EDIT && styles.multipleButton]}>
                <CtButton
                    onPress={handleSubmit(this.onSubmitCategory)}
                    btnTitle={Lng.t("button.save", { locale: language })}
                    buttonContainerStyle={type === CATEGORY_EDIT && styles.flex}
                    containerStyle={styles.btnContainerStyle}
                    loading={categoryLoading}
                />

                {type === CATEGORY_EDIT &&
                    <CtButton
                        onPress={this.removeCategory}
                        btnTitle={Lng.t("button.remove", { locale: language })}
                        buttonColor={BUTTON_COLOR.DANGER}
                        containerStyle={styles.btnContainerStyle}
                        buttonContainerStyle={styles.flex}
                        loading={categoryLoading}
                    />
                }
            </View>
        )
    }

    render() {
        const {
            navigation,
            handleSubmit,
            language,
            getEditCategoryLoading,
            type,
            onFirstTimeCreateExpense,
        } = this.props;


        let categoryRefs = {}

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () => {
                        !onFirstTimeCreateExpense ? navigation.goBack(null) :
                            navigation.navigate(ROUTES.MAIN_EXPENSES)
                    },
                    title: type === CATEGORY_EDIT ?
                        Lng.t("header.editCategory", { locale: language }) :
                        Lng.t("header.addCategory", { locale: language }),
                    placement: "center",
                    rightIcon: "save",
                    rightIconProps: {
                        solid: true,
                    },
                    rightIconPress: handleSubmit(this.onSubmitCategory),
                }}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{
                    is: getEditCategoryLoading
                }}
            >
                <View style={styles.bodyContainer}>

                    <Field
                        name="name"
                        component={InputField}
                        isRequired
                        hint={Lng.t("categories.title", { locale: language })}
                        inputFieldStyle={styles.inputFieldStyle}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCorrect: true,
                            autoFocus: true,
                            onSubmitEditing: () => {
                                categoryRefs.description.focus();
                            }
                        }}
                        validationStyle={styles.inputFieldValidation}
                    />

                    <Field
                        name="description"
                        component={InputField}
                        hint={Lng.t("categories.description", { locale: language })}
                        inputProps={{
                            returnKeyType: 'next',
                            autoCapitalize: 'none',
                            autoCorrect: true,
                            multiline: true,
                            maxLength: MAX_LENGTH
                        }}
                        height={100}
                        autoCorrect={true}
                        refLinkFn={(ref) => {
                            categoryRefs.description = ref;
                        }}
                    />

                </View>
            </DefaultLayout>
        );
    }
}

