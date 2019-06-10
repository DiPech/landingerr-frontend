import React from "react";
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import rootReducer from "../store/reducers";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Auth from "./auth/Auth";
import Reg from "./auth/Reg";
import Home from "./Home";
import Header from "./page/Header";
import Footer from "./page/Footer";
import OrderList from "./order/OrderList";
import Shop from "./Shop";
import {ToastProvider} from "react-toast-notifications";
import Cabinet from "./Cabinet";
import AuthRequiredRoute from "./other/AuthRequiredRoute";
import thunkMiddleware from "redux-thunk"
import OrderForm from "./order/OrderForm";

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const composedEnhancers = compose(
    middlewareEnhancer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(rootReducer, composedEnhancers);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ToastProvider autoDismiss={true} autoDismissTimeout={5000} pauseOnHover={true}>
                    <Router>
                        <Header/>
                        <div className="container">
                            <Switch>
                                <Route path="/" exact component={Home}/>
                                <AuthRequiredRoute path="/orders" exact component={OrderList}/>
                                <AuthRequiredRoute path="/orders/create/:landingId?" component={OrderForm}/>
                                <Route path="/shop" component={Shop}/>
                                <Route path="/auth" component={Auth}/>
                                <Route path="/reg" component={Reg}/>
                                <AuthRequiredRoute path="/cabinet" component={Cabinet}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </Router>
                </ToastProvider>
            </Provider>
        );
    }
}
