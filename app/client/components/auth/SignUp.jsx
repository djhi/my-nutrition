/* global Roles */
import React, { PropTypes } from 'react';
import Fa from 'react-fa';
import SignUpForm from '../../components/auth/SignUpForm';

const SignUp = ({
  loginWithGoogle,
  signUp,
  token,
}) => (
  <div className="row">
    <div className="col-xs-12 col-md-6 col-md-offset-3">
      <h2>
        Créez votre compte Ma-Nutrition
      </h2>
    </div>
    <div className="col-xs-12 col-md-6 col-md-offset-3">
      <button
        className="btn btn-primary btn-lg btn-block"
        onClick={loginWithGoogle.bind(null, token)}
      >
        <Fa name="google" /> Avec votre compte Google
      </button>
    </div>
    <div className="col-xs-12 col-md-6 col-md-offset-3">
      <hr />
      <h4>Avec votre adresse email:</h4>
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
