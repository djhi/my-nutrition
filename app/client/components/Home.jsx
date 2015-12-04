/* global Meteor */
import React from 'react';
import Fa from 'react-fa';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

const Home = () => (
  <div className="row">
    <div className="col-xs-12">
      <div className="jumbotron">
        <h1>
          <FormattedMessage
            id="home.welcome"
            description="Welcome title on home page"
            defaultMessage="Welcome on My Nutrition"
          />
        </h1>
        <p>
          <FormattedMessage
            id="home.signIn.description"
            description="Invite user to sign in"
            defaultMessage="Sign in to begin your nutritional planning"
          />
        </p>
        <p>
          <Link to="/sign-in" className="btn btn-primary btn-lg">
            <Fa name="user" />
            <FormattedMessage
              id="home.signIn"
              description="Button to sign in"
              defaultMessage="Sign in"
            />
          </Link>
          &nbsp;
          <Link to="/sign-up" className="btn btn-secondary btn-lg">
            <Fa name="key" />
            <FormattedMessage
              id="home.signUp"
              description="Button to sign up"
              defaultMessage="Sign up"
            />
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default Home;
