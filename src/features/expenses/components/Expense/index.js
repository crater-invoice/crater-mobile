// @flow

import React from 'react';
import { View } from 'react-native';
import { Field, change } from 'redux-form';
import moment from 'moment';
import styles from './styles';
import { goBack, MOUNT, ROUTES, UNMOUNT } from '@/navigation';
import Lng from '@/lang/i18n';
import { Linking } from 'expo';
import { alertMe, MAX_LENGTH } from '@/constants';
import { IMAGES } from '@/assets';
import {
    InputField,
    CtButton,
    DefaultLayout,
    FilePicker,
    DatePickerField,
    SelectField
} from '@/components';
import {
    EXPENSE_FORM,
    EXPENSE_ADD,
    EXPENSE_EDIT,
    EXPENSE_ACTIONS,
    ACTIONS_VALUE,
    EXPENSE_FIELDS as FIELDS
} from '../../constants';
import { CUSTOMER_ADD } from '@/features/customers/constants';
import { CATEGORY_ADD } from '@/features/settings/constants';

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
        const { type, getExpenseDetail, id } = this.props;

        if (type === EXPENSE_ADD) {
            this.setFormField(`expense.${FIELDS.DATE}`, moment());
            this.setState({ isLoading: false });
            return;
        }

        if (type === EXPENSE_EDIT) {
            getExpenseDetail({
                id,
                onSuccess: res => {
                    this.setFormField(`expense`, res);
                    this.setState({
                        imageUrl: res.receipt,
                        fileType: res?.media?.[0]?.mime_type,
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
        const params = values?.expense;

        const {
            createExpense,
            navigation,
            updateExpense,
            type,
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

        if (type === EXPENSE_EDIT) {
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

    BOTTOM_ACTION = handleSubmit => {
        const { loading, locale } = this.props;
        const { fileLoading } = this.state;

        return (
            <View style={styles.submitButton}>
                <CtButton
                    onPress={handleSubmit(this.onSubmit)}
                    btnTitle={Lng.t('button.save', { locale })}
                    loading={loading || fileLoading}
                />
            </View>
        );
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
            customers
        } = this.props;

        const { imageUrl, isLoading, fileType } = this.state;

        const isCreateExpense = type === EXPENSE_ADD;

        const drownDownProps =
            !isCreateExpense && !isLoading
                ? {
                      options: EXPENSE_ACTIONS(Lng, locale, imageUrl),
                      onSelect: this.onOptionSelect,
                      cancelButtonIndex: imageUrl ? 2 : 1,
                      destructiveButtonIndex: imageUrl ? 1 : 2
                  }
                : null;

        const headerProps = {
            leftIconPress: () => navigation.goBack(null),
            title: isCreateExpense
                ? Lng.t('header.addExpense', { locale })
                : Lng.t('header.editExpense', { locale }),
            placement: 'center',
            rightIcon: isCreateExpense ? 'save' : null,
            rightIconPress: handleSubmit(this.onSubmit),
            rightIconProps: {
                solid: true
            }
        };

        return (
            <DefaultLayout
                headerProps={headerProps}
                bottomAction={this.BOTTOM_ACTION(handleSubmit)}
                loadingProps={{ is: isLoading }}
                dropdownProps={drownDownProps}
            >
                <View style={styles.bodyContainer}>
                    <Field
                        name={`expense.${FIELDS.RECEIPT}`}
                        component={FilePicker}
                        mediaType={'All'}
                        label={Lng.t('expenses.receipt', { locale })}
                        navigation={navigation}
                        onChangeCallback={val =>
                            this.setState({ attachmentReceipt: val })
                        }
                        imageUrl={
                            fileType && fileType.includes('image')
                                ? imageUrl
                                : null
                        }
                        containerStyle={styles.filePicker}
                        fileLoading={val => this.setState({ fileLoading: val })}
                    />

                    <Field
                        name={`expense.${FIELDS.DATE}`}
                        component={DatePickerField}
                        isRequired
                        label={Lng.t('expenses.date', { locale })}
                        icon={'calendar-alt'}
                    />

                    <Field
                        name={`expense.${FIELDS.AMOUNT}`}
                        component={InputField}
                        isRequired
                        hint={Lng.t('expenses.amount', { locale })}
                        leftIcon={'dollar-sign'}
                        inputProps={{
                            returnKeyType: 'go',
                            keyboardType: 'numeric'
                        }}
                        isCurrencyInput
                    />

                    <Field
                        name={`expense.${FIELDS.CUSTOMER}`}
                        component={SelectField}
                        isRequired
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
                            this.setFormField(
                                `expense.${FIELDS.CUSTOMER}`,
                                item.id
                            )
                        }
                        rightIconPress={this.navigateToCustomer}
                        headerProps={{
                            title: Lng.t('customers.title', { locale })
                        }}
                        emptyContentProps={{
                            contentType: 'customers',
                            image: IMAGES.EMPTY_CUSTOMERS
                        }}
                        reference={ref => (this.customerReference = ref)}
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
                            this.setFormField(
                                `expense.${FIELDS.CATEGORY}`,
                                item.id
                            )
                        }
                        rightIconPress={this.navigateToCategory}
                        headerProps={{
                            title: Lng.t('expenses.categoryPlaceholder', {
                                locale
                            })
                        }}
                        emptyContentProps={{ contentType: 'categories' }}
                        reference={ref => (this.categoryReference = ref)}
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
                        height={80}
                    />
                </View>
            </DefaultLayout>
        );
    }
}
