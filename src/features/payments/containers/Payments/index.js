import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as PaymentsAction from '../../actions';
import { colors } from '../../../../styles/colors';
import { Payments } from '../../components/Payments';
import { PAYMENT_SEARCH } from '../../constants';
import { SvgXml } from 'react-native-svg';
import { PAYMETNS } from '../../../../assets/svg';
import { getCustomers } from '../../../customers/actions';
import { getTitleByLanguage, navigateToMainTabs } from '../../../../navigation/actions';
import { ROUTES } from '../../../../navigation/routes';
import { withNavigationFocus } from 'react-navigation';


const mapStateToProps = (state) => {

    const {
        global: { language },
        customers: { customers },
        payments: {
            payments,
            filterPayments,
            loading: { paymentsLoading }
        }
    } = state;

    return {
        payments,
        filterPayments,
        loading: paymentsLoading,
        language,
        customers,
        formValues: getFormValues(PAYMENT_SEARCH)(state) || {},
    };
};


const mapDispatchToProps = {
    getPayments: PaymentsAction.getPayments,
    getCustomers: getCustomers
};

//  Redux Forms
const paymentSearchReduxForm = reduxForm({
    form: PAYMENT_SEARCH,
})(Payments);

//  connect
const PaymentsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(paymentSearchReduxForm);

PaymentsContainer.navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false,
    tabBarLabel: getTitleByLanguage('tabNavigation.payments'),
    tabBarIcon: ({ focused }: { focused: boolean }) => (
        <SvgXml
            xml={PAYMETNS}
            fill={focused ? colors.primary : colors.darkGray}
            width="22"
            height="22"
        />
    ),
    tabBarOnPress: () => {
        if (navigation.isFocused()) {
            return;
        }

        navigateToMainTabs(navigation, ROUTES.MAIN_PAYMENTS)
    }
});

export default withNavigationFocus(PaymentsContainer);
