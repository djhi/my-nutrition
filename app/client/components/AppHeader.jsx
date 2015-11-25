/* global Roles */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Fa from 'react-fa';
import Gravatar from 'react-gravatar';

const AppHeader = ({ loggingIn, title, user, onLogout }) => {
  const userEmail = user && user.registered_emails && user.registered_emails.length > 0 && user.registered_emails[0].address;
  const userIsCoach = Roles.userIsInRole(user, 'coach');
  const userHasNoCoach = user && Roles.userIsInRole(user, 'coachee') && !user.coachId;

  return (
    <nav className="navbar navbar-dark bg-primary navbar-fixed-top">
      <Link to="/" className="navbar-brand">{title}</Link>
      <ul className="nav navbar-nav">
        {userIsCoach &&
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Tableau de bord</Link>
          </li>
        }
        {userEmail &&
          <li className="nav-item">
            <Link to="/planning" className="nav-link">Planning</Link>
          </li>
        }
        {loggingIn && <span><Fa spin name="spinner" /> Connection en cours...</span> }
        {user &&
          <li className="nav-item dropdown pull-right">
              <a
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
              >
                  {userEmail && <Gravatar className="profile-image img-circle pull-left" size={30} email={userEmail} />} {userEmail}
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                  {userHasNoCoach &&
                    <Link to="/invite-coach" className="dropdown-item">Inviter mon coach</Link>
                  }
                  {userHasNoCoach &&
                    <div className="dropdown-divider"></div>
                  }
                  <button className="dropdown-item" onClick={onLogout}>
                      Déconnexion
                  </button>
              </div>
          </li>
        }
      </ul>
    </nav>
  );
};

AppHeader.propTypes = {
  loggingIn: PropTypes.bool,
  title: PropTypes.string,
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

export default AppHeader;
