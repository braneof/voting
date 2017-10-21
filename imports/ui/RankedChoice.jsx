import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RankedChoice extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.props.handleInputChange(event)
  }

  render() {
    return (
      <span>
        <label>
          <input
            name={this.props.choice}
            type="number"
            value={this.props.value}
            onChange={this.handleInputChange} /> {this.props.choice}
        </label>
        <br />
      </span>
    )
  }
}
 
RankedChoice.propTypes = {
  choice: PropTypes.string.isRequired,
}
