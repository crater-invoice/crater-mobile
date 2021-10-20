import {omit, sortBy} from 'lodash';
import {hasObjectLength} from '@/constants';
import {I18nManager} from 'react-native';

export const isFilterApply = formValues => {
  if (!formValues) return false;

  const values = omit(formValues, 'search');
  return hasObjectLength(values);
};

export const sortByItem = (items, iteratee) => {
  return sortBy(items, [iteratee]);
};

export const isRTL = () => I18nManager.isRTL;

export const setI18nManagerValue = async ({isRTL}) => {
  try {
    await I18nManager.forceRTL(isRTL);
    await I18nManager.allowRTL(isRTL);
  } catch (e) {}
};
