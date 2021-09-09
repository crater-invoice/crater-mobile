// @flow

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Field, change } from 'redux-form';
import {
    InputField,
    CtDivider,
    DefaultLayout,
    SelectField,
    CurrencyFormat,
    Text,
    ActionButton
} from '@/components';
import { ROUTES } from '@/navigation';
import { ITEM_FORM } from '../../constants';
import { colors } from '@/styles/colors';
import t from 'locales/use-translation';
import { goBack, UNMOUNT, MOUNT } from '@/navigation';
import { isIosPlatform, isIPhoneX } from '@/constants';
import { alertMe, hasValue, MAX_LENGTH } from '@/constants';
import { CUSTOMIZE_TYPE } from 'stores/customize/types';

export class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isTaxPerItem: true,
            isLoading: true
        };
    }

    componentDidMount() {
        this.setInitialValues();
        goBack(MOUNT, this.props.navigation);
    }

    componentWillUnmount() {
        this.props.clearItem?.();
        goBack(UNMOUNT);
    }

    setInitialValues = () => {
        const {
            getEditItem,
            isEditScreen,
            itemId,
            getSettingInfo
        } = this.props;

        if (!isEditScreen) {
            getSettingInfo({
                key: 'tax_per_item',
                onSuccess: res => {
                    this.setState({
                        isTaxPerItem: res === 'YES',
                        isLoading: false
                    });
                }
            });
            return;
        }

        if (isEditScreen) {
            getEditItem({
                id: itemId,
                onResult: () => {
                    this.setState({ isLoading: false });
                }
            });
            return;
        }
    };

    setFormField = (field, value) => {
        this.props.dispatch(change(ITEM_FORM, field, value));
    };

    saveItem = values => {
        const {
            addItem,
            editItem,
            itemId,
            isCreateScreen,
            navigation
        } = this.props;

        if (this.state.isLoading) {
            return;
        }

        if (this.finalAmount() < 0) {
            alert(t('items.lessAmount'));
            return;
        }

        const item = {
            ...values,
            total: this.finalAmount(),
            tax: this.itemTax() + this.itemCompoundTax(),
            taxes:
                values.taxes &&
                values.taxes.map(val => {
                    return {
                        ...val,
                        amount: val.compound_tax
                            ? this.getCompoundTaxValue(val.percent)
                            : this.getTaxValue(val.percent)
                    };
                })
        };

        isCreateScreen
            ? addItem({
                  item,
                  onResult: () => {
                      navigation.navigate(ROUTES.GLOBAL_ITEMS);
                  }
              })
            : editItem({
                  item: { ...item },
                  id: itemId,
                  onResult: () => {
                      navigation.navigate(ROUTES.GLOBAL_ITEMS);
                  }
              });
    };

    removeItem = () => {
        const { removeItem, itemId, navigation } = this.props;

        if (this.state.isLoading) {
            return;
        }

        alertMe({
            title: t('alert.title'),
            desc: t('items.alertDescription'),
            showCancel: true,
            okPress: () =>
                removeItem({
                    id: itemId,
                    onResult: res => {
                        if (res.success) {
                            navigation.navigate(ROUTES.GLOBAL_ITEMS);
                            return;
                        }

                        alertMe({
                            title: t('items.alreadyAttachTitle'),
                            desc: t('items.alreadyAttachDescription')
                        });
                    }
                })
        });
    };

    totalAmount = () => {
        const { formValues } = this.props;
        const price = formValues?.price ?? 0;
        return price + this.itemTax();
    };

    itemTax = () => {
        const {
            formValues: { taxes }
        } = this.props;

        let totalTax = 0;

        taxes &&
            taxes.map(val => {
                if (!val.compound_tax) {
                    totalTax += this.getTaxValue(val.percent);
                }
            });

        return totalTax;
    };

    itemCompoundTax = () => {
        const {
            formValues: { taxes }
        } = this.props;

        let totalTax = 0;

        taxes &&
            taxes.map(val => {
                if (val.compound_tax) {
                    totalTax += this.getCompoundTaxValue(val.percent);
                }
            });

        return totalTax;
    };

    getTaxValue = tax => {
        const { formValues } = this.props;
        const price = formValues?.price ?? 0;
        return (tax * price) / 100;
    };

    getCompoundTaxValue = tax => {
        return (tax * JSON.parse(this.totalAmount())) / 100;
    };

    getTaxName = tax => {
        if (hasValue(tax?.name)) {
            return tax.name;
        }

        const { taxTypes } = this.props;
        let taxName = '';

        const type =
            taxTypes &&
            taxTypes.filter(val => val.fullItem.id === tax.tax_type_id);

        if (taxTypes && type.length > 0) {
            taxName = type[0]['fullItem'].name;
        }
        return taxName;
    };

    finalAmount = () => {
        return this.totalAmount() + this.itemCompoundTax();
    };

    FINAL_AMOUNT = () => {
        const {
            formValues: { taxes, price },
            currency,
            theme
        } = this.props;

        return (
            <View style={styles.amountContainer(theme)}>
                <View style={styles.subContainer}>
                    <View>
                        <Text gray h5 medium style={{ marginTop: 6 }}>
                            {t('items.subTotal')}
                        </Text>
                    </View>
                    <View style={{ marginTop: isIosPlatform() ? 6 : 4 }}>
                        <CurrencyFormat
                            amount={price}
                            currency={currency}
                            style={styles.price(theme)}
                            symbolStyle={styles.currencySymbol}
                        />
                    </View>
                </View>

                {taxes &&
                    taxes.map(val =>
                        !val.compound_tax ? (
                            <View style={styles.subContainer}>
                                <View>
                                    <Text
                                        gray
                                        h5
                                        medium
                                        style={{ marginTop: 6 }}
                                    >
                                        {this.getTaxName(val)} ({val.percent} %)
                                    </Text>
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <CurrencyFormat
                                        amount={this.getTaxValue(val.percent)}
                                        currency={currency}
                                        style={styles.price(theme)}
                                        symbolStyle={styles.currencySymbol}
                                    />
                                </View>
                            </View>
                        ) : null
                    )}

                {taxes &&
                    taxes.map(val =>
                        val.compound_tax ? (
                            <View style={styles.subContainer}>
                                <View>
                                    <Text
                                        gray
                                        h5
                                        medium
                                        style={{ marginTop: 6 }}
                                    >
                                        {this.getTaxName(val)} ({val.percent} %)
                                    </Text>
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <CurrencyFormat
                                        amount={this.getCompoundTaxValue(
                                            val.percent
                                        )}
                                        currency={currency}
                                        style={styles.price(theme)}
                                        symbolStyle={styles.currencySymbol}
                                    />
                                </View>
                            </View>
                        ) : null
                    )}

                <CtDivider dividerStyle={styles.divider} />

                <View style={styles.subContainer}>
                    <View>
                        <Text gray h5 medium style={{ marginTop: 6 }}>
                            {t('items.finalAmount')}
                        </Text>
                    </View>
                    <View style={{ marginTop: isIosPlatform() ? 4 : 3 }}>
                        <CurrencyFormat
                            amount={this.finalAmount()}
                            currency={currency}
                            style={styles.totalPrice(theme)}
                            currencyStyle={{
                                marginTop: isIosPlatform() ? -1.5 : -6
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    };

    TAX_FIELD_VIEW = () => {
        const {
            navigation,
            taxTypes,
            formValues: { taxes },
            getTaxes,
            isAllowToEdit
        } = this.props;
        const disabled = !isAllowToEdit;

        return (
            <Field
                name="taxes"
                items={taxTypes}
                getItems={getTaxes}
                apiSearch
                hasPagination
                displayName="name"
                label={t('items.taxes')}
                component={SelectField}
                searchFields={['name', 'percent']}
                placeholder={t('items.selectTax')}
                onlyPlaceholder
                fakeInputProps={{
                    icon: 'percent',
                    rightIcon: 'angle-right',
                    color: colors.gray,
                    disabled
                }}
                navigation={navigation}
                isMultiSelect
                concurrentMultiSelect
                compareField="id"
                valueCompareField="tax_type_id"
                listViewProps={{
                    contentContainerStyle: { flex: 2 }
                }}
                headerProps={{
                    title: t('taxes.title')
                }}
                rightIconPress={() =>
                    navigation.navigate(ROUTES.TAX, {
                        type: 'ADD',
                        onSelect: val => {
                            this.setFormField('taxes', [...val, ...taxes]);
                        }
                    })
                }
                createActionRouteName={ROUTES.TAX}
                emptyContentProps={{
                    contentType: 'taxes'
                }}
                isEditable={!disabled}
            />
        );
    };

    render() {
        const {
            navigation,
            handleSubmit,
            units,
            fetchItemUnits,
            currency,
            isEditScreen,
            isAllowToEdit,
            isAllowToDelete,
            loading
        } = this.props;

        const { isTaxPerItem, isLoading } = this.state;
        const disabled = !isAllowToEdit;
        let itemRefs = {};

        const getTitle = () => {
            let title = 'header.addItem';
            if (isEditScreen && !isAllowToEdit) title = 'header.viewItem';
            if (isEditScreen && isAllowToEdit) title = 'header.editItem';

            return t(title);
        };

        const bottomAction = [
            {
                label: 'button.save',
                onPress: handleSubmit(this.saveItem),
                show: isAllowToEdit,
                loading
            },
            {
                label: 'button.remove',
                onPress: this.removeItem,
                bgColor: 'btn-danger',
                show: isEditScreen && isAllowToDelete,
                loading
            }
        ];

        return (
            <DefaultLayout
                headerProps={{
                    leftIconPress: () =>
                        navigation.navigate(ROUTES.GLOBAL_ITEMS),
                    title: getTitle(),
                    placement: 'center',
                    ...(isAllowToEdit && {
                        rightIcon: 'save',
                        rightIconProps: { solid: true },
                        rightIconPress: handleSubmit(this.saveItem)
                    })
                }}
                loadingProps={{ is: isLoading }}
                bottomAction={<ActionButton buttons={bottomAction} />}
            >
                <Field
                    name="name"
                    component={InputField}
                    isRequired
                    hint={t('items.name')}
                    disabled={disabled}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        onSubmitEditing: () => {
                            itemRefs.price.focus();
                        }
                    }}
                />

                <Field
                    name="price"
                    component={InputField}
                    isRequired
                    leftSymbol={currency?.symbol}
                    hint={t('items.price')}
                    disabled={disabled}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        keyboardType: 'decimal-pad'
                    }}
                    isCurrencyInput
                    refLinkFn={ref => {
                        itemRefs.price = ref;
                    }}
                />

                <Field
                    name="unit_id"
                    component={SelectField}
                    apiSearch={true}
                    hasPagination={true}
                    getItems={fetchItemUnits}
                    items={units}
                    displayName={'name'}
                    label={t('items.unit')}
                    icon={'balance-scale'}
                    placeholder={t('items.unitPlaceholder')}
                    navigation={navigation}
                    compareField={'id'}
                    emptyContentProps={{ contentType: 'units' }}
                    headerProps={{
                        title: t('items.unitPlaceholder')
                    }}
                    fakeInputProps={{
                        disabled,
                        valueStyle: styles.units,
                        placeholderStyle: styles.units
                    }}
                    onSelect={item => this.setFormField('unit_id', item.id)}
                    paginationLimit={isIPhoneX() ? 20 : 15}
                    inputModalName="UnitModal"
                    createActionRouteName={CUSTOMIZE_TYPE.ITEMS}
                    isEditable={!disabled}
                />

                {isTaxPerItem && this.TAX_FIELD_VIEW()}

                {this.FINAL_AMOUNT()}

                <Field
                    name="description"
                    component={InputField}
                    hint={t('items.description')}
                    inputProps={{
                        returnKeyType: 'next',
                        autoCapitalize: 'none',
                        autoCorrect: true,
                        multiline: true,
                        maxLength: MAX_LENGTH
                    }}
                    disabled={disabled}
                    height={80}
                    refLinkFn={ref => {
                        itemRefs.description = ref;
                    }}
                />
            </DefaultLayout>
        );
    }
}
