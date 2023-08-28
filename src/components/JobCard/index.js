import {Link} from 'react-router-dom'
import {AiOutlineStar, AiOutlineCompass} from 'react-icons/ai'

import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
    packagePerAnnum,
  } = jobDetails

  return (
    <Link to={`jobs/${id}`} className="special">
      <li className="job_card">
        <div className="logo_card">
          <img
            src={companyLogUrl}
            alt="company logo"
            className="company_logo"
          />
          <div className="check">
            <h3>{title}</h3>
            <div className="rating_job_card">
              <AiOutlineStar className="h" />
              <p className="h">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job_card_location">
          <div className="f">
            <div className="rating_job_card">
              <AiOutlineCompass className="h" />
              <p className="h">{location}</p>
            </div>
            <div className="rating_job_card">
              <BsBriefcase className="h" />
              <p className="h">{employmentType}</p>
            </div>
          </div>
          <h2 className="gg">{`${packagePerAnnum}`}</h2>
        </div>
        <hr />
        <h2>Description</h2>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
