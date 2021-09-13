import {createStackNavigator} from 'react-navigation';
import LoginContainer from '../../features/authentication/containers/Login';
import ForgotPasswordContainer from '../../features/authentication/containers/ForgetPassword';
import EndpointContainer from '../../features/authentication/containers/Endpoint';
import {routes} from '../routes';
import {generateStackNavigation} from '../actions';

export default createStackNavigator(
  {
    [routes.LOGIN]: {
      screen: LoginContainer
    },
    [routes.FORGOT_PASSWORD]: {
      screen: ForgotPasswordContainer
    },

    // Endpoint Api
    // -----------------------------------------
    [routes.ENDPOINTS]: generateStackNavigation(
      routes.ENDPOINTS,
      EndpointContainer
    )
  },
  {
    initialRouteName: routes.LOGIN,
    navigationOptions: {
      header: null,
      headerTransparent: true,
      gesturesEnabled: false
    }
  }
);
