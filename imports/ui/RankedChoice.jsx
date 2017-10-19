import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RankedChoice extends Component {
  render() {
    return (
      <li>{this.props.choice}</li>
    )
  }
}
 
RankedChoice.propTypes = {
  choice: PropTypes.string.isRequired,
}

