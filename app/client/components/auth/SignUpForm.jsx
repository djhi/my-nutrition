import React, {PropTypes} from 'react';
import {Form, ValidatedInput} from 'react-bootstrap-validation';
import {Link} from 'react-router';

const SignUpForm = ({signUp}) => (
  <Form
    className="form-horizontal"
    onValidSubmit={({email, name, password}) => signUp(email, name, password)}
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
        type="text"
        placeholder="Votre nom"
        name="name"
        validate="required"
        errorHelp={{
          required: 'Requis',
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
      <button className="btn btn-primary" type="submit">Créer mon compte</button>
      <Link className="btn btn-secondary" to="/">Annuler</Link>
    </div>
    <Link className="btn btn-link" to="/sign-in">Vous avez déjà un compte ?</Link>
  </Form>
);
SignUpForm.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export default SignUpForm;
