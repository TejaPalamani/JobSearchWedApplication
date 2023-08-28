import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import JobCard from '../JobCard'
import Header from '../Header'
import ProfileCard from '../ProfileCard'
import FilterDetails from '../FilterDetails'

import './index.css'

const jobStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
  error: 'ERROR',
}

class Jobs extends Component {
  state = {
    employmentStatus: [],
    salaryStatus: '',
    searchInput: '',
    jobData: [],
    status: jobStatus.initial,
    searchInputTemp: '',
    jobDataLength: 60,
  }

  componentDidMount() {
    this.getAllProductDetails()
  }

  successRetrivingData = initialData => {
    const filteredData = initialData.jobs.map(data => ({
      companyLogUrl: data.company_logo_url,
      employmentType: data.employment_type,
      id: data.id,
      jobDescription: data.job_description,
      location: data.location,
      rating: data.rating,
      title: data.title,
      packagePerAnnum: data.package_per_annum,
    }))

    const jobLength = initialData.total

    this.setState({
      jobData: filteredData,
      status: jobStatus.success,
      jobDataLength: jobLength,
    })
  }

  getAllProductDetails = async () => {
    this.setState({status: jobStatus.in_progress})
    const {employmentStatus, salaryStatus, searchInput} = this.state
    const employmentApiCall = employmentStatus.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentApiCall}&minimum_package=${salaryStatus}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, option)
    if (response.ok) {
      const data = await response.json()
      this.successRetrivingData(data)
    } else {
      this.setState({status: jobStatus.error})
    }
  }

  employmentFunction = detail => {
    const {employmentStatus} = this.state
    if (employmentStatus.includes(detail)) {
      const filterDetails = employmentStatus.filter(each => each !== detail)
      this.setState(
        {employmentStatus: filterDetails},
        this.getAllProductDetails,
      )
    } else {
      this.setState(
        prev => ({
          employmentStatus: [...prev.employmentStatus, detail],
        }),
        this.getAllProductDetails,
      )
    }
  }

  salaryChangedFunction = detail => {
    this.setState({salaryStatus: detail.toString()}, this.getAllProductDetails)
  }

  renderLeftSideCard = () => (
    <div className="left_card">
      <ProfileCard />
      <hr />
      <FilterDetails
        employmentFunction={this.employmentFunction}
        salaryChangedFunction={this.salaryChangedFunction}
      />
    </div>
  )

  searchInputChanged = event => {
    this.setState({searchInputTemp: event.target.value})
  }

  searchInputSubmitted = () => {
    const {searchInputTemp} = this.state
    this.setState({searchInput: searchInputTemp}, this.getAllProductDetails)
  }

  jobDataEmptyFunction = () => (
    <div className="jobs_nojobs_view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderingLoaderFunction = () => (
    <div className="jobs_nojobs_view">
      <Loader type="ThreeDots" color="blue" width={50} height={100} />
    </div>
  )

  jobDataFetchedSuccess = () => {
    const {jobData} = this.state
    return (
      <ul>
        {jobData.map(each => (
          <JobCard jobDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  errorFunction = () => (
    <div className="jobs_nojobs_view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt=" failure view"
      />
      <h1>OOPS Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="button"
        onClick={() => this.getAllProductDetails()}
      >
        Retry
      </button>
    </div>
  )

  checkingAndUpdaingStatements = () => {
    const {jobData, status, jobDataLength} = this.state
    const dataLength = jobData.length
    if (jobDataLength === 0) {
      return this.jobDataEmptyFunction()
    }
    switch (status) {
      case jobStatus.in_progress:
        return this.renderingLoaderFunction()

      case jobStatus.success:
        return this.jobDataFetchedSuccess()

      default:
        return this.errorFunction()
    }
  }

  renderRightSideCard = () => {
    const {jobData} = this.state
    return (
      <>
        <div className="right_side">
          <div>
            <input
              type="search"
              placeholder="search"
              className="j"
              onChange={this.searchInputChanged}
            />

            <button
              type="button"
              data-testid="searchButton"
              onClick={this.searchInputSubmitted}
              className="p"
            >
              <BsSearch className="icon" />
            </button>
          </div>
          {this.checkingAndUpdaingStatements()}
        </div>
      </>
    )
  }

  render() {
    const {employmentStatus, salaryStatus, jobData} = this.state

    return (
      <>
        <Header />
        <div className="mainContainer">
          {this.renderLeftSideCard()}

          {this.renderRightSideCard()}
        </div>
      </>
    )
  }
}

export default Jobs
