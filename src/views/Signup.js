import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import './Login.css';
import LogoPNG from '../img/logo/Logo.png';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toLogin: false,
            name: "",
            address: "",
            email: "",
            password: "",
            phone: '',
            isChef: false,
            newuser: {
                id: '',
                name: '',
                address: '',
                email: '',
                phone: '',
                ischef: false,
                rating: 0,
                profilepictrue: 0x0,
                password: '',
                role: 0
            }
        }
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleIsChef = this.handleIsChef.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.checkUserCredentials = this.checkUserCredentials.bind(this);
        this.formPreventDefault = this.formPreventDefault.bind(this);
        this.toLoginview = this.toLoginview.bind(this);
    }

    ;

    async createUser() {
        this.setState({
            newuser: {
                id: 0,
                name: this.state.name,
                address: this.state.address,
                email: this.state.email,
                phone: this.state.phone,
                ischef: this.state.isChef,
                rating: 0,
                profilepictrue: 0x0,
                password: this.state.password,
                role: 0
            }
        })
    }

    async checkUserCredentials() {
        if (this.state.email === "" &&
            this.state.password === "" &&
            this.state.name === "" &&
            this.state.address === "") {
            swal("Empty field!", "Please, fill all the fields", "error");
        } else {
            if (this.state.email.includes('@')) {
                if (this.state.password.length >= 6) {
                    await this.createUser();
                    console.log(this.state.newuser);
                    //var url = 'https://momskitchenieti.herokuapp.com/session/user';
                    var url = 'https://momskitchenieti.herokuapp.com/session/user';
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.state.newuser)
                    })
                        .then(response => response.json())
                        .then(async data => {
                            console.log(data);
                            if (data) {
                                swal(
                                    'Cuenta creada satisfactoriamente!',
                                    'Sera redireccionado a la pagina de inicio de sesion',
                                    'success'
                                )
                            } else {
                                swal("Signup failed!", "try again later", "error");
                            }
                        })
                } else {
                    swal("Short password!", "The password should be at least 6 digits", "error");
                }
            } else {
                swal("Not an email!", "Please, type a correct email", "error");
            }
        }
    }

    formPreventDefault(e) {
        e.preventDefault();
    }

    handleNameChange(e) { this.setState({ name: e.target.value }) }
    handleAddressChange(e) { this.setState({ address: e.target.value }) }
    handleEmailChange(e) { this.setState({ email: e.target.value }) }
    handlePasswordChange(e) { this.setState({ password: e.target.value }) }
    handlePhoneChange(e) { this.setState({ phone: e.target.value }) }
    handleIsChef(e) { this.setState({ isChef: e.target.checked }) }
    toLoginview() { this.setState({ toLogin: true }) }

    render() {
        return (
            <div>
                {this.state.toLogin && <Redirect to='/login'></Redirect>}
                <Grid container component="main" className="root">
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className="image" />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className="text">
                            <img src={LogoPNG} className="logo" />
                            <Typography component="h1" variant="h5">
                                Crear Cuenta
                                </Typography>
                            <form className="form" noValidate onSubmit={this.formPreventDefault}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required type="text"
                                    fullWidth
                                    id="name"
                                    label="Nombre completo"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    value={this.state.name}
                                    onChange={this.handleNameChange}>
                                </TextField>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required type="text"
                                    fullWidth
                                    id="address"
                                    label="Direccion"
                                    name="direccion"
                                    autoComplete="address"
                                    autoFocus
                                    value={this.state.address} onChange={this.handleAddressChange}>
                                </TextField>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required type="text"
                                    fullWidth
                                    id="phone"
                                    label="Telefono"
                                    name="phone"
                                    autoComplete="phone"
                                    autoFocus
                                    value={this.state.phone}
                                    onChange={this.handlePhoneChange}>
                                </TextField>
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
                                    value={this.state.email} onChange={this.handleEmailChange}>
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
                                    control={<Checkbox value="cook" color="primary" />}
                                    label="Cuenta de cocinero" onChange={this.handleIsChef}
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
                                <Grid container className="backtologin">
                                    <Grid item xs>
                                        <label>Ya tienes una cuenta?</label>
                                        <Link href="#" variant="body2" onClick={this.toLoginview}>
                                            Ingresar
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
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
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
