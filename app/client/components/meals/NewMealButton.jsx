import React, { PropTypes } from 'react';

const NewMealButton = ({ mealTemplates, mealTypeDefaults, onNewMeal, onNewMealFromTemplate }) => (
  <div className="btn-group btn-block pull-right">
    <button type="button" className="btn btn-block btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Ajouter un repas
    </button>
    <div className="dropdown-menu dropdown-menu-right">
      {mealTypeDefaults.map(mealTypeDefault =>
        <button
          className="dropdown-item"
          key={mealTypeDefault._id}
          onClick={onNewMeal.bind(this, mealTypeDefault.type, mealTypeDefault.time, mealTypeDefault.name)}
        >
          {mealTypeDefault.name}
        </button>
      )}

      {mealTemplates.length > 0 && <div className="dropdown-divider"></div>}
      {mealTemplates.length > 0 && <h6 className="dropdown-header">Mes modèles</h6>}

      {mealTemplates.map(mealTemplate =>
        <button
          className="dropdown-item"
          key={mealTemplate._id}
          onClick={onNewMealFromTemplate.bind(this, mealTemplate._id)}
        >
          {mealTemplate.name}
        </button>
      )}
    </div>
  </div>
);

NewMealButton.propTypes = {
  mealTemplates: PropTypes.array.isRequired,
  mealTypeDefaults: PropTypes.array.isRequired,
  onNewMeal: PropTypes.func.isRequired,
  onNewMealFromTemplate: PropTypes.func.isRequired,
};

export default NewMealButton;
