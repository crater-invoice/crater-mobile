import {connect} from 'react-redux';
import CustomizeList from './customize-list';
import {commonSelector, permissionSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => {
  return {
    ...commonSelector(state),
    ...permissionSelector(route)
  };
};

export const CustomizeListContainer = connect(mapStateToProps)(CustomizeList);
