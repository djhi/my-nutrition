/* eslint no-unused-expressions: 0 */
/* global Accounts, beforeEach, describe, it, expect, sinon */
import registerAccountsHooks from '../../../app/server/hooks/accounts';

describe('server', () => {
  describe('hooks', () => {
    describe('registerAccountsHooks', () => {
      const forEach = sinon.stub().yields({
        _id: 'wrong',
        foo: 'bar',
      });

      const mealTypeDefaultCollection = {
        find: sinon.stub().returns({
          forEach: forEach,
        }),
        insert: sinon.stub(),
      };

      const inviteCollection = {
        findOne: sinon.stub(),
      }

      const determineEmail = sinon.stub();
      const setUserCoach = sinon.stub(),

      beforeEach(() => {
        Accounts.onCreateUser.reset();
        forEach.reset();
        mealTypeDefaultCollection.find.reset();
        mealTypeDefaultCollection.insert.reset();
        inviteCollection.findOne.reset();
        determineEmail.reset();
        setUserCoach.reset();
      });

      it('should call Accounts.onCreateUser with correct parameters', () => {
        registerAccountsHooks();

        expect(Accounts.onCreateUser).to.have.been.calledWith(sinon.match.func);
      });

      it('should find meal types defaults', () => {
        registerAccountsHooks(mealTypeDefaultCollection, inviteCollection, determineEmail, setUserCoach);
        const call = Accounts.onCreateUser.getCall(0);
        call.args[0]({}, {
          _id: 'fake_id',
        });

        expect(mealTypeDefaultCollection.find).to.have.been.calledWith({
          userId: {
            $exists: false,
          },
        });
      });

      it('should insert meal types defaults for specified user', () => {
        registerAccountsHooks(mealTypeDefaultCollection, inviteCollection, determineEmail, setUserCoach);
        const call = Accounts.onCreateUser.getCall(0);
        call.args[0]({}, {
          _id: 'fake_id',
        });

        expect(mealTypeDefaultCollection.insert).to.have.been.calledWith({
          foo: 'bar',
          userId: 'fake_id',
        });
      });

      it('should return the passed user without profile if option does not contain one', () => {
        registerAccountsHooks(mealTypeDefaultCollection, inviteCollection, determineEmail, setUserCoach);
        const call = Accounts.onCreateUser.getCall(0);
        const result = call.args[0]({}, {
          _id: 'fake_id',
        });

        expect(result).to.deep.equal({
          _id: 'fake_id',
        });
      });

      it('should return the passed user with its profile if option contains one', () => {
        registerAccountsHooks(mealTypeDefaultCollection, inviteCollection, determineEmail, setUserCoach);
        const call = Accounts.onCreateUser.getCall(0);
        const result = call.args[0]({
          profile: 'foo',
        }, {
          _id: 'fake_id',
        });

        expect(result).to.deep.equal({
          _id: 'fake_id',
          profile: 'foo',
        });
      });
    });
  });
});
