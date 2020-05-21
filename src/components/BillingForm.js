import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, CardDeck, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import NumberFormat from 'react-number-format';

import './billingForm.css';
import BillingDate from './BillingDate';


class BillingForm extends Component {

    state = {
        orders: [],
        total: 0,
    }

    componentDidMount() {
        var url = 'https://momskitchenieti.herokuapp.com/orders/cart/' + Cookies.getJSON('cook').id;
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
                console.log("Protocol: " + window.location.protocol);
                this.state.orders.map((order, index) => {
                    var tmp = this.state.total;
                    this.setState({
                        total: tmp + order.menus[0].price,
                    })
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="billing" >

                <h2>Carrito de Compras</h2>
                <div className="carritoCompras">
                    {this.state.orders.map((order, index) => {
                        return (
                            <div key={index}>
                                <Card className="menuCard boxShadowPro">
                                    <Card.Header>
                                        <Button size="lg" block variant="danger" className="buttonCard font-weight-bold">
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
                                                    <Form.Label className="my-0 py-0">Chef</Form.Label>
                                                    <Form.Control className="my-0 py-0" disabled type="text" placeholder={order.menus[0].chef.name} />
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
                                                    <Form.Label className="my-0 py-0">Dirección Chef</Form.Label>
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
                                            label="Avisarme"
                                        />
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                    }

                    <Row>
                        <Col className="valorTotal">
                            <h3>Valor Total</h3>
                        </Col>
                        <Col>
                            <Button size="lg" block variant="danger" className="buttonCard boxShadowPro font-weight-bold" >
                                <NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </Button>
                        </Col>
                    </Row>

                    <Button size="lg" href="Menu" variant="success" style={{ border: 'medium solid black' }} className="buttonForm boxShadowPro font-weight-bold">Pagar</Button>

                </div>
            </div >

        )
    }
}

export default BillingForm;