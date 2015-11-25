/* global Meteor */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { inviteCoach } from '../../actions/invites';

import InviteCoach from '../../components/InviteCoach';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    inviteCoach,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteCoach);
