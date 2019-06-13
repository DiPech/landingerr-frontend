import React from "react";
import {Link} from "react-router-dom";
import logo from "../../img/herr.png"
import styled from 'styled-components';
import {Collapse, Navbar, NavbarToggler} from 'reactstrap';
import Navigation from "./Navigation";

const SLogo = styled.img`
    max-height: 27px;
`;

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {...this.state, isOpen: false};
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <header className="header mt-3">
                <Navbar className="rounded mb-3" color="light" light expand="lg">
                    <Link to="/" className="navbar-brand">
                        <SLogo src={logo} alt="Landingerr"/>
                        <span className="d-inline-block d-lg-none ml-2">Landingerr</span>
                    </Link>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Navigation/>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
