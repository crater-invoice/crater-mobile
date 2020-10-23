import React from 'react';
import { connect } from 'react-redux';
import { More } from '../../components/More';
import { colors } from '@/styles';
import { reduxForm } from 'redux-form';
import { MORE_SEARCH } from '../../constants';
import * as MoreAction from '../../actions';
import { getTitleByLanguage } from '@/utils';
import { MORE_ICON } from '@/assets';
import AssetSvg from '@/components/AssetSvg';

const mapStateToProps = ({ more, global }) => ({
    loading: more.loading.logoutLoading,
    locale: global?.locale
});

const mapDispatchToProps = {
    logout: MoreAction.logout
};

//  Redux Forms
const moreSearchReduxForm = reduxForm({
    form: MORE_SEARCH
})(More);

//  connect
const MoreContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(moreSearchReduxForm);

MoreContainer.navigationOptions = () => ({
    gesturesEnabled: false,
    tabBarLabel: getTitleByLanguage('tabNavigation.more'),
    tabBarIcon: ({ focused }: { focused: boolean }) => (
        <AssetSvg 
            name={MORE_ICON}
            fill={focused ? colors.primary : colors.darkGray}
        />
    )
});

export default MoreContainer;
