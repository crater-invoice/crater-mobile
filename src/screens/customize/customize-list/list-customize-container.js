import {connect} from 'react-redux';
import CustomizeList from './list-customize';
import {commonSelector, permissionSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => ({
  ...commonSelector(state),
  ...permissionSelector(route)
});

export const CustomizeListContainer = connect(mapStateToProps)(CustomizeList);
