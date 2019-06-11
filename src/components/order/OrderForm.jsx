import React, {Fragment} from 'react';
import {validateUrl} from "../../util/string";
import {connect} from "react-redux";
import OrderFirstStep, {SOURCE_ARCHIVE, SOURCE_SHOP, SOURCE_URL} from "./steps/OrderFirstStep";
import OrderSecondStep from "./steps/OrderSecondStep";
import OrderThirdStep from "./steps/OrderThirdStep";
import OrderFifthStep from "./steps/OrderFifthStep";
import OrderFourthStep from "./steps/OrderFourthStep";

class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.isFirstStepValid = this.isFirstStepValid.bind(this);
        this.isSecondStepValid = this.isSecondStepValid.bind(this);
        this.isThirdStepValid = this.isThirdStepValid.bind(this);
        this.isFourthStepValid = this.isFourthStepValid.bind(this);
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
                        <OrderSecondStep/>
                        {this.isSecondStepValid() && (
                            <Fragment>
                                <hr/>
                                <h4>Шаг 3 - Выбор интеграций</h4>
                                <OrderThirdStep/>
                                {this.isThirdStepValid() && (
                                    <Fragment>
                                        <hr/>
                                        <h4>Шаг 4 - Где разместить лендинг</h4>
                                        <OrderFourthStep/>
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
        sourceUrl: state.order.sourceUrl,
        landingId: state.order.landingId,
        landing: state.order.landing,
        isArchiveAttached: state.order.isArchiveAttached,
    };
};

export default connect(mapStateToProps)(OrderForm);
