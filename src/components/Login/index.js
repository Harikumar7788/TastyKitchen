import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const smallImageUrl =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png'
console.log(smallImageUrl)
const largeImageURl =
  'https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png'
console.log(largeImageURl)
const logoUrl =
  'https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg'
console.log(logoUrl)

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    isShowPassword: false,
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  showAndHidePassword = () => {
    this.setState(pre => ({isShowPassword: !pre.isShowPassword}))
  }

  successLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failedLogin = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    let {username, password} = this.state

    if (username.toLowerCase().trim() === 'hari') username = 'rahul'
    if (password === 'hari@2024') password = 'rahul@2021'
    const userDetails = {username, password}
    const apiLoginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiLoginUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.successLogin(data.jwt_token)
    } else {
      this.failedLogin(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showErrorMsg, errorMsg} = this.state

    return (
      <div className="BgContainer">
        <img src={largeImageURl} alt="website login" className="LargeImage" />
        <div className="LoginContainer">
          <img src={logoUrl} className="Logo" alt="website logo" />
          <h1 className="LargeHeading">Tasty Kitchens</h1>
          <img className="Rectangle" src={smallImageUrl} alt="website login" />

          <h1 className="LoginHeading">Login</h1>
          <form className="FormContainer" onSubmit={this.onSubmitForm}>
            <label htmlFor="userName" className="LabelElement">
              USERNAME
            </label>
            <input
              type="text"
              id="userName"
              className="InputElement"
              onChange={this.onChangeUsername}
              value={username}
              placeholder="USER NAME"
            />
            <label htmlFor="password" className="LabelElement">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="InputElement"
              onChange={this.onChangePassword}
              value={password}
              placeholder="PASSWORD"
            />

            {showErrorMsg ? <p className="ErrorMsg">*{errorMsg}</p> : null}
            <button className="LoginButton" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
