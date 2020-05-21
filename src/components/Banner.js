import React, { Component } from 'react'
import { Image } from 'react-bootstrap';
import './Banner.css';
import BackgroundImage from '../img/banner/Banner-Logo.jpg';

class Banner extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Image src={BackgroundImage} fluid className="banner"/>
            </div>
        )
    }
}

export default Banner;
