import React from "react";
import {Link, NavLink as RRNavLink, withRouter} from "react-router-dom";
import logo from "../../img/herr.png"
import styled from 'styled-components';
import {FaSignInAlt, FaUserPlus} from "react-icons/fa";
import {Collapse, Navbar, NavbarToggler, NavLink} from 'reactstrap';

const Logo = styled.img`
    max-height: 27px;
`;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div className="header container mt-3">
                <Navbar className="rounded mb-3" color="light" light expand="lg">
                    <Link to="/" className="navbar-brand">
                        <Logo src={logo} alt="Landingerr"/>
                        <span className="d-inline-block d-lg-none ml-2">Landingerr</span>
                    </Link>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <ul className="navbar-nav mr-auto">
                            <NavLink to="/" exact tag={RRNavLink} activeClassName="active">Главная</NavLink>
                            <NavLink to="/orders" tag={RRNavLink} activeClassName="active">Заказы</NavLink>
                            <NavLink to="/shop" tag={RRNavLink} activeClassName="active">Магазин лендингов</NavLink>
                        </ul>
                        <ul className="navbar-nav navbar-right">
                            <NavLink to="/auth" tag={RRNavLink} activeClassName="active">
                                <FaSignInAlt className="mr-1"/>
                                Войти
                            </NavLink>
                            <NavLink to="/reg" tag={RRNavLink} activeClassName="active">
                                <FaUserPlus className="mr-1"/>
                                Регистрация
                            </NavLink>
                        </ul>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(Header);
