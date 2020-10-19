import React from 'react';
import { connect } from 'react-redux';
import { More } from '../../components/More';
import { colors } from '@/styles';
import { reduxForm } from 'redux-form';
import { MORE_SEARCH } from '../../constants';
import * as MoreAction from '../../actions';
import { SvgXml } from 'react-native-svg';
import { getTitleByLanguage } from '@/utils';
import { MORE_ICON } from '@/assets';

const mapStateToProps = ({ more, global }) => ({
    loading: more.loading.logoutLoading,
    locale: global?.locale
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
            xml={MORE_ICON}
            fill={focused ? colors.primary : colors.darkGray}
            width="22"
            height="22"
        />
    ),
});

export default MoreContainer;
