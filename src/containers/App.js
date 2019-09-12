import React, { Component } from 'react';
import ParticlesComponent from '../components/Particles/Particles';
import Navigation from '../components/Navigation/Navigation';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import Modal from '../components/Modal/Modal';
import Profile from '../components/Profile/Profile';
import Footer from '../components/Footer/Footer';
import Lightning from '../components/Lightning/Lightning';
import * as filestack from 'filestack-js';

import './App.css';

const client = filestack.init(`${process.env.REACT_APP_FILESTACK}`);

// Create-React-App automatically detects and uses env varialbes
// prefixed with REACT_APP_ during local development
// The config vars for production are stored in heroku itself.

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  lightningOn: false,
  imageToChange: 'http://tachyons.io/img/logo.jpg',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    pet: '',
    age: 30
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_ENDPOINT_URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if(data && data.id) {
            fetch(`${process.env.REACT_APP_ENDPOINT_URL}/profile/${data.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
            .then(resp => resp.json())
            .then(user => {
              if(user && user.email) {
                this.loadUser(user)
                this.onRouteChange('home');
              }
            })
          }
        })
        .catch(console.log) 
    }
  }


  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      pet: data.pet,
      age: data.age
    }})
  }

  calculateFaceLocations = (data) => {
    if(data && data.outputs) {
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return data.outputs[0].data.regions.map(face => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }
      });
    }
    return;
  }

  displayFaceBox = (boxes) => {
    if (boxes) {
      this.setState({boxes: boxes});
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  saveAuthTokenInSession = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  removeAuthTokenFromSession = (token) => {
    window.sessionStorage.removeItem(token);
  }

  changeImageUrl = (source) => {
    this.setState({input: source})
    this.onButtonSubmit();
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch(`${process.env.REACT_APP_ENDPOINT_URL}/imageurl`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(`${process.env.REACT_APP_ENDPOINT_URL}/image`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocations(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
      // removeAuthTokenFromSession will remove the 
      // token from the browswer,
      // however we may also need to remove it from redis in backend
      // therefore the below fetch function, which removes it from
      // redis first and then call the removeAuthTokenFromSession func
      // above
      fetch(`${process.env.REACT_APP_ENDPOINT_URL}/signout`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(value => {
        if (value) {
          this.removeAuthTokenFromSession('token');
        }
      })
      .catch(error => console.log(error))
      return 
    } else if (route === 'home') {
      this.setState({isSignedIn: true, className: 'homeApp'})
    }
    this.setState({route: route});
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  showLightning = () => {
    this.setState(prevState => ({
      ...prevState,
      lightningOn: !prevState.lightningOn
    }))
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes, isProfileOpen, lightningOn, user } = this.state;
    return (
      <div className="App">
        {
          lightningOn &&
          <>
            <ParticlesComponent lightningOn={lightningOn} />
            <Lightning lightningOn={lightningOn} />
          </>
        }
        <Navigation 
          className="row1"
          isSignedIn={isSignedIn} 
          onRouteChange={this.onRouteChange} 
          toggleModal={this.toggleModal}
          imageToChange={this.state.imageToChange}
          showLightning= {this.showLightning}
        />
        { isProfileOpen &&
          <Modal>
            <Profile 
              isProfileOpen={isProfileOpen} 
              toggleModal={this.toggleModal} 
              loadUser={this.loadUser} 
              imageToChange={this.state.imageToChange}
              user={user}/>
          </Modal>
        }
        <div className="row2">
        { route === 'home'
          ? <div className="rankAndImageFormWrapper">
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                changeImageUrl={this.changeImageUrl}
                client={client}
              />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
          : 
            (
             route === 'signin'
             ? <Signin 
                 loadUser={this.loadUser} 
                 saveAuthTokenInSession={this.saveAuthTokenInSession}
                 onRouteChange={this.onRouteChange}/>
             : <Register className="row2" loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
        </div>
        <Footer className="row3"/>
      </div>
    );
  }
}

export default App;