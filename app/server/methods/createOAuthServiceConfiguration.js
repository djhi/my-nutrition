export default function createOAuthServiceConfiguration(serviceConfigurationCollection) {
  return (service, config) => {
    serviceConfigurationCollection.upsert({
      service: service,
    }, {
      $set: config,
    });
  };
}
