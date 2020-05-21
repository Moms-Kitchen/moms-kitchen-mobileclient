import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, CardDeck, Card, ListGroup, ListGroupItem, Carousel } from 'react-bootstrap';
import SockJsClient from 'react-stomp';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import NumberFormat from 'react-number-format';

import BillingDate from './BillingDate';
import './HomeForm.css';
import Cook1Image from '../img/tools/cook1.jpg';
import Cook2Image from '../img/tools/cook2.jpg';
import Cook3Image from '../img/tools/cook3.jpg';
import NicoImage from '../img/tools/nico.jpg';
import PedroImage from '../img/tools/pedro.png';
import MigueImage from '../img/tools/migue.jpg';


export default class OrderForm extends Component {

    state = {
        orders: [],
    }

    componentDidMount() {
        var url = 'https://momskitchenieti.herokuapp.com/orders/chef/' + Cookies.getJSON('cook').id;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(pkg => {
                console.log(pkg);
                this.setState({ orders: [...this.state.orders, ...pkg] })
                console.log(this.state.orders);
                console.log("MENUS:");
                console.log(this.state.orders.menus[0]);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="home">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Cook1Image}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Crea Menus</h3>
                            <p>Puedes crear el menu que quieras para tus clientes.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Cook2Image}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Ordena Menus</h3>
                            <p>Pide la comida que mas te gusta desde tu hogar.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Cook3Image}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Apoya a Madres cabezas de hogar</h3>
                            <p>Con tu ayuda apoyas a madres solteras en condicii'on de vulnerabilidad.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}