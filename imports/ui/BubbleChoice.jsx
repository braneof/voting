import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd'

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
      <Checkbox checked={this.props.checked} 
      name={this.props.choice} onChange={this.handleInputChange}>
        {this.props.choice}
      </Checkbox>
    )
  }
}
 
BubbleChoice.propTypes = {
  choice: PropTypes.string.isRequired,
}

