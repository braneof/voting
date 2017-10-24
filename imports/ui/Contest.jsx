import React from 'react'
import PropTypes from 'prop-types'
import components from '../util/contestMap.jsx'

const Contest = (props) => {
  let headerText = ""
  if (props.contest.description != null) {
    let description = props.contest.description
    headerText = (
      <div className="contestHeader">
        <div className="contestTitle">
          {description.title}
        </div>
        <div className="contestType">
          {description.type}
        </div>
        <div className="contestInstructions">
          {description.instructions}
        </div>
      </div>
    )
  }
  let handleChange = (newVotes) => {
    props.onChange(props.contest._id, newVotes)
  }

  const SpecificContest = components[props.contest.contestType]
  return (
    <div className="contest">
      {headerText}
      <form>
        <SpecificContest choices={props.contest.choices} votes={props.votes} onChange={handleChange}/>
      </form>
    </div>
  )
}

export default Contest

Contest.propTypes = {
  contest: PropTypes.object.isRequired,
  votes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
