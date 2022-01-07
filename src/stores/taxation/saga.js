import {put, takeLatest, call, select, delay} from 'redux-saga/effects';
import {initialize} from 'redux-form';
import {find} from 'lodash';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import {handleError} from '@/utils';
import {hasValue, isBooleanTrue} from '@/constants';
import {isFullAddress, salesTax, taxationTypes} from './helper';
import {routes, navigation} from '@/navigation';
import {store} from '@/stores';
import {fetchBootstrap} from '../common/actions';
import {
  currentCompanyAddressSelector,
  selectedCompanySalesTaxSettingSelector
} from '../company/selectors';
import {settingsSelector} from '../common/selectors';

function* updateTaxes(form, salesTaxUs) {
  const state = yield select();
  const formValues = state.form[form]?.values;

  let taxes = formValues?.taxes ?? [];

  if (!hasValue(salesTaxUs)) {
    yield store.dispatch(
      initialize(form, {
        ...formValues,
        salesTaxUs: null,
        taxes: taxes.filter(
          ({name, type}) => name !== salesTax && type !== 'MODULE'
        )
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
  yield store.dispatch(
    initialize(form, {...formValues, taxes, salesTaxUs: formattedSalesTax})
  );
}

function* navigateToAddressScreen(payload, type, address, addressType) {
  const state = yield select();
  const formValues = state.form[payload.form]?.values;
  let route = null;
  let addressInitialValues = address;

  if (type === taxationTypes.CUSTOMER_LEVEL) {
    route = routes.CUSTOMER_ADDRESS_MODAL;
    addressInitialValues = {
      addressType,
      customer_id: formValues?.customer_id,
      address_street_1: address?.address_street_1,
      address_street_2: address?.address_street_2,
      city: address?.city,
      state: address?.state,
      zip: address?.zip,
      ...address
    };
  } else {
    route = routes.COMPANY_ADDRESS_MODAL;
  }

  if (type === payload.type) {
    yield call(updateTaxes, payload.form, null);
    navigation.navigateTo({
      route,
      params: {
        address: addressInitialValues,
        parentForm: payload.form
      }
    });
  }
}

/**
 * Fetch sales tax rate saga
 * @returns {IterableIterator<*>}
 */
function* fetchSalesTaxRate({payload}) {
  const state = yield select();
  const {form, goBack = false} = payload;
  const formValues = state.form[form]?.values;
  const selectedCompany = yield select(selectedCompanySalesTaxSettingSelector);
  const type = hasValue(formValues?.sales_tax_type)
    ? formValues?.sales_tax_type
    : selectedCompany?.sales_tax_type;
  const addressType = hasValue(formValues?.sales_tax_address_type)
    ? formValues?.sales_tax_address_type
    : selectedCompany?.sales_tax_address_type;
  const taxPerItem = hasValue(formValues?.tax_per_item)
    ? formValues?.tax_per_item
    : settingsSelector(state)?.tax_per_item;
  let address = null;
  try {
    yield put(spinner('isSaving', true));
    const isEnabled = isBooleanTrue(selectedCompany?.sales_tax_us_enabled);
    if (!isEnabled) {
      return;
    }

    if (type != payload.type) {
      return;
    }

    if (isBooleanTrue(taxPerItem)) {
      return;
    }

    if (type === taxationTypes.CUSTOMER_LEVEL) {
      address = payload[addressType];
    } else {
      address = payload?.address ?? currentCompanyAddressSelector(state);
    }

    if (!hasValue(address)) {
      return;
    }

    if (!isFullAddress(address)) {
      yield call(navigateToAddressScreen, payload, type, address, addressType);
      return;
    }

    const response = yield call(req.fetchSalesTaxRate, address);
    const {data: salesTaxUs} = response;

    if (response.error) {
      yield call(updateTaxes, form, null);
      handleError(response.message);
      yield !goBack &&
        call(navigateToAddressScreen, payload, type, address, addressType);
    }

    if (goBack) {
      yield type === taxationTypes.COMPANY_LEVEL && put(fetchBootstrap());
      navigation.goBack();
      yield delay(300);
    }

    yield call(updateTaxes, form, salesTaxUs);
  } catch (e) {
    yield call(updateTaxes, form, null);
    handleError(e);
    yield !goBack &&
      call(navigateToAddressScreen, payload, type, address, addressType);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

export default function* taxationSaga() {
  yield takeLatest(types.FETCH_SALES_TAX_RATE, fetchSalesTaxRate);
}
