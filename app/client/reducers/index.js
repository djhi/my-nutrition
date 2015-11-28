import { combineReducers } from 'redux';
import { routeReducer as router } from 'redux-simple-router';
import app from './app';
import auth from './auth';
import coachees from './coachees';
import meals from './meals';
import mealTemplates from './mealTemplates';
import notification from './notification';

const rootReducer = combineReducers({
  app,
  auth,
  coachees,
  meals,
  mealTemplates,
  notification,
  router,
});

export default rootReducer;
