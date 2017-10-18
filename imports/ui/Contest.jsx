import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Choice from './Choice.jsx'

export default class Contest extends Component {
  renderChoices() {
    return this.props.contest.choices.map((choice) => (
      <Choice key={choice} choice={choice} />
    ))
  }

  render() {
    return (
      <div className="contest">
        {this.props.contest.text}
        <ul>
          {this.renderChoices()}
        </ul>
      </div>
    )
  }
}
 
Contest.propTypes = {
  contest: PropTypes.object.isRequired,
}
