import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './Sticky.css';
//import NavBar from '../components/NavBar';

class Sticky extends Component {
    state = {
        top: '0px',
        background: 'gray',
    }

    componentDidMount() {
        window.onscroll = (e) => {
            if (window.pageYOffset === 0) {
                this.setState({
                    position: 'static',
                    background: 'gray',
                })
            } else if (window.pageYOffset === 100) {
                this.setState({
                    position: 'sticky',
                    background: 'green',
                })
            }
            else {
                console.log("scrolling..." + window.pageYOffset);
            }
        };
    }

    componentWillUnmount() {
        window.onscroll = null;
    }

    render() {
        return (
            <div className="container">

                <div className="header" >HEADER CACORRO</div>
                <div className="navbar" style={{ top: this.state.top }}>Barrita cacorra</div>

                {/*
                    
                
                <NavBar className="navbar" style={{ top: this.state.top }}></NavBar>
                */}

            </div>
        );
    }
}



ReactDOM.render(<Sticky />, document.getElementById("root"));

export default Sticky;