import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {
  AiOutlineStar,
  AiOutlineCompass,
  AiOutlineShareAlt,
} from 'react-icons/ai'

import {BsBriefcase} from 'react-icons/bs'
import SimilarJobsCard from '../SimilarJobsCard'
import Header from '../Header'

import './index.css'

const jobStatus = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  error: 'ERROR',
}

class JobItemDetails extends Component {
  state = {jobDetails: {}, similarJobs: [], status: jobStatus.initial}

  componentDidMount() {
    this.detailJobApi()
  }

  onSuccessApiCall = data => {
    const job = data.job_details
    const updateSkills = job.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    }))

    const jobs = {
      companyLogoUrl: job.company_logo_url,
      companyWebsiteUrl: job.company_website_url,
      employmentType: job.employment_type,
      id: job.id,
      jobDescription: job.job_description,
      skills: updateSkills,
      lifeAtCompany: {
        description: job.life_at_company.description,
        imageUrl: job.life_at_company.image_url,
      },
      location: job.location,
      packagePerAnnum: job.package_per_annum,
      rating: job.rating,
      title: job.title,
    }
    const similarJob = data.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))

    this.setState({
      jobDetails: jobs,
      similarJobs: similarJob,
      status: jobStatus.success,
    })
  }

  detailJobApi = async () => {
    this.setState({status: jobStatus.in_progress})
    const {match} = this.props
    const {id} = match.params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      this.onSuccessApiCall(data)
    } else {
      this.setState({status: jobStatus.error})
    }
  }

  renderingSuccessFunction = () => {
    const {similarJobs, jobDetails} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    console.log(lifeAtCompany)

    return (
      <div className="job_detail_bg1">
        <div className="inner_card">
          <div className="t">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="icon"
            />
            <div className="icon_card">
              <h2>{title}</h2>
              <div className="t">
                <AiOutlineStar />

                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="indi_job_location">
            <div className="in">
              <AiOutlineCompass />
              <p>{location}</p>

              <BsBriefcase />

              <p>{employmentType}</p>
            </div>
            <h2>{packagePerAnnum}</h2>
          </div>
          <hr />
          <div className="indi_job_location">
            <h2>Description</h2>
            <div>
              <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
                VIST
              </a>
              <AiOutlineShareAlt />
            </div>
          </div>
          <p>{jobDescription}</p>
          <h2>Skills</h2>
          <ul className="wrap">
            {skills.map(skill => (
              <li key={skill.name} className="list_skills">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="skill_icon"
                />
                <h3>{skill.name}</h3>
              </li>
            ))}
          </ul>
          <div className="lifeAtCompany">
            <div>
              <h2>Life At Company</h2>
              <p>{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="com"
            />
          </div>
        </div>
        <div className="unList1">
          <h1>Similar Jobs</h1>
          <ul className="unList">
            {similarJobs.map(each => (
              <SimilarJobsCard similarDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderingLoaderFunction = () => (
    <div className="loader-container job_detail_bg1" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderingErrorFunction = () => (
    <div className="job_detail_bg1">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h2>OOPs Something went wrong</h2>
      <p>We cannot seems to find the page your looking for</p>
      <button
        type="button"
        className="button"
        onClick={() => this.detailJobApi()}
      >
        Retry
      </button>
    </div>
  )

  checkingAndRendering = () => {
    const {status} = this.state
    switch (status) {
      case jobStatus.success:
        return this.renderingSuccessFunction()
      case jobStatus.in_progress:
        return this.renderingLoaderFunction()

      default:
        return this.renderingErrorFunction()
    }
  }

  render() {
    const {similarJobs, jobDetails} = this.state

    return (
      <>
        <div className="job_detail_bg">
          <Header />
          {this.checkingAndRendering()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
