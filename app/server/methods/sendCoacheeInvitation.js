/* global Email, Meteor */
export default function(userCollection) {
  return (senderId, email, token) => {
    const sender = userCollection.findOne(senderId);

    const text = `
Bonjour,

${sender.profile.name} vous invite à utiliser Ma Nutrition. Cette application
 vous permet de gérer votre planning nutritionnel et de vous faire accompagner
 par votre coach.

Pour activer votre compte, allez sur ${Meteor.settings.applicationSignUpUrl}/${token} puis acceptez l'invitation de ${sender.profile.name}.

A très vite !`;

    const html = `
<p>Bonjour,</p>

<p>${sender.profile.name} vous invite à utiliser Ma Nutrition. Cette application
 vous permet de gérer votre planning nutritionnel et de vous faire accompagner
 par votre coach.</p>

<p>Pour activer votre compte, allez sur <a href="${Meteor.settings.applicationSignUpUrl}/${token}">${Meteor.settings.applicationSignUpUrl}/${token}</a> puis acceptez l'invitation de ${sender.profile.name}.</p>

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
