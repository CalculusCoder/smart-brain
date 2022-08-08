import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Particle from './Components/Particle';



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedin: false,
      user: {
        id: '',
          name: '', 
          email: '',
          entries: 0, 
          joined: ''
      }
    }
  }


  loadUser = (data) => {
    this.setState({user: {
          id: data.id,
          name: data.name, 
          email: data.email,
          entries: data.entries, 
          joined: data.joined
    }})
  }



//calculate where the box should be
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

//used in machine learning API to grab the face coordinates
  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  

//Input url event listener
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  

//submit button event listener
onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input}) 
  



   //Machine Learning API, Clarifai
const USER_ID = 'calculuscoder';
const PAT = '969c6355a68b4801839f006c72136f4e';
const APP_ID = 'my-first-application';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
const IMAGE_URL = this.state.input;

const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});
const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};
    console.log('click');
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result) {   //Update image entries through server.js and database
            fetch('https://pacific-island-76740.herokuapp.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                id: this.state.user.id
            })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries:count }))  //Update Entry count
            })
          
          }
          this.displayFaceBox(this.calculateFaceLocation(result))
        })
        .catch(error => console.log('error', error));
  }










  //Event listeners for nav bar and submission forms, to reroute to specefic part of page
  onRouteChange = (route) => {
    if (route === 'signout') {            
      this.setState({isSignedin: false})
    } else if (route === 'home') {
      this.setState({isSignedin: true})
    } else if (route === 'register') {
      this.setState({isSignedin: null})
    }
    this.setState({route: route})   
  }




  render() {
    //Main app components, renders specefic page using if else statement
    if (this.state.route === 'home') {
      return (
        <div className='App'>
      <Particle />
      <Navigation isSignedin={this.state.isSignedin} onRouteChange={this.onRouteChange} />
      <Logo />
      <Rank name={this.state.user.name} entries={this.state.user.entries} />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
      );
    } else if (this.state.route === 'signin') {
      return (
        <div className='App'>
        <Particle />
        <Navigation isSignedin={this.state.isSignedin} onRouteChange={this.onRouteChange} />
        <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        </div>
      );
    } else if (this.state.route === 'register') {
      return (
        <div className='App'>
        <Particle />
        <Navigation isSignedin={this.state.isSignedin} onRouteChange={this.onRouteChange} />
        <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        </div>
      );
      //When sign out is clicked, direct us to sign in page
    } else if (this.state.route === 'signout') {
      return (
        <div className='App'>
        <Particle />
        <Navigation isSignedin={this.state.isSignedin} onRouteChange={this.onRouteChange} />
        <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        </div>
      );
    }
  }
}
export default App;
