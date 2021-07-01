import React from 'react';
import { View } from 'react-native';
import { Field, change } from 'redux-form';
import styles from './styles';
import {
    InputField,
    CtDivider,
    SelectField,
    SelectPickerField,
    CurrencyFormat,
    Text
} from '@/components';
import { ROUTES } from '@/navigation';
import { colors } from '@/styles';
import Lng from '@/lang/i18n';
import { ESTIMATE_DISCOUNT_OPTION } from '../../constants';
import { ADD_TAX } from '../../../settings/constants';
import {
    estimateSubTotal,
    getCompoundTaxValue,
    estimateItemTotalTaxes,
    getTaxValue,
    getTaxName,
    finalAmount
} from '../EstimateCalculation';
import { isIosPlatform } from '@/constants';

const DISPLAY_ITEM_TAX = ({ state, theme }) => {
    const { currency } = state;
    let taxes = estimateItemTotalTaxes();

    return taxes
        ? taxes.map((val, index) => (
              <View style={styles.subContainer} key={index}>
                  <View>
                      <Text darkGray h5 medium style={styles.amountHeading}>
                          {getTaxName(val)} ({val.percent} %)
                      </Text>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                      <CurrencyFormat
                          amount={val.amount}
                          currency={currency}
                          style={styles.subAmount(theme)}
                          symbolStyle={styles.currencySymbol}
                      />
                  </View>
              </View>
          ))
        : null;
};

const FinalAmount = ({ state, props }) => {
    const { currency } = state;

    const {
        locale,
        taxTypes,
        navigation,
        estimateData: { discount_per_item, tax_per_item },
        getTaxes,
        formValues,
        isAllowToEdit,
        theme
    } = props;
    const disabled = !isAllowToEdit;
    let taxes = formValues?.taxes;

    let taxPerItem = !(
        tax_per_item === 'NO' ||
        typeof tax_per_item === 'undefined' ||
        tax_per_item === null ||
        tax_per_item === '0'
    );

    let discountPerItem = !(
        discount_per_item === 'NO' ||
        typeof discount_per_item === 'undefined' ||
        discount_per_item === null ||
        discount_per_item === '0'
    );

    const setFormField = (field, value) => {
        const { dispatch, form } = props;

        dispatch(change(form, field, value));
    };

    return (
        <View style={styles.amountContainer(theme)}>
            <View style={styles.subContainer}>
                <View>
                    <Text
                        darkGray
                        h5
                        medium={theme?.mode === 'light'}
                        bold2={theme?.mode === 'dark'}
                        style={{ marginTop: 6 }}
                    >
                        {Lng.t('estimates.subtotal', { locale })}
                    </Text>
                </View>
                <View style={{ marginTop: isIosPlatform() ? 6 : 4 }}>
                    <CurrencyFormat
                        amount={estimateSubTotal()}
                        currency={currency}
                        style={styles.subAmount(theme)}
                        symbolStyle={styles.currencySymbol}
                        currencySymbolStyle={styles.symbol(currency)}
                    />
                </View>
            </View>

            {!discountPerItem && (
                <View style={[styles.subContainer, styles.discount]}>
                    <View>
                        <Text
                            darkGray
                            h5
                            medium={theme?.mode === 'light'}
                            bold2={theme?.mode === 'dark'}
                            style={{ marginTop: 6 }}
                        >
                            {Lng.t('estimates.discount', { locale })}
                        </Text>
                    </View>
                    <View
                        style={[styles.subAmount(theme), styles.discountField]}
                    >
                        <Field
                            name="discount"
                            component={InputField}
                            inputProps={{
                                returnKeyType: 'next',
                                autoCapitalize: 'none',
                                autoCorrect: true,
                                keyboardType: 'decimal-pad'
                            }}
                            fieldStyle={styles.fieldStyle}
                            {...(theme?.mode === 'dark' && {
                                inputContainerStyle: {
                                    borderColor: colors.gray5,
                                    backgroundColor: colors.gray7
                                }
                            })}
                            disabled={disabled}
                        />
                        <Field
                            name="discount_type"
                            component={SelectPickerField}
                            items={ESTIMATE_DISCOUNT_OPTION}
                            onChangeCallback={val => {
                                setFormField('discount_type', val);
                            }}
                            isFakeInput
                            defaultPickerOptions={{
                                label: 'Fixed',
                                value: 'fixed',
                                color: colors.secondary,
                                displayLabel: currency ? currency.symbol : '$'
                            }}
                            fakeInputValueStyle={styles.fakeInputValueStyle}
                            fakeInputContainerStyle={styles.selectPickerField(
                                theme
                            )}
                            containerStyle={styles.SelectPickerContainer}
                            disabled={disabled}
                        />
                    </View>
                </View>
            )}

            {taxes &&
                taxes.map((val, index) =>
                    !val.compound_tax ? (
                        <View style={styles.subContainer} key={index}>
                            <View>
                                <Text
                                    darkGray
                                    h5
                                    medium
                                    style={{ marginTop: 6 }}
                                >
                                    {getTaxName(val)} ({val.percent} %)
                                </Text>
                            </View>
                            <View>
                                <CurrencyFormat
                                    amount={getTaxValue(val.percent)}
                                    currency={currency}
                                    style={styles.taxAmount(theme)}
                                    symbolStyle={styles.currencySymbol}
                                    currencySymbolStyle={styles.symbol(
                                        currency
                                    )}
                                />
                            </View>
                        </View>
                    ) : null
                )}

            {taxes &&
                taxes.map((val, index) =>
                    val.compound_tax ? (
                        <View style={styles.subContainer} key={index}>
                            <View>
                                <Text
                                    darkGray
                                    h5
                                    medium
                                    style={{ marginTop: 6 }}
                                >
                                    {getTaxName(val)} ({val.percent} %)
                                </Text>
                            </View>
                            <View>
                                <CurrencyFormat
                                    amount={getCompoundTaxValue(val.percent)}
                                    currency={currency}
                                    style={styles.taxAmount(theme)}
                                    symbolStyle={styles.currencySymbol}
                                    currencySymbolStyle={styles.symbol(
                                        currency
                                    )}
                                />
                            </View>
                        </View>
                    ) : null
                )}

            {DISPLAY_ITEM_TAX({ state, theme })}

            {!taxPerItem && (
                <Field
                    name="taxes"
                    apiSearch
                    hasPagination
                    items={taxTypes}
                    getItems={getTaxes}
                    displayName="name"
                    component={SelectField}
                    onlyPlaceholder
                    fakeInputProps={{
                        disabled,
                        fakeInput: (
                            <Text
                                right
                                medium
                                h4
                                color={theme?.viewLabel?.thirdColor}
                            >
                                {Lng.t('estimates.taxPlaceholder', { locale })}
                            </Text>
                        )
                    }}
                    navigation={navigation}
                    isMultiSelect
                    locale={locale}
                    concurrentMultiSelect
                    compareField="id"
                    valueCompareField="tax_type_id"
                    headerProps={{ title: Lng.t('taxes.title', { locale }) }}
                    rightIconPress={() =>
                        navigation.navigate(ROUTES.TAX, {
                            type: ADD_TAX,
                            onSelect: val => {
                                setFormField('taxes', [...val, ...taxes]);
                            }
                        })
                    }
                    listViewProps={{ contentContainerStyle: { flex: 2 } }}
                    emptyContentProps={{ contentType: 'taxes' }}
                    isEditable={!disabled}
                />
            )}

            <CtDivider dividerStyle={styles.divider(theme)} />

            <View style={[styles.subContainer]}>
                <View>
                    <Text
                        darkGray
                        h5
                        medium={theme?.mode === 'light'}
                        bold2={theme?.mode === 'dark'}
                        style={{ marginTop: 6 }}
                    >
                        {Lng.t('estimates.totalAmount', { locale })}:
                    </Text>
                </View>
                <View style={{ marginTop: isIosPlatform() ? 4 : 3 }}>
                    <CurrencyFormat
                        amount={finalAmount()}
                        currency={currency}
                        style={styles.finalAmount(theme)}
                        currencyStyle={{
                            marginTop: isIosPlatform() ? -1.5 : -6
                        }}
                        {...(isIosPlatform() && {
                            currencySymbolStyle: styles.symbol(currency)
                        })}
                    />
                </View>
            </View>
        </View>
    );
};

export default FinalAmount;
