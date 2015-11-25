import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginWithGoogle, loginWithPassword, requirePasswordReset } from '../../actions/auth';
import SignIn from '../../components/auth/SignIn';

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginWithGoogle,
    loginWithPassword,
    requirePasswordReset,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
