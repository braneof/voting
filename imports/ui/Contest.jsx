import React from 'react'
import PropTypes from 'prop-types'
import { RankedChoiceContest, SimpleMajorityContest, PickTwoContest } from './contests'

const components = {
  rankedChoice: RankedChoiceContest,
  simpleMajority: SimpleMajorityContest,
  pickTwo: PickTwoContest
}

const Contest = (props) => {
  const SpecificContest = components[props.contest.contestType]
  return (
    <div className="contest">
      {props.contest.text}
      <SpecificContest choices={props.contest.choices} />
    </div>
  )
}

export default Contest

Contest.propTypes = {
  contest: PropTypes.object.isRequired,
}
