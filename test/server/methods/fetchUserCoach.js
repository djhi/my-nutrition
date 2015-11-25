// /* global beforeEach, describe, it, expect, sinon */
// import fetchUserCoachFactory from '../../../app/server/methods/fetchUserCoach';
//
// describe('server', () => {
//   describe('methods', () => {
//     describe('fetchUserCoach', () => {
//       const userCollection = {
//         findOne: sinon.spy(),
//       };
//
//       beforeEach(() => {
//         userCollection.findOne.reset();
//       });
//
//       it('should call findOne on the user collection for specified user when supplied an id', () => {
//         fetchUserCoachFactory(userCollection)('fake_id');
//
//         expect(userCollection.findOne).to.have.been.calledWith('fake_id', { fields: { coachId: 1 }});
//       });
//
//       it('should not call findOne on the user collection for specified user when supplied a user object', () => {
//         fetchUserCoachFactory(userCollection)({ _id: 'dont_call_me'});
//
//         expect(userCollection.findOne).to.not.have.been.calledWith('dont_call_me', { fields: { coachId: 1 }});
//       });
//
//       it('should call findOne on the user collection for the coach when found in user', () => {
//         fetchUserCoachFactory(userCollection)({ _id: 'foo', coachId: 'coach_id'});
//
//         expect(userCollection.findOne).to.have.been.calledWith('coach_id');
//       });
//     });
//   });
// });
