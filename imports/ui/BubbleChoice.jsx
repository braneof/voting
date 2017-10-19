import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class BubbleChoice extends Component {
  render() {
    return (
      <li>{this.props.choice}</li>
    )
  }
}
 
BubbleChoice.propTypes = {
  choice: PropTypes.string.isRequired,
}

