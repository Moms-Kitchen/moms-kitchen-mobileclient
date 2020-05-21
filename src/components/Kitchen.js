import React, { Component } from 'react'
import { Container, Row } from 'reactstrap'
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
import MySideBar from './MySideBar'
import MenusCookForm from './MenusCookForm'
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';


export default class Kitchen extends Component {

    
componentDidMount(){
    const validsession = Cookies.get('cook')
    if(!validsession){
        return(
            <Redirect to='/login'></Redirect>
        )
    } else {
        console.log("Access granted, session active!");
    }
}

    render() {
        return (
            <div>                
                <Container>
                    <Row>
                        <MyHeader></MyHeader>
                    </Row>
                    <Row>
                        <MySideBar></MySideBar>
                        <MenusCookForm></MenusCookForm>
                    </Row>
                    <Row>
                        <MyFooter></MyFooter>
                    </Row>
                </Container>
            </div>
        )
    }
}
