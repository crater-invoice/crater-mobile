import React, { Component } from "react";
import { connect } from "react-redux";
import ApplicationNavigator from "../navigators";
import { createReduxContainer } from 'react-navigation-redux-helpers';

const mapStateToProps = ({ navigationData, nav}) => ({
  navigation: navigationData,
  state: nav
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

const appNavigator = createReduxContainer(ApplicationNavigator, 'root')

export default connect(mapStateToProps, mapDispatchToProps)(
    appNavigator
);
