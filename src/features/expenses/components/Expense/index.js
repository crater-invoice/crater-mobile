// @flow

import React from 'react';
import { Field, change } from 'redux-form';
import moment from 'moment';
import styles from './styles';
import { goBack, MOUNT, ROUTES, UNMOUNT } from '@/navigation';
import Lng from '@/lang/i18n';
import * as Linking from 'expo-linking';
import { alertMe, isArray, MAX_LENGTH } from '@/constants';
import { IMAGES } from '@/assets';
import {
    InputField,
    DefaultLayout,
    FilePicker,
    DatePickerField,
    SelectField,
    CustomField,
    ActionButton
} from '@/components';
import {
    EXPENSE_FORM,
    EXPENSE_ADD,
    EXPENSE_ACTIONS,
    ACTIONS_VALUE,
    EXPENSE_FIELDS as FIELDS
} from '../../constants';
import { CUSTOMER_ADD } from '@/features/customers/constants';
import { CATEGORY_ADD } from '@/features/settings/constants';
import { getApiFormattedCustomFields } from '@/utils';

interface IProps {
    navigation: any;
    type: string;
    id: number;
    getExpenseDetail: Function;
    createExpense: Function;
    updateExpense: Function;
    removeExpense: Function;
    locale: string;
    dispatch: Function;
    loading: boolean;
    endpointURL: string;
    handleSubmit: Function;
    categories: Array<any>;
    customers: Array<any>;
    getCategories: Function;
    getCustomers: Function;
    customFields: Array<any>;
    formValues: any;
}

interface IState {
    attachmentReceipt: any;
    isLoading: boolean;
    imageUrl: string;
    fileLoading: boolean;
    fileType: string;
}

export class Expense extends React.Component<IProps, IState> {
    customerReference: any;
    categoryReference: any;

    constructor(props) {
        super(props);
        this.customerReference = React.createRef();
        this.categoryReference = React.createRef();

        this.state = {
            attachmentReceipt: null,
            isLoading: true,
            imageUrl: null,
            fileLoading: false,
            fileType: null
        };
    }

    componentDidMount() {
        this.setInitialValues();
        goBack(MOUNT, this.props.navigation);
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    setInitialValues = () => {
        const {
            type,
            getCreateExpense,
            getExpenseDetail,
            isEditScreen,
            id
        } = this.props;

        if (type === EXPENSE_ADD) {
            getCreateExpense({
                onSuccess: () => {
                    this.setFormField(`expense.${FIELDS.DATE}`, moment());
                    this.setState({ isLoading: false });
                }
            });
            return;
        }

        if (isEditScreen) {
            getExpenseDetail({
                id,
                onSuccess: (res, receipt) => {
                    this.setFormField(`expense`, res);
                    this.setState({
                        imageUrl: receipt?.image,
                        fileType: receipt?.type,
                        isLoading: false
                    });
                    return;
                }
            });
        }
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(EXPENSE_FORM, field, value));
    };

    onSubmit = values => {
        let params = values?.expense;

        for (const key in values?.expense) {
            params[key] = values?.expense[key] ?? '';
        }

        params = {
            ...params,
            customFields: JSON.stringify(
                getApiFormattedCustomFields(values?.customFields)
            )
        };
        const {
            createExpense,
            navigation,
            updateExpense,
            type,
            isEditScreen,
            id
        } = this.props;

        const { attachmentReceipt, fileLoading, isLoading } = this.state;

        if (fileLoading || isLoading) {
            return;
        }

        if (type === EXPENSE_ADD) {
            createExpense({
                params,
                attachmentReceipt,
                navigation
            });
            return;
        }

        if (isEditScreen) {
            updateExpense({
                id,
                params,
                attachmentReceipt,
                navigation
            });
            return;
        }
    };

    removeExpense = () => {
        const { removeExpense, navigation, locale } = this.props;

        alertMe({
            title: Lng.t('alert.title', { locale }),
            desc: Lng.t('expenses.alertDescription', { locale }),
            showCancel: true,
            okPress: () =>
                removeExpense({
                    id: navigation.getParam('id', null),
                    navigation
                })
        });
    };

    onOptionSelect = action => {
        const { endpointURL, id } = this.props;

        switch (action) {
            case ACTIONS_VALUE.REMOVE:
                return this.removeExpense();

            case ACTIONS_VALUE.DOWNLOAD:
                return Linking.openURL(`${endpointURL}/expenses/${id}/receipt`);

            default:
                break;
        }
    };

    navigateToCustomer = () => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.CUSTOMER, {
            type: CUSTOMER_ADD,
            onSelect: item => {
                this.setFormField(`expense.${FIELDS.CUSTOMER}`, item.id);
                this.customerReference?.changeDisplayValue?.(item);
            }
        });
    };

    navigateToCategory = () => {
        const { navigation } = this.props;
        navigation.navigate(ROUTES.CATEGORY, {
            type: CATEGORY_ADD,
            onSelect: item => {
                this.setFormField(`expense.${FIELDS.CATEGORY}`, item.id);
                this.categoryReference?.changeDisplayValue?.(item);
            }
        });
    };

    render() {
        const {
            navigation,
            handleSubmit,
            categories,
            getCategories,
            locale,
            type,
            getCustomers,
            customers,
            customFields,
            formValues,
            currency,
            isEditScreen,
            isAllowToEdit,
            isAllowToDelete,
            loading
        } = this.props;
        const disabled = !isAllowToEdit;

        const { imageUrl, isLoading, fileLoading, fileType } = this.state;

        const isCreateExpense = type === EXPENSE_ADD;
        const hasCustomField = isEditScreen
            ? formValues?.expense && formValues.expense.hasOwnProperty('fields')
            : isArray(customFields);

        const drownDownProps =
            !isCreateExpense && !isLoading
                ? {
                      options: EXPENSE_ACTIONS(
                          Lng,
                          locale,
                          imageUrl,
                          isAllowToDelete
                      ),
                      onSelect: this.onOptionSelect,
                      cancelButtonIndex: 1,
                      destructiveButtonIndex: 2,
                      ...(imageUrl && {
                          cancelButtonIndex: 2,
                          destructiveButtonIndex: 1
                      }),
                      ...(!isAllowToDelete && {
                          cancelButtonIndex: 1,
                          destructiveButtonIndex: 2
                      })
                  }
                : null;

        const getTitle = () => {
            let title = 'header.addExpense';
            if (isEditScreen && !isAllowToEdit) title = 'header.viewExpense';
            if (isEditScreen && isAllowToEdit) title = 'header.editExpense';

            return Lng.t(title, { locale });
        };

        const headerProps = {
            leftIconPress: () => navigation.goBack(null),
            title: getTitle(),
            placement: 'center',
            ...(!isEditScreen && {
                rightIcon: 'save',
                rightIconProps: { solid: true },
                rightIconPress: handleSubmit(this.onSubmit)
            })
        };

        const bottomAction = [
            {
                label: 'button.save',
                onPress: handleSubmit(this.onSubmit),
                loading: loading || fileLoading || isLoading,
                show: isAllowToEdit
            }
        ];

        return (
            <DefaultLayout
                headerProps={headerProps}
                loadingProps={{ is: isLoading }}
                dropdownProps={drownDownProps}
                bottomAction={
                    <ActionButton locale={locale} buttons={bottomAction} />
                }
            >
                <Field
                    name={`expense.${FIELDS.RECEIPT}`}
                    component={FilePicker}
                    locale={locale}
                    withDocument
                    label={Lng.t('expenses.receipt', { locale })}
                    fileLoading={val => this.setState({ fileLoading: val })}
                    containerStyle={styles.filePicker}
                    uploadedFileType={fileType}
                    onChangeCallback={val =>
                        this.setState({ attachmentReceipt: val })
                    }
                    uploadedFileUrl={
                        fileType && fileType.includes('image') ? imageUrl : null
                    }
                    showUploadedImageAsCache={false}
                    disabled={disabled}
                />

                <Field
                    name={`expense.${FIELDS.DATE}`}
                    component={DatePickerField}
                    isRequired
                    label={Lng.t('expenses.date', { locale })}
                    icon={'calendar-alt'}
                    disabled={disabled}
                />

                <Field
                    name={`expense.${FIELDS.AMOUNT}`}
                    component={InputField}
                    isRequired
                    leftSymbol={currency?.symbol}
                    hint={Lng.t('expenses.amount', { locale })}
                    disabled={disabled}
                    inputProps={{
                        returnKeyType: 'go',
                        keyboardType: 'decimal-pad'
                    }}
                    isCurrencyInput
                />

                <Field
                    name={`expense.${FIELDS.CATEGORY}`}
                    component={SelectField}
                    isRequired
                    apiSearch
                    hasPagination
                    getItems={getCategories}
                    items={categories}
                    displayName="name"
                    label={Lng.t('expenses.category', { locale })}
                    icon="align-center"
                    placeholder={Lng.t('expenses.categoryPlaceholder', {
                        locale
                    })}
                    navigation={navigation}
                    compareField="id"
                    onSelect={item =>
                        this.setFormField(`expense.${FIELDS.CATEGORY}`, item.id)
                    }
                    rightIconPress={this.navigateToCategory}
                    createActionRouteName={ROUTES.CATEGORY}
                    headerProps={{
                        title: Lng.t('expenses.categoryPlaceholder', {
                            locale
                        })
                    }}
                    emptyContentProps={{ contentType: 'categories' }}
                    reference={ref => (this.categoryReference = ref)}
                    isEditable={!disabled}
                    fakeInputProps={{ disabled }}
                />

                <Field
                    name={`expense.${FIELDS.CUSTOMER}`}
                    component={SelectField}
                    apiSearch
                    hasPagination
                    getItems={getCustomers}
                    items={customers}
                    displayName="name"
                    label={Lng.t('payments.customer', { locale })}
                    icon="user"
                    placeholder={Lng.t('customers.placeholder', {
                        locale
                    })}
                    navigation={navigation}
                    compareField="id"
                    onSelect={item =>
                        this.setFormField(`expense.${FIELDS.CUSTOMER}`, item.id)
                    }
                    rightIconPress={this.navigateToCustomer}
                    createActionRouteName={ROUTES.CUSTOMER}
                    headerProps={{
                        title: Lng.t('customers.title', { locale })
                    }}
                    emptyContentProps={{
                        contentType: 'customers',
                        image: IMAGES.EMPTY_CUSTOMERS
                    }}
                    reference={ref => (this.customerReference = ref)}
                    isEditable={!disabled}
                    fakeInputProps={{ disabled }}
                />

                <Field
                    name={`expense.${FIELDS.NOTES}`}
                    component={InputField}
                    hint={Lng.t('expenses.notes', { locale })}
                    inputProps={{
                        returnKeyType: 'next',
                        placeholder: Lng.t('expenses.notesPlaceholder', {
                            locale
                        }),
                        autoCorrect: true,
                        multiline: true,
                        maxLength: MAX_LENGTH
                    }}
                    disabled={disabled}
                    height={80}
                />

                {hasCustomField && (
                    <CustomField {...this.props} type="expense" />
                )}
            </DefaultLayout>
        );
    }
}
