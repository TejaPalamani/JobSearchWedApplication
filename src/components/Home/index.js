import Header from '../Header'
import './index.css'

const Home = props => {
  const findJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div>
      <Header />
      <div className="home_bg">
        <div className="home_inner">
          <h1>Find The Job That Fits Your Life </h1>
          <p>
            Millions of people Searching jobs, Company, Reviews.find the job
            that fits your Abilities and Potential Millions of people Searching
            jobs, Company, Reviews.find the job that fits your Abilities and
            Potential Millions of people Searching jobs, Company, Reviews.find
            the job that fits your Abilities and Potential.
          </p>
          <button className="home_button" type="button" onClick={findJobs}>
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
