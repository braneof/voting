import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RankedChoice from './RankedChoice.jsx'
import BubbleChoice from './BubbleChoice.jsx'

export class RankedChoiceContest extends Component {
  renderChoices() {
    return this.props.choices.map((choice) => (
      <RankedChoice key={choice} choice={choice} />
    ))
  }

  render() {
    return (
      <ul>
        {this.renderChoices()}
      </ul>
    )
  }
}

const SimpleMajorityContest = (props) => {
  return <BubbleContest choices={props.choices} />
}

const PickTwoContest = (props) => {
  return <BubbleContest choices={props.choices} />
}

class BubbleContest extends Component {
   renderChoices() {
    return this.props.choices.map((choice) => (
      <BubbleChoice key={choice} choice={choice} />
    ))
  }

  render() {
    return (
      <ul>
        {this.renderChoices()}
      </ul>
    )
  }
}

export { SimpleMajorityContest, PickTwoContest }

RankedChoiceContest.propTypes = {
  choices: PropTypes.array.isRequired,
}
SimpleMajorityContest.propTypes = {
  choices: PropTypes.array.isRequired,
}
PickTwoContest.propTypes = {
  choices: PropTypes.array.isRequired,
}
