import React from 'react';
import { Input } from 'reactstrap';
import { Container, Row, Col, Form, Button, CardDeck, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

class BillingDate extends React.Component {
    constructor() {
        super();

        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + ':' + today.getMinutes();

        this.state = {
            date: date
        };
    }

    render() {
        return (
            <Form.Control className="my-0 py-0" disabled type="text" placeholder={this.state.date} />
        )
    }
}

export default BillingDate;