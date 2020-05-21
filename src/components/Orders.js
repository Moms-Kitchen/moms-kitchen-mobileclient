import React, { Component } from 'react'
import OrderForm from './OrderForm'
import { Container, Row } from 'reactstrap'
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
import MySideBar from './MySideBar'

export default class Orders extends Component {
    render() {
        return (
            <div className="ordersClass">
                <Container>
                    <Row>
                        <MyHeader></MyHeader>
                    </Row>
                    <Row>
                        <MySideBar></MySideBar>
                        <OrderForm></OrderForm>
                    </Row>
                    <Row>
                        <MyFooter></MyFooter>
                    </Row>
                </Container>
            </div>
        )
    }
}
