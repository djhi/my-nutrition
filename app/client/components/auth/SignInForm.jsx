import React, { PropTypes } from 'react';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import { Link } from 'react-router';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  required: {
    id: 'common.required',
    description: 'Error message shown when a required field is missing',
    defaultMessage: 'Required',
  },
  isEmail: {
    id: 'common.isEmail',
    description: 'Error message shown when an email field is not valid',
    defaultMessage: 'Email invalide',
  },
  emailPlaceholder: {
    id: 'auth.signIn.passwordPlaceholder',
    description: 'Placeholder for email input on the sign-in page',
    defaultMessage: 'Enter your email',
  },
  passwordPlaceholder: {
    id: 'auth.signIn.passwordPlaceholder',
    description: 'Placeholder for password input on the sign-in page',
    defaultMessage: 'Enter your password',
  },
});

const SignInForm = ({ intl: {formatMessage}, loginWithPassword }) => (
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
        required: formatMessage(messages.required),
        isEmail: formatMessage(messages.isEmail),
      }}
    />


    <ValidatedInput
      type="password"
      placeholder="Entrez un mot de passe"
      name="password"
      validate="required"
      errorHelp={{
        required: formatMessage(messages.required),
      }}
    />

    <div className="btn-group">
      <button className="btn btn-primary" type="submit">
        <FormattedMessage
          id="auth.signIn.signIn"
          description="Button to sign-in with login/pwd"
          defaultMessage="Sign in"
        />
      </button>
      <Link className="btn btn-secondary" to="/">
        <FormattedMessage
          id="common.cancel"
          defaultMessage="Cancel"
        />
      </Link>
    </div>
    <div className="btn-group">
      <Link className="btn btn-link" to="/sign-up">
        <FormattedMessage
          id="auth.signIn.signUp"
          description="Button to go to sign-up"
          defaultMessage="No account ?"
        />
      </Link>
    </div>
  </Form>
);

SignInForm.propTypes = {
  intl: intlShape.isRequired,
  loginWithPassword: PropTypes.func.isRequired,
};

export default injectIntl(SignInForm);
