/* global Meteor */
import React, {PropTypes } from 'react';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import { Link } from 'react-router';

const InviteCoach = ({inviteCoach}) => (
  <div className="row">
    <div className="col-xs-12">
      <h2>
        Invitez votre coach
      </h2>
    </div>
    <div className="col-xs-12">
      <Form
        className="form-horizontal"
        onValidSubmit={inviteCoach}
      >
        <ValidatedInput
          autofocus
          type="email"
          placeholder="Email"
          name="email"
          validate="required,isEmail"
          errorHelp={{
            required: 'Requis',
            isEmail: 'Email invalide',
          }}
        />

        <button className="btn btn-primary" type="submit">Envoyer l'invitation</button>
        <Link to="/planning" className="btn btn-secondary">Annuler</Link>
      </Form>
    </div>
  </div>
);

InviteCoach.propTypes = {
  inviteCoach: PropTypes.func.isRequired,
};

export default InviteCoach;
