/* global Meteor, Random, Roles */
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Dishes } from '../../../collections/dishes';
import { Meals } from '../../../collections/meals';
import { MealTemplates } from '../../../collections/mealTemplates';
import { MealTypeDefaults } from '../../../collections/mealTypes';

import { loadCoacheeFactory } from '../../actions/coachees';
import { setPlanningDate } from '../../actions/planning';
import { setTitle } from '../../actions/app';
import { loadMealTypeDefaultsFactory } from '../../actions/mealTypeDefaults';
import { loadMealTemplatesFactory, newMealTemplate, newMealFromTemplate } from '../../actions/mealTemplates';
import { deleteMealFactory, loadMealsFactory, newMealFactory, updateMealTimeFactory } from '../../actions/meals';
import { copyDishToMeal, deleteMealDishFactory, newMealDishFactory, moveDishToMeal, updateMealDishFactory } from '../../actions/dishes';
import { setUserPreferenceFactory } from '../../actions/profile';

import Planning from '../../components/Planning';

const today = moment().format('YYYY-MM-DD');

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    planningUser: state.coachees.current,
    planningUserId: state.router.params.userId || state.auth.user && state.auth.user._id,
    dateSelected: state.router.params.date || today,
    meals: state.meals.items,
    mealTemplates: state.mealTemplates.items,
    mealTypeDefaults: state.mealTypeDefaults.items,
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
    loadMealTypeDefaults: loadMealTypeDefaultsFactory(MealTypeDefaults),
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
