import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class BubbleChoice extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.props.handleInputChange(event)
  }

  render() {
    return (
      <div className="contestChoice">
        <label>
          <input
            name={this.props.choice}
            type="checkbox"
            checked={this.props.checked}
            onChange={this.handleInputChange} /> {this.props.choice}
        </label>
        <br />
      </div>
    )
  }
}
 
BubbleChoice.propTypes = {
  choice: PropTypes.string.isRequired,
}

