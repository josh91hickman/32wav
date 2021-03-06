import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

// mongo collection
import Tracks from '../../api/Tracks/Tracks';

//components
import TracksList from '../components/TracksList.jsx';
import Track from '../components/Track.jsx';
import { ProfileHeader } from '../components/Profile/ProfileHeader.jsx';


class ProfileContainer extends Component {
   constructor(props) {
    super(props);

    this.state = {
      globalPlaying: false
    }

    this.globalPlayer = this.globalPlayer.bind(this);
  }
  componentDidMount() {

  }
  globalPlayer(id) {
    this.setState({ globalPlaying: true,  track: id });
  }
  renderSong() {
      const tracks      = this.props.userTracks;
      const currentUser = this.props.currentUser;
      // the case when the user hasn't uploaded anything
      if (!tracks.length) {
        if (!Meteor.user()) {
          return (
            <div className="center-align">
              <h4>Looks like {this.props.user[0].username} hasn't uploaded any tracks</h4>;
            </div>
          )
        }
        if (Meteor.user()._id === Meteor.userId()) {
          return (
            <div className="center-align">
              <h4>Looks like you have't uploaded any tracks</h4>;
            </div>
          )
        } else {
          return (
            <div className="center-align">
              <h4>Looks like {this.props.user[0].username} hasn't uploaded any tracks</h4>;
            </div>
          )
        }
      }
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
  render() {
    //<p>Member Since: <br />{ this.props.user[0].createdAt ? `${this.props.user[0].createdAt}` : '' }</p>
    const src = this.props.user[0] ? `${this.props.user[0].profile_img}` : undefined;
    function testImg(src){
      if (src === undefined) {
        return 'defaultAvatar.jpeg';
      }
      const reSized = src.replace('https://jahosh-meteor-files.s3-us-west-2', 'https://jahosh-meteor-files-resized.s3-us-west-1');
      return reSized;
    }
    const avatar = testImg(src);
    return (
      <div className="row">
        { this.props.loading ? <Blaze template="spinner" /> :
        <div>
          <ProfileHeader
            user={this.props.user}
            avatar={avatar}
            params={this.props.params} />
          <div className="col s12 m12 l10 offset-l1">
            <TracksList
              handleRenderTracks={this.renderSong.bind(this)}
            /> 
          </div>
        </div> 
        } 
      </div>
    );
  }
}

ProfileContainer.PropTypes = {
 userTracks: PropTypes.array.isRequired,
}

export default createContainer( (props) => {
  const username = props.params.username;
  const subscription = Meteor.subscribe('users.info', username);
  const loading = !subscription.ready();
  const userTracks = Tracks.find({userSlug: username }, { sort: { createdAt: -1 } }).fetch();
  const user = Meteor.users.find({slug: username }).fetch()

  console.log(username);
  console.log(userTracks);
  return {
   userTracks: userTracks,
   username: username,
   loading: loading,
   user: user,

  };
}, ProfileContainer);
