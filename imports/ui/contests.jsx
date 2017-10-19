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
  constructor(props) {
    super(props);

    this.state = props.choices.reduce( (acc, choice) => {
      acc[choice] = false;
      return acc;
    }, {});

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.checked
    });
  }

   renderChoices() {
    return this.props.choices.map((choice) => (
      <BubbleChoice key={choice} choice={choice} checked={this.state[choice]}
      handleInputChange={this.handleInputChange} />
    ))
  }

  render() {
    return (
      <div>
        {this.renderChoices()}
      </div>
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
