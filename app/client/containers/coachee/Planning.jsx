/* global Meteor, Random, Roles */
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Dishes } from 'app/collections/dishes';
import { Meals } from 'app/collections/meals';
import { MealTemplates } from 'app/collections/mealTemplates';

import { loadCoacheeFactory } from '../../actions/coachees';
import { setPlanningDate } from '../../actions/planning';
import { setTitle } from '../../actions/app';
import { loadMealTemplatesFactory, newMealTemplate, newMealFromTemplate } from '../../actions/mealTemplates';
import { deleteMealFactory, loadMealsFactory, newMealFactory, updateMealTimeFactory } from '../../actions/meals';
import { copyDishToMeal, deleteMealDishFactory, newMealDishFactory, moveDishToMeal, updateMealDishFactory } from '../../actions/dishes';
import { setUserPreferenceFactory } from '../../actions/profile';

import Planning from '../../components/Planning';

const today = moment().format('YYYY-MM-DD');

function mapStateToProps(state, props) {
  return {
    user: state.auth.user,
    planningUser: state.coachees.current,
    planningUserId: props.params.userId || state.auth.user && state.auth.user._id,
    dateSelected: props.params.date || today,
    meals: state.meals.items,
    mealTemplates: state.mealTemplates.items,
    ready: state.meals.ready,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    copyDishToMeal,
    deleteMeal: deleteMealFactory(Meals),
    deleteMealDish: deleteMealDishFactory(Dishes),
    loadCoachee: loadCoacheeFactory(Meteor.users),
    loadMeals: loadMealsFactory(Meals),
    loadMealTemplates: loadMealTemplatesFactory(MealTemplates),
    moveDishToMeal,
    newMeal: newMealFactory(Meals),
    newMealFromTemplate,
    newMealTemplate,
    newMealDish: newMealDishFactory(Dishes),
    setTitle,
    setUserPreference: setUserPreferenceFactory(Meteor.users),
    setPlanningDate,
    updateMealDish: updateMealDishFactory(Dishes),
    updateMealTime: updateMealTimeFactory(Meals),
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(Planning));
