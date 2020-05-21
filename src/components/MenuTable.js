import React, { Component } from 'react'
import './menuTable.css'
import { Container, Row } from 'reactstrap'
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
import MySideBar from './MySideBar'
import MenusCustomer from './MenusCustomer'

export default class MenuTable extends Component {
    render() {
        return (
            <div >
                <Container>
                    <Row>
                        <MyHeader></MyHeader>
                    </Row>
                    <Row>
                        <MySideBar></MySideBar>
                        <MenusCustomer></MenusCustomer>
                    </Row>
                    <Row>
                        <MyFooter></MyFooter>
                    </Row>
                </Container>
            </div>
        )
    }
}
