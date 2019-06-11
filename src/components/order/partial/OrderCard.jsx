import React, {Fragment} from 'react';
import {Card, CardTitle, Col, FormGroup, Input, Label} from "reactstrap";
import styled from "styled-components";
import Price from "../../partials/Price";
import Help from "../../partials/Help";

const SFormGroup = styled(FormGroup)`
    &:hover * {
        cursor: pointer;
    }
`;
const SCol = styled(Col)`
    margin-top: 10px;
`;
const SCardTitle = styled(CardTitle)`
    margin-bottom: 0;
`;
const SDiv = styled.div`
    margin-top: 10px;
`;

export default class OrderCard extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
        if (event.target.checked) {
            this.props.onChange(this.props.value)
        }
    }
    render() {
        return (
            <SCol xs={12} sm={this.props.active ? this.props.colActive : this.props.colNonActive}>
                <Card body outline color={this.props.active ? "primary" : "secondary"}>
                    <SCardTitle>
                        <SFormGroup check>
                            <Input type={this.props.type} name={"input_" + this.props.name}
                                   id={"input-radio-source-" + this.props.value}
                                   value={this.props.value}
                                   checked={this.props.active}
                                   onChange={this.onChange}/>
                            <Label for={"input-radio-source-" + this.props.value}
                                   check={this.props.active}>
                                {this.props.title} –{" "}
                                {parseInt(this.props.priceMin) === parseInt(this.props.priceMax) && parseInt(this.props.priceMin) === 0 ? (
                                    <b>Бесплатно</b>
                                ) : (
                                    <Fragment>
                                        {parseInt(this.props.priceMin) === parseInt(this.props.priceMax) ? (
                                            <Price value={this.props.priceMin}/>
                                        ) : (
                                            <Fragment>
                                                От <Price value={this.props.priceMin}/>{" "}
                                                до <Price value={this.props.priceMax}/>{" "}
                                                <Help message="Точная стоимость работ будет определена после оценки сложности"/>
                                            </Fragment>
                                        )}
                                    </Fragment>
                                )}
                            </Label>
                        </SFormGroup>
                    </SCardTitle>
                    {this.props.active && (
                        <SDiv>
                            {this.props.children}
                        </SDiv>
                    )}
                </Card>
            </SCol>
        );
    }
}
