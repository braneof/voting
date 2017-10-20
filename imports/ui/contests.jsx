import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RankedChoice from './RankedChoice.jsx'
import BubbleChoice from './BubbleChoice.jsx'

export class RankedChoiceContest extends Component {
  constructor(props) {
    super(props);

    this.state = props.choices.reduce( (acc, choice) => {
      acc[choice] = "";
      return acc;
    }, {});

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    console.log(this.state)
    console.log(target.value)
    var rank = Number(target.value)
    if (target.value === "") {
      rank = ""
    }
    else if (Number.isInteger(rank)) {
      let maxRank = Object.keys(this.state).length
      if (rank > maxRank || rank < 1) {
        rank = this.state[name]
      }
    }
    else {
      return
    }
    this.setState({
      [name]: rank
    });
  }

   renderChoices() {
    return this.props.choices.map((choice) => (
      <RankedChoice key={choice} choice={choice} value={this.state[choice]}
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

const SimpleMajorityContest = (props) => {
  return <BubbleContest choices={props.choices} selectionLimit={1} />
}

const PickTwoContest = (props) => {
  return <BubbleContest choices={props.choices} selectionLimit={2} />
}

class BubbleContest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selections: []
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let newSelections;
    if (target.checked && this.props.selectionLimit === 1) {
      newSelections = [target.name]
    }
    else if (target.checked && this.state.selections.length >= this.props.selectionLimit) {
      return
    }
    else if (!target.checked) {
      newSelections = this.state.selections.filter( selection => selection !== target.name )
    }
    else {
      newSelections = [...this.state.selections, target.name]
    }
    
    this.setState({
      selections: newSelections
    });
  }

   renderChoices() {
    return this.props.choices.map((choice) => (
      <BubbleChoice key={choice} choice={choice} checked={this.state.selections.includes(choice)}
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
