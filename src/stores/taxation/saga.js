import {put, takeLatest, call, select} from 'redux-saga/effects';
import {initialize} from 'redux-form';
import {find} from 'lodash';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {
  currentCompanyAddressSelector,
  selectedCompanySettingSelector
} from '../company/selectors';
import {hasValue, isBooleanTrue, isEmpty} from '@/constants';
import {isFullAddress, taxationTypes} from './helper';
import {routes} from '@/navigation';
import {navigation} from '@/navigation';
import {store} from '@/stores';

function* updateTaxes(form, salesTaxUs) {
  const state = yield select();
  const formValues = state.form[form]?.values;
  let taxes = formValues?.taxes ?? [];

  if (!hasValue(salesTaxUs)) {
    store.dispatch(
      initialize(form, {
        ...formValues,
        salesTaxUs: null,
        taxes: taxes.filter(tax => tax.name !== 'SalesTaxUs')
      })
    );
    return;
  }

  const formattedSalesTax = {...salesTaxUs, tax_type_id: salesTaxUs.id};
  const isAlreadyExist = hasValue(find(taxes, {name: salesTaxUs.name}));
  if (isAlreadyExist) {
    taxes = taxes.map(tax =>
      tax.name === salesTaxUs.name ? formattedSalesTax : tax
    );
  } else {
    taxes.unshift(formattedSalesTax);
  }
  store.dispatch(
    initialize(form, {...formValues, taxes, salesTaxUs: formattedSalesTax})
  );
}

function* navigateToAddressScreen(payload, type, address) {
  const route =
    type === taxationTypes.CUSTOMER_LEVEL
      ? routes.SHIPPING_ADDRESS_MODAL
      : routes.COMPANY_ADDRESS_MODAL;
  if (type === payload.type) {
    yield call(updateTaxes, payload.form, null);
    navigation.navigateTo({route, params: {address}});
  }
}

/**
 * Fetch sales tax rate saga
 * @returns {IterableIterator<*>}
 */
function* fetchSalesTaxRate({payload}) {
  const state = yield select();
  const {form} = payload;
  try {
    const selectedCompany = selectedCompanySettingSelector(state);
    const isEnabled = isBooleanTrue(selectedCompany?.sales_tax_us_enabled);
    const type = selectedCompany?.sales_tax_type;
    let address = null;

    if (!isEnabled) {
      return;
    }

    if (type === taxationTypes.CUSTOMER_LEVEL) {
      address = payload?.address;
    } else {
      address = payload?.address ?? currentCompanyAddressSelector(state);
    }

    if (!hasValue(address)) {
      return;
    }

    if (!isFullAddress(address)) {
      yield call(navigateToAddressScreen, payload, type, address);
      return;
    }

    const {data: salesTaxUs} = yield call(req.fetchSalesTaxRate, address);

    yield call(updateTaxes, form, salesTaxUs);
  } catch (e) {
    yield call(updateTaxes, form, null);
    handleError(e);
  }
}

export default function* taxationSaga() {
  yield takeLatest(types.FETCH_SALES_TAX_RATE, fetchSalesTaxRate);
}
