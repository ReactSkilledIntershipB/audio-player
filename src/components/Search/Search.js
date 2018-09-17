import React, { Component } from 'react';
import { Input, Dropdown, Icon, Menu, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import './Search.css';

@inject('searchModel')
@observer
class Search extends Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    get dropdownMenu() {
        return (
            <Menu
                className='dropdown-menu'
                value={this.props.searchModel.filterName}
                onClick={this.onFilterClick}
                selectedKeys={[this.props.searchModel.filterName]}
            >
            <Menu.Item key="artist" value='artist'>
                Artist
            </Menu.Item>
            <Menu.Item key="album" value='album'>
                Album
            </Menu.Item>
            <Menu.Item key="track" value='track'>
                Track
            </Menu.Item>
        </Menu>
        );
    };

    get addonSearchIcon() {
        return (
            <Icon type="search" />
        );
    };

    onInputChange = e => {
      this.props.searchModel.term = e.target.value;
    }

    onFilterClick = e => {
      this.props.searchModel.filterName = e.item.props.value;
    }

    onSubmitClick = e => {
      e.preventDefault();
      const { term, filterName } = this.props.searchModel;
      if (term !== '') {
        this.props.searchModel.find(term, filterName);
        this.clearInput();
        this.props.history.push(`${filterName}`);
      }
    }

    clearInput = () => {
      this.props.searchModel.term = '';
    }

    render() {
      return (
        <form className='searcher-wrapper' onSubmit={this.onSubmitClick}>
          <Input
            placeholder="Find some music..."
            className="searcher-input"
            onChange={this.onInputChange}
            value={this.props.searchModel.term}
            addonAfter={this.addonSearchIcon}
          />
          <Dropdown
            className='dropdown'
            overlay={this.dropdownMenu}
          >
            <a className="ant-dropdown-link" href="#">
              <Icon type="down" />
            </a>
          </Dropdown>
          <Button
            type="primary"
            disabled={!this.props.searchModel.term}
            onClick={this.onSubmitClick}
          >
            Submit
          </Button>
        </form>
      );
    }
}

Search.propTypes = {
  searchModel: PropTypes.object,
  history: PropTypes.object
};

export default Search;
