import {
  AiOutlineStar,
  AiOutlineCompass,
  AiOutlineShareAlt,
} from 'react-icons/ai'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const SimilarJobsCard = props => {
  const {similarDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarDetails
  console.log(similarDetails)
  return (
    <li className="tte" key={id}>
      <div>
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
        <h3>Description</h3>
        <p>{jobDescription}</p>
        <div className="indi_job_location">
          <div className="in">
            <AiOutlineCompass />
            <p>{location}</p>

            <BsBriefcase />

            <p>{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsCard
