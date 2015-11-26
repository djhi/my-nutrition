/* global beforeEach, describe, it, expect, sinon */
import createOAuthServiceConfigurationFactory from 'app/server/methods/createOAuthServiceConfiguration';

describe('server', () => {
  describe('methods', () => {
    describe('createOAuthServiceConfiguration', () => {
      it('should call upsert on the ServiceConfiguration collection for specified service', () => {
        const serviceConfigurationCollection = {
          upsert: sinon.spy(),
        };

        createOAuthServiceConfigurationFactory(serviceConfigurationCollection)('myService', {
          setting1: 'foo',
          setting2: 'bar',
        });

        expect(serviceConfigurationCollection.upsert).to.have.been.calledWith({
          service: 'myService',
        }, {
          $set: {
            setting1: 'foo',
            setting2: 'bar',
          },
        });
      });
    });
  });
});
