import {isNaN, omit, sortBy} from 'lodash';
import {hasObjectLength, hasValue} from '@/constants';
import {I18nManager} from 'react-native';
import {calculationRefs} from '@/stores/common/helpers';

export const isFilterApply = formValues => {
  if (!formValues) return false;

  const values = omit(formValues, 'search');
  return hasObjectLength(values);
};

export const sortByItem = (items, iteratee) => {
  return sortBy(items, [iteratee]);
};

export const isRTL = () => I18nManager.isRTL;

export const withExchangedAmount = (price, divide) => {
  let rate = calculationRefs?.exchangeRate?.();
  let rateAmount = rate;
  let finalAmount = price;
  if (!hasValue(rate)) {
    return price;
  }
  if (typeof rate === 'string') {
    rateAmount = parseFloat(rate);
  }
  if (divide) {
    finalAmount = price / rateAmount;
  } else {
    finalAmount = rateAmount * price;
  }
  if (isNaN(finalAmount)) {
    return price;
  }
  return finalAmount;
};

export const setI18nManagerValue = async ({isRTL}) => {
  try {
    await I18nManager.forceRTL(isRTL);
    await I18nManager.allowRTL(isRTL);
  } catch (e) {}
};
