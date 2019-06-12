import React, {Fragment} from 'react';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardText,
    Col,
    FormGroup,
    Input, InputGroup, InputGroupAddon, Label,
    Row, Spinner
} from "reactstrap";
import {FaEye, FaShoppingCart} from "react-icons/fa";
import {connect} from "react-redux";
import {fetchLandings} from "../api/landing";
import {bindActionCreators} from "redux";
import styled from 'styled-components';
import Nbsp from "./partials/Nbsp";
import ReactTooltip from "react-tooltip";
import {Link} from "react-router-dom";

const SImg = styled.img`
    width: 100%;
    max-height: 200px;
`;

class Shop extends React.Component {
    componentWillMount() {
        if (this.props.landings.length === 0) {
            this.props.fetchLandings();
        }
    }
    render() {
        return (
            <div>
                <h3>Магазин лендингов</h3>
                <p>
                    Здесь вы найдёте уже готовые, обработанные лендинги. Их можно использовать как есть, а можно
                    доработать как вам захочется.<br/>
                    Доработка готового лендинга стоит дешевле, чем полное копирование нового.
                </p>
                <Row>
                    <Col sm="6" md="4">
                        <FormGroup>
                            <Label for="select-objects-per-page">Лендингов на странице:</Label>
                            <Input type="select" name="select" id="select-objects-per-page">
                                <option>Показывать по 10 шт.</option>
                                <option>Показывать по 25 шт.</option>
                                <option>Показывать по 50 шт.</option>
                                <option>Показывать по 100 шт.</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm="6" md="8" xl={{size: 6, offset: 2}}>
                        <Label for="input-search">Поиск по ключевым словам:</Label>
                        <InputGroup>
                            <Input type="text" placeholder="Например: Ab Gymnic, похудение, миостимулятор"
                                   id="input-search"/>
                            <InputGroupAddon addonType="append"><Button>Найти</Button></InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mt-4">
                    {this.props.isLoading ? (
                        <Col xs="12" className="text-center">
                            Загрузка <Spinner size="sm" color="secondary"/>
                        </Col>
                    ) : (
                        <Fragment>
                            {this.props.landings.map((landing, i) => {
                                return (
                                    <Col xs="12" sm="6" md="4" xl="3" key={i}>
                                        <Card className="mb-4">
                                            <CardHeader>{landing.name}</CardHeader>
                                            <CardBody>
                                                <CardText>
                                                    <SImg src={landing.previewUrl}/>
                                                </CardText>
                                                {landing.badges.map((badge, j) => {
                                                    return (
                                                        <Fragment key={j}>
                                                            <Badge color={badge.style}
                                                                   data-tip={badge.description}
                                                                   data-for={"tooltip-badge-" + i + "-" + j}>
                                                                {badge.name}
                                                            </Badge>
                                                            <ReactTooltip effect="solid"
                                                                          id={"tooltip-badge-" + i + "-" + j}/>
                                                            <Nbsp/>
                                                        </Fragment>
                                                    )
                                                })}
                                            </CardBody>
                                            <CardFooter>
                                                <Link to={landing.screenshotUrl} target="_blank">
                                                    <Button size="sm" color="secondary" id="button-order" outline
                                                            data-tip="Посмотреть подробнее"
                                                            data-for={"tooltip-screenshot-" + i}>
                                                        <FaEye/>
                                                        <span className="d-inline-block d-sm-none ml-2">Посмотреть</span>
                                                    </Button>
                                                    <ReactTooltip effect="solid"
                                                                  id={"tooltip-screenshot-" + i}/>
                                                </Link>
                                                {' '}
                                                <Link to={"/orders/create/" + landing.id}>
                                                    <Button size="sm" color="primary" id="button-order">
                                                        <FaShoppingCart className="mr-2"/>
                                                        Заказать
                                                    </Button>
                                                </Link>
                                            </CardFooter>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Fragment>
                    )}
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.shop.isLoading,
        landings: state.shop.landings,
        errorMessage: state.shop.errorMessage
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchLandings
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
