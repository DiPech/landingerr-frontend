import React, {Fragment} from 'react';
import {Button, FormGroup, FormText, Input, Row, Spinner} from "reactstrap";
import OrderCard from "./partial/OrderCard";
import {validateUrl} from "../../util/string";
import {Link} from "react-router-dom";
import {FaHandPointer} from "react-icons/fa";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchLanding} from "../../api/landing";
import {deselectLanding, setArchiveAttached, setSource, setSourceUrl} from "../../store/order/actions";

const SOURCE_URL = "url";
const SOURCE_SHOP = "shop";
const SOURCE_ARCHIVE = "archive";

class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSourceUrlKeyUp = this.handleKeyUp.bind(this, SOURCE_URL);
        this.updateSource = this.updateSource.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isFirstStepValid = this.isFirstStepValid.bind(this);
    }
    componentWillMount() {
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
    render() {
        return (
            <div>
                <h2>Создание нового заказа</h2>
                <h4>Шаг 1 - Откуда брать лендинг</h4>
                <Row>
                    <OrderCard name="source" title="Ввести URL"
                               active={this.props.source === SOURCE_URL} value={SOURCE_URL}
                               onChange={this.updateSource}>
                        <FormGroup>
                            <Input type="text" name="source" placeholder="Например: https://superlanding.com"
                                   onKeyUp={this.handleSourceUrlKeyUp}/>
                        </FormGroup>
                    </OrderCard>
                    <OrderCard name="source" title="Выбрать из магазина"
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
                                        Выбран лендинг №{this.props.landing.id} - {this.props.landing.name}<br/><br/>
                                    </Fragment>
                                )}
                                <Link to="/shop">
                                    <Button color="primary" size={this.props.landing !== null ? "sm" : ""}>
                                        <FaHandPointer className="mr-1"/>
                                        Выбрать{this.props.landing !== null ? " другой лендинг" : ""} в магазине
                                    </Button>
                                </Link>
                            </Fragment>
                        )}
                    </OrderCard>
                    <OrderCard name="source" title="Прикрепить архив"
                               active={this.props.source === SOURCE_ARCHIVE} value={SOURCE_ARCHIVE}
                               onChange={this.updateSource}>
                        <FormGroup>
                            <Input type="file" name="file" accept=".zip,.rar,.7zip,.tar"
                                   onChange={ (e) => this.handleChange(e.target.files) }/>
                            <FormText color="muted">
                                Принимаются форматы: <b>zip</b>, <b>rar</b>, <b>7zip</b> и <b>tar</b>.
                            </FormText>
                        </FormGroup>
                    </OrderCard>
                    {this.isFirstStepValid() && (
                        <Fragment>
                            <h4>Шаг 2 - Выбор опций</h4>
                            <div>AKSJdanskdsjan</div>
                        </Fragment>
                    )}
                </Row>
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
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    setSource,
    setSourceUrl,
    fetchLanding,
    deselectLanding,
    setArchiveAttached
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
