import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { inviteCoachee } from '../../actions/invites';

import InviteCoachee from '../../components/InviteCoachee';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    inviteCoachee,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteCoachee);
