import './accounts';
import './api';
import './fixtures';
import './mail-url';
import './slingshot';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';

//containers
import App from '../../ui/components/Home/App.jsx';
import AppContainer from '../../ui/containers/AppContainer.jsx';
import MyAccountContainer from '../../ui/containers/MyAccountContainer.jsx';
// import BrowseContainer from '../../ui/containers/BrowseContainer.jsx';
// import ContactContainer from '../../ui/containers/ContactContainer.jsx';
// import UploadContainer from '../../ui/containers/UploadContainer.jsx';
// import ProfileContainer from '../../ui/containers/ProfileContainer.jsx';
// import TrackContainer from '../../ui/containers/TrackContainer.jsx';
// import PurchaseContainer from '../../ui/containers/PurchaseContainer.jsx';
// import SearchContainer from '../../ui/containers/SearchContainer.jsx';
// import MessagesContainer from '../../ui/containers/MessagesContainer.jsx';
// import EditTrackContainer from '../../ui/containers/EditTrackContainer.jsx';
// import EditTracksContainer from '../../ui/containers/EditTracksContainer.jsx';


// //pages
import { NotFound } from '../../ui/pages/NotFound.jsx';
// import { FAQ } from '../../ui/pages/FAQ.jsx';
// import { SignIn } from '../../ui/pages/SignIn.jsx';
// import { VerifyEmail } from '../../ui/pages/VerifyEmail.jsx';
// import { FileShare } from '../../ui/pages/FileShare.jsx';
// import { ResetPassword } from '../../ui/pages/ResetPassword';
// import Login from '../../ui/pages/Login';
// import Signup from '../../ui/pages/Signup/Signup';
// import RecoverPassword from '../../ui/pages/RecoverPassword/RecoverPassword';


const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {

    replace({
      pathname: '/signup',
      state: { nextPathName: nextState.location.pathname },
    });
    Bert.alert({
      type: 'signin',
      style: 'fixed-top',
      message: "Please sign-in to access that page",
      icon: 'fa-user'
    });
  }
};

const faqTitle = () => {
  document.title = "F.A.Q | 32wav ";
}

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={App} />
      <Route path="/myaccount" component={MyAccountContainer} onEnter={requireAuth} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);


Meteor.startup(() => {
  // render(renderRoutes(), document.getElementById('app'));
  ReactRouterSSR.Run(renderRoutes(), {
    rootElement: "app"
  });
});
