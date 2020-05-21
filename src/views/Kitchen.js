import React, { Component } from 'react';
//import { Container, Row, Col } from 'react-bootstrap';
import { Container, Row, Col } from 'reactstrap';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

import Banner from '../components/Banner'
//import Sticky from '../props/Sticky';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

import MenusCookForm from '../components/MenusCookForm'

import Footer from '../components/Footer'
import './Kitchen.css';

export default class Kitchen extends Component {

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
                                <MenusCookForm></MenusCookForm>
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
