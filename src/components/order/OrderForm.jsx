import React, {Fragment} from 'react';
import {validateUrl} from "../../util/string";
import {connect} from "react-redux";
import OrderFirstStep, {SOURCE_ARCHIVE, SOURCE_SHOP, SOURCE_URL} from "./steps/OrderFirstStep";
import OrderSecondStep, {
    OPTION_ADD_CLIENT_COUNTERS,
    OPTION_CLIENT_CHANGES,
    OPTION_EDIT_CONTACTS
} from "./steps/OrderSecondStep";
import OrderThirdStep, {
    OPTION_COLLECT_LEADS,
    OPTION_GROUP_INTEGRATIONS,
    OPTION_SEND_LEADS_TO_PP
} from "./steps/OrderThirdStep";
import OrderFifthStep from "./steps/OrderFifthStep";
import OrderFourthStep, {OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER} from "./steps/OrderFourthStep";
import {hasProps} from "../../util/object";
import {isValidOptionValue} from "./functions";

class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.rerender = this.rerender.bind(this);
        this.isFirstStepValid = this.isFirstStepValid.bind(this);
        this.isSecondStepValid = this.isSecondStepValid.bind(this);
        this.isThirdStepValid = this.isThirdStepValid.bind(this);
        this.isFourthStepValid = this.isFourthStepValid.bind(this);
    }
    rerender() {
        this.forceUpdate();
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
        if (!hasProps(this.props.selectedOptions)) {
            return false;
        }
        let optionsToCheck = [OPTION_EDIT_CONTACTS, OPTION_ADD_CLIENT_COUNTERS, OPTION_CLIENT_CHANGES];
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
                if (keyword === OPTION_COLLECT_LEADS) {
                    if (!hasProps(this.props.selectedChannels)) {
                        return false;
                    }
                } else if (keyword === OPTION_SEND_LEADS_TO_PP) {
                    if (!hasProps(this.props.selectedPartners)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    isFourthStepValid() {
        if (this.props.placement === OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER) {
            return isValidOptionValue(this.props.selectedOptions, OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER);
        }
        return true;
    }
    render() {
        let landingId = this.props.match.params.hasOwnProperty("landingId") ?
            this.props.match.params.landingId : null;
        return (
            <div>
                <h2>Создание нового заказа</h2>
                <h4>Шаг 1 - Откуда брать лендинг</h4>
                <OrderFirstStep urlParameterlandingId={landingId}/>
                {this.isFirstStepValid() && (
                    <Fragment>
                        <hr/>
                        <h4>Шаг 2 - Обработка лендинга</h4>
                        <OrderSecondStep rerenderParent={this.rerender}/>
                        {this.isSecondStepValid() && (
                            <Fragment>
                                <hr/>
                                <h4>Шаг 3 - Выбор интеграций</h4>
                                <OrderThirdStep rerenderParent={this.rerender}/>
                                {this.isThirdStepValid() && (
                                    <Fragment>
                                        <hr/>
                                        <h4>Шаг 4 - Где разместить лендинг</h4>
                                        <OrderFourthStep rerenderParent={this.rerender}/>
                                        {this.isFourthStepValid() && (
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        source: state.order.source,
        placement: state.order.placement,
        sourceUrl: state.order.sourceUrl,
        landingId: state.order.landingId,
        landing: state.order.landing,
        selectedOptions: state.order.selectedOptions,
        isArchiveAttached: state.order.isArchiveAttached,
        options: state.order.options,
        selectedChannels: state.order.selectedChannels,
        selectedPartners: state.order.selectedPartners,
    };
};

export default connect(mapStateToProps)(OrderForm);
