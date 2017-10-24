import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RankedChoice from './RankedChoice.jsx'
import BubbleChoice from './BubbleChoice.jsx'

export class RankedChoiceContest extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    console.log(this.props.votes)
    console.log(target.value)
    var rank = Number(target.value)
    if (target.value === "") {
      rank = ""
    }
    else if (Number.isInteger(rank)) {
      let maxRank = Object.keys(this.props.choices).length
      if (rank > maxRank || rank < 1 || Object.values(this.props.votes).includes(rank)) {
        rank = this.props.votes[name]
      }
    }
    else {
      return
    }

    this.props.onChange({ ...this.props.votes, [name]: rank })
  }

   renderChoices() {
    return this.props.choices.map((choice) => { 
      const val = this.props.votes[choice] ? this.props.votes[choice] : ""
      return (
      <RankedChoice key={choice} choice={choice} value={val}
      handleInputChange={this.handleInputChange} />
    )})
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
  const votes = props.votes.selections != null ? props.votes : { selections: [] }
  return <BubbleContest choices={props.choices} selectionLimit={1} votes={votes} onChange={props.onChange} />
}

const PickTwoContest = (props) => {
  const votes = props.votes.selections != null ? props.votes : { selections: [] }
  return <BubbleContest choices={props.choices} selectionLimit={2} votes={votes} onChange={props.onChange} />
}

class BubbleContest extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let newSelections;
    if (target.checked && this.props.selectionLimit === 1) {
      newSelections = [target.name]
    }
    else if (target.checked && this.props.votes.selections.length >= this.props.selectionLimit) {
      return
    }
    else if (!target.checked) {
      newSelections = this.props.votes.selections.filter( selection => selection !== target.name )
    }
    else {
      newSelections = [...this.props.votes.selections, target.name]
    }
    
    this.props.onChange({
      selections: newSelections
    });
  }

   renderChoices() {
    return this.props.choices.map((choice) => (
      <BubbleChoice key={choice} choice={choice} checked={this.props.votes.selections.includes(choice)}
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
  votes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
SimpleMajorityContest.propTypes = {
  choices: PropTypes.array.isRequired,
  votes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
PickTwoContest.propTypes = {
  choices: PropTypes.array.isRequired,
  votes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
BubbleContest.propTypes = {
  choices: PropTypes.array.isRequired,
  votes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  selectionLimit: PropTypes.number.isRequired,
}
