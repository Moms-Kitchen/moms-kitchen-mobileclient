import React, { Component } from 'react';
//import { Container, Row, Col } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

import Banner from '../components/Banner';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import MenusCustomer from '../components/MenusCustomer';
import Footer from '../components/Footer';
import './Menu.css';

export default class Menu extends Component {

    componentDidMount() {
        const validsession = Cookies.get('cook')
        if (!validsession) {
            return (
                <Redirect to='/login'></Redirect>
            )
        } else {
            console.log("Access granted, session active!");
        }
    }

    render() {
        return (
            <div> 
                <Row noGutters>
                    <Col>
                        <Banner></Banner>
                    </Col>
                </Row>
                <Row noGutters>
                    <Col>
                        <NavBar></NavBar>
                    </Col>
                </Row>
 
                <Container fluid>
                    <Row>
                        
                        <SideBar></SideBar>
                                
                        <Col>
                            <Row>
                                <MenusCustomer></MenusCustomer>
                            </Row>
                            <Row>
                                
                                <Footer></Footer>
                                
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
