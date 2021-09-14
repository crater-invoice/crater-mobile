import {connect} from 'react-redux';
import {More} from '../../components/More';
import {reduxForm} from 'redux-form';
import {MORE_SEARCH} from '../../constants';
import {commonSelector} from 'stores/common/selectors';
import {logoutSuccess} from '@/features/authentication/actions';

const mapStateToProps = state => ({
  ...commonSelector(state)
});

const mapDispatchToProps = {
  logout: logoutSuccess
};

const moreSearchReduxForm = reduxForm({
  form: MORE_SEARCH
})(More);

const MoreContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(moreSearchReduxForm);

export default MoreContainer;
