import { createStackNavigator } from "react-navigation";
import LoginContainer from '../../features/authentication/containers/Login';
import ForgotPasswordContainer from '../../features/authentication/containers/ForgetPassword';
import EndpointContainer from "../../features/authentication/containers/Endpoint";
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

    },
    {
        initialRouteName: ROUTES.LOGIN,
        navigationOptions: {
            header: null,
            headerTransparent: true,
        },
    },
);
