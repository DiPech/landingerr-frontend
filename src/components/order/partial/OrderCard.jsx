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
    transition: all .2s linear;
`;
const SCardTitle = styled(CardTitle)`
    margin-bottom: 0;
`;
const SDiv = styled.div`
    transition: all .2s linear;
    opacity: 0; 
    max-height: 0;
    overflow: hidden;
    margin-top: 0;
    &.active {
        margin-top: 10px;
        opacity: 1;
        max-height: 2000px;
    }
`;

export default class OrderCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getCardColor = this.getCardColor.bind(this);
        this.showContent = this.showContent.bind(this);
    }
    handleChange(event) {
        this.props.onChange(event.target.checked, this.props.value);
    }
    getCardColor() {
        if (this.props.active) {
            if (this.props.error) {
                return "warning";
            }
            return "success";
        }
        return "secondary";
    }
    showContent() {
        return this.props.active && this.props.children
    }
    render() {
        return (
            <SCol xs={12} sm={this.props.active ? this.props.colActive : this.props.colNonActive}>
                <Card body outline color={this.getCardColor()}>
                    <SCardTitle>
                        <SFormGroup check>
                            <Input type={this.props.type} name={"input_" + this.props.name}
                                   id={"input-radio-source-" + this.props.value}
                                   value={this.props.value}
                                   checked={this.props.active}
                                   onChange={this.handleChange}/>
                            <Label className="mb-0" for={"input-radio-source-" + this.props.value}
                                   check={this.props.active}>
                                {this.props.title}
                                {this.props.titleHelp && (
                                    <Fragment>
                                        {" "}<Help
                                        message={this.props.titleHelp}/>
                                    </Fragment>
                                )}
                                {!this.props.withoutPrice && (
                                    <Fragment>
                                        {" "}–{" "}
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
                                                        <Help
                                                            message="Точная стоимость работ будет определена после оценки сложности"/>
                                                    </Fragment>
                                                )}
                                            </Fragment>
                                        )}
                                    </Fragment>
                                )}
                            </Label>
                            {this.props.description && (
                                <Fragment>
                                    <br/><small className="d-block text-muted">{this.props.description}</small>
                                </Fragment>
                            )}
                        </SFormGroup>
                    </SCardTitle>
                    <SDiv className={this.showContent() ? "active" : ""}>
                        {this.props.children}
                    </SDiv>
                </Card>
            </SCol>
        );
    }
}
