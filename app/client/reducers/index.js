import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import app from './app';
import auth from './auth';
import coachees from './coachees';
import meals from './meals';
import mealTemplates from './mealTemplates';
import mealTypeDefaults from './mealTypeDefaults';
import notification from './notification';

const rootReducer = combineReducers({
  app,
  auth,
  coachees,
  meals,
  mealTemplates,
  mealTypeDefaults,
  notification,
  router,
});

export default rootReducer;
