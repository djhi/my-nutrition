/* global Mongo, SimpleSchema */
import findByTokenFactory from './invites/findByToken';

export const InviteSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  invitedUserId: {
    type: String,
    optional: true,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
  },
  sentAt: {
    type: Date,
  },
  token: {
    type: String,
  },
});

export const Invites = new Mongo.Collection('invites');
Invites.attachSchema(InviteSchema);

Invites.findByToken = findByTokenFactory(Invites);
