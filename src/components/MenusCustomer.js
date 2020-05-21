import React, { Component } from 'react';
import SockJsClient from 'react-stomp';
import { Container, Row, Col, Form, Button, CardDeck, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import NumberFormat from 'react-number-format';

import PlateMenuImage from '../img/tools/plateMenu.jpg';
import './menusCustomer.css';

export default class MenusCustomer extends Component {

    state = {
        menus: [],
    }

    componentDidMount() {
        var url = 'https://momskitchenieti.herokuapp.com/menus/list';
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(pkg => {
                console.log(pkg);
                this.setState({ menus: [...this.state.menus, ...pkg] })
                console.log(this.state.menus);
                console.log("Protocol: " + window.location.protocol);
            })
            .catch(err => {
                console.log(err);
            });
    }

    async createNewOrder(e, index) {
        var ordertosend = {
            id: 0,
            totalPrice: this.state.menus[index].price,
            menus: [this.state.menus[index]],
            orderDate: new Date(),
            description: "new order for " + Cookies.getJSON('cook').name,
            Customer: Cookies.getJSON('cook'),
            Chef: this.state.menus[index].chef,
            pendingPayment: true,
        }
        console.log(ordertosend);
        fetch('https://momskitchenieti.herokuapp.com/orders/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ordertosend)
        })
            .then(response => response.json()).then(pkg => {
                if (pkg) {
                    swal(
                        'Successfully added!',
                        'Menu added to your cart!',
                        'success'
                    )
                } else {
                    swal(
                        'Sorry!',
                        'Someting went wrong, try again!',
                        'error')
                }
            })
    }

    render() {
        return (
            <div className="menusCustomer">
                <SockJsClient url={'https://momskitchenieti.herokuapp.com/stompendpoint'}
                    topics={["/topic/Menus"]}
                    onMessage={(msg) => {
                        console.log("socket msg:" + msg.length);
                        this.setState({ menus: [] })
                        this.setState({ menus: [...this.state.menus, ...msg] })
                        console.log(this.state.menus)
                    }}
                    onConnect={console.log("Socket Connected!")}
                    onDisconnect={console.log("Socket Disconnected!")}
                >
                </SockJsClient>

                <div className="menusCustomerSpecific">

                    <h2>Pedir Menús</h2>
                    <div className="pedirComida">
                        {this.state.menus.length === 0 && <div className="noMenusYetClass">
                            <Card className="boxShadowPro" >
                                <Card.Header>Por favor espera..</Card.Header>
                                <Card.Body>
                                    <Card.Title>Cargando Menús</Card.Title>
                                    <Card.Text>
                                        Espera mientras cargan los menus disponibles para comprar.
                                    </Card.Text>
                                    <Button size="lg" href="Home" variant="success" style={{ border: 'medium solid black' }} className="buttonForm boxShadowPro font-weight-bold">Home</Button>
                                </Card.Body>
                            </Card>
                        </div>}

                        <CardDeck className="my-0 py-0">
                            {this.state.menus.length > 0 && this.state.menus.map((menu, index) => {
                                return (
                                    <div key={index}>
                                        <Card className="menuCard boxShadowPro" style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={PlateMenuImage} />
                                            
                                            <Card.ImgOverlay bsPrefix="imgOverlayCard">
                                                <Card.Title className="textBoxRed">Chef:</Card.Title>
                                                <Card.Text className="textBoxBlue">{menu.chef.name}</Card.Text>
                                            </Card.ImgOverlay>
                                            
                                            <Card.Body>
                                                <Card.Title>{menu.name}</Card.Title>
                                                <Card.Text>{menu.description}</Card.Text>
                                            </Card.Body>
                                            <Button size="lg" block variant="warning" className="buttonCard font-weight-bold">
                                                <NumberFormat value={menu.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            </Button>

                                            <ListGroup className="list-group-flush">
                                                {menu.meals.map((meal, index) => {
                                                    return (
                                                        <div key={index} className="mealCont mx-auto">
                                                            <ListGroupItem >
                                                                <Row>
                                                                    <Col><label className="mealContlabel"><h6>Ingrediente:</h6></label><br />{meal.name}</Col>
                                                                    <Col>
                                                                        <label className="mealContlabel"><h6>Precio:</h6></label><br />
                                                                        <NumberFormat value={meal.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                    </Col>
                                                                </Row>
                                                            </ListGroupItem>
                                                        </div>
                                                    )
                                                })}
                                            </ListGroup>

                                            <Card.Footer>
                                                <Button size="lg" block type="reset" variant="success" style={{ border: 'medium solid black' }} className="buttonCard boxShadowPro font-weight-bold"
                                                    onClick={(e => this.createNewOrder(e, index))}>
                                                    Comprar
                                                </Button>
                                            </Card.Footer>
                                        </Card>
                                    </div>
                                )
                            })
                            }
                        </CardDeck>
                    </div>
                </div>
            </div>
        )
    }
}
