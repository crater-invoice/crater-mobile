// @flow

import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

type IProps = {
    appLoading: boolean,
};

const AppLoaderComponent = (props: IProps) => {
    const { appLoading } = props;

    return (
        <View style={[appLoading && styles.loadingWrapper]}>
            {appLoading && <ActivityIndicator size="large" color={styles.white} />}
        </View>
    );
};

const mapStateToProps = ({ global }) => ({
    appLoading: global.loading,
});

const mapDispatchToProps = {};

export const AppLoader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AppLoaderComponent);
