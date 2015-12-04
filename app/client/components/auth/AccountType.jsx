import React, {PropTypes} from 'react';
import { FormattedMessage } from 'react-intl';

const AccountType = ({setAccountAsCoach, setAccountAsCoachee}) => (
  <div className="row">
    <div className="col-xs-12">
      <div className="jumbotron">
        <h1>
          <FormattedMessage
            id="auth.accountType.title"
            description="Title of the choose account type page"
            defaultMessage="Welcome on My Nutrition !"
          />
        </h1>
        <p>
          <FormattedMessage
            id="auth.accountType.instructions"
            description="Explain we need to know wether the user is a coach or a coachee"
            defaultMessage="Please tell us wether you're a coach or coachee so that we can customize your exeprience."
          />
        </p>
        <p>
          <button className="btn btn-primary btn-lg" onClick={setAccountAsCoach}>
            <FormattedMessage
              id="auth.accountType.setAccountAsCoach"
              description="Button to choose coach account type"
              defaultMessage="I'm a coach"
            />
          </button>
          &nbsp;
          <button className="btn btn-secondary btn-lg" onClick={setAccountAsCoachee}>
            <FormattedMessage
              id="auth.accountType.setAccountAsCoachee"
              description="Button to choose coachee account type"
              defaultMessage="I'm not a coach"
            />
          </button>
        </p>
      </div>
    </div>
  </div>
);

AccountType.propTypes = {
  setAccountAsCoach: PropTypes.func.isRequired,
  setAccountAsCoachee: PropTypes.func.isRequired,
};

export default AccountType;
