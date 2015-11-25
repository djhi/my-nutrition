/* global Meteor */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import { Link } from 'react-router';

class InviteCoach extends Component {
  static propTypes = {
    inviteCoach: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.refs.email.getInputDOMNode().select();
  }

  onKeyDown(event) {
    // Sepcial key handling for textarea allowing to submit the form using Ctrl + Enter
    if (event.key === 'Enter' && event.ctrlKey) {
      ReactDOM.findDOMNode(this.refs.submit).click();
    }
  }

  inviteCoachee(formValues) {
    const { email } = formValues;

    this.props.inviteCoach(email);
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>
            Invitez votre coach
          </h2>
        </div>
        <div className="col-xs-12">
          <Form
            className="form-horizontal"
            onValidSubmit={this.inviteCoachee.bind(this)}
          >
              <ValidatedInput
                autofocus
                ref="email"
                type="email"
                placeholder="Email"
                name="email"
                validate="required,isEmail"
                errorHelp={{
                  required: 'Requis',
                  isEmail: 'Email invalide',
                }}
                onKeyDown={this.onKeyDown.bind(this)}
              />
            <div className="btn-group">
              <button className="btn btn-primary" ref="submit" type="submit">Envoyer l'invitation</button>
              <Link to="/planning" className="btn btn-secondary">Annuler</Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default InviteCoach;
