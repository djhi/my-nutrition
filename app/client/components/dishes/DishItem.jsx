import React, { Component, PropTypes } from 'react';
import DragNDropItems from '../../constants/dragndrop';
import { DragSource, DropTarget } from 'react-dnd';
import { flow } from 'lodash';
import DishForm from './DishForm';
import DishMenu from './DishMenu';
import { FormattedMessage } from 'react-intl';

const dishItemSource = {
  canDrag(props) {
    return props.canEdit;
  },
  beginDrag(props) {
    return {
      dish: props.dish,
    };
  },
};

const dishItemTarget = {
  canDrop(props, monitor) {
    // a dish cannot be dropped on itself
    const dishId = monitor.getItem().dish._id;
    return props.dish._id !== dishId;
  },

  drop(props, monitor) {
    const dishId = monitor.getItem().dish._id;
    props.onMoveDishToMeal(dishId, props.dish.mealId, props.dish.position);
  },
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

class DishItem extends Component {
  static propTypes = {
    canEdit: PropTypes.bool.isRequired,
    dish: PropTypes.object.isRequired,
    meals: PropTypes.array.isRequired,
    onCopyDishToMeal: PropTypes.func.isRequired,
    onDishDeleted: PropTypes.func.isRequired,
    onDishUpdated: PropTypes.func.isRequired,
    onMoveDishToMeal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
    };
  }

  onEdit() {
    if (!this.props.canEdit) {
      return;
    }

    this.setState({
      showForm: true,
    });
  }

  onCancelEdit(event) {
    event.stopPropagation();

    this.setState({
      showForm: false,
    });
  }

  onUpdate(dish) {
    this.setState({
      confirm: false,
      showForm: false,
    });

    this.props.onDishUpdated(dish);
  }

  renderView() {
    const { canEdit, dish, meals } = this.props;

    return (
      <div>
        {dish.portions} {dish.label}

        {canEdit &&
            <DishMenu
            dish={dish}
            meals={meals}
            onCopyDishToMeal={this.props.onCopyDishToMeal}
            onDishDeleted={this.props.onDishDeleted}
            onMoveDishToMeal={this.props.onMoveDishToMeal}
          />
        }

        <div className="text-muted">{dish.description}</div>
      </div>
    );
  }

  renderForm() {
    const { dish } = this.props;

    return (
      <DishForm
        dish={dish}
        onSubmit={ this.onUpdate.bind(this) }
        onCancel={ this.onCancelEdit.bind(this) }
      />
    );
  }

  render() {
    const { canDrop, connectDragSource, connectDropTarget, isDragging, isOver } = this.props;
    const { showForm } = this.state;
    const element = (
      <div>
        {canDrop && isOver &&
          <div
            className="card card-inverse card-primary dish dish-drop-target"
          >
            <div className="card-block">
              <FormattedMessage
                id="planning.dish.moveHere"
                description="Displayed as a drag&drop target in a meal to move a dish"
                defaultMessage="Move here"
              />
            </div>
          </div>
        }
        <div
          className="card dish"
          onClick={this.onEdit.bind(this)}
        >
          <div className="card-block">
            {!showForm && this.renderView()}
            {showForm && this.renderForm()}
          </div>
        </div>
      </div>
    );

    return connectDragSource(connectDropTarget(element));
  }
}

export default flow(
  DragSource(DragNDropItems.DISH, dishItemSource, collectSource),
  DropTarget(DragNDropItems.DISH, dishItemTarget, collectTarget),
)(DishItem);
