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
                            src={NicoImage}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Nicolas Cardenas</h3>
                            <p>Desarrollador Front-End</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={PedroImage}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Pedro Mayorga</h3>
                            <p>Desarrollador FullStack</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={MigueImage}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Miguel Rojas</h3>
                            <p>Desarrollador BackEnd.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}