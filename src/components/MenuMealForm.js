import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import './menuMealForm.css';

export default class MenuMealForm extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        mealsbymatch: [],
        focused: false,
        freetorender: false,
        suggestionshovered: false,
        mealName: '',
        isLoading: false,
    }

    componentDidMount () {
        var url = 'https://momskitchenieti.herokuapp.com/meal/list';
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(pkg => {
                console.log(pkg)
                this.setState({
                    mealsbymatch: [],
                })
                this.setState({
                    freetorender: true,
                    mealsbymatch: [...this.state.mealsbymatch, ...pkg],
                })
            })
            .catch(err => {
                console.log(err);
            });

        console.log("\n\n\nMEALS 2: ");
        console.log(this.state.mealsbymatch);
    }


    handleMealRemove = () => {
        this.props.parentRemoveMeal(this.props.index);
    }

    async handleMealNameChange(e) {
        var name = e.target.value;
        this.setState({
            freetorender: false,
            mealName: name,
        })
        var url = 'https://momskitchenieti.herokuapp.com/meal/stringmeal/' + name;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(pkg => {
                console.log(pkg)
                this.setState({
                    mealsbymatch: [],
                })
                this.setState({
                    freetorender: true,
                    mealsbymatch: [...this.state.mealsbymatch, ...pkg],
                })
                console.log("MEALS STR: " + this.state.mealsbymatch);
            })
            .catch(err => {
                console.log(err);
            });
        console.log("Name: " + name);
        console.log("Meal: " + this.state.mealName);
        console.log("MEALS END: " + this.state.mealsbymatch);
    }

    handleMealSelected = (name) => {
        var id = 0;
        this.state.mealsbymatch.map ((meal, index) => {
            if (meal.name === name) {
                id = meal.id;
            }
        })
        
        this.setState({
            mealName: name,
        })
        this.props.parentMealName(name, this.props.index);
        this.props.parentMealId(id, this.props.index);
    }

    handleMealPriceChange = (e) => {
        this.props.parentMealPrice(e, this.props.index);
    }

    handleMealDescriptionChange = (e) => {
        this.props.parentMealDescription(e, this.props.index);
    }

    handleOnFocused = () => {
        this.setState({
            focused: true,
        })
    }

    handleOnBlur = () => {
        if (!this.state.suggestionshovered) {
            this.setState({
                focused: false,
            })
        }
    }

    handleSuggestionEnter = () => {
        this.setState({
            suggestionshovered: true,
        })
    }

    handleSuggestionLeave = () => {
        this.setState({
            suggestionshovered: false,
        })
    }

    render() {
        return (
            <div>
                <hr />
                <Button type="reset" variant="danger" style={{ border: 'thin solid black' }} className="buttonFormSpecific boxShadowPro font-weight-bold" onClick={this.handleMealRemove}>
                    Eliminar Ingrediente
                </Button>

                <div className="mealFormSpecific">
                    <Form.Group as={Row} controlId="formHorizontalMealName">
                        <Form.Label column sm={2} md={2} lg={2} xl={1} className="ml-auto">Nombre:</Form.Label>
                        <Col sm={10} md={10} lg={7} xl={6} className="mr-auto">
                            <Form.Control as="select" placeholder="Nombre del ingrediente"
                                // value={this.state.mealName}
                                value="Seleccionar"
                                onChange={(event) => this.handleMealSelected(event.target.value)}                                
                                required >  
                                {this.state.mealsbymatch.map((meal, index) =>
                                    <option key={index}>{meal.name}</option>)}                               
                            </Form.Control>
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Por favor selecciona un ingrediente.</Form.Control.Feedback>
                            <Form.Text className="text-muted">El nombre del ingrediente usado en tu menú.</Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalMenuPrice">
                        <Form.Label column sm={2} md={2} lg={2} xl={1} className="ml-auto">Precio Porción:</Form.Label>
                        <Col sm={10} md={10} lg={7} xl={6} className="mr-auto">
                            <Form.Control type="number" placeholder="Precio de la porción adicional"
                                required onChange={(e) => this.handleMealPriceChange(e)} />
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Por favor ingresa el precio de la porción adicional.</Form.Control.Feedback>
                            <Form.Text className="text-muted">Este precio es por la porción adicional de tu ingrediente</Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalMenuDesc">
                        <Form.Label column sm={2} md={2} lg={2} xl={1} className="ml-auto">Descripción:</Form.Label>
                        <Col sm={10} md={10} lg={7} xl={6} className="mr-auto">
                            <Form.Control as="textarea" rows="2" type="text" placeholder="Descripción del ingrediente"
                                onChange={(e) => this.handleMealDescriptionChange(e)} />
                            <Form.Control.Feedback>Luce bien!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Por favor ingresa una descripción al ingrediente.</Form.Control.Feedback>
                            <Form.Text className="text-muted">Indicanos sí el ingrediente tiene una preparación especial.</Form.Text>
                        </Col>
                    </Form.Group>
                </div>
            </div>
        )
    }
}
