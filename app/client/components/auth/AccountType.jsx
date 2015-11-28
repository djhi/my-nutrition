import React, {PropTypes} from 'react';

const AccountType = ({setAccountAsCoach, setAccountAsCoachee}) => (
  <div className="row">
    <div className="col-xs-12">
      <div className="jumbotron">
        <h1>Bienvenue sur Ma Nutrition !</h1>
        <p>Afin de personnaliser votre expérience, indiquez-nous si vous êtes un coach ou un nutritioniste.</p>
        <p>
          <button className="btn btn-primary btn-lg" onClick={setAccountAsCoach}>
            Je suis un coach/nutritioniste
          </button>
          &nbsp;
          <button className="btn btn-secondary btn-lg" onClick={setAccountAsCoachee}>
            Je ne suis pas un coach/nutritioniste
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
