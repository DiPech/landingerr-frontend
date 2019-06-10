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
import {FaShoppingCart} from "react-icons/fa";
import {connect} from "react-redux";
import {fetchLandings} from "../api/shop";
import {bindActionCreators} from "redux";
import styled from 'styled-components';
import Nbsp from "./partials/Nbsp";
import ReactTooltip from "react-tooltip";

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
                    доработать как вам захочется. Обратите внимание на то, что доработка готового лендинга стоит меньше,
                    чем полное копирование нового.
                </p>
                <Row>
                    <Col sm="6" md="4">
                        <FormGroup>
                            <Label for="select-objects-per-page">Лендингов на странице</Label>
                            <Input type="select" name="select" id="select-objects-per-page">
                                <option>Показывать по 10 шт.</option>
                                <option>Показывать по 25 шт.</option>
                                <option>Показывать по 50 шт.</option>
                                <option>Показывать по 100 шт.</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm="6" md="8" xl={{size: 6, offset: 2}}>
                        <Label for="input-search">Поиск по ключевым словам</Label>
                        <InputGroup>
                            <Input type="text" placeholder="Например: Ab Gymnic, похудение, миостимулятор"
                                   id="input-search"/>
                            <InputGroupAddon addonType="append"><Button>Найти</Button></InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mt-4">
                    {this.props.isLoading && (
                        <Col xs="12" className="text-center">
                            Загрузка <Spinner size="sm" color="secondary"/>
                        </Col>
                    )}
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
                                                           data-tip={badge.description} data-for={"tooltip-badge-" + i + "-" + j}>
                                                        {badge.name}
                                                    </Badge>
                                                    <ReactTooltip effect="solid" id={"tooltip-badge-" + i + "-" + j}/>
                                                    <Nbsp/>
                                                </Fragment>
                                            )
                                        })}
                                    </CardBody>
                                    <CardFooter>
                                        <Button size="sm" color="primary" block id="button-order">
                                            Заказать <FaShoppingCart/>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Col>
                        )
                    })}
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
