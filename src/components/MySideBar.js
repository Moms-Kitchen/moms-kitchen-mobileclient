import React from 'react';
import './mySideBar.css';
import { Redirect } from 'react-router-dom';

class MySideBar extends React.Component {

    state = {
        stretched: false,
        width: '3vw',
        toKitchen: false,
        toMenu: false,
        toBilling: false,
        toOrders: false,
    }

    sideBarClickedHandler = () => {
        if (this.state.stretched) {
            this.setState({
                width: '3vw',
                stretched: false
            })
        } else {
            this.setState({
                width: '10vw',
                stretched: true
            })
        }
    }

    toBilling = (e) => {
        this.setState({
            toBilling: true,
        })
    }

    toKitchen = (e) => {
        this.setState({
            toKitchen: true,
        })
    }

    toMenu = (e) => {
        this.setState({
            toMenu: true,
        })
    }

    toOrders = (e) => {
        this.setState({
            toOrders: true,
        })
    }



    render() {
        return (
            <div className="mySideBarClass generic" onClick={this.sideBarClickedHandler} style={{ width: this.state.width }}>
                {this.state.toKitchen && <Redirect to='/Kitchen'></Redirect>}
                {this.state.toMenu && <Redirect to='/Menu'></Redirect>}
                {this.state.toBilling && <Redirect to='/Billing'></Redirect>}
                {this.state.toOrders && <Redirect to='/orders'></Redirect>}
                <div className="SDBillingClass SDGeneric" onClick={(e) => this.toBilling(e)}>
                    B
                </div>
                <div className="SDOrdersClass SDGeneric" onClick={(e) => this.toMenu(e)}>
                    M
                </div>
                <div className="SDOrdersClass SDGeneric" onClick={(e) => this.toOrders(e)}>
                    O
                </div>
                <div className="SDKitchenClass SDGeneric" onClick={(e) => this.toKitchen(e)}>
                    K
                </div>
                <div className="SDLogoutClass SDGeneric" >
                    LO
                </div>
            </div>
        )
    }
}

export default MySideBar;