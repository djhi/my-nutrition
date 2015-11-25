/* global Email, Meteor */
export default function(userCollection) {
  return (senderId, email, token) => {
    const sender = userCollection.findOne(senderId);

    const text = `
Bonjour,

${sender.profile.name} vous invite à le coacher via Ma Nutrition. Cette application
 permet de gérer son planning nutritionnel et de se faire accompagner
 par un coach.

Pour activer votre compte, allez sur ${Meteor.settings.applicationSignUpUrl}/${token}.

A très vite !`;

    const html = `
<p>Bonjour,</p>

<p>
${sender.profile.name} vous invite à le coacher via Ma Nutrition. Cette application
 permet de gérer son planning nutritionnel et de se faire accompagner
 par un coach.
</p>

<p>Pour activer votre compte, allez sur <a href="${Meteor.settings.applicationSignUpUrl}/${token}">${Meteor.settings.applicationSignUpUrl}/${token}</a>.</p>

<p>A très vite !</p>`;

    Email.send({
      to: email,
      from: Meteor.settings.applicationEmail,
      subject: `${Meteor.settings.applicationName} - Activation de votre compte`,
      text,
      html,
    });
  };
}
