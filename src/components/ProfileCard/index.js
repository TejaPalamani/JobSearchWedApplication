import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const profileStatus = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  error: 'ERROR',
}

class ProfileCard extends Component {
  state = {status: profileStatus.initial, finalData: {}}

  componentDidMount() {
    this.getProfileCardDetails()
  }

  successEvent = data => {
    const refinedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      bio: data.profile_details.short_bio,
    }

    this.setState({status: profileStatus.success, finalData: refinedData})
  }

  getProfileCardDetails = async () => {
    this.setState({status: profileStatus.in_progress})
    const profileApi = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken} `,
      },
    }
    const response = await fetch(profileApi, options)
    if (response.ok) {
      const data = await response.json()
      this.successEvent(data)
    } else {
      this.setState({status: profileStatus.error})
    }
  }

  renderingSuccessEvent = () => {
    const {finalData} = this.state
    const {name, profileImageUrl, bio} = finalData
    return (
      <div className="profile_card_bg">
        <img src={profileImageUrl} alt={name} className="profile" />
        <h1>{name}</h1>
        <p>{bio}</p>
      </div>
    )
  }

  renderingErrorEvent = () => (
    <div className="error_profile">
      <button
        type="button"
        className="button"
        onClick={() => this.getProfileCardDetails()}
      >
        Retry
      </button>
    </div>
  )

  renderingLoadingEvent = () => (
    <div className="error_profile" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  check = () => {
    const {status} = this.state
    switch (status) {
      case profileStatus.in_progress:
        return this.renderingLoadingEvent()
      case profileStatus.success:
        return this.renderingSuccessEvent()
      default:
        return this.renderingErrorEvent()
    }
  }

  render() {
    const {finalData, status} = this.state

    return <div>{this.check()}</div>
  }
}

export default ProfileCard
