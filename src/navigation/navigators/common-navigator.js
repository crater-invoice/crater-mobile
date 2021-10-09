import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {navigatorOptions as options} from '../navigation-action';
import {routes} from '../navigation-routes';

import Customer from '@/features/customers/containers/Customer';

import Companies from '@/features/common/containers/Companies';
import Company from '@/features/common/containers/Company';
import CompanyInfo from '@/features/settings/containers/Company';

import Estimates from '@/features/estimates/containers/Estimates';
import Estimate from '@/features/estimates/containers/Estimate';
import EstimateItem from '@/features/estimates/containers/Item';

import Expense from '@/features/expenses/containers/Expense';

import Invoice from '@/features/invoices/containers/Invoice';
import InvoiceItem from '@/features/invoices/containers/Item';
import Payment from '@/features/payments/containers/Payment';

import Items from '@/features/more/containers/Items';
import Item from '@/features/more/containers/Item';

import Reports from '@/features/more/containers/Reports';
import Report from '@/features/more/containers/Report';

import Settings from '@/features/settings/containers/Settings';
import UpdateApp from '@/components/UpdateAppVersion';
import Endpoint from '@/features/authentication/containers/Endpoint';
import Account from '@/features/settings/containers/Account';
import Notification from '@/features/settings/containers/Notification';
import {Preferences} from 'screens/preferences';
import TouchOrFaceId from '@/features/settings/containers/Touch-Face-Id';
import {LostConnection} from '@/components';

import Categories from '@/features/settings/containers/Categories';
import Category from '@/features/settings/containers/Category';

import Taxes from '@/features/settings/containers/Taxes';
import Tax from '@/features/settings/containers/Tax';

import CustomFields from '@/features/settings/containers/CustomFields';
import CustomField from '@/features/settings/containers/CustomField';

import Notes from '@/features/settings/containers/Notes';
import Note from '@/features/settings/containers/Note';

import {Users, CreateUser} from 'screens/users';
import {
  RecurringInvoices,
  CreateRecurringInvoice
} from 'screens/recurring-invoices';

import {Roles, CreateRole} from 'screens/roles';

import {ItemUnits} from 'screens/item-units';

import {
  CustomizeList,
  CustomizeInvoice,
  CustomizeEstimate,
  CustomizePayment
} from 'screens/customize';

const Stack = createStackNavigator();

export const CommonNavigator = (
  <>
    {/* Customer Navigator */}
    <Stack.Screen
      name={routes.CUSTOMER}
      component={Customer}
      options={options}
    />

    {/* Company Navigator */}
    <Stack.Screen
      name={routes.COMPANIES}
      component={Companies}
      options={options}
    />
    <Stack.Screen name={routes.COMPANY} component={Company} options={options} />
    <Stack.Screen
      name={routes.COMPANY_INFO}
      component={CompanyInfo}
      options={options}
    />

    {/* Estimate Navigator */}
    <Stack.Screen
      name={routes.ESTIMATE_LIST}
      component={Estimates}
      options={options}
    />
    <Stack.Screen
      name={routes.ESTIMATE}
      component={Estimate}
      options={options}
    />
    <Stack.Screen
      name={routes.ESTIMATE_ITEM}
      component={EstimateItem}
      options={options}
    />

    {/* Recurring Invoice Navigator */}
    <Stack.Screen
      name={routes.RECURRING_INVOICES}
      component={RecurringInvoices}
      options={options}
    />
    <Stack.Screen
      name={routes.CREATE_RECURRING_INVOICE}
      component={CreateRecurringInvoice}
      options={options}
    />

    {/* Expense Navigator */}
    <Stack.Screen name={routes.EXPENSE} component={Expense} options={options} />

    {/* Invoice Navigator */}
    <Stack.Screen name={routes.INVOICE} component={Invoice} options={options} />
    <Stack.Screen
      name={routes.INVOICE_ITEM}
      component={InvoiceItem}
      options={options}
    />

    {/* Payment Navigator */}
    <Stack.Screen name={routes.PAYMENT} component={Payment} options={options} />

    {/* Items Navigator */}
    <Stack.Screen
      name={routes.GLOBAL_ITEMS}
      component={Items}
      options={options}
    />
    <Stack.Screen
      name={routes.GLOBAL_ITEM}
      component={Item}
      options={options}
    />

    {/* Reports Navigator */}
    <Stack.Screen name={routes.REPORTS} component={Reports} options={options} />
    <Stack.Screen
      name={routes.GENERATE_REPORT}
      component={Report}
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
      component={UpdateApp}
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
    <Stack.Screen name={routes.NOTE} component={Note} options={options} />

    {/* Taxes Navigator */}
    <Stack.Screen name={routes.TAXES} component={Taxes} options={options} />
    <Stack.Screen name={routes.TAX} component={Tax} options={options} />

    {/* Category Navigator */}
    <Stack.Screen
      name={routes.CATEGORIES}
      component={Categories}
      options={options}
    />
    <Stack.Screen
      name={routes.CATEGORY}
      component={Category}
      options={options}
    />

    {/* Customize Navigator */}
    <Stack.Screen
      name={routes.CUSTOMIZE_LIST}
      component={CustomizeList}
      options={options}
    />
    <Stack.Screen
      name={routes.CUSTOMIZE_INVOICE}
      component={CustomizeInvoice}
      options={options}
    />
    <Stack.Screen
      name={routes.CUSTOMIZE_ESTIMATE}
      component={CustomizeEstimate}
      options={options}
    />
    <Stack.Screen
      name={routes.CUSTOMIZE_PAYMENT}
      component={CustomizePayment}
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
      name={routes.CUSTOM_FIELD}
      component={CustomField}
      options={options}
    />

    {/* Roles Navigator */}
    <Stack.Screen name={routes.ROLES} component={Roles} options={options} />
    <Stack.Screen
      name={routes.CREATE_ROLE}
      component={CreateRole}
      options={options}
    />
  </>
);
