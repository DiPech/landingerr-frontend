import React, {Fragment} from 'react';
import {validateUrl} from "../../util/string";
import {connect} from "react-redux";
import OrderFirstStep from "./steps/OrderFirstStep";
import OrderFifthStep from "./steps/OrderFifthStep";
import OrderFourthStep from "./steps/OrderFourthStep";
import {hasProps} from "../../util/object";
import {isValidOptionValue} from "./functions";
import {
    OPTION_EDIT_ADD_CLIENT_COUNTERS,
    OPTION_EDIT_CLIENT_CHANGES,
    OPTION_EDIT_EDIT_CONTACTS,
    OPTION_GROUP_INTEGRATIONS,
    OPTION_INTEGRATIONS_COLLECT_LEADS,
    OPTION_INTEGRATIONS_SEND_LEADS_TO_PP,
    OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER,
    OPTION_SOURCE_FROM_ARCHIVE,
    OPTION_SOURCE_FROM_SHOP,
    OPTION_SOURCE_FROM_URL
} from "./constants";
import OrderSecondStep from "./steps/OrderSecondStep";
import OrderThirdStep from "./steps/OrderThirdStep";
import {Button, Spinner} from "reactstrap";
import {FaHandPointRight} from "react-icons/fa";
import {setStepShowStatus} from "../../store/order/actions";
import {bindActionCreators} from "redux";
import {fetchOrderOptions} from "../../api/order";
import {fetchLandingIntegrationPartners, fetchLandingNotificationChannels} from "../../api/landing";

class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.isAllDataFetched = this.isAllDataFetched.bind(this);
        this.isFirstStepValid = this.isFirstStepValid.bind(this);
        this.isSecondStepValid = this.isSecondStepValid.bind(this);
        this.isThirdStepValid = this.isThirdStepValid.bind(this);
        this.isFourthStepValid = this.isFourthStepValid.bind(this);
        this.isStepVisible = this.isStepVisible.bind(this);
        this.showStep = this.showStep.bind(this);
    }
    componentWillMount() {
        if (this.props.options === null) {
            this.props.fetchOrderOptions();
        }
        if (this.props.channels === null) {
            this.props.fetchLandingNotificationChannels();
        }
        if (this.props.partners === null) {
            this.props.fetchLandingIntegrationPartners();
        }
    }
    isAllDataFetched() {
        return !this.props.isOptionsLoading && !this.props.isChannelsLoading && !this.props.isPartnersLoading &&
            this.props.options !== null && this.props.channels !== null && this.props.partners !== null;
    }
    isFirstStepValid() {
        if (this.props.source === OPTION_SOURCE_FROM_URL) {
            return validateUrl(this.props.sourceUrl)
        }
        if (this.props.source === OPTION_SOURCE_FROM_SHOP) {
            return this.props.landing !== null;
        }
        if (this.props.source === OPTION_SOURCE_FROM_ARCHIVE) {
            return this.props.isArchiveAttached;
        }
        return false;
    }
    isSecondStepValid() {
        if (!hasProps(this.props.selectedOptions)) {
            return false;
        }
        let optionsToCheck = [OPTION_EDIT_EDIT_CONTACTS, OPTION_EDIT_ADD_CLIENT_COUNTERS, OPTION_EDIT_CLIENT_CHANGES];
        for (let keyword in this.props.selectedOptions) {
            if (optionsToCheck.includes(keyword)) {
                if (this.props.selectedOptions[keyword].length === 0) {
                    return false;
                }
            }
        }
        return true;
    }
    isThirdStepValid() {
        for (let i in this.props.options) {
            let option = this.props.options[i];
            if (option.group !== OPTION_GROUP_INTEGRATIONS) {
                continue;
            }
            let keyword = option.keyword;
            if (this.props.selectedOptions.hasOwnProperty(keyword)) {
                if (keyword === OPTION_INTEGRATIONS_COLLECT_LEADS) {
                    if (!hasProps(this.props.selectedChannels)) {
                        return false;
                    }
                } else if (keyword === OPTION_INTEGRATIONS_SEND_LEADS_TO_PP) {
                    if (!hasProps(this.props.selectedPartners)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    isFourthStepValid() {
        if (this.props.placement === null) {
            return false;
        }
        if (this.props.placement === OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER) {
            return isValidOptionValue(this.props.selectedOptions, OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER);
        }
        return true;
    }
    isStepVisible(number) {
        return this.props.visibleSteps.hasOwnProperty(number) && this.props.visibleSteps[number] === true;
    }
    showStep(number) {
        this.props.setStepShowStatus(number, true);
    }
    render() {
        let landingId = this.props.match.params.hasOwnProperty("landingId") ?
            this.props.match.params.landingId : null;
        return (
            <Fragment>
                <h2>Создание нового заказа</h2>
                {!this.isAllDataFetched() ? (
                    <div>
                        Загрузка данных <Spinner size="sm" color="secondary"/>
                    </div>
                ) : (
                    <Fragment>
                        <h4>Шаг 1 - Откуда брать лендинг</h4>
                        <OrderFirstStep urlParameterLandingId={landingId}/>
                        {this.isFirstStepValid() && (
                            <Fragment>
                                {!this.isStepVisible(2) ? (
                                    <Button color="primary" outline size="sm" className="mt-2"
                                            onClick={() => this.showStep(2)}>
                                        <FaHandPointRight/> Перейти ко второму шагу
                                    </Button>
                                ) : (
                                    <Fragment>
                                        <hr/>
                                        <h4>Шаг 2 - Обработка лендинга</h4>
                                        <OrderSecondStep/>
                                        {this.isSecondStepValid() && (
                                            <Fragment>
                                                {!this.isStepVisible(3) ? (
                                                    <Button color="primary" outline size="sm" className="mt-2"
                                                            onClick={() => this.showStep(3)}>
                                                        <FaHandPointRight/> Перейти к третьему шагу
                                                    </Button>
                                                ) : (
                                                    <Fragment>
                                                        <hr/>
                                                        <h4>Шаг 3 - Выбор интеграций</h4>
                                                        <OrderThirdStep/>
                                                        {this.isThirdStepValid() && (
                                                            <Fragment>
                                                                {!this.isStepVisible(4) ? (
                                                                    <Button color="primary" outline size="sm"
                                                                            className="mt-2"
                                                                            onClick={() => this.showStep(4)}>
                                                                        <FaHandPointRight/> Перейти к четвёртому шагу
                                                                    </Button>
                                                                ) : (
                                                                    <Fragment>
                                                                        <hr/>
                                                                        <h4>Шаг 4 - Где разместить лендинг</h4>
                                                                        <OrderFourthStep/>
                                                                        {this.isFourthStepValid() && (
                                                                            <Fragment>
                                                                                {!this.isStepVisible(5) ? (
                                                                                    <Button color="primary" outline
                                                                                            size="sm"
                                                                                            className="mt-2"
                                                                                            onClick={() => this.showStep(5)}>
                                                                                        <FaHandPointRight/> Перейти к
                                                                                        пятому
                                                                                        шагу
                                                                                    </Button>
                                                                                ) : (
                                                                                    <Fragment>
                                                                                        <hr/>
                                                                                        <h4>Шаг 5 - Завершение</h4>
                                                                                        <OrderFifthStep/>
                                                                                    </Fragment>
                                                                                )}
                                                                            </Fragment>
                                                                        )}
                                                                    </Fragment>
                                                                )}
                                                            </Fragment>
                                                        )}
                                                    </Fragment>
                                                )}
                                            </Fragment>
                                        )}
                                    </Fragment>
                                )}
                            </Fragment>
                        )}
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        options: state.order.options,
        isOptionsLoading: state.order.isOptionsLoading,
        channels: state.order.channels,
        isChannelsLoading: state.order.isChannelsLoading,
        partners: state.order.partners,
        isPartnersLoading: state.order.isPartnersLoading,
        visibleSteps: state.order.visibleSteps,
        source: state.order.source,
        placement: state.order.placement,
        sourceUrl: state.order.sourceUrl,
        landingId: state.order.landingId,
        landing: state.order.landing,
        selectedOptions: state.order.selectedOptions,
        isArchiveAttached: state.order.isArchiveAttached,
        selectedChannels: state.order.selectedChannels,
        selectedPartners: state.order.selectedPartners,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchOrderOptions,
    fetchLandingNotificationChannels,
    fetchLandingIntegrationPartners,
    setStepShowStatus
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
