import {hasTextLength as hasValue} from '@/constants';
import {find} from 'lodash';

export const isFullAddress = address => {
  const fields = ['address_street_1', 'city', 'state', 'zip'];
  let isValid = true;

  for (const field of fields) {
    if (!hasValue(address[field])) {
      isValid = false;
      break;
    }
  }

  return isValid;
};

export const taxationTypes = {
  CUSTOMER_LEVEL: 'customer_level',
  COMPANY_LEVEL: 'company_level'
};

export const setSalesTaxUsFieldValue = values => {
  const taxes = values?.taxes ?? [];
  return {salesTaxUs: find(taxes, {name: 'SalesTaxUs'})};
};
