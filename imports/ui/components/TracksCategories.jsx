import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

// allows a user to filter based on categories
export default class TracksCategories extends Component {
   constructor(props){
    super(props)

    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.initMaterialize();
  }
  initMaterialize() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
     });
     $(document).ready(function() {
        $('select').material_select();
      }); 
  }
  handleSearch(e) {
    e.preventDefault();

    const { pagination } = this.props;

    let term = this.search.value.trim();
    
    pagination.filters( 
        {
        $or: [
          { title: { $regex: term, $options: 'i' } },
          { username: { $regex: term, $options: 'i' } },
        ],
      }
    );

    pagination.currentPage(1);

  }
  render() {
    return (
      <div className="row">
      <header>
        </header>
         <div className="stats">
          <h5 id="total-tracks">Total tracks: {this.props.pagination.totalItems()}</h5>
          <h5 className="stats">Search</h5>
          <div id="divider"></div>
        </div>
         <form className="hide-on-small-only" onSubmit={this.handleSearch}>
              <div className="input-field ">
                <input 
                  id="search" 
                  ref={ s => (this.search = s )}
                  onChange={this.handleSearch}
                  type="search" 
                  required 
                />
                <i className="material-icons">close</i>
              </div>
            </form>
      </div>
    );
  }
}


{/*<h5> Filters </h5>
  <div className="input-field col  s12 l6" id="genre">
    <select>
      <option value="all" defaultValue>All</option>
      <option value="rap">Rap</option>
      <option value="rnb">R&B</option>
    </select>
    <label>Genre</label>
  </div>
  <div className="input-field col s12 l6" id="type">
    <select>
      <option value="all" defaultValue>All</option>
      <option value="lease">Official</option>
      <option value="exclusive">Remake</option>
    </select>
    <label>Type</label>
  </div>*/}