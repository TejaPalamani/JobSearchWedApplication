import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineHome, AiOutlineLogout} from 'react-icons/ai'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const logoutClicked = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav>
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
        alt="website logo"
        className="logo"
      />
      <div className="large">
        <div className="i">
          <Link to="/">
            <h4>HOME</h4>
          </Link>
          <Link to="/jobs">
            <h4>JOBS</h4>
          </Link>
        </div>
        <button type="button" className="button" onClick={logoutClicked}>
          Logout
        </button>
      </div>
      <div className="small">
        <Link to="/">
          <AiOutlineHome />
        </Link>
        <Link to="/jobs">
          <BsBriefcase />
        </Link>
        <AiOutlineLogout onClick={logoutClicked} />
      </div>
    </nav>
  )
}

export default withRouter(Header)
