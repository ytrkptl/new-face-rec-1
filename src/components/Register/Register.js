import React from 'react';
import Spinner from '../Spinner/Spinner';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      error: `Something went wrong. 
              Please try again.`,
      showError: false,
      showSpinner: false
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  onRegister = () => {
    this.setState({showSpinner: true})
    fetch(`${process.env.REACT_APP_ENDPOINT_URL}/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.userId && data.success === 'true') {
          this.saveAuthTokenInSession(data.token)
          fetch(`${process.env.REACT_APP_ENDPOINT_URL}/profile/${data.userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': data.token
            }
          })
          .then(resp => resp.json())
          .then(user => {
            if(user && user.email) {
              this.props.loadUser(user)
              this.props.onRouteChange('home');
            }
          })
        } else {
          throw Error();
        }
      })
      .catch(err => {
        if(err) {
          this.setState({showError: true, showSpinner: false})
        }
      })
  }

  render() {
    return (
      <article className="registerArticle">
        <main className="registerMain">
          <div className="registerMeasure">
            <fieldset id="sign_up" className="registerFieldset">
              <legend className="registerLegend">Register</legend>
              {
                this.state.showError && 
                <p className="registerErrorDisplay">{this.state.error}</p>
              }
              <div className="belowLegendDiv">
                <label className="belowLegendLabel" htmlFor="name">Name</label>
                <input
                  className="belowLegendInput"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter name here"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="belowLegendDiv">
                <label className="belowLegendLabel" htmlFor="email-address">Email</label>
                <input
                  className="belowLegendInput"
                  type="email"
                  name="email-address"
                  id="email-address"
                  placeholder="Enter email here"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="belowLegendDiv">
                <label className="belowLegendLabel" htmlFor="password">Password</label>
                <input
                  className="belowLegendInput"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="sshhh"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <Spinner showSpinner={this.state.showSpinner} />
            <div>
              <input
                onClick={this.onRegister}
                className="registerButton"
                type="submit"
                value="Register"
              />
            </div>
            <div className="belowRegisterButtonDiv">
              <span  onClick={() => this.props.onRouteChange('signin')} className="signinLinkInRegister">Sign In</span>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;