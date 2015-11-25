/* global Meteor */
import React from 'react';
import { Link } from 'react-router';
import Fa from 'react-fa';

const Home = () => (
  <div className="row">
    <div className="col-xs-12">
      <div className="jumbotron">
        <h1>Bienvenue sur Ma Nutrition !</h1>
        <p>Pour commencer votre suivi nutritionnel, connectez-vous.</p>
        <p>
          <Link to="/sign-in" className="btn btn-primary btn-lg">
            <Fa name="user" /> Connexion
          </Link>
          &nbsp;
          <Link to="/sign-up" className="btn btn-secondary btn-lg">
            <Fa name="key" /> Créer votre compte
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default Home;
