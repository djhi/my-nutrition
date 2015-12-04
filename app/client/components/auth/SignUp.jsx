/* global Roles */
import React, { PropTypes } from 'react';
import Fa from 'react-fa';
import SignUpForm from '../../components/auth/SignUpForm';
import { FormattedMessage } from 'react-intl';

const SignUp = ({
  loginWithGoogle,
  signUp,
  token,
}) => (
  <div className="row">
    <div className="col-xs-12 col-md-6 col-md-offset-3">
      <h2>
        <FormattedMessage
          id="auth.signUp.title"
          description="Title of the sign-up page"
          defaultMessage="Create your account on My Nutrition"
        />
      </h2>
    </div>
    <div className="col-xs-12 col-md-6 col-md-offset-3">
      <button
        className="btn btn-primary btn-lg btn-block"
        onClick={loginWithGoogle.bind(null, token)}
      >
        <Fa name="google" />
        <FormattedMessage
          id="auth.signUp.google"
          description="Button to sign up with google account"
          defaultMessage="With your google account"
        />
      </button>
    </div>
    <div className="col-xs-12 col-md-6 col-md-offset-3">
      <hr />
      <SignUpForm
        signUp={signUp}
        token={token}
      />
    </div>
  </div>
);

SignUp.propTypes = {
  loginWithGoogle: PropTypes.func,
  signUp: PropTypes.func,
  token: PropTypes.string,
};

export default SignUp;
