import React, {Component} from 'react';
import {Image} from 'react-native';
import LogoDark from '../../assets/crater-logo.png';
import LogoWhite from '../../assets/crater-logo-white.png';
import GoogleIcon from '../../assets/google.png';
import EmptyInvoices from '../../assets/empty-invoices-icon.png';
import EmptyCustomers from '../../assets/empty-customers-icon.png';
import EmptyEstimates from '../../assets/empty-estimates-icon.png';
import EmptyExpenses from '../../assets/empty-expenses-icon.png';
import EmptyItems from '../../assets/empty-items-icon.png';
import EmptyPayments from '../../assets/empty-payments-icon.png';
import OpenEnvelop from '../../assets/envelop.png';
import DefaultAvatar from '../../assets/default-avatar.jpg';
import EmptyInvoicesDark from '../../assets/empty-invoices-icon-dark.png';
import {IProps} from './type.d';

export class AssetImage extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  static images = {
    logo_dark: LogoDark,
    logo_white: LogoWhite,
    google: GoogleIcon,
    empty_customers: EmptyCustomers,
    empty_estimates: EmptyEstimates,
    empty_expenses: EmptyExpenses,
    empty_items: EmptyItems,
    empty_payments: EmptyPayments,
    envelop: OpenEnvelop,
    avatar: DefaultAvatar,
    light: {
      empty_invoices: EmptyInvoices,
      logo: LogoDark
    },
    dark: {
      empty_invoices: EmptyInvoicesDark,
      logo: LogoWhite
    }
  };

  render() {
    const {uri, source, style, imageProps} = this.props;

    return (
      <Image
        source={uri ? {uri: source} : source}
        style={style}
        {...imageProps}
      />
    );
  }
}

export default AssetImage;
