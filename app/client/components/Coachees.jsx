import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import CoacheeItem from './coachees/CoacheeItem';
import { FormattedMessage } from 'react-intl';

class Coachees extends Component {
  static propTypes = {
    children: PropTypes.node,
    coachees: PropTypes.array,
    loadCoachees: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadCoachees();
  }

  renderWelcome() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="jumbotron">
            <h1>
              <FormattedMessage
                id="coachees.welcome.title"
                description="Welcome title on coachee managment page"
                defaultMessage="Welcome on My Nutrition"
              />
            </h1>
            <p>
              <FormattedMessage
                id="coachees.welcome.inviteCoachee.description"
                description="Describe how to invite a first coachee"
                defaultMessage="Invite someone to share its nutritional planning with you by entering its email below"
              />
            </p>
            <Link to="/dashboard/invite" className="btn btn-primary">
              <FormattedMessage
                id="coachees.welcome.inviteCoachee.action"
                description="Button to invite a first coachee"
                defaultMessage="Invite coachee"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  renderCoachees() {
    const { coachees } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>
            <FormattedMessage
              id="coachees.title"
              description="Page title for coachees managment"
              defaultMessage="My coachees"
            />
          </h2>
        </div>
        <div className="col-xs-12">
          <p className="btn-group">
            <Link to="/dashboard/invite" className="btn btn-primary">
              <FormattedMessage
                id="coachees.inviteCoachee"
                description="Button to invite a first coachee"
                defaultMessage="Invite coachee"
              />
            </Link>
          </p>
          <div className="list-group">
            {coachees.map(coachee => <CoacheeItem key={coachee._id} coachee={coachee} />)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { coachees } = this.props;

    if (!coachees || coachees.length === 0) {
      return this.renderWelcome();
    }

    return this.renderCoachees();
  }
}

export default Coachees;
