import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "../store/reducers";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AuthorizationContainer from "./AuthorizationContainer";
import RegistrationContainer from "./RegistrationContainer";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import OrderList from "./OrderList";
import Shop from "./Shop";

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="app">
                    <Router>
                        <Header/>
                        <div className="container">
                            <Switch>
                                <Route path="/" exact component={Home}/>
                                <Route path="/orders" component={OrderList}/>
                                <Route path="/shop" component={Shop}/>
                                <Route path="/auth" component={AuthorizationContainer}/>
                                <Route path="/reg" component={RegistrationContainer}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </Router>
                </div>
            </Provider>
        );
    }
}
