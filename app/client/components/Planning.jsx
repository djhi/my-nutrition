/* global Roles */
import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import { Link } from 'react-router';
import Meal from './meals/Meal';
import NewMealButton from './meals/NewMealButton';
import Notification from './Notification';
import PlanningSelector from './PlanningSelector';
import InviteCoachNotification from './InviteCoachNotification';

class Planning extends Component {
  static propTypes = {
    copyDishToMeal: PropTypes.func.isRequired,
    dateSelected: PropTypes.string.isRequired,
    deleteMeal: PropTypes.func.isRequired,
    deleteMealDish: PropTypes.func.isRequired,
    loadCoachee: PropTypes.func.isRequired,
    loadMeals: PropTypes.func.isRequired,
    loadMealTemplates: PropTypes.func.isRequired,
    meals: PropTypes.array.isRequired,
    mealTemplates: PropTypes.array.isRequired,
    moveDishToMeal: PropTypes.func.isRequired,
    newMeal: PropTypes.func.isRequired,
    newMealFromTemplate: PropTypes.func.isRequired,
    newMealTemplate: PropTypes.func.isRequired,
    newMealDish: PropTypes.func.isRequired,
    ready: PropTypes.bool,
    setPlanningDate: PropTypes.func.isRequired,
    setUserPreference: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    updateMealDish: PropTypes.func.isRequired,
    updateMealTime: PropTypes.func.isRequired,
    user: PropTypes.object,
    planningUser: PropTypes.object,
    planningUserId: PropTypes.string,
  }

  componentDidMount() {
    this.props.setTitle('Planning nutritionnel');

    this.props.loadMealTemplates();
    this.props.loadMeals(null, this.props.dateSelected);
  }

  componentWillUpdate(nextProps) {
    if (this.props.planningUserId !== nextProps.planningUserId && (this.props.user && nextProps.planningUserId !== this.props.user._id)) {
      this.props.loadMeals(nextProps.planningUserId, this.props.dateSelected);
      this.props.loadCoachee(nextProps.planningUserId);
    }

    if (this.props.dateSelected !== nextProps.dateSelected) {
      this.props.loadMeals(this.props.planningUserId, nextProps.dateSelected);
    }
  }

  onDateChange(date) {
    if (this.props.planningUserId !== this.props.user._id) {
      return this.props.setPlanningDate(date, this.props.planningUserId, this.props.planningUser.profile.name);
    }

    return this.props.setPlanningDate(date);
  }

  onNewMeal(type, time, name) {
    const defaultDate = moment(time);
    const date = moment(this.props.dateSelected).hour(defaultDate.hour()).minute(defaultDate.minute()).second(0).toDate();
    this.props.newMeal(type, name, date);
  }

  onNewMealFromTemplate(mealTemplateId) {
    this.props.newMealFromTemplate(mealTemplateId, this.props.dateSelected);
  }

  onMealTimeChange(meal, time) {
    const newDate = moment(time, 'HH:mm');
    const date = moment(meal.date).set('hour', newDate.hour()).set('minute', newDate.minute());

    this.props.updateMealTime(meal._id, date);
  }

  render() {
    const { dateSelected, ready, meals, mealTemplates, planningUser, planningUserId, setUserPreference, user } = this.props;
    const dateSelectedAsDate = moment(dateSelected, 'YYYY-MM-DD').toDate();
    const formattedDate = moment(dateSelected).format('LL');
    const canEdit = planningUserId === (user && user._id);
    const titlePrefix = !canEdit && planningUser ? <span><b>{planningUser && planningUser.profile.name}</b> - </span> : undefined;

    return (
        <div className="row">
          <div className="col-xs-12">
            <h2>
              {titlePrefix}<PlanningSelector
                dateSelected={dateSelectedAsDate}
                ready={ready}
                onDateChange={this.onDateChange.bind(this)}
              />
            </h2>
            {user && !user.coachId && Roles.userIsInRole(user._id, 'coachee') && (!user.profile.preferences || !user.profile.preferences.noCoach) &&
              <InviteCoachNotification
                setUserPreference={setUserPreference}
                userId={user._id}
              />
            }
          </div>
          <div className="col-xs-12">
            {canEdit &&
              <div className="col-xs-12 hidden-md-up">
                <NewMealButton
                  mealTemplates={mealTemplates}
                  onNewMealFromTemplate={this.onNewMealFromTemplate.bind(this)}
                />
                <hr />
              </div>
            }
            {meals.map(meal => (
                <Meal
                  canEdit={canEdit}
                  key={meal._id}
                  meal={meal}
                  meals={meals}
                  onCopyDishToMeal={this.props.copyDishToMeal}
                  onTimeChange={this.onMealTimeChange.bind(this)}
                  onNewDish={this.props.newMealDish}
                  onNewMealTemplate={this.props.newMealTemplate}
                  onDishDeleted={this.props.deleteMealDish}
                  onDishUpdated={this.props.updateMealDish}
                  onMealDeleted={this.props.deleteMeal}
                  onMoveDishToMeal={this.props.moveDishToMeal}
                />
            ))}
            {canEdit &&
              <div className="meal-action">
                <NewMealButton
                  mealTemplates={mealTemplates}
                  onNewMealFromTemplate={this.onNewMealFromTemplate.bind(this)}
                />
              </div>
            }
          </div>
        </div>
    );
  }
}

export default Planning;
