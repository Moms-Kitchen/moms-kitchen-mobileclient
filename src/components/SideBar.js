import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'font-awesome/css/font-awesome.min.css';

import './SideBar.css';
import LogoImage from '../img/logo/Logo.png';
import NameImage from '../img/logo/Name.png';

class SideBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <SideNav className="sideBar boxShadowPro" onSelect={(selected) => {
                    // Add your code here
                }}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="home">
                            <NavIcon>
                                <a href="Home"><i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /></a>
                            </NavIcon>
                            <NavText>
                                Home
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts">
                            <NavIcon>
                                <a href="Kitchen"><i className="fa fa-fw fa-file-text-o" style={{ fontSize: '1.75em' }} /></a>
                            </NavIcon>
                            <NavText>
                                Charts
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts">
                            <NavIcon>
                                <a href="Menu"><i className="fa fa-fw fa-file" style={{ fontSize: '1.75em' }} /></a>
                            </NavIcon>
                            <NavText>
                                Charts
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Contacto">
                            <NavIcon>
                                <a href="ShoppingCart"> <i className="fa fa-fw fa-shopping-cart" style={{ fontSize: '1.75em' }} /></a>
                            </NavIcon>
                            <NavText>
                                Square
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Contacto">
                            <NavIcon>
                                <a href="Order"> <i className="fa fa-fw fa-shopping-basket" style={{ fontSize: '1.75em' }} /></a>
                            </NavIcon>
                            <NavText>
                                Square
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="charts">
                            <NavIcon>
                                <a href="Contact"><i className="fa fa-fw fa-info" style={{ fontSize: '1.75em' }} /></a>
                            </NavIcon>
                            <NavText>
                                Charts
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </div>
        )
    }

}

export default SideBar;