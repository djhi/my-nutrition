import React, { Component, PropTypes } from 'react';
import MealTime from './MealTime';
import MealMenu from './MealMenu';
import DishItem from '../dishes/DishItem';
import DishForm from '../dishes/DishForm';
import DragNDropItems from '../../constants/dragndrop';
import { DropTarget } from 'react-dnd';
import { assign } from 'lodash';
import { FormattedMessage } from 'react-intl';

const mealTarget = {
  canDrop(props, monitor) {
    const { dish, mealId } = monitor.getItem();
    return props.meal._id !== mealId || (monitor.isOver({ shallow: true }) && dish.position !== props.meal.dishes ? props.meal.dishes.length - 1 : 0);
  },

  drop(props, monitor) {
    if ((monitor.isOver() && props.meal.dishes && props.meal.dishes.length === 0) || monitor.isOver({ shallow: true })) {
      const dishId = monitor.getItem().dish._id;
      props.onMoveDishToMeal(dishId, props.meal._id, props.meal.dishes ? props.meal.dishes.length : 0);
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
  };
}

class Meal extends Component {
  static propTypes = {
    canEdit: PropTypes.bool.isRequired,
    meal: PropTypes.object,
    meals: PropTypes.array,
    dishes: PropTypes.array,
    onCopyDishToMeal: PropTypes.func.isRequired,
    onDishDeleted: PropTypes.func.isRequired,
    onDishUpdated: PropTypes.func.isRequired,
    onMealDeleted: PropTypes.func.isRequired,
    onMoveDishToMeal: PropTypes.func.isRequired,
    onNewDish: PropTypes.func.isRequired,
    onNewMealTemplate: PropTypes.func.isRequired,
    onTimeChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { confirm: false };
  }

  onCancel() {
    this.setState({ confirm: false, newDish: false });
  }

  onAddNewDish() {
    this.setState({ newDish: true });
  }

  onNewDish(dish) {
    this.setState({ newDish: false });
    this.props.onNewDish(this.props.meal._id, assign({}, dish, { position: this.props.meal.dishes ? this.props.meal.dishes.length : 0 }));
  }

  onTimeChange(time) {
    this.props.onTimeChange(this.props.meal, time);
  }

  render() {
    const { canEdit, meal, meal: { dishes }, meals, canDrop, connectDropTarget, isOver } = this.props;
    const { newDish } = this.state;

    return connectDropTarget(
      <div className="card meal">
        <div className="card-header bg-primary">
          {meal.name}

          {canEdit &&
            <MealMenu
              meal={meal}
              onMealDeleted={this.props.onMealDeleted}
              onNewMealTemplate={this.props.onNewMealTemplate}
            />
          }
        </div>
        <div className="card-block">
          <MealTime
            time={meal.takenAt()}
            onTimeChange={this.onTimeChange.bind(this)}/>

          { dishes && dishes.map(dish =>
            <DishItem
              canEdit={canEdit}
              key={dish.position}
              dish={dish}
              meals={meals}
              onCopyDishToMeal={this.props.onCopyDishToMeal}
              onDishDeleted={this.props.onDishDeleted}
              onDishUpdated={this.props.onDishUpdated}
              onMoveDishToMeal={this.props.onMoveDishToMeal}
            />
          )}

          {canDrop && isOver &&
            <div className="card card-inverse card-primary dish dish-drop-target">
              <div className="card-block">
                <FormattedMessage
                  id="planning.meal.moveDishHere"
                  description="Displayed as a drag&drop target in a meal to move a dish as the fisrt dish in this meal"
                  defaultMessage="Move here"
                />
              </div>
            </div>
          }

          {canEdit && !newDish &&
            <button
              className="btn btn-link text-muted"
              onClick={this.onAddNewDish.bind(this)}
            >
              <FormattedMessage
                id="planning.meal.addADish"
                description="Button to add a dish inside a meal"
                defaultMessage="Add a dish"
              />
            </button>
          }

          {newDish &&
            <DishForm
              onSubmit={this.onNewDish.bind(this)}
              onCancel={this.onCancel.bind(this)}
            />
          }
        </div>
      </div>
    );
  }
}

export default DropTarget(DragNDropItems.DISH, mealTarget, collect)(Meal);
