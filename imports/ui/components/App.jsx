import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router';

//react components
import Header from './Header.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  
  }
  render() {
    return (
      <div className="row">
        <div>
          <Header />
          <div className="row" id="home-body">
            <div className="col s12 m12 l10 offset-l1 center-align home-content">
              <p className="promo-caption flow-text" id="headline">32wav.io</p>
              <p className="flow-text tagline">
                audio instrumental marketplace
              </p>
            </div>
            <div className="col s12 m12 l10 offset-l1 center-align" id="signup-heading">
              <Link className="waves-effect waves-light btn-large black" id="signup-btn" to="/signin">SIGN UP FOR FREE</Link>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m12 l10 offset-l1" id="home-info">
             <div className="row">
              <div className="col s4 center-align">
                <i className="large material-icons">verified_user</i>
                < br />
                <h5>verified producers</h5> <br />
                buy tracks from your favorite producers
              </div>

              <div className="col s4 center-align">
                <i className="large material-icons">queue_music</i>
                <br />
                <h5>get your tracks heard</h5>
                <br />
                upload your tracks once to be streamed by everyone
              </div>

              <div className="col s4 center-align">
                <i className="large material-icons">shopping_cart</i>
                <br />
                <h5>sell your music</h5>
                <br />
                payments securely handled by paypal            
              </div>
              </div>
            </div>
          </div>
        </div>        
      </div>
    );
  }
}

