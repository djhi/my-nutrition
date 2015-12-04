import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const InviteCoachNotification = ({setUserPreference, userId}) => (
  <Notification level="info" dismiss={false}>
    <h4>Vous êtes accompagné par un coach ?</h4>
    <p>Invitez le à suivre votre planning nutrionnel !</p>
    <p>
      <Link to="/invite-coach" className="btn btn-link">
        Inviter mon coach
      </Link>
      <button className="btn btn-link" onClick={setUserPreference.bind(null, userId, 'noCoach', true)}>
        Plus tard
      </button>
    </p>
  </Notification>
);

InviteCoachNotification.propTypes = {
  setUserPreference: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default InviteCoachNotification;
