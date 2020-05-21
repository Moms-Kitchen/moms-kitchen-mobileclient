import React, { Component } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import Cookies from 'js-cookie';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

import './Footer.css';
import LogoImage from '../img/logo/Logo.png';

class Footer extends Component {

    constructor(props) {
        super(props);

        this.state={
            toLogin: false,
            toKitchen: false,
            toMenus: false,
            toShoppingCart: false,
            toOrders: false,
        }
        this.redirectToKitchen = this.redirectToKitchen.bind(this);
        this.redirectToMenus = this.redirectToMenus.bind(this);
        this.redirectToShoppingCart = this.redirectToShoppingCart.bind(this);
        this.redirectToOrders = this.redirectToOrders.bind(this);
        this.logOut = this.logOut.bind(this);

    }

    redirectToKitchen(){
        this.setState({toKitchen:true});
    }
    redirectToMenus(){
        this.setState({toMenus:true});
    }
    redirectToShoppingCart(){
        this.setState({toShoppingCart:true});
    }
    redirectToOrders(){
        this.setState({toOrders:true});
    }

    toFacebook(){
        window.location.href = "https://www.facebook.com/MomsKitchenComida"
    }

    logOut(){
        Cookies.remove('cook');
        this.setState({
            toLogin: true,
        })
    }

    render() {
        return (
            <div className="footer">
                {this.state.toKitchen && <Redirect to='/Kitchen'></Redirect>}
                {this.state.toMenus && <Redirect to='/Menu'></Redirect>}
                {this.state.toShoppingCart && <Redirect to='/ShoppingCart'></Redirect>}
                {this.state.toOrders && <Redirect to='/order'></Redirect>}
                {this.state.toLogin && <Redirect to='/login'></Redirect>}
                <MDBFooter>
                    <div className="connected">
                        <Row className="">
                            <Col md="8" lg="7" className="">
                                <h6 className="mb-0 text-white">
                                    Conectate con nosotros!
                                </h6>
                            </Col>
                            <Col md="4" lg="5" className="">
                                <a className="" onClick={this.toFacebook}>
                                    <i className="fa fa-fw fa-facebook-square mr-3" >Facebook</i>
                                </a>
                            </Col>
                        </Row>
                    </div>
                    <MDBContainer fluid className="text-center text-md-left content">
                        <MDBRow>
                            <MDBCol md="4" lg="4" xl="4" className="dark-grey-text">
                                <h5 className="text-uppercase font-weight-bold h5Text">
                                    <strong>Mom's Kitchen</strong>
                                </h5>
                                <p>
                                Ya no tienes que complicarte para disfrutar la mejor comida casera, come saludablemente en minutos. Mom's Kitchen te cambiará la vida.
                                </p>
                                <img
                                    alt=""
                                    src={LogoImage}
                                    width="80"
                                    height="80"
                                    className="align-content-center"
                                />
                            </MDBCol>
                            <MDBCol md="3" lg="3" xl="3" className="dark-grey-text">
                                <h5 className="text-uppercase font-weight-bold h5Text">
                                    <strong>Enlaces</strong>
                                </h5>
                                <ul>
                                    <li className="list-unstyled">
                                        <a href="" onClick={this.redirectToKitchen}>Cocina</a>
                                    </li>
                                    <li className="list-unstyled">
                                        <a href="#!" onClick={this.redirectToMenus}>Menus</a>
                                    </li>
                                    <li className="list-unstyled">
                                        <a href="#!" onClick={this.redirectToShoppingCart}>Carrito de compras</a>
                                    </li>
                                    <li className="list-unstyled">
                                        <a href="#!" onClick={this.redirectToOrders}>Ordenes</a>
                                    </li>
                                    <li className="list-unstyled">
                                        <a href="#!" onClick={this.logOut}>Cerrar sesion</a>
                                    </li>
                                </ul>
                            </MDBCol>
                            <MDBCol md="5" lg="4" xl="3" className="dark-grey-text">
                                <h5 className="text-uppercase font-weight-bold h5Text">
                                    <strong>Contacto</strong>
                                </h5>
                                <p>
                                    <i className="fa fa-home mr-3" /> Bogotá, D.C. 10012, CO
                                </p>
                                <p>
                                    <i className="fa fa-envelope mr-3" /> momskitchen@gmail.com
                                </p>
                                <p>
                                    <i className="fa fa-phone mr-3" /> (+57) 301 3664994
                                </p>
                                <p>
                                    <i className="fa fa-print mr-3" /> (+57) 300 5703407
                                </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <div className="copyrightFooter footer-copyright text-center py-3">
                        <MDBContainer fluid>
                            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.facebook.com/MomsKitchenComida"> MomsKitchen </a>
                        </MDBContainer>
                    </div>
                </MDBFooter>
            </div>
        )
    }

}

export default Footer;