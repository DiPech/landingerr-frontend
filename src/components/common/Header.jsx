import React, {Fragment} from "react";
import {Link, NavLink as RRNavLink, withRouter} from "react-router-dom";
import logo from "../../img/herr.png"
import styled from 'styled-components';
import {FaSignInAlt, FaUser, FaUserPlus} from "react-icons/fa";
import {Collapse, Navbar, NavbarToggler, NavLink} from 'reactstrap';
import {connect} from "react-redux";

const Logo = styled.img`
    max-height: 27px;
`;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.isAuth = this.isAuth.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {...this.state, isOpen: false};
    }
    isAuth() {
        return this.props.token !== null;
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
                            {this.isAuth() ? (
                                <NavLink to="/cabinet" tag={RRNavLink} activeClassName="active">
                                    <FaUser className="mr-1"/>
                                    Личный кабинет
                                </NavLink>
                            ) : (
                                <Fragment>
                                    <NavLink to="/auth" tag={RRNavLink} activeClassName="active">
                                        <FaSignInAlt className="mr-1"/>
                                        Войти
                                    </NavLink>
                                    <NavLink to="/reg" tag={RRNavLink} activeClassName="active">
                                        <FaUserPlus className="mr-1"/>
                                        Регистрация
                                    </NavLink>
                                </Fragment>
                            )}
                        </ul>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(withRouter(Header));
