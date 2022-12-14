import React from "react";
import 'tachyons';
import './Register.css';

class Register extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
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


    //Sending User info to servers when Registering in
    onSubmitSignIn = () => {
        fetch('https://pacific-island-76740.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        }).then(response => response.json())
        .then(user => {
            if (user.id) {     //Updating and loading user
                this.props.loadUser(user)
                this.props.onRouteChange('home');
            }
        })
    }


    onSubmitSignInEnter = (event) => {
        if(event.key === 'Enter'){
            fetch('https://pacific-island-76740.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
            })
            .then(response => response.json())
            .then(user => {
                if (user) {      //Check if user exists
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
          }
      }


    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                        <input onChange={this.onPasswordChange} onKeyPress={this.onSubmitSignInEnter} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div>
                        <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" type="submit" value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
    
}

export default Register;