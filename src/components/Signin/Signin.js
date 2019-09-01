import React from 'react';
import './Signin.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch(`${process.env.REACT_APP_SIGN_IN_URL}`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.success === "true") {
          this.props.saveAuthTokenInSession(data.token)
          this.props.loadUser(data.user)
          this.props.onRouteChange('home');
        }
      })
      .catch(console.log)
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="signinArticle">
        <main className="signinMain">
          <div className="signinMeasure">
            <fieldset id="sign_up" className="signinFieldset">
              <legend className="signinLegend">Sign In</legend>
              <div className="belowLegendDivInSignin">
                <label className="belowLegendLabelInSignin" htmlFor="email-address">Email</label>
                <input
                  className="belowLegendInputInSignin"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="belowLegendDivInSignin">
                <label className="belowLegendLabelInSignin" htmlFor="password">Password</label>
                <input
                  className="belowLegendInputInSignin"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div>
              <input
                onClick={this.onSubmitSignIn}
                className="signinButtonInSignin"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="belowSigninButtonDiv">
              <p  onClick={() => onRouteChange('register')} className="registerLinkInSignin">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;