//import React from 'react';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import './Login.css';
import LogoPNG from '../img/logo/Logo.png';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            toSignup: false,
            email: "",
            password: ""
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.checkUserCredentials = this.checkUserCredentials.bind(this);
        this.formPreventDefault = this.formPreventDefault.bind(this);
        this.pruebaDatos = this.pruebaDatos.bind(this);
        this.toSignupView = this.toSignupView.bind(this);
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
                var url = 'https://momskitchenieti.herokuapp.com/session/' + this.state.email + '/' + this.state.password;
                //var url = 'https://momskitchenieti.herokuapp.com/session/' + this.state.email + '/' + this.state.password;
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

    async setCookies(data) {
        Cookies.set('cook', data)
    }

    formPreventDefault(e) {
        e.preventDefault();
    }

    pruebaDatos() {
        console.log(this.state.email);
        console.log(this.state.password);
    }

    Copyright() {
        return (
            <div className="copyright">
                <Box mt={5}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="https://material-ui.com/">
                            Mom's Kitchen LLC
                        </Link>{' '}
                        {'| '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </div>
        );
    }

    SignInSide() {
        return (
            <div>
                <Grid container component="main" className="root">
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className="image" />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className="text">
                            <img src={LogoPNG} className="logo" />
                            <Typography component="h1" variant="h5">
                                Iniciar Sesión
                                </Typography>
                            <form className="form" noValidate onSubmit={this.formPreventDefault}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required type="email"
                                    fullWidth
                                    id="email"
                                    label="Correo Electrónico"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={this.state.email} onChange={this.handleUsernameChange}>
                                                                
                                </TextField>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={this.state.password} onChange={this.handlePasswordChange}>
                                </TextField>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Recordarme"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className="submitButton"
                                    onClick={this.checkUserCredentials}>                                    
                                    Iniciar Sesión
                                </Button>
                                <Grid container className="createButton">
                                    <Grid item xs>
                                        <Link href="#" variant="body2" onClick={this.toSignupView}>
                                            Crear Cuenta
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>

                            {this.Copyright()}

                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }

    toSignupView(){
        this.setState({
            toSignup: true,
        })
    }

    render() {
        return (
            <div>
                {this.state.authenticated && <Redirect to='/Kitchen'></Redirect>}
                {this.state.toSignup && <Redirect to='/signup'></Redirect>}
                {this.SignInSide()}
            </div>
        )
    }
}

export default Login;


