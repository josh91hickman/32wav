import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Blaze from 'meteor/gadicc:blaze-react-component';
import Dropzone from 'react-dropzone';

// mongo collection
import { Songs } from '../../api/songs.js';
import { Mp3s } from '../../api/mp3s.js';

//react components
import Header from './Header.jsx';
import Song from './Song.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Navbar from './Navbar.jsx';
import Uploader from './Uploader.jsx';

//template helpers
import Upload from '../../photoupload.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }
  handleSubmit(event) {
    event.preventDefault();

    const files = ReactDOM.findDOMNode(this.refs.songlink).files[0];

     if (files !== undefined) {
      //alert('please select a file');
      const file  = ReactDOM.findDOMNode(this.refs.songlink).files[0].name;
    }

    const title = ReactDOM.findDOMNode(this.refs.songTitle).value.trim();
    
    Meteor.call('songs.insert', title, file);
    
    ReactDOM.findDOMNode(this.refs.songTitle).value = '';
    ReactDOM.findDOMNode(this.refs.songlink).value = '';
  }
  toggleHideCompleted() {

    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }
  renderSongs() {
    let filteredSongs = this.props.songs;
    if (this.state.hideCompleted) {
      filteredSongs = filteredSongs.filter( song => !song.checked);
    }
    return filteredSongs.map( (song) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = song.owner === currentUserId;
      const currentUser = this.props.currentUser;
      const source = song.fileSource;
     
      return (
        <Song 
          key={song._id} 
          song={song}
          source={song.fileSource}
          showPrivateButton={showPrivateButton}
          owner={currentUser}
        />
      );
    });
  }

  render() {
    return (
      <div className="row">
        <Navbar />
        <Header />
      <div className="col s12 m4 l3 sideNav">

            { this.props.currentUser ? 
              <div>
                <h4> Upload: </h4>
                <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                

                <input 
                  type="text"
                  id="songTitle"
                  ref="songTitle"
                  placeholder="enter beat name"
                />
                <i className="small material-icons">input</i>
                <input 
                  type="file"
                  ref="songlink"
                />
              </form>
               <Blaze template="imageUploader" />
               { /* <audio controls src={audioLink.mp3}></audio> */}
               <Uploader />
               <strong><span className="valign center" id="previewInfo"></span></strong>
                 <br />
                <audio className="previewPlayer" controls id="preview"></audio>
              </div> : ''
          }

        </div>
        <div className="col s12 m8 l9 mainBody">
          <h3 className="valign center recentlyUploaded"> Last 3 uploaded beats - </h3>
          <ul className="collection">
            {this.renderSongs()}
          </ul>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  songs: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
}

export default createContainer( () => {
  Meteor.subscribe('songs');
  Meteor.subscribe('mp3Details');
  return {
    songs: Songs.find({}, { limit: 3, sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Songs.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
    userUploads: Mp3s.find({ uploadedBy: Meteor.userId() }).fetch()
  };
}, App);