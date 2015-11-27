# My-Nutrition
[![Build Status](https://travis-ci.org/djhi/my-nutrition.svg?branch=master)](https://travis-ci.org/djhi/my-nutrition)

A Meteor application using Webpack, React and Redux for nutritionists who coach people and people wanting to keep track of their nutrition.

![Nutritional Planning](https://sc-cdn.scaleengine.net/i/4699b5eefe616db4ceca84b4e3d33c49.png)

You can see the roadmap [here](./ROADMAP.md).

## Installation

Ensure you installed Meteor by following the [instructions](https://www.meteor.com/install), then run:
```
make install
```

This will copy the settings dist files in `/settings` with default values.

## Development

To start Webpack and Meteor, run:
```
make run-dev
```

The application will be available on `http://localhost:3000`.

Just wait for the message in the console indicating Meteor is running the app at the specified address.
Be aware that it can take some time on the first run as Meteor will install all needed packages.

## Debug

To debug server side code, make sure you installed `node-inspector` and run:
```
make run-debug
```

## Mongo

To access the mongo console, run:
```
make mongo
```

## Meteor commands

Execute any meteor command by running `met [COMMAND]`. For example:
```
met add react
```

## Deployment

Deployment is handled by [MUP](https://github.com/arunoda/meteor-up).

Configure MUP for your environments in `./settings/staging/mup.json` and `./settings/production/mup.json`.

Deploy with either `make deploy-staging` or `make deploy-prod`.

## License

**my-nutrition** is licensed under the MIT Licence, courtesy of @marmelab.
