import {connect} from 'react-redux';
import CustomizeList from './customize-list';
import {commonSelector, permissionSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {navigation}) => {
  return {
    ...commonSelector(state),
    ...permissionSelector(navigation)
  };
};

export const CustomizeListContainer = connect(mapStateToProps)(CustomizeList);

CustomizeListContainer.navigationOptions = () => ({
  header: null
});
