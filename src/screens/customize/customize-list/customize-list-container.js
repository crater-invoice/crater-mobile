import {connect} from 'react-redux';
import CustomizeList from './customize-list';
import {commonSelector, permissionSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {navigation}) => {
  return {
    ...commonSelector(state),
    ...permissionSelector(navigation)
  };
};

const mapDispatchToProps = {};

export const CustomizeListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizeList);

CustomizeListContainer.navigationOptions = () => ({
  header: null
});
