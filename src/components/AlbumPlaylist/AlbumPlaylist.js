import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Alert, Spin } from 'antd';
import { observer, inject } from 'mobx-react';

import { PlayIcon } from '../common/PlayIcon';
import './AlbumPlaylist.css';

@inject('albumModel')
@observer
export default class Playlist extends Component {
  componentDidMount() {
    this.props.albumModel.find(this.props.match.params.id);
  }

  get playlist() {
    const { data, loading } = this.props.albumModel;
    const { albumModel } = this.props;

    return (loading || data.error ? null
      : <div>
        <div className='avatar'>
          <Avatar shape='square' size={64} src={data.cover_small} />
          <h2>{data.title}</h2>
        </div>
        <div>
          {data.tracks && data.tracks.data.map(item => {
            return (
              <div key={item.id}>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <PlayIcon/>
                    }
                    title={item.title}
                    description={item.artist.name}
                  />
                  <div>{albumModel.getDuration(item.duration)}</div>
                </List.Item>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  get spinner() {
    const { loading } = this.props.albumModel;
    return loading ? <Spin className="spinner" size="large" /> : null;
  }

  get errorMessage() {
    const { error } = this.props.albumModel.data;
    return error ? <Alert message="Album does not exist" type="info" showIcon /> : null;
  }

  render() {
    console.log('RENDER!!!');

    return (
      <div className='playlist-container'>
        {this.spinner}
        {this.errorMessage}
        {this.playlist}
      </div>
    );
  }
}

Playlist.propTypes = {
  mediator: PropTypes.object,
  albumModel: PropTypes.object,
  match: PropTypes.any
};
