import React, {Fragment} from 'react';
import {Row, Spinner} from "reactstrap";
import OrderCard from "../partial/OrderCard";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchOrderOptions} from "../../../api/order";

const OPTION_GROUP_EDIT = "edit";

class OrderSecondStep extends React.Component {
    constructor(props) {
        super(props);
        this.updateOption = this.updateOption.bind(this);
        this.isOptionSelected = this.isOptionSelected.bind(this);
        this.fetchOrderOptions = this.fetchOrderOptions.bind(this);
    }
    componentWillMount() {
        this.fetchOrderOptions();
    }
    fetchOrderOptions() {
        if (this.props.options === null) {
            this.props.fetchOrderOptions();
        }
    }
    updateOption(value) {

    }
    isOptionSelected() {

    }
    render() {
        return (
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOptionsLoading: state.order.isOptionsLoading,
        options: state.order.options,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchOrderOptions
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderSecondStep);
