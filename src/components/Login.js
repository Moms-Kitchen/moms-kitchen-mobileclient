import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './login.css';
import swal from 'sweetalert';
import Cookies from 'js-cookie';

import { Button, Navbar, Nav, Form, FormControl} from 'react-bootstrap';


import NavBarCharlaito from './NavBar'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            email: "",
            password: ""
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.checkUserCredentials = this.checkUserCredentials.bind(this);
        this.formPreventDefault = this.formPreventDefault.bind(this);
    }



    handleUsernameChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    async checkUserCredentials() {
        if (this.state.email === "" && this.state.password === "") {
            swal("Empty field!", "Please, fill all the fields", "error");
        } else {
            if (this.state.email.includes('@')) {
                //var url = 'https://momskitchenieti.herokuapp.com/session/' + this.state.email + '/' + this.state.password;
                var url = 'https://momskitchenieti.herokuapp.com/session/' + this.state.email + '/' + this.state.password;
                fetch(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(async data => {
                        console.log(data);
                        if (data.email != null) {
                            await this.setCookies(data)
                            this.setState({ authenticated: true })                            
                        } else {
                            swal("Login failed!", "Wrong email or password", "error");
                        }
                    })
            } else {
                swal("Not an email!", "Please, type a correct email", "error");
            }
        }
    }

    async setCookies(data){
        Cookies.set('cook', data)
    }

    formPreventDefault(e){
        e.preventDefault();
    }

    vistaBotones(){
        return(

            <div>
                <Button variant="primary">Primary</Button>{' '}
                <Button variant="secondary">Secondary</Button>{' '}
                <Button variant="success">Success</Button>{' '}
                <Button variant="warning">Warning</Button>{' '}
                <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
                <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
                <Button variant="link">Link</Button>
            </div>
        );
    }

    vistaBarritaMenu(){
        return(
            <div>
            <NavBarCharlaito />

            </div>
        );

    }

    render() {
        return (
            <div>
                {this.vistaBarritaMenu()}
                <NavBarCharlaito />

                {this.state.authenticated && <Redirect to='/Kitchen'></Redirect>}
                <div className="loginClass generic">
                    <form onSubmit={this.formPreventDefault}>
                        <span>Ain't working yet, just click the login button</span>
                        <input className="loginUsernameClass" placeholder="Email" required type="email" value={this.state.email} onChange={this.handleUsernameChange}></input>
                        <input className="loginPasswordClass" placeholder="Password" required type="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                        <button className="loginButtonClass" onClick={this.checkUserCredentials}>Login</button>
                    </form>
                </div>
            {this.vistaBotones()}

            </div>
        );
    }
}

export default Login;