import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import AlbumSearchResult from './components/SearchResult/AlbumSearchResult';
import TrackSearchResult from './components/SearchResult/TrackSearchResult';
import AlbumPlaylist from './components/AlbumPlaylist/AlbumPlaylist';
import Player from './components/Player/Player';
import Search from './components/Search/Search';
import { Start } from './components/common/Start';
import './App.css';

@inject('songModel', 'albumModel')
@observer
class App extends React.Component {
  get background() {
    const src = this.backgroundSrc;

    if (src) {
      return <div className="background-image" style={{ backgroundImage: `url(${src})` }}></div>;
    }
  }

  get backgroundSrc() {
     if (this.props.albumModel.data) {
        return this.props.albumModel.data.cover_xl;
     } else if (this.props.songModel.data) {
         return this.props.songModel.data.album.cover_xl;
     }
     return null;
  }

  render() {
    return (
      <div className="player-container">
        <div className="top-layer-container">
          {this.background}
          <Switch>
            <Route path='/search/:type/:term' component={Search} />
            <Route component={Search} />
          </Switch>
          <Player />
        </div>
        <div className="content-container">
          <div id="message-box"></div>
          <Switch>
            <Route path='/search/artist/:term' component={({ match }) => <AlbumSearchResult match={match} />} />
            <Route path='/search/album/:term' component={({ match }) => <AlbumSearchResult match={match} />} />
            <Route path='/search/track/:term' component={({ match }) => <TrackSearchResult match={match} />} />
            <Route exact path='/album/:id' component={({ match }) => <AlbumPlaylist match={match} />} />
            <Route component={Start} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  songModel: PropTypes.object,
  albumModel: PropTypes.object
};

export default App;
