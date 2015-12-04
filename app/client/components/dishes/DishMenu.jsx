import React, { Component, PropTypes } from 'react';
import Fa from 'react-fa';
import ConfirmModal from '../ConfirmModal';
import { FormattedMessage } from 'react-intl';

export default class DishMenu extends Component {
  static propTypes = {
    dish: PropTypes.object.isRequired,
    meals: PropTypes.array.isRequired,
    onCopyDishToMeal: PropTypes.func.isRequired,
    onDishDeleted: PropTypes.func.isRequired,
    onMoveDishToMeal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      confirm: false,
    };
  }

  onCancel() {
    this.setState({
      confirm: false,
    });
  }

  onClick(event) {
    event.stopPropagation();
  }

  onDelete() {
    this.setState({ confirm: true });
  }

  onDeletionConfirmed() {
    this.setState({ confirm: false });
    this.props.onDishDeleted(this.props.dish._id);
  }

  render() {
    const { dish, meals } = this.props;
    const { confirm } = this.state;
    const filteredMeals = meals.filter(meal => meal._id !== dish.mealId);

    return (
      <div className="btn-group pull-right" onClick={this.onClick.bind(this)}>
        <button type="button" className="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          {filteredMeals.map(meal => (
            <button className="dropdown-item" key={`move_${meal._id}`} onClick={this.props.onMoveDishToMeal.bind(this, this.props.dish._id, meal._id, -1)}>
              <FormattedMessage
                id="planning.dish.moveToMeal"
                description="Displayed in dish menu. Specify meal time as we may have multiple meal with same name"
                defaultMessage="Move in {mealName} ({mealTakenAt})"
                values={{mealName: meal.name, mealTakenAt: meal.takenAt()}}
              />
            </button>
          ))}
          <div className="dropdown-divider"></div>
          {filteredMeals.map(meal => (
            <button className="dropdown-item" key={`copy_${meal._id}`} onClick={this.props.onCopyDishToMeal.bind(this, this.props.dish._id, meal._id, -1)}>
              <FormattedMessage
                id="planning.dish.copyToMeal"
                description="Displayed in dish menu. Specify meal time as we may have multiple meal with same name"
                defaultMessage="Copy in {mealName} ({mealTakenAt})"
                values={{mealName: meal.name, mealTakenAt: meal.takenAt()}}
              />
            </button>
          ))}

          <div className="dropdown-divider"></div>
          <button className="dropdown-item text-danger" onClick={this.onDelete.bind(this)}>
            <FormattedMessage
              id="common.remove"
              defaultMessage="Supprimer"
            />
          </button>
        </div>

        <ConfirmModal
          onConfirm={this.onDeletionConfirmed.bind(this)}
          onCancel={this.onCancel.bind(this)}
          show={confirm}
        >
          <FormattedMessage
            id="planning.dish.removalConfirmationPrompt"
            description="Displayed in a modal when requesting to remove a dish"
            defaultMessage="Do you really want to remove this dish ?"
          />
        </ConfirmModal>
      </div>
    );
  }
}
