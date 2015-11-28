import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAccountAsCoach, setAccountAsCoachee } from '../../actions/auth';
import AccountType from '../../components/auth/AccountType';

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setAccountAsCoach,
    setAccountAsCoachee,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountType);
