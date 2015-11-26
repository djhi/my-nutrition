import React, { PropTypes } from 'react';

const NewMealButton = ({ mealTemplates, onNewMealFromTemplate }) => (
  <div className="btn-group btn-block pull-right">
    <button type="button" className="btn btn-block btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Ajouter un repas
    </button>
    <div className="dropdown-menu dropdown-menu-right">
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
  onNewMealFromTemplate: PropTypes.func.isRequired,
};

export default NewMealButton;
