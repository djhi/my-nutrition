import React, { PropTypes } from 'react';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router';

const CoacheeItem = ({ coachee: { _id, registered_emails, profile: { name }} }) => {
  const address = registered_emails && registered_emails.length > 0 && registered_emails[0].address; // eslint-disable-line camelcase
  const planningUrl = `/planning/${_id}/${name}`;

  return (
    <div className="list-group-item coachee">
      {address && <Gravatar className="profile-image img-circle pull-left" size={30} email={address} /> }
      <b>{name}</b>&nbsp;
      {address && <span className="text-muted">({address})</span>}
      <div className="pull-right">
        <Link to={planningUrl} className="btn btn-sm btn-link">Voir le planning</Link>
      </div>
    </div>
  );
};

CoacheeItem.propTypes = {
  coachee: PropTypes.object.isRequired,
};

export default CoacheeItem;
