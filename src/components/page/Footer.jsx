import React from 'react';
import styled from 'styled-components';
import {Col, Container, Row} from "reactstrap";
import {FaTelegram, FaVk} from "react-icons/fa";
import {Link} from "react-router-dom";

const SFooter = styled.footer`
    padding: 10px 15px;
`;
const SFooterSocialBtn = styled.a`
    width: 28px;
    height: 28px;
    padding: 0 !important;
`;
const SVAMSpan = styled.span`
    vertical-align: middle;
`;

export default class Footer extends React.Component {
    render() {
        return (
            <Container>
                <SFooter className="bg-light rounded mt-3 mb-3">
                    <Row>
                        <Col xs="6">
                            <SVAMSpan className="text-muted">
                                <Link to="/" className="text-secondary">
                                    Landingerr
                                </Link>
                                &nbsp;| {new Date().getUTCFullYear()}
                            </SVAMSpan>
                        </Col>
                        <Col xs="6" className="text-right">
                            <SFooterSocialBtn href="https://vk.com/dmitry.pechkovsky" target="_blank"
                                              className="btn btn-outline-secondary mr-1">
                                <FaVk/>
                            </SFooterSocialBtn>
                            <SFooterSocialBtn href="https://t.me/dipech" target="_blank"
                                              className="btn btn-outline-secondary">
                                <FaTelegram/>
                            </SFooterSocialBtn>
                        </Col>
                    </Row>
                </SFooter>
            </Container>
        );
    }
}
