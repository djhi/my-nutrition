import React, {PropTypes} from 'react';
import {Form, ValidatedInput} from 'react-bootstrap-validation';
import {Link} from 'react-router';
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
    id: 'auth.signUp.emailPlaceholder',
    description: 'Placeholder for email input on sign-up page',
    defaultMessage: 'Enter your email',
  },
  namePlaceholder: {
    id: 'auth.signUp.namePlaceholder',
    description: 'Placeholder for name input on sign-up page',
    defaultMessage: 'Enter your name',
  },
  passwordPlaceholder: {
    id: 'auth.signUp.passwordPlaceholder',
    description: 'Placeholder for password input on sign-up page',
    defaultMessage: 'Enter a password',
  },
});
const SignUpForm = ({intl: {formatMessage}, signUp}) => (
  <Form
    className="form-horizontal"
    onValidSubmit={({email, name, password}) => signUp(email, name, password)}
  >
      <ValidatedInput
        autofocus
        type="email"
        placeholder={formatMessage(messages.emailPlaceholder)}
        name="email"
        validate="required,isEmail"
        errorHelp={{
          required: formatMessage(messages.required),
          isEmail: formatMessage(messages.isEmail),
        }}
      />
      <ValidatedInput
        type="text"
        placeholder={formatMessage(messages.namePlaceholder)}
        name="name"
        validate="required"
        errorHelp={{
          required: formatMessage(messages.required),
        }}
      />
      <ValidatedInput
        type="password"
        placeholder={formatMessage(messages.passwordPlaceholder)}
        name="password"
        validate="required"
        errorHelp={{
          required: formatMessage(messages.required),
        }}
      />
    <div className="btn-group">
      <button className="btn btn-primary" type="submit">
        <FormattedMessage
          id="auth.signUp.signUp"
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
    <Link className="btn btn-link" to="/sign-in">
      <FormattedMessage
        id="auth.signUp.signIn"
        description="Button to go to sign-in"
        defaultMessage="Already have an account ?"
      />
    </Link>
  </Form>
);

SignUpForm.propTypes = {
  intl: intlShape.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default injectIntl(SignUpForm);
