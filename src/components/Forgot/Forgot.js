import React from 'react';
import Spinner from '../Spinner/Spinner';
import './Forgot.css';

class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forgotEmail: '',
      resetId: '',
      error: `Something went wrong. 
              Please try again.`,
      showError: false,
      showSpinner: null,
      proceed: false,
      password: '',
      confirmNewPassword: '',
      passwordsMatch: false,
      stepNumber: 1
    }
  }

  onEmailChange = (event) => {
    this.setState({forgotEmail: event.target.value})
  }

  onResetIdChange = (event) => {
    this.setState({resetId: event.target.value})
  }

  onNewPasswordChange = (event) => {
    this.setState({newPassword: event.target.value})
  }

  onConfirmNewPasswordChange = (event) => {
    this.setState({confirmNewPassword: event.target.value})
  }

  onSubmitForgotStep1 = () => {
    this.setState({showSpinner: true});
    // fetch(`${process.env.REACT_APP_ENDPOINT_URL}/forgot`, {
    fetch(`http://localhost:3000/forgot`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        yourEmail: this.state.forgotEmail,
        name: 'name',
        message: 'message-message'
      })
    })
    .then(response => response.json())
    .then(data => {
      this.setState({showSpinner: false, stepNumber: 2})
    })
    .catch(err => {
      if(err) {
        this.setState({showError: true, showSpinner: false})
      }
    })
  }

  onSubmitResetId = () => {
    this.setState({showSpinner: true});
    // fetch(`${process.env.REACT_APP_ENDPOINT_URL}/forgot`, {
    fetch(`http://localhost:3000/reset`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        resetId: this.state.resetId,
        yourEmail: this.state.forgotEmail
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data==='Reset Id matches') {
        this.setState({showSpinner: false, stepNumber: 3, proceed: true, showError: false})
      }
      else if (data==='Reset Id did not match') {
        this.setState({showSpinner: false, stepNumber: 2, proceed: false, showError: true})
      }
    })
    .catch(err=>this.setState({showSpinner: false, stepNumber: 2, proceed: false, showError: true}))
  }

  onPasswordReset = () => {
    this.setState({showSpinner: true});    
    // fetch(`${process.env.REACT_APP_ENDPOINT_URL}/forgot`, {
    fetch(`http://localhost:3000/update-new-password`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        yourEmail: this.state.forgotEmail,
        newPassword: this.state.newPassword,
        confirmNewPassword: this.state.confirmNewPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      this.setState({showSpinner: false})
      if (data==='Password reset complete') {
        this.props.onRouteChange('signin')
      } else {
        this.setState({showSpinner: false, stepNumber: 3, showError: true, error: data})
      }
    })
    .catch(err=>{
      console.log(err)
      this.setState({showSpinner: false, stepNumber: 3, showError: true})
    })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="forgotArticle">
        <main className="forgotMain">
          <div className="forgotMeasure">
            <fieldset id="forgot" className="forgotFieldset">
              <legend className="forgotLegend">Reset Password</legend>
              <h4 className="steps">{`Step ${this.state.stepNumber} of 3`}</h4>
              {
                this.state.showError && 
                <p className="forgotErrorDisplay">{this.state.error}</p>
              }
              {
                this.state.showSpinner===null && this.state.proceed===false?
                <div className="belowLegendDivInForgot">
                  <label className="belowLegendLabelInForgot" htmlFor="forgot-email-address">Email</label>
                  <input
                    className="belowLegendInputInForgot"
                    type="email"
                    name="email-address"
                    id="forgot-email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                :
                this.state.showSpinner===false && this.state.proceed===false &&
                <div className="belowLegendDivInForgot">
                  <label className="belowLegendLabelInForgot" htmlFor="reset-id">Reset ID</label>
                  <input
                    className="belowLegendInputInForgot"
                    type="text"
                    name="reset-id"
                    id="reset-id"
                    onChange={this.onResetIdChange}
                  />
                </div>
              }
              {
                this.state.proceed &&
                <div className="belowLegendDivInForgot">
                  <label className="belowLegendLabelInForgot" htmlFor="new-password">New Password</label>
                  <input
                    className="belowLegendInputInForgot"
                    type="password"
                    name="new-password"
                    id="new-password"
                    onChange={this.onNewPasswordChange}
                  />
                </div>
              }
              {
                this.state.proceed &&
                <div className="belowLegendDivInForgot">
                  <label className="belowLegendLabelInForgot" htmlFor="confirm-new-password">Confirm New Password</label>
                  <input
                    className="belowLegendInputInForgot"
                    type="password"
                    name="confirm-new-password"
                    id="confirm-new-password"
                    onChange={this.onConfirmNewPasswordChange}
                  />
                </div>
              }
              {
                this.state.proceed &&
                <div>
                  <input
                    onClick={this.onPasswordReset}
                    className="forgotButtonInForgot"
                    type="submit"
                    value="Reset Password"
                  />
                </div>
              }
            </fieldset>
            <Spinner showSpinner={this.state.showSpinner} />
            <div>
              {
                this.state.showSpinner===null?
                <input
                  onClick={this.onSubmitForgotStep1}
                  className="forgotButtonInForgot"
                  type="submit"
                  value="Send Email"
                />
                :
                this.state.showSpinner===false && this.state.proceed===false &&
                <input
                  onClick={this.onSubmitResetId}
                  className="forgotButtonInForgot"
                  type="submit"
                  value="Submit Code"
                />
              }
            </div>
            <div className="belowForgotButtonDiv">
              <p  onClick={() => onRouteChange('signin')} className="registerLinkInForgot">Go Back to Sign In</p>
              <p  onClick={() => onRouteChange('register')} className="registerLinkInForgot">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Forgot;