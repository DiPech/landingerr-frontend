import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "../store/reducers";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Auth from "./auth/Auth";
import Reg from "./auth/Reg";
import Home from "./Home";
import Header from "./common/Header";
import Footer from "./common/Footer";
import OrderList from "./OrderList";
import Shop from "./Shop";
import {ToastProvider} from 'react-toast-notifications';
import Cabinet from "./Cabinet";

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ToastProvider autoDismiss={true} autoDismissTimeout={5000} pauseOnHover={true}>
                    <div className="app">
                        <Router>
                            <Header/>
                            <div className="container">
                                <Switch>
                                    <Route path="/" exact component={Home}/>
                                    <Route path="/orders" component={OrderList}/>
                                    <Route path="/shop" component={Shop}/>
                                    <Route path="/auth" component={Auth}/>
                                    <Route path="/reg" component={Reg}/>
                                    <Route path="/cabinet" component={Cabinet}/>
                                </Switch>
                            </div>
                            <Footer/>
                        </Router>
                    </div>
                </ToastProvider>
            </Provider>
        );
    }
}
