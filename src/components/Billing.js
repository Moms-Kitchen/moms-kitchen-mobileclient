import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import MyHeader from './MyHeader';
import MyFooter from './MyFooter';
import MySideBar from './MySideBar';
import BillingForm from './BillingForm';

class Billing extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <MyHeader></MyHeader>
                    </Row>
                    <Row>
                        <MySideBar></MySideBar>
                        <BillingForm></BillingForm>
                    </Row>
                    <Row>
                        <MyFooter></MyFooter>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Billing;