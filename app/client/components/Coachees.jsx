import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import CoacheeItem from './coachees/CoacheeItem';

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
            <h1>Bienvenue sur Ma Nutrition !</h1>
            <p>Invitez une personne à partager son planning nutritionnel avec vous en entrant son email ci-dessous.</p>
            <Link to="/dashboard/invite" className="btn btn-primary">Inviter un client</Link>
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
            Mes clients
          </h2>
        </div>
        <div className="col-xs-12">
          <p className="btn-group">
            <Link to="/dashboard/invite" className="btn btn-primary">Inviter un client</Link>
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
