/* global Roles */
import React, { Component, PropTypes } from 'react';
import Fa from 'react-fa';
import SignUpForm from '../../components/auth/SignUpForm';

class SignUp extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.user) {
      if (Roles.userIsInRole(this.props.user, 'coach')) {
        return this.props.pushState(null, '/dashboard');
      }

      if (Roles.userIsInRole(this.props.user, 'coachee')) {
        return this.props.pushState(null, '/planning');
      }
    }
  }

  renderAccountType() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="jumbotron">
            <h1>Bienvenue sur Ma Nutrition !</h1>
            <p>Afin de personnaliser votre expérience, indiquez-nous si vous êtes un coach ou un nutritioniste.</p>
            <p>
              <button
                className="btn btn-primary btn-lg"
                onClick={this.props.setAccountAsCoach}
              >
                Je suis un coach/nutritioniste
              </button>
              &nbsp;
              <button
                className="btn btn-secondary btn-lg"
                onClick={this.props.setAccountAsCoachee}
              >
                Je ne suis pas un coach/nutritioniste
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  renderSignUp() {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          <h2>
            Créez votre compte Ma-Nutrition
          </h2>
        </div>
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={this.props.loginWithGoogle}
          >
            <Fa name="google" /> Avec votre compte Google
          </button>
        </div>
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          <hr />
          <h4>Avec votre adresse email:</h4>
          <SignUpForm
            signUp={this.props.signUp}
          />
        </div>
      </div>
    );
  }

  render() {
    const { user } = this.props;

    return user ? this.renderAccountType() : this.renderSignUp();
  }
}

SignUp.propTypes = {
  loginWithGoogle: PropTypes.func,
  loginWithFacebook: PropTypes.func,
  pushState: PropTypes.func,
  setAccountAsCoach: PropTypes.func,
  setAccountAsCoachee: PropTypes.func,
  signUp: PropTypes.func,
  token: PropTypes.string,
  user: PropTypes.object,
};

export default SignUp;
