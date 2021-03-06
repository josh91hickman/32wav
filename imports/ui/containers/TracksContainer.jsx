import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import BootstrapPaginator from 'react-bootstrap-pagination';

//Components
import TracksList from '../components/TracksList.jsx';
import Track from '../components/Track.jsx';
import TracksCategories from '../components/TracksCategories';

class TracksContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      globalPlaying: false
    }

    this.globalPlayer = this.globalPlayer.bind(this);
  }
  renderTracks() {
    const allTracks      = this.props.tracks; 
    // const filteredTracks = allTracks.filter( (track) => {
    //   let genreFilter    = this.props.filters.genre,
    //       typeFilter  = this.props.filters.type;
        
    //   return this.checkFilter(track, genreFilter, typeFilter);
    //   });
    //filteredTracks = filteredTracks.filter(track => track.genre === this.props.genreFilter);
    return allTracks.map( (track) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = track.owner === currentUserId;
      const currentUser = Meteor.user();
      const source = track.fileSource;   
      return (
        <Track 
          key={track._id} 
          song={track}
          source={source}
          showPrivateButton={showPrivateButton}
          currentUser={currentUser}
          globalPlaying={this.globalPlayer.bind(this)}
          globalState={this.state}
        />
      );
    });
  }
  /**
   * Function to perform filtering of home track list -
   */
  checkFilter(track, genreFilter, typeFilter) {
    if (track.genre === genreFilter || genreFilter === "all") {
      if (typeFilter === "all" || typeFilter === track.licenseType ) {
        return track;
      }
    }        
  }
  globalPlayer(id) {
    this.setState({ globalPlaying: true,  track: id });
  }
  render() {
    const { pagination } = this.props;
    return (
      <div className="col s12 m12 l12 ">
        <div className="center-align">
          <BootstrapPaginator pagination={pagination} limit={2} />
        </div>
        <TracksList
          handleRenderTracks={this.renderTracks.bind(this)}
          pagination={pagination}
        />
        <div className="center-align">
          <BootstrapPaginator pagination={pagination} limit={2} />
        </div>
      </div>
    )
  }
}

TracksContainer.PropTypes = {
  tracks: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default createContainer( () => {
  const currentUser = Meteor.user();
  return {
    currentUser: currentUser,
  };
}, TracksContainer);
