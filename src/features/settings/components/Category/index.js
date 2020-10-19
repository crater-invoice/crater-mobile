// @flow

import React from 'react';
import { View } from 'react-native';
import { Field, change } from 'redux-form';
import styles from './styles';
import { InputField, CtButton, DefaultLayout } from '@/components';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import Lng from '@/lang/i18n';
import { CATEGORY_EDIT, CATEGORY_ADD, CATEGORY_FORM } from '../../constants';
import { alertMe, BUTTON_COLOR, MAX_LENGTH } from '@/constants';


type IProps = {
    navigation: Object,
    handleSubmit: Function,
    getEditCategory: Function,
    createCategory: Function,
    editCategory: Function,
    locale: String,
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

        const { removeCategory, navigation, locale, formValues: { name } } = this.props

        alertMe({
            title: Lng.t("alert.title", { locale }),
            desc: Lng.t("categories.alertDescription", { locale }),
            showCancel: true,
            okPress: () => removeCategory({
                id: navigation.getParam('categoryId', null),
                navigation,
                onResult: () => {
                    alertMe({ title: `${name} ${Lng.t("categories.alreadyUsed", { locale })}` })
                }
            })
        })
    }

    BOTTOM_ACTION = (handleSubmit) => {

        const {
            locale,
            categoryLoading,
            type
        } = this.props

        return (
            <View style={[styles.submitButton, type === CATEGORY_EDIT && styles.multipleButton]}>
                <CtButton
                    onPress={handleSubmit(this.onSubmitCategory)}
                    btnTitle={Lng.t("button.save", { locale })}
                    buttonContainerStyle={type === CATEGORY_EDIT && styles.flex}
                    containerStyle={styles.btnContainerStyle}
                    loading={categoryLoading}
                />

                {type === CATEGORY_EDIT &&
                    <CtButton
                        onPress={this.removeCategory}
                        btnTitle={Lng.t("button.remove", { locale })}
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
            locale,
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
                        Lng.t("header.editCategory", { locale }) :
                        Lng.t("header.addCategory", { locale }),
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
                        hint={Lng.t("categories.title", { locale })}
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
                        hint={Lng.t("categories.description", { locale })}
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

