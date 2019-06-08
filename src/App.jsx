import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./store/reducers"
import AuthorizationContainer from "./components/AuthorizationContainer";
import RegistrationContainer from "./components/RegistrationContainer";

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="app">
                    <h1>Landingerr</h1>
                    <AuthorizationContainer/>
                    <RegistrationContainer/>
                </div>
            </Provider>
        );
    }
}
