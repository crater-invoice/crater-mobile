import LogoDark from '../assets/crater-logo.png';
import LogoWhite from '../assets/crater-logo-white.png';
import GoogleIcon from '../assets/google.png';
import EmptyInvoices from '../assets/empty-invoices-icon.png';
import EmptyCustomers from '../assets/empty-customers-icon.png';
import EmptyEstimates from '../assets/empty-estimates-icon.png';
import EmptyExpenses from '../assets/empty-expenses-icon.png';
import EmptyItems from '../assets/empty-items-icon.png';
import EmptyPayments from '../assets/empty-payments-icon.png';
import LostConnection from '../assets/lost-connection.png';
import OpenEnvelop from '../assets/envelop.png';
import DefaultAvatar from '../assets/default-avatar.jpg';
import EmptyInvoicesDark from '../assets/empty-invoices-icon-dark.png';

export const IMAGES = {
  LOGO_DARK: LogoDark,
  LOGO_WHITE: LogoWhite,
  GOOGLE_ICON: GoogleIcon,
  EMPTY_INVOICES: EmptyInvoices,
  EMPTY_CUSTOMERS: EmptyCustomers,
  EMPTY_ESTIMATES: EmptyEstimates,
  EMPTY_EXPENSES: EmptyExpenses,
  EMPTY_ITEMS: EmptyItems,
  EMPTY_PAYMENTS: EmptyPayments,
  LOST_CONNECTION: LostConnection,
  OPEN_ENVELOP: OpenEnvelop,
  DEFAULT_AVATAR: DefaultAvatar,

  light: {
    EMPTY_INVOICES: EmptyInvoices
  },
  dark: {
    EMPTY_INVOICES: EmptyInvoicesDark
  }
};

export const LOGO = {
  light: IMAGES.LOGO_DARK,
  dark: IMAGES.LOGO_WHITE
};
