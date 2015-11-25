# My-Nutrition

A Meteor application using Webpack, React and Redux for nutritionists who coach people.

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
