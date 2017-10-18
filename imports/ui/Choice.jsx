import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Choice extends Component {
  render() {
    return (
      <li>{this.props.choice}</li>
    )
  }
}
 
Choice.propTypes = {
  choice: PropTypes.string.isRequired,
}

