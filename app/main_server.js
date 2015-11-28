/* global AccountsEmail, Meteor, Roles, ServiceConfiguration */
import registerDishSecurity from './server/security/dishes';
import registerMealSecurity from './server/security/meals';
import registerMealTemplateSecurity from './server/security/mealTemplates';
import registerUserSecurity from './server/security/users';

import registerAuthPublications from './server/publications/auth';
import registerCoacheesPublications from './server/publications/coachees';
import registerMealPublications from './server/publications/meals';
import registerMealTemplatePublications from './server/publications/mealTemplates';

import registerAuthHooks from './server/hooks/accounts';
import registerDishHooks from './server/hooks/dishes';
import registerMealHooks from './server/hooks/meals';

import copyDishToMealFactory from './server/methods/meals/copyDishToMeal';
import checkUserHasAccessToUserPlanningFactory from './server/methods/user/checkUserHasAccessToUserPlanning';
import createOAuthServiceConfigurationFactory from './server/methods/createOAuthServiceConfiguration';
import createMealFromTemplateFactory from './server/methods/meals/createMealFromTemplate';
import createMealTemplateFactory from './server/methods/meals/createMealTemplate';
import getUserDataFactory from './server/methods/user/getUserData';
import incrementDishesPositionFactory from './server/methods/meals/incrementDishesPosition';
import initializeAccountFromInviteFactory from './server/methods/user/initializeAccountFromInvite';
import inviteCoachFactory from './server/methods/invites/inviteCoach';
import inviteCoacheeFactory from './server/methods/invites/inviteCoachee';
import moveDishToMealFactory from './server/methods/meals/moveDishToMeal';
import sendCoachInvitationFactory from './server/methods/invites/sendCoachInvitation';
import sendCoacheeInvitationFactory from './server/methods/invites/sendCoacheeInvitation';
import setAccountRoleFactory from './server/methods/user/setAccountRole';
import setUserCoachFactory from './server/methods/user/setUserCoach';
import updateMealDishesFactory from './server/methods/meals/updateMealDishes';

import registerDefaultsMealTemplates from './server/fixtures/registerDefaultsMealTemplates';

import { Dishes } from './collections/dishes';
import { Invites } from './collections/invites';
import { Meals } from './collections/meals';
import { MealTemplates } from './collections/mealTemplates';

const setAccountRole = setAccountRoleFactory(Roles);
const incrementDishesPosition = incrementDishesPositionFactory(Dishes);
const updateMealDishes = updateMealDishesFactory(Dishes, Meals);

registerDishSecurity(Dishes);
registerMealSecurity(Meals);
registerMealTemplateSecurity(MealTemplates);
registerUserSecurity(Meteor.users);

registerAuthHooks(MealTemplates, Invites, AccountsEmail.extract, setUserCoachFactory(Meteor.users));
registerDishHooks(Dishes, updateMealDishes);
registerMealHooks(Meals, Dishes);

registerAuthPublications(getUserDataFactory(Meteor.users));
registerCoacheesPublications(Meteor.users);
registerMealPublications(Meals, checkUserHasAccessToUserPlanningFactory(Meteor.users));
registerMealTemplatePublications(MealTemplates);

Meteor.methods({
  createMealFromTemplate: createMealFromTemplateFactory(Meals, Dishes, MealTemplates),
  createMealTemplate: createMealTemplateFactory(Meals, Dishes, MealTemplates),
  copyDishToMeal: copyDishToMealFactory(Dishes, incrementDishesPosition, updateMealDishes),
  moveDishToMeal: moveDishToMealFactory(Dishes, incrementDishesPosition, updateMealDishes),
  initializeAccountFromInvite: function initializeAccountFromInvite(token) {
    return initializeAccountFromInviteFactory(Invites, setAccountRole, setUserCoachFactory(Meteor.users))(this.userId, token);
  },
  inviteCoach: function inviteCoach(email) {
    return inviteCoachFactory(Invites, sendCoachInvitationFactory(Meteor.users))(this.userId, email);
  },
  inviteCoachee: function inviteCoachee(email) {
    return inviteCoacheeFactory(Invites, sendCoacheeInvitationFactory(Meteor.users))(this.userId, email);
  },
  setAccountAsCoach: function setAccountAsCoach() {
    return setAccountRole(this.userId, 'coach');
  },
  setAccountAsCoachee: function setAccountAsCoachee() {
    return setAccountRole(this.userId, 'coachee');
  },
});

Meteor.startup(() => {
  const createOAuthServiceConfiguration = createOAuthServiceConfigurationFactory(ServiceConfiguration.configurations);

  if (Meteor.settings.google) {
    if (!Meteor.settings.google.clientId) {
      console.log('Invalid clientId for google oauth in settings');
    }

    if (!Meteor.settings.google.secret) {
      console.log('Invalid secret for google oauth in settings');
    }

    createOAuthServiceConfiguration('google', {
      clientId: Meteor.settings.google.clientId,
      secret: Meteor.settings.google.secret,
    });
  }

  if (Meteor.settings.facebook) {
    if (!Meteor.settings.facebook.clientId) {
      console.log('Invalid clientId for facebook oauth in settings');
    }

    if (!Meteor.settings.facebook.secret) {
      console.log('Invalid secret for facebook oauth in settings');
    }

    createOAuthServiceConfiguration('facebook', {
      appId: Meteor.settings.facebook.appId,
      secret: Meteor.settings.facebook.secret,
    });
  }

  registerDefaultsMealTemplates(MealTemplates, Meteor.users);
});
