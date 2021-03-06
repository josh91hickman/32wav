import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import TracksList from '../components/TracksList.jsx';

// mongo collection
import Tracks from '../../api/Tracks/Tracks';
import Track from '../components/Track.jsx';

class SearchContainer extends Component {
   constructor(props) {
    super(props);
    this.state = {
      globalPlaying: false
    }
    this.globalPlayer = this.globalPlayer.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  globalPlayer(id) {
    this.setState({ globalPlaying: true,  track: id });
  }
  componentDidMount() {

    const term = this.props.params.term;
    // browserHistory.push(`${term}`);
    // console.log(this.props);
  }
  renderSongs() {
      const tracks      = this.props.tracks;
      const currentUser = this.props.currentUser;
     return tracks.map( (track) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = track.owner === currentUserId;
        return (
          <Track 
            key={track._id} 
            song={track}
            source={track.fileSource}
            showPrivateButton={showPrivateButton}
            currentUser={currentUser}
            globalPlaying={this.globalPlayer.bind(this)}
            globalState={this.state}
          />
        );
     });
  }
  renderUsers() {
    const users = this.props.users;
    const userId = Meteor.user() ? Meteor.user()._id : '';
    const foundUsers = users.filter( (user) => {

      if (user._id === userId) {
        return;
      }
    
      return user;
    });
    return foundUsers.map( (user) => {
      return (
          <li className="collection-item avatar" key={user._id}>
          <div className="float-right">
            <img src={user.profile_img} id="small-avatar" alt="" className="circle" />
          </div>
            <Link to={user.username} className="track-link"><p className="songTitle">{user.username}</p></Link>
          </li>
      );
    });
  }
  handleSearch(e) {
    e.preventDefault();
    let term = this.search.value.trim();
    browserHistory.push(`search/${term}`);
  }
  render() {
    return (
      <div className="row">
       <div className="col l10 offset-l1 s10 offset-s1">
        { this.props.loading ? <Blaze template="spinner" /> :
          <div>
            <div className="center-align">
              <h1 className="no-margin-top">Search</h1>
              search results found: { this.props.tracks.length } <br />
              users found: {this.props.users.length - 1 }  
            </div> 
         
            <form className="hide-on-small-only" onSubmit={this.handleSearch}>
              <div className="input-field ">
                <input
                  id="search"
                  ref={s => (this.search = s)}
                  type="search"
                  required
                />
                <i className="material-icons">close</i>
              </div>
            </form>
            <TracksList
              handleRenderTracks={this.renderSongs.bind(this)}
            />
          </div> 
        }
        </div>
      </div>
    );
  }
}

export default createContainer( (props) => {
  const search = props.params.term;
  const subscription = Meteor.subscribe('Tracks.search', search);
  const loading = !subscription.ready();
  const tracks = Tracks.find({}).fetch();
  const users = Meteor.users.find({}).fetch();
  return {
   loading: loading,
   tracks: tracks,
   users: users,
  };
}, SearchContainer);


   // <ul className="collection">
            //   { this.renderUsers() }
            // </ul>