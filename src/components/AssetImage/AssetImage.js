import React, {Component} from 'react';
import {Image, View, ActivityIndicator} from 'react-native';

import LogoDark from '../../assets/crater-logo.png';
import LogoWhite from '../../assets/crater-logo-white.png';
import GoogleIcon from '../../assets/google.png';
import EmptyInvoices from '../../assets/empty-invoices-icon.png';
import EmptyCustomers from '../../assets/empty-customers-icon.png';
import EmptyEstimates from '../../assets/empty-estimates-icon.png';
import EmptyExpenses from '../../assets/empty-expenses-icon.png';
import EmptyItems from '../../assets/empty-items-icon.png';
import EmptyPayments from '../../assets/empty-payments-icon.png';
import LostConnection from '../../assets/lost-connection.png';
import OpenEnvelop from '../../assets/envelop.png';
import DefaultAvatar from '../../assets/default-avatar.jpg';
import EmptyInvoicesDark from '../../assets/empty-invoices-icon-dark.png';

interface IProps {
  imageStyle: Object;
  imageName: String;
  uri: Boolean;
  imageProps: Object;
  loadingImageStyle: Object;
  loaderSize: 'large' | 'small';
}

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
    lost_connection: LostConnection,
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
    const {
      uri,
      imageSource,
      imageStyle,
      loadingImageStyle,
      imageProps,
      loaderSize = 'large'
    } = this.props;

    return (
      <View>
        {this.state.loading && (
          <ActivityIndicator
            size={loaderSize}
            style={[
              imageStyle,
              loadingImageStyle && loadingImageStyle,
              {position: 'absolute'}
            ]}
          />
        )}
        <Image
          source={uri ? {uri: imageSource} : imageSource}
          style={imageStyle}
          onLoadEnd={() => this.setState({loading: false})}
          {...imageProps}
        />
      </View>
    );
  }
}

export default AssetImage;
