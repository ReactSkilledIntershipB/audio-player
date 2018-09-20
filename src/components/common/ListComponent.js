import React from 'react';
import PropTypes from 'prop-types';
import FadeIn from 'react-fade-in';

import { PlayIcon } from './PlayIcon';

import './Common.css';
import { ResultsMessage } from './ResultsMessage';

export class ListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.ui = new ListUi();
  }

  get resultMessage() {
    return this.props.data.length === 0 ? <ResultsMessage /> : null;
  }

  get list() {
    if (this.props.data.length === 0) {
       return null;
    } else {
      return (
        <FadeIn>
          <div className="playlist-container">
            <div className="list-column-container">
              <h2 className="list-column-title">{this.props.heading}</h2>
              {this.props.data.map(item => {
                return (
                  <div key={item.id}>
                    <div className="list-column-item-content">
                      <PlayIcon songId={item.id} />
                      <div className="list-column-item-content-heading">
                        <p>{`${item.artist.name} - ${item.title}`}</p>
                        {item.album && <p>{item.album.title}</p>}
                      </div>
                      <p>{this.ui.getDuration(item.duration)}</p>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
         {this.resultMessage}
         {this.list}
      </React.Fragment>
    );
  }
};

ListComponent.propTypes = {
    heading: PropTypes.string,
    getButtonType: PropTypes.func,
    handleClick: PropTypes.func,
    data: PropTypes.array,
    avatar: PropTypes.string
};

class ListUi {
    getDuration = (duration) => {
        const durationMin = Math.floor(duration / 60);
        const durationSec = duration % 60;
        const formattedDurationSec = this.formatNumber(durationSec);
        return `${durationMin}:${formattedDurationSec}`;
      }

      formatNumber = (num) => {
        if (num < 10) {
          return `0${num}`;
        } else {
          return num;
        }
      }

    getDescription(author, album) {
        return `${author} - ${album}`;
    }
}
