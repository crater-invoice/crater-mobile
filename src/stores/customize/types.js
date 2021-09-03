import {ROUTES} from '@/navigation';
import {PercentageIcon} from '@/icons';
import {PermissionService} from '@/services';
import t from 'locales/use-translation';

export const SPINNER = 'users/SPINNER';

export const USERS_FORM = 'users/USERS_FORM';
export const CREATE_USER_FORM = 'users/CREATE_USER_FORM';
export const CUSTOMIZE_INVOICE_FORM = 'customize/CUSTOMIZE_INVOICE_FORM';
export const CUSTOMIZE_ESTIMATE_FORM = 'customize/CUSTOMIZE_ESTIMATE_FORM';
export const CUSTOMIZE_PAYMENT_FORM = 'customize/CUSTOMIZE_PAYMENT_FORM';

export const GET_CUSTOMIZE_SETTINGS = 'customize/GET_CUSTOMIZE_SETTINGS';
export const SET_CUSTOMIZE_SETTINGS = 'customize/SET_CUSTOMIZE_SETTINGS';
export const EDIT_CUSTOMIZE_SETTINGS = 'customize/EDIT_CUSTOMIZE_SETTINGS';

export const EDIT_SETTING_ITEM = 'settings/EDIT_SETTING_ITEM';
export const SETTINGS_TRIGGER_SPINNER = 'settings/SETTINGS_TRIGGER_SPINNER';

export const CUSTOMIZE_TYPE = {
  ADDRESSES: 'customize/ADDRESSES',
  INVOICES: 'customize/Invoices',
  ESTIMATES: 'customize/ESTIMATES',
  PAYMENTS: 'customize/PAYMENTS',
  ITEMS: 'customize/ITEMS',
  CURRENCIES: 'customize/CURRENCIES'
};

export const PAYMENT_TABS = {
  MODE: 'MODE',
  PREFIX: 'PREFIX'
};

export const FETCH_USERS = 'users/FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'users/FETCH_USERS_SUCCESS';

export const FETCH_SINGLE_USER = 'users/FETCH_SINGLE_USER';
export const FETCH_SINGLE_USER_SUCCESS = 'users/FETCH_SINGLE_USER_SUCCESS';

export const ADD_USER = 'users/ADD_USER';
export const ADD_USER_SUCCESS = 'users/ADD_USER_SUCCESS';

export const UPDATE_USER = 'users/UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'users/UPDATE_USER_SUCCESS';

export const REMOVE_USER = 'users/REMOVE_USER';
export const REMOVE_USER_SUCCESS = 'users/REMOVE_USER_SUCCESS';

export const COMPANY_SETTINGS_TYPE = [
  'payment_auto_generate',
  'payment_prefix',
  'invoice_auto_generate',
  'invoice_prefix',
  'invoice_mail_body',
  'estimate_auto_generate',
  'estimate_prefix',
  'estimate_mail_body',
  'invoice_billing_address_format',
  'invoice_shipping_address_format',
  'invoice_company_address_format',
  'payment_mail_body',
  'payment_company_address_format',
  'payment_from_customer_address_format',
  'estimate_company_address_format',
  'estimate_billing_address_format',
  'estimate_shipping_address_format'
];
// Customize Menu
// -----------------------------------------
export const CUSTOMIZES_MENU = () => {
  const list = [
    {
      title: t('header.invoices'),
      fullItem: {
        route: ROUTES.CUSTOMIZE_INVOICE
      }
    },
    {
      title: t('header.estimates'),
      fullItem: {
        route: ROUTES.CUSTOMIZE_ESTIMATE
      }
    },
    {
      title: t('header.payments'),
      fullItem: {
        route: ROUTES.CUSTOMIZE_PAYMENT
      }
    }
  ];
  PermissionService.isAllowToView(ROUTES.ITEM_UNITS) &&
    list.push({
      title: t('header.items'),
      fullItem: {
        route: ROUTES.ITEM_UNITS
      }
    });
  return list;
};
