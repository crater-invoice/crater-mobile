import React from 'react';
import { connect } from 'react-redux';
import { More } from '../../components/More';
import { colors } from '../../../../styles/colors';
import { reduxForm } from 'redux-form';
import { MORE_SEARCH } from '../../constants';
import * as MoreAction from '../../actions';
import { SvgXml } from 'react-native-svg';
import { MORE } from '../../../../assets/svg';
import { getTitleByLanguage } from '../../../../navigation/actions';

const mapStateToProps = ({ more, global }) => ({
    loading: more.loading.logoutLoading,
    language: global.language
});

const mapDispatchToProps = {
    logout: MoreAction.logout
};

//  Redux Forms
const moreSearchReduxForm = reduxForm({
    form: MORE_SEARCH,
})(More);

//  connect
const MoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(moreSearchReduxForm);

MoreContainer.navigationOptions = () => ({
    gesturesEnabled: false,
    tabBarLabel: getTitleByLanguage('tabNavigation.more'),
    tabBarIcon: ({ focused }: { focused: boolean }) => (
        <SvgXml
            xml={MORE}
            fill={focused ? colors.primary : colors.darkGray}
            width="22"
            height="22"
        />
    ),
});

export default MoreContainer;
