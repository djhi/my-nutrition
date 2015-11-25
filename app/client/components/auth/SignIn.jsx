/* global Roles */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Fa from 'react-fa';
import SignInForm from '../../components/auth/SignInForm';

const SignIn = ({loginWithGoogle, loginWithPassword, user}) => (
  !user ? (
    <div className="row">
      <div className="col-xs-12 col-md-6 col-md-offset-3">
        <h2>Authentification</h2>
      </div>
      <div className="col-xs-12 col-md-6 col-md-offset-3">
        <button
          className="btn btn-primary btn-lg btn-block"
          onClick={loginWithGoogle}
        >
          <Fa name="google" /> Avec votre compte Google
        </button>
      </div>
      <div className="col-xs-12 col-md-6 col-md-offset-3">
        <hr />
        <SignInForm
          loginWithPassword={loginWithPassword}
        />
      </div>
    </div>
  ) : (
    <div className="row">
      <div className="col-xs-12">
        <div className="jumbotron">
          <h2>Content de vous revoir !</h2>
          {Roles.userIsInRole(user, 'coach') &&
            <p>
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Aller sur mon tableau de bord
              </Link>
              &nbsp;
              <Link to="/planning" className="btn btn-secondary btn-lg">
                Voir mon planning nutritionnel
              </Link>
            </p>
          }
          {Roles.userIsInRole(user, 'coachee') &&
            <p>
              <Link to="/planning" className="btn btn-primary btn-lg">
                Voir mon planning nutritionnel
              </Link>
            </p>
          }
        </div>
      </div>
    </div>
  )
);

SignIn.propTypes = {
  loginWithGoogle: PropTypes.func,
  loginWithPassword: PropTypes.func,
  user: PropTypes.object,
};

export default SignIn;
