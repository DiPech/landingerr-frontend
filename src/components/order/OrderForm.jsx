import React, {Fragment} from 'react';
import {Button, Col, FormGroup, FormText, Input, Row, Spinner} from "reactstrap";
import OrderCard from "./partial/OrderCard";
import {validateUrl} from "../../util/string";
import {Link} from "react-router-dom";
import {FaHandPointer} from "react-icons/fa";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchLanding} from "../../api/landing";
import {deselectLanding, setArchiveAttached, setSource, setSourceUrl} from "../../store/order/actions";
import {fetchOrderOptions} from "../../api/order";

const SOURCE_URL = "url";
const SOURCE_SHOP = "shop";
const SOURCE_ARCHIVE = "archive";

const OPTION_GROUP_EDIT = "edit";

class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSourceUrlKeyUp = this.handleKeyUp.bind(this, SOURCE_URL);
        this.updateSource = this.updateSource.bind(this);
        this.updateOption = this.updateOption.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isFirstStepValid = this.isFirstStepValid.bind(this);
        this.isSecondStepValid = this.isSecondStepValid.bind(this);
        this.isThirdStepValid = this.isThirdStepValid.bind(this);
        this.isFourthStepValid = this.isFourthStepValid.bind(this);
        this.isOptionSelected = this.isOptionSelected.bind(this);
        this.fetchLandingInfo = this.fetchLandingInfo.bind(this);
        this.fetchOrderOptions = this.fetchOrderOptions.bind(this);
    }
    componentWillMount() {
        this.fetchLandingInfo();
        this.fetchOrderOptions();
    }
    fetchLandingInfo() {
        let landingId = this.props.match.params.hasOwnProperty("landingId") ?
            this.props.match.params.landingId : null;
        if (landingId) {
            if (this.props.landingId !== null && landingId !== this.props.landingId) {
                this.props.deselectLanding();
            }
            if (!this.props.landingId || landingId !== this.props.landingId || this.props.landing === null) {
                this.props.fetchLanding(landingId);
                this.props.setSource(SOURCE_SHOP);
            }
        } else if (this.props.landingId !== null) {
            this.props.setSource(SOURCE_SHOP);
        } else {
            this.props.setSource(SOURCE_URL);
        }
    }
    fetchOrderOptions() {
        if (this.props.options === null) {
            this.props.fetchOrderOptions();
        }
    }
    handleChange(files) {
        this.props.setArchiveAttached(files.length > 0);
    }
    handleKeyUp(type, event) {
        if (type === SOURCE_URL) {
            this.props.setSourceUrl(event.target.value);
        }
    }
    updateSource(value) {
        this.props.setSource(value);
    }
    updateOption(value) {
        // this.props.setSource(value);
    }
    isOptionSelected() {

    }
    isFirstStepValid() {
        if (this.props.source === SOURCE_URL) {
            return validateUrl(this.props.sourceUrl)
        }
        if (this.props.source === SOURCE_SHOP) {
            return this.props.landing !== null;
        }
        if (this.props.source === SOURCE_ARCHIVE) {
            return this.props.isArchiveAttached;
        }
        return true;
    }
    isSecondStepValid() {
        return true;
    }
    isThirdStepValid() {
        return true;
    }
    isFourthStepValid() {
        return true;
    }
    render() {
        return (
            <div>
                <h2>Создание нового заказа</h2>
                <h4>Шаг 1 - Откуда брать лендинг</h4>
                <Row>
                    <OrderCard type="radio"
                               name="source" title="Ввести URL"
                               colNonActive={3} colActive={6}
                               priceMin={300} priceMax={300}
                               active={this.props.source === SOURCE_URL} value={SOURCE_URL}
                               onChange={this.updateSource}>
                        <FormGroup>
                            <Input type="text" name="source" placeholder="Например: https://superlanding.com"
                                   onKeyUp={this.handleSourceUrlKeyUp}/>
                        </FormGroup>
                    </OrderCard>
                    <OrderCard type="radio"
                               name="source" title="Выбрать из магазина"
                               colNonActive={3} colActive={6}
                               priceMin={100} priceMax={100}
                               active={this.props.source === SOURCE_SHOP} value={SOURCE_SHOP}
                               onChange={this.updateSource}>
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
                               colNonActive={3} colActive={6}
                               priceMin={0} priceMax={0}
                               active={this.props.source === SOURCE_ARCHIVE} value={SOURCE_ARCHIVE}
                               onChange={this.updateSource}>
                        <FormGroup>
                            <Input type="file" name="file" accept=".zip,.rar,.7zip,.tar"
                                   onChange={(e) => this.handleChange(e.target.files)}/>
                            <FormText color="muted">
                                Принимаются форматы: <b>zip</b>, <b>rar</b>, <b>7zip</b> и <b>tar</b>.
                            </FormText>
                        </FormGroup>
                    </OrderCard>
                </Row>
                {this.isFirstStepValid() && (
                    <Fragment>
                        <hr/>
                        <h4>Шаг 2 - Обработка лендинга</h4>
                        <Row>
                            {this.props.options === null || this.props.isOptionsLoading ? (
                                <div>
                                    Загрузка данных <Spinner size="sm" color="secondary"/>
                                </div>
                            ) : (
                                <Fragment>
                                    {this.props.options.map((option, i) => {
                                        if (option.group !== OPTION_GROUP_EDIT) {
                                            return (" ");
                                        }
                                        return (
                                            <OrderCard key={i} type="checkbox"
                                                       name="option" title={option.name}
                                                       colNonActive={12} colActive={12}
                                                       priceMin={option.priceMin} priceMax={option.priceMax}
                                                       active={this.isOptionSelected(option.keyword)}
                                                       value={option.keyword}
                                                       onChange={this.updateOption}>
                                            </OrderCard>
                                        )
                                    })}
                                </Fragment>
                            )}
                        </Row>
                        {this.isSecondStepValid() && (
                            <Fragment>
                                <hr/>
                                <h4>Шаг 3 - Выбор интеграций</h4>
                                <Row>
                                    <Col>
                                        Интеграции
                                    </Col>
                                </Row>
                                {this.isThirdStepValid() && (
                                    <Fragment>
                                        <hr/>
                                        <h4>Шаг 4 - Где разместить лендинг</h4>
                                        <Row>
                                            <Col>
                                                Где разместить лендинг
                                            </Col>
                                        </Row>
                                        {this.isFourthStepValid() && (
                                            <Fragment>
                                                <hr/>
                                                <h4>Шаг 5 - Комментарий к заказу</h4>
                                                <Row>
                                                    <Col>
                                                        Комментарий к заказу
                                                    </Col>
                                                </Row>
                                            </Fragment>
                                        )}
                                    </Fragment>
                                )}
                            </Fragment>
                        )}
                    </Fragment>
                )}
            </div>
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
        isOptionsLoading: state.order.isOptionsLoading,
        options: state.order.options,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    setSource,
    setSourceUrl,
    fetchLanding,
    deselectLanding,
    setArchiveAttached,
    fetchOrderOptions
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
