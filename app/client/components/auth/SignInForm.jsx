import React, { PropTypes } from 'react';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import { Link } from 'react-router';

const SignInForm = ({ loginWithPassword }) => (
  <Form
    className="form-horizontal"
    onValidSubmit={({email, password}) => loginWithPassword(email, password)}
  >
    <ValidatedInput
      autofocus
      type="email"
      placeholder="Votre email"
      name="email"
      validate="required,isEmail"
      errorHelp={{
        required: 'Requis',
        isEmail: 'Email invalide',
      }}
    />

    <ValidatedInput
      type="password"
      placeholder="Entrez un mot de passe"
      name="password"
      validate="required"
      errorHelp={{
        required: 'Requis',
      }}
    />

    <div className="btn-group">
      <button className="btn btn-primary" type="submit">S'authentifier</button>
      <Link className="btn btn-secondary" to="/">Annuler</Link>
    </div>
    <div className="btn-group">
      <Link className="btn btn-link" to="/sign-up">Vous n'avez pas de compte ?</Link>
    </div>
  </Form>
);

SignInForm.propTypes = {
  loginWithPassword: PropTypes.func.isRequired,
};

export default SignInForm;
