import React from 'react';
// import AvatarPicker from './AvatarPicker';
import './Profile.css';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.user.name,
			age: this.props.user.age,
			pet: this.props.user.pet,
			src: this.props.imageToChange
		}
	}

	onFormChange = (event) => {
		switch(event.target.name) {
			case 'user-name':
				this.setState({name: event.target.value})
				break;
			case 'user-age':
				this.setState({age: event.target.value})
				break;
			case 'user-pet':
				this.setState({pet: event.target.value})
				break;
			default:
				return;
		}
	}

	onProfileUpdate = (data) => {
		fetch(`${process.env.REACT_APP_PROFILE_URL_BEGINNING}/${this.props.user.id}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': window.sessionStorage.getItem('token')
			},
			body: JSON.stringify({ formInput: data})
		}).then(resp => {
			if(resp.status === 200 || resp.status === 304) {
				this.props.toggleModal();
				this.props.loadUser({...this.props.user, ...data});
			}
		}).catch(console.log)
	}

	render() {
		const { user } = this.props;
		const { name, age, pet } = this.state;
		return (
			<div className="profile-modal">
				<article className="responsive">
	        <main className="main">
	        	<div className="centerThatDiv">
		        	<img
					      src={this.state.src}
					      className="avatarImageInProfile" alt="avatar" />
				    </div>
	          <h1>{this.state.name}</h1>
	          <h4>{`Images Submitted: ${user.entries}`}</h4>
	          <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
	          <hr/>
	          <label className="labelForUsername" htmlFor="user-name">Name: </label>
	          <input
	          	onChange={this.onFormChange}
	            className="inputClasses"
	            placeholder={user.name}
	            type="text"
	            name="user-name"
	            id="name"
	          />
	          <label className="otherLabels" htmlFor="user-age">Age: </label>
	          <input
	          	onChange={this.onFormChange}
	            className="inputClasses"
	            placeholder={user.age}
	            type="text"
	            name="user-age"
	            id="age"
	          />
	          <label className="otherLabels" htmlFor="user-pet">Pet: </label>
	          <input
	          	onChange={this.onFormChange}
	            className="inputClasses"
	            placeholder={user.pet}
	            type="text"
	            name="user-pet"
	            id="pet"
	          />
	          <div className="saveAndCancelButtonsDiv">
	          	<button
	          		onClick={()=>this.onProfileUpdate({ name, age, pet })}
	          		className="saveButton">
	          		Save
	          	</button>
	          	<button 
	          		className="cancelButton"
	          		onClick={this.props.toggleModal}>
	          		Cancel
	          	</button>
	          </div>
	        </main>
	        <div className="modal-close" onClick={this.props.toggleModal}>&times;</div>
	      </article>
			</div>
		);
	}
}

export default Profile;