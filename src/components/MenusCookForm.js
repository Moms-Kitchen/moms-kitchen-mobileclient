import React, { Component, useState } from 'react';
import { Container, Row, Col, Form, Button, CardDeck, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import SockJsClient from 'react-stomp';
import { useTrail, animated } from "react-spring";
import NumberFormat from 'react-number-format';
import Cookies from 'js-cookie';
import swal from 'sweetalert';

import PlateMenuImage from '../img/tools/plateMenu.jpg';
import MenuMealForm from './MenuMealForm'
import "./menusCookForm.css"


export default class MenusCookForm extends Component {

    state = {
        menus: [],
        meals: [],
        mealsbymatch: [],
        validated: false,
        validmeals: false,
    }

    menutosend = { id: 15, chef: Cookies.getJSON('cook'), meals: this.state.meals, price: 0, description: "", name: "" };

    componentDidMount() {
        const cook = Cookies.getJSON('cook');
        console.log(cook.id);
        var url = 'https://momskitchenieti.herokuapp.com/menus/chef/' + cook.id;
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

            })
            .catch(err => {
                console.log(err);
            });
    }

    addMeal() {
        this.setState({ meals: [...this.state.meals, { id: "", name: "", description: "", price: "" }] });
    }

    handleMenuNameChange(e) {
        this.menutosend.name = e.target.value;
        this.setState({ menutosend: this.state.menutosend });
    }

    handleMenuPriceChange(e) {
        this.menutosend.price = e.target.value;
        this.setState({ menutosend: this.state.menutosend });
    }

    handleMenuDescriptionChange(e) {
        this.menutosend.description = e.target.value;
        this.setState({ menutosend: this.state.menutosend });
    }

    handleMealIdChange = (id, index) => {
        this.state.meals[index].id = id;
        this.setState({ meals: this.state.meals });
    }

    handleMealNameChange = (name, index) => {

        this.state.meals[index].name = name;
        this.setState({ meals: this.state.meals });
    }

    handleMealPriceChange = (e, index) => {
        this.state.meals[index].price = e.target.value;
        this.setState({ meals: this.state.meals });
    }

    handleMealDescriptionChange = (e, index) => {
        this.state.meals[index].description = e.target.value;
        this.setState({ meals: this.state.meals });
    }

    handleRemove = (index) => {
        this.state.meals.splice(index, 1);
        this.setState({ meals: this.state.meals });
    }

    async validateMeals() {
        var cont = 0;
        this.state.meals.map((meal, index) => {
            console.log("meal.name != '': " + (meal.name != ''));
            console.log("meal.price != '': " + (meal.price != ''));
            console.log("cont === this.state.meals.length: " + (cont === this.state.meals.length));
            console.log("Name: " + meal.name + ", " + "Price: " + meal.price)

            if (meal.name != '' && meal.price != '') {
                cont += 1;
                console.log("if 1");
            }
            if (cont === this.state.meals.length) {
                console.log("if 2");
                this.setState({
                    validmeals: true,
                })
            }
        })
        console.log("Contador: " + cont);
        console.log("Meald length: " + this.state.meals.length);

    }

    async createNewMenu() {
        this.menutosend.meals = this.state.meals;
        console.log(this.menutosend)
        await this.validateMeals();

        if (this.menutosend.name !== "" && this.menutosend.id !== "" && this.menutosend.price !== 0 && this.menutosend.meals.length > 0 && this.menutosend.description != '' && this.state.validmeals) {
            fetch('https://momskitchenieti.herokuapp.com/menus/createMenu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.menutosend)
            })
                .then(response => response.json()).then(pkg => {
                    if (pkg) {
                        swal(
                            'Menú creado!',
                            'You menu have been registered!',
                            'success'
                        )
                        this.sendMessage("check");
                        window.location.reload(false);
                    } else {
                        swal(
                            'Error!',
                            'Algo salió mal, intentalo de nuevo!',
                            'error')
                    }
                })
        } else {
            swal("Campos vacios!", "Solo la descripción de las comidas es opcional", "error");
        }

    }

    async addMenu() {
        this.createNewMenu();
    }

    showMeals() {
        console.log(this.state.meals);
    }

    sendMessage = (msg) => {
        console.log("SOCKET:sending message... ")
        this.clientRef.sendMessage('/app/createMenu', msg);
    }


    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            this.setState({ validated: true });
            this.addMenu();
        }


    }


    render() {

        return (
            <div className="menusCook" >
                <SockJsClient url={'https://momskitchenieti.herokuapp.com/stompendpoint'}
                    topics={["/topic/Menus"]}
                    onMessage={(msg) => { console.log("socket msg:" + msg) }}
                    onConnect={console.log("Socket Connected!")}
                    onDisconnect={console.log("Socket Disconnected!")}
                    ref={(client) => { this.clientRef = client }}
                    debug={true}>
                </SockJsClient>

                <div className="createMenu">

                    <h2>Crear Menú</h2>
                    <div className="menuForm">
                        <Form noValidate validated={this.state.validated} onSubmit={(event) => this.handleSubmit(event)}>
                            <div className="menuFormSpecific">
                                <Form.Group as={Row} controlId="formHorizontalMenuName">
                                    <Form.Label column sm={2} md={2} lg={2} xl={1} className="ml-auto">Nombre:</Form.Label>
                                    <Col sm={10} md={10} lg={7} xl={6} className="mr-auto">
                                        <Form.Control type="text" placeholder="Nombre del menú"
                                            required onChange={(e) => this.handleMenuNameChange(e)} />
                                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">Por favor ingresa un nombre al menú.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">El nombre de tu menú lo verán tus consumidores.</Form.Text>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalMenuPrice">
                                    <Form.Label column sm={2} md={2} lg={2} xl={1} className="ml-auto">Precio:</Form.Label>
                                    <Col sm={10} md={10} lg={7} xl={6} className="mr-auto">
                                        <Form.Control type="number" placeholder="Precio del menú"
                                            required onChange={(e) => this.handleMenuPriceChange(e)} />
                                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">Por favor ingresa un precio al menú.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">Recuerda que los precios van entre ($7.000 - $13.000).</Form.Text>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalMenuDesc">
                                    <Form.Label column sm={2} md={2} lg={2} xl={1} className="ml-auto">Descripción:</Form.Label>
                                    <Col sm={10} md={10} lg={7} xl={6} className="mr-auto">
                                        <Form.Control as="textarea" rows="3" type="text" placeholder="Descripción del menú"
                                            required onChange={(e) => this.handleMenuDescriptionChange(e)} />
                                        <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">Por favor ingresa una descripción al menú.</Form.Control.Feedback>
                                        <Form.Text className="text-muted">Aquí puedes ser más especifico con tu menú.</Form.Text>
                                    </Col>
                                </Form.Group>
                            </div>


                            <hr />
                            <h3>Añadir Ingredientes</h3>
                            <div className="mealForm">
                                {this.state.meals.map((meal, index) => {
                                    return (
                                        <div key={index}>
                                            <MenuMealForm parentMealId={this.handleMealIdChange}
                                                parentMealName={this.handleMealNameChange}
                                                parentMealPrice={this.handleMealPriceChange}
                                                parentMealDescription={this.handleMealDescriptionChange}
                                                parentRemoveMeal={this.handleRemove}
                                                meals={this.state.mealsbymatch}
                                                index={index}>
                                            </MenuMealForm>
                                        </div>
                                    )
                                })}
                                <Button type="button" variant="warning" style={{ border: 'thin solid black' }} className="buttonFormSpecific boxShadowPro font-weight-bold" onClick={(e) => this.addMeal(e)}>
                                    Añadir Ingrediente
                                </Button>
                            </div>
                            <hr />

                            <Button size="lg" type="reset" variant="success" style={{ border: 'medium solid black' }} className="buttonForm boxShadowPro font-weight-bold" onClick={(event) => this.handleSubmit(event)}>
                                Crear Menú
                            </Button>
                        </Form>
                    </div>
                </div>

                <hr />
                <br />



                <h2>Tus Menús</h2>
                <div className="myMenus">
                    {this.state.menus.length === 0 && <div className="noMenusYetClass">
                        <Card className="boxShadowPro">
                            <Card.Header>Ups..</Card.Header>
                            <Card.Body>
                                <Card.Title>No tienes menús aún!</Card.Title>
                                <Card.Text>
                                    Para ver tus menús, primero debes crear uno.
                                </Card.Text>
                                <Button size="lg" href="Kitchen" variant="danger" style={{ border: 'medium solid black' }} className="buttonForm boxShadowPro font-weight-bold">Crear Menus</Button>
                            </Card.Body>
                        </Card>
                    </div>}

                    <CardDeck className="my-0 py-0">
                        {this.state.menus.length > 0 && this.state.menus.map((menu, index) => {
                            return (
                                <div key={index}>
                                    <Card className="menuCard boxShadowPro" style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={PlateMenuImage} />
                                        <Card.Body>
                                            <Card.Title>{menu.name}</Card.Title>
                                            <Card.Text>{menu.description}</Card.Text>
                                        </Card.Body>

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
                                            <Button size="lg" block variant="warning" style={{ border: 'medium solid black' }} className="buttonCard boxShadowPro font-weight-bold">
                                                <NumberFormat value={menu.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            )
                        })
                        }
                    </CardDeck>
                </div>

            </div >
        )
    }
}