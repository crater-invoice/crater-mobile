import { createStackNavigator } from "react-navigation";
import LoginContainer from '../../features/authentication/containers/Login';
import ForgotPasswordContainer from '../../features/authentication/containers/ForgetPassword';
import EndpointContainer from "../../features/authentication/containers/Endpoint";
import UpdateAppVersionContainer from "../../components/UpdateAppVersion";
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";

export default createStackNavigator(
  {
        [ROUTES.LOGIN]: {
            screen: LoginContainer
        },
        [ROUTES.FORGOT_PASSWORD]: {
            screen: ForgotPasswordContainer
        },

        // Endpoint Api
        // -----------------------------------------
        [ROUTES.ENDPOINTS]: generateStackNavigation(
            ROUTES.ENDPOINTS,
            EndpointContainer,
        ),

        // Update App Version
        // -----------------------------------------
        [ROUTES.UPDATE_APP_VERSION]: generateStackNavigation(
            ROUTES.UPDATE_APP_VERSION,
            UpdateAppVersionContainer,
        ),
    },
    {
        initialRouteName: ROUTES.LOGIN,
        navigationOptions: {
            header: null,
            headerTransparent: true,
        },
    },
);
