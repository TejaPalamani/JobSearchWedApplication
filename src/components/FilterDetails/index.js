import {Component} from 'react'
import './index.css'

const employmentDetails = [
  ['Full Time', 'FULLTIME'],
  ['Part Time', 'PARTTIME'],
  ['Freelance', 'FREELANCE'],
  ['Internship', 'INTERNSHIP'],
]

const salaryDetails = [
  [10, 1000000],
  [20, 2000000],
  [30, 3000000],
  [40, 4000000],
]

class FilterDetails extends Component {
  employentChanged = event => {
    const {employmentFunction} = this.props
    employmentFunction(event.target.value)
  }

  salaryChanged = event => {
    const {salaryChangedFunction} = this.props
    salaryChangedFunction(event.target.value)
  }

  renderSalaryType = () => (
    <ul className="ul">
      <h3>Salary Range</h3>
      {salaryDetails.map(each => (
        <li className="li">
          <input
            type="radio"
            value={each[1]}
            id={each[1]}
            name="group"
            onChange={this.salaryChanged}
          />
          <label htmlFor={each[1]}>{`${each[0]} LPA and above`}</label>
        </li>
      ))}
    </ul>
  )

  renderEmploymentType = () => (
    <ul className="ul">
      <h3>Type Of Employment</h3>
      {employmentDetails.map(each => (
        <li className="li">
          <input
            type="checkbox"
            value={each[1]}
            onChange={this.employentChanged}
            id={each[1]}
          />
          <label htmlFor={each[1]}>{each[0]}</label>
        </li>
      ))}
    </ul>
  )

  render() {
    return (
      <div className="filter_card">
        {this.renderEmploymentType()}
        <hr />
        {this.renderSalaryType()}
      </div>
    )
  }
}

export default FilterDetails
