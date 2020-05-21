import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, CardDeck, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import SockJsClient from 'react-stomp';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import NumberFormat from 'react-number-format';

import BillingDate from './BillingDate';
import './orderForm.css';


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
            <div className="order">
                {/* <SockJsClient url='https://momskitchenieti.herokuapp.com/'
                topics={["/topic"]}
                onConnect={console.log("Socket Connected!")}
                onDisconnect={console.log("Socket Disconnected!")}
                ref={ (client) => { this.clientRef = client }}
                >
                </SockJsClient> */}

                <h2>Ordenes por entregar</h2>
                <div className="orderSpecific">
                    {this.state.orders.length > 0 && this.state.orders.map((order, index) => {
                        return (
                            <div key={index}>
                                <Card className="menuCard boxShadowPro">
                                    <Card.Header>
                                        <Button size="lg" block variant="success" className="buttonCard font-weight-bold">
                                            Menú # {index + 1}
                                        </Button>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>Fecha:</Card.Title>
                                        <div className="dataCont">
                                            <BillingDate ></BillingDate>
                                        </div>

                                        <Card.Title className="tittleCont">Resumen:</Card.Title>
                                        <Form className="dataCont" >
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridName">
                                                    <Form.Label className="my-0 py-0">Usuario</Form.Label>
                                                    <Form.Control className="my-0 py-0" disabled type="text" placeholder={order.customer.name} />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridRating">
                                                    <Form.Label className="my-0 py-0">Calificación</Form.Label>
                                                    <Form.Control className="my-0 py-0" disabled type="text" placeholder={order.menus[0].chef.rating} />
                                                </Form.Group>
                                            </Form.Row>

                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridPhone">
                                                    <Form.Label className="my-0 py-0">Celular</Form.Label>
                                                    <Form.Control className="my-0 py-0" disabled type="text" placeholder={order.menus[0].chef.phone} />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridChefAddress">
                                                    <Form.Label className="my-0 py-0">Dirección Usuario</Form.Label>
                                                    <Form.Control className="my-0 py-0" disabled type="text" placeholder={order.menus[0].chef.address} />
                                                </Form.Group>
                                            </Form.Row>

                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridMenu">
                                                    <Form.Label className="my-0 py-0">Menú</Form.Label>
                                                    <Form.Control className="my-0 py-0" disabled type="text" placeholder={order.menus[0].name} />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridPrecio">
                                                    <Button size="lg" block variant="warning" className="buttonCard font-weight-bold mt-3" >
                                                        <NumberFormat value={order.menus[0].price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                    </Button>
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>

                                        <Card.Title className="tittleCont">Información de Entrega:</Card.Title>
                                        <Form className="dataCont">
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridUserAddress">
                                                    <Form.Label className="my-0 py-0">Dirección Entrega</Form.Label>
                                                    <Form.Control className="my-0 py-0" disabled type="text" placeholder={Cookies.getJSON('cook').address} />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridTime">
                                                    <Form.Label className="my-0 py-0">Tiempo de Entrega</Form.Label>
                                                    <Form.Control className="my-0 py-0" disabled type="text" placeholder="15 minutos" />
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>

                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label="Orden lista"
                                        />
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                    }

                    <Button size="lg" href="Kitchen" variant="success" style={{ border: 'medium solid black' }} className="buttonForm boxShadowPro font-weight-bold">Aceptar</Button>

                    {this.state.orders.length === 0 && <div>
                        <Card className="noMenusYetClass" >
                            <Card.Header>Por favor espera..</Card.Header>
                            <Card.Body>
                                <Card.Title>Cargando Ordenes</Card.Title>
                                <Card.Text>
                                    Espera mientras cargan las ordenes que te quedan por entregar.
                                    </Card.Text>
                                <Button size="lg" href="Home" variant="success" style={{ border: 'medium solid black' }} className="buttonForm boxShadowPro font-weight-bold">Home</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    }
                </div>
            </div>
        )
    }
}