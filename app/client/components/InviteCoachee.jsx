import React, {PropTypes} from 'react';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import { Link } from 'react-router';

const InviteCoachee = ({inviteCoachee}) => (
  <div className="row">
    <div className="col-xs-12">
      <h2>
        Invitez un client
      </h2>
    </div>
    <div className="col-xs-12">
      <Form
        className="form-horizontal"
        onValidSubmit={({ email }) => inviteCoachee(email)}
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
        <div className="btn-group">
          <button className="btn btn-primary" ref="submit" type="submit">Envoyer l'invitation</button>
          <Link to="/dashboard" className="btn btn-link">Annuler</Link>
        </div>
      </Form>
    </div>
  </div>
);

InviteCoachee.propTypes = {
  inviteCoachee: PropTypes.func.isRequired,
};

export default InviteCoachee;
