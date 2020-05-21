import React, { Component, createRef } from 'react';
import { Navbar, Nav, NavDropdown, Col } from 'react-bootstrap';
//import { StickyContainer, Sticky } from 'react-sticky';
import AppBar from '@material-ui/core/AppBar';
import Cookies from 'js-cookie';

//import Sticky from '../props/Sticky';
import './NavBar.css';
import LogoImage from '../img/logo/Logo.png';
import NameImage from '../img/logo/Name.png';

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: true,
            id: "",
            name: "",
            email: "",
            userType: "",
            address: "",
            phone: "",
            rating: "",
            profilePicture: "",
            role: "",
            top: '0px',
        }
    }

    componentWillUnmount() {
        window.onscroll = null;
    }

    componentDidMount() {
        window.onscroll = (e) => {
            if (window.pageYOffset === 0) {
                this.setState({
                    position: 'static',
                })
            } else if (window.pageYOffset >= 100) {
                this.setState({
                    position: 'sticky',
                })
            }
            else {
                console.log("scrolling..." + window.pageYOffset);
            }
        }

        const session = Cookies.getJSON('cook');

        if (session.role == 1) {
            this.setState({ userType: "Cocinero" });
        } else {
            this.setState({ userType: "Consumidor" });
        }

        this.setState({ id: session.id });
        this.setState({ name: session.name });
        this.setState({ email: session.email });

        this.setState({ address: session.address });
        this.setState({ phone: session.phone });
        this.setState({ rating: session.rating });
        this.setState({ profilePicture: session.profilePicture });
        this.setState({ role: session.role });
    }


    render() {
        /*<AppBar position="sticky"> */
        return (
            <div className="navBar boxShadowPro" style={{top: this.state.top}}>
                <Navbar collapseOnSelect expand="md" bg="light" variant="light" className="my-0 py-1">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src={LogoImage}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        <img
                            alt=""
                            src={NameImage}
                            width="auto"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="my-0 py-0">
                        <Nav className="mr-auto menus">
                            <Col xs={{ offset: 0 }} sm={{ offset: 0 }} >
                                <Nav.Link href="Home">Home</Nav.Link>
                            </Col>
                            <Col xs={{ offset: 0 }} sm={{ offset: 0 }} >
                                <NavDropdown title="Servicios" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Cocina</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Action 2</NavDropdown.Item>
                                </NavDropdown>
                            </Col>
                            <Col xs={{ offset: 0 }} sm={{ offset: 0 }} >
                                <Nav.Link href="Contact">Info</Nav.Link>
                            </Col>
                            <Col xs={{ offset: 0 }} sm={{ offset: 0 }} >
                                <Nav.Link href="Contact">Contacto</Nav.Link>
                            </Col>
                        </Nav>

                        <div className="userState ml-auto mr-2 my-0 py-0">
                            <a className="userFont" href="#login">{this.state.name} | {this.state.userType}</a><br />
                            <span id="userNameData" className="userFont">{this.state.email}</span><br />
                            <span id="userEmailData" className="userFont">{this.state.address} | Cel: {this.state.phone}</span>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </div >
        )
    }
}

export default NavBar;