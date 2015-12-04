import actionTypeBuilder from './actionTypeBuilder';

export const SET_TITLE = actionTypeBuilder.type('SET_TITLE');

export function setTitle(title) {
  return {
    type: SET_TITLE,
    title,
  };
}
