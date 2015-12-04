/* global Roles */
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Fa from 'react-fa';
import SignInForm from '../../components/auth/SignInForm';
import { FormattedMessage } from 'react-intl';

const SignIn = ({loginWithGoogle, loginWithPassword, user}) => (
  !user ? (
    <div className="row">
      <div className="col-xs-12 col-md-6 col-md-offset-3">
        <h2>
          <FormattedMessage
            id="auth.signIn.title"
            description="Title of the sign-in page"
            defaultMessage="Authentication"
          />
        </h2>
      </div>
      <div className="col-xs-12 col-md-6 col-md-offset-3">
        <button
          className="btn btn-primary btn-lg btn-block"
          onClick={loginWithGoogle}
        >
          <Fa name="google" />
          <FormattedMessage
            id="auth.signIn.google"
            description="Button to sign in with google account"
            defaultMessage="With your google account"
          />
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
          <h2>
            <FormattedMessage
              id="auth.signIn.confirmation.title"
              description="Title to welcome back the user"
              defaultMessage="Welcome back !"
            />
          </h2>
          {Roles.userIsInRole(user, 'coach') &&
            <p>
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                <FormattedMessage
                  id="auth.signIn.confirmation.goToDashboard"
                  description="Button to go to dashboard"
                  defaultMessage="Go to my dashboard"
                />
              </Link>
              &nbsp;
              <Link to="/planning" className="btn btn-secondary btn-lg">
                <FormattedMessage
                  id="auth.signIn.confirmation.goToPlanning"
                  description="Button to go to planning"
                  defaultMessage="Go to my nutritional planning"
                />
              </Link>
            </p>
          }
          {Roles.userIsInRole(user, 'coachee') &&
            <p>
              <Link to="/planning" className="btn btn-primary btn-lg">
                <FormattedMessage
                  id="auth.signIn.confirmation.goToPlanning"
                  description="Button to go to planning"
                  defaultMessage="Go to my nutritional planning"
                />
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
