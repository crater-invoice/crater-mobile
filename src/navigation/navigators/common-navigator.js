import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {navigatorOptions as options} from '../navigation-action';
import {routes} from '../navigation-routes';

import {CreateCustomer, CustomerAddress} from 'screens/customers';

import CreateCompany from 'screens/companies/create-company';

import {CreateExpense} from 'screens/expenses';

import {CreatePayment} from 'screens/payments';

import Endpoint from 'screens/endpoint';
import LostConnection from 'screens/lost-connection';
import UpdateAppVersion from 'screens/update-app-version';

import Account from 'screens/account';

import {Settings, Notification, TouchOrFaceId} from 'screens/settings';

import Preferences from 'screens/preferences';

import {Categories, CreateCategory} from 'screens/categories';

import {Taxes, CreateTax} from 'screens/taxes';

import {CustomFields, CreateCustomField} from 'screens/custom-field';

import {Notes, CreateNote} from 'screens/notes';

import {Users, CreateUser} from 'screens/users';

import {Roles, CreateRole} from 'screens/roles';

import {ItemUnits} from 'screens/item-units';

import {Items, CreateItem} from 'screens/items';

import CreateInvoice from 'screens/invoices/create-invoice';

import {Estimates, CreateEstimate} from 'screens/estimates';

import {Reports, GenerateReport} from 'screens/reports';

import {PaymentModes} from 'screens/payment-modes';

import Webview from 'screens/webview';

import CompanyAddressModal from 'screens/modal/company-address';
import CustomerAddressModal from 'screens/modal/customer-address';

import {
  RecurringInvoices,
  ViewRecurringInvoice,
  CreateRecurringInvoice
} from 'screens/recurring-invoices';

const Stack = createStackNavigator();

export const CommonNavigator = (
  <>
    {/* Customer Navigator */}
    <Stack.Screen
      name={routes.CREATE_CUSTOMER}
      component={CreateCustomer}
      options={options}
    />
    <Stack.Screen
      name={routes.CUSTOMER_ADDRESS}
      component={CustomerAddress}
      options={options}
    />

    {/* Company Navigator */}
    <Stack.Screen
      name={routes.CREATE_COMPANY}
      component={CreateCompany}
      options={options}
    />

    {/* Estimate Navigator */}
    <Stack.Screen
      name={routes.ESTIMATES}
      component={Estimates}
      options={options}
    />
    <Stack.Screen
      name={routes.CREATE_ESTIMATE}
      component={CreateEstimate}
      options={options}
    />

    {/* Recurring Invoice Navigator */}
    <Stack.Screen
      name={routes.RECURRING_INVOICES}
      component={RecurringInvoices}
      options={options}
    />
    <Stack.Screen
      name={routes.VIEW_RECURRING_INVOICE}
      component={ViewRecurringInvoice}
      options={options}
    />
    <Stack.Screen
      name={routes.CREATE_RECURRING_INVOICE}
      component={CreateRecurringInvoice}
      options={options}
    />

    {/* Expense Navigator */}
    <Stack.Screen
      name={routes.CREATE_EXPENSE}
      component={CreateExpense}
      options={options}
    />

    {/* Invoice Navigator */}
    <Stack.Screen
      name={routes.CREATE_INVOICE}
      component={CreateInvoice}
      options={options}
    />

    {/* Payment Navigator */}
    <Stack.Screen
      name={routes.CREATE_PAYMENT}
      component={CreatePayment}
      options={options}
    />

    {/* Items Navigator */}
    <Stack.Screen name={routes.ITEMS} component={Items} options={options} />

    {/* Create Item Navigator */}
    <Stack.Screen
      name={routes.CREATE_ITEM}
      component={CreateItem}
      options={options}
    />

    {/* Reports Navigator */}
    <Stack.Screen name={routes.REPORTS} component={Reports} options={options} />
    <Stack.Screen
      name={routes.GENERATE_REPORT}
      component={GenerateReport}
      options={options}
    />

    {/* Users Navigator */}
    <Stack.Screen name={routes.USERS} component={Users} options={options} />
    <Stack.Screen
      name={routes.CREATE_USER}
      component={CreateUser}
      options={options}
    />

    {/* Settings Navigator */}
    <Stack.Screen
      name={routes.UPDATE_APP_VERSION}
      component={UpdateAppVersion}
      options={{gestureEnabled: false}}
    />
    <Stack.Screen
      name={routes.LOST_CONNECTION}
      component={LostConnection}
      options={{gestureEnabled: false}}
    />
    <Stack.Screen
      name={routes.ENDPOINTS_SETTINGS}
      component={Endpoint}
      options={options}
    />
    <Stack.Screen
      name={routes.SETTING_LIST}
      component={Settings}
      options={options}
    />
    <Stack.Screen
      name={routes.NOTIFICATIONS}
      component={Notification}
      options={options}
    />
    <Stack.Screen
      name={routes.PREFERENCES}
      component={Preferences}
      options={options}
    />
    <Stack.Screen
      name={routes.TOUCH_OR_FACE_ID}
      component={TouchOrFaceId}
      options={options}
    />

    {/* Account Navigator */}
    <Stack.Screen
      name={routes.ACCOUNT_INFO}
      component={Account}
      options={options}
    />

    {/* Notes Navigator */}
    <Stack.Screen name={routes.NOTES} component={Notes} options={options} />
    <Stack.Screen
      name={routes.CREATE_NOTE}
      component={CreateNote}
      options={options}
    />

    {/* Taxes Navigator */}
    <Stack.Screen name={routes.TAXES} component={Taxes} options={options} />
    <Stack.Screen
      name={routes.CREATE_TAX}
      component={CreateTax}
      options={options}
    />

    {/* Category Navigator */}
    <Stack.Screen
      name={routes.CATEGORIES}
      component={Categories}
      options={options}
    />
    <Stack.Screen
      name={routes.CREATE_CATEGORY}
      component={CreateCategory}
      options={options}
    />

    {/* Payment Modes Navigator */}
    <Stack.Screen
      name={routes.PAYMENT_MODES}
      component={PaymentModes}
      options={options}
    />

    {/* Item Units Navigator */}
    <Stack.Screen
      name={routes.ITEM_UNITS}
      component={ItemUnits}
      options={options}
    />

    {/* Custom Fields Navigator */}
    <Stack.Screen
      name={routes.CUSTOM_FIELDS}
      component={CustomFields}
      options={options}
    />
    <Stack.Screen
      name={routes.CREATE_CUSTOM_FIELD}
      component={CreateCustomField}
      options={options}
    />

    {/* Roles Navigator */}
    <Stack.Screen name={routes.ROLES} component={Roles} options={options} />
    <Stack.Screen
      name={routes.CREATE_ROLE}
      component={CreateRole}
      options={options}
    />

    {/* Modal */}
    <Stack.Screen
      name={routes.COMPANY_ADDRESS_MODAL}
      component={CompanyAddressModal}
      options={options}
    />
    <Stack.Screen
      name={routes.CUSTOMER_ADDRESS_MODAL}
      component={CustomerAddressModal}
      options={options}
    />

    <Stack.Screen name={routes.WEBVIEW} component={Webview} options={options} />
  </>
);
