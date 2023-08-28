import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errormsg: '',
    erroStatus: false,
  }

  renderUserName = () => {
    const {username, password} = this.state
    return (
      <>
        <label htmlFor="username" className="y">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          onChange={event => this.setState({username: event.target.value})}
          className="input"
          value={username}
        />
        <label htmlFor="password" className="y">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input"
          value={password}
          onChange={event => this.setState({password: event.target.value})}
        />
      </>
    )
  }

  successFunction = j => {
    const {history} = this.props

    Cookies.set('jwt_token', j, {
      expires: 30,
    })
    history.replace('/')
    console.log(history)
    this.setState({erroStatus: false})
  }

  submitted = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const jwtToken = await response.json()
      this.successFunction(jwtToken.jwt_token)
    } else {
      const jwtToken = await response.json()
      this.setState({errormsg: jwtToken.error_msg, erroStatus: true})
    }
  }

  render() {
    const {username, password, errormsg, erroStatus} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-card">
        <form onSubmit={this.submitted} className="form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="logo"
            className="logo"
          />
          {this.renderUserName()}
          <button type="submit" className="button">
            Login
          </button>
          {erroStatus && <p className="error">*{errormsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
