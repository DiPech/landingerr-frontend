import React, {Fragment} from 'react';
import {Button, FormGroup, FormText, Input, Row, Spinner} from "reactstrap";
import OrderCard from "../partial/OrderCard";
import {Link} from "react-router-dom";
import {FaHandPointer} from "react-icons/fa";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchLanding} from "../../../api/landing";
import {deselectLanding, removeOption, setArchiveAttached, setOption, setSourceUrl} from "../../../store/order/actions";
import {getOptionDescription, updateSource} from "../functions";
import {validateUrl} from "../../../util/string";
import {OPTION_SOURCE_FROM_ARCHIVE, OPTION_SOURCE_FROM_SHOP, OPTION_SOURCE_FROM_URL} from "../constants";
import Col from "reactstrap/es/Col";

class OrderFirstStep extends React.Component {
    constructor(props) {
        super(props);
        this.handleSourceUrlKeyUp = this.handleKeyUp.bind(this, OPTION_SOURCE_FROM_URL);
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleSourceArchiveChange = this.handleSourceArchiveChange.bind(this);
        this.fetchLandingInfo = this.fetchLandingInfo.bind(this);
    }
    componentWillMount() {
        this.fetchLandingInfo();
    }
    handleSourceArchiveChange(files) {
        this.props.setArchiveAttached(files.length > 0);
    }
    handleKeyUp(type, event) {
        if (type === OPTION_SOURCE_FROM_URL) {
            this.props.setSourceUrl(event.target.value);
        }
    }
    handleSourceChange(state, value) {
        if (state) {
            updateSource(value);
        }
    }
    fetchLandingInfo() {
        let landingId = this.props.urlParameterLandingId;
        if (landingId) {
            if (this.props.landingId !== null && landingId !== this.props.landingId) {
                this.props.deselectLanding();
            }
            if (!this.props.landingId || landingId !== this.props.landingId || this.props.landing === null) {
                this.props.fetchLanding(landingId);
                updateSource(OPTION_SOURCE_FROM_SHOP);
            }
        } else if (this.props.landingId !== null) {
            updateSource(OPTION_SOURCE_FROM_SHOP);
        }
    }
    render() {
        return (
            <Row>
                {this.props.options === null || this.props.isOptionsLoading ? (
                    <Col>
                        Загрузка данных <Spinner size="sm" color="secondary"/>
                    </Col>
                ) : (
                    <Fragment>
                        <OrderCard type="radio"
                                   name="source" title="Ввести URL"
                                   description={getOptionDescription(this.props.options, OPTION_SOURCE_FROM_URL)}
                                   colNonActive={3} colActive={6} colNoOne={4}
                                   noOneSelected={this.props.source === null}
                                   priceMin={300} priceMax={300}
                                   active={this.props.source === OPTION_SOURCE_FROM_URL} value={OPTION_SOURCE_FROM_URL}
                                   error={!validateUrl(this.props.sourceUrl)}
                                   onChange={this.handleSourceChange}>
                            <FormGroup>
                                <Input type="text" name="source" placeholder="Например: https://superlanding.com"
                                       onKeyUp={this.handleSourceUrlKeyUp}/>
                            </FormGroup>
                        </OrderCard>
                        <OrderCard type="radio"
                                   name="source" title="Выбрать из магазина"
                                   description={getOptionDescription(this.props.options, OPTION_SOURCE_FROM_SHOP)}
                                   colNonActive={3} colActive={6} colNoOne={4}
                                   noOneSelected={this.props.source === null}
                                   priceMin={100} priceMax={100}
                                   active={this.props.source === OPTION_SOURCE_FROM_SHOP}
                                   value={OPTION_SOURCE_FROM_SHOP}
                                   error={this.props.landing === null}
                                   onChange={this.handleSourceChange}>
                            {this.props.isLandingLoading ? (
                                <div>
                                    Загрузка данных <Spinner size="sm" color="secondary"/>
                                </div>
                            ) : (
                                <Fragment>
                                    {this.props.landing !== null && (
                                        <Fragment>
                                            Выбран лендинг №{this.props.landing.id} - {this.props.landing.name}<br/>
                                        </Fragment>
                                    )}
                                    <Link to="/shop">
                                        <Button color="primary" size={this.props.landing !== null ? "sm" : ""}
                                                className="mt-2">
                                            <FaHandPointer className="mr-1"/>
                                            Перейти к выбору{this.props.landing !== null ? " другого лендинга" : ""} в
                                            магазине
                                        </Button>
                                    </Link>
                                </Fragment>
                            )}
                        </OrderCard>
                        <OrderCard type="radio"
                                   name="source" title="Прикрепить архив"
                                   description={getOptionDescription(this.props.options, OPTION_SOURCE_FROM_ARCHIVE)}
                                   colNonActive={3} colActive={6} colNoOne={4}
                                   noOneSelected={this.props.source === null}
                                   priceMin={0} priceMax={0}
                                   active={this.props.source === OPTION_SOURCE_FROM_ARCHIVE}
                                   value={OPTION_SOURCE_FROM_ARCHIVE}
                                   error={!this.props.isArchiveAttached}
                                   onChange={this.handleSourceChange}>
                            <FormGroup>
                                <Input type="file" name="file" accept=".zip,.rar,.7zip,.tar"
                                       onChange={(e) => this.handleSourceArchiveChange(e.target.files)}/>
                                <FormText color="muted">
                                    Принимаются форматы: <b>zip</b>, <b>rar</b>, <b>7zip</b> и <b>tar</b>.
                                </FormText>
                            </FormGroup>
                        </OrderCard>
                    </Fragment>
                )}
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        source: state.order.source,
        sourceUrl: state.order.sourceUrl,
        landingId: state.order.landingId,
        landing: state.order.landing,
        isLandingLoading: state.order.isLandingLoading,
        isArchiveAttached: state.order.isArchiveAttached,
        options: state.order.options,
        isOptionsLoading: state.order.isOptionsLoading,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    setSourceUrl,
    fetchLanding,
    deselectLanding,
    setArchiveAttached,
    setOption,
    removeOption,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderFirstStep);
