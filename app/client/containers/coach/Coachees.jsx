/* global Meteor */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCoacheesFactory } from '../../actions/coachees';

import Coachees from '../../components/Coachees';

function mapStateToProps(state) {
  return {
    coachees: state.coachees.items,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadCoachees: loadCoacheesFactory(Meteor.users),
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Coachees);
