import {combineReducers} from "redux";
import {authReducer} from "./auth/reducers";
import {userReducer} from "./user/reducers";

export default combineReducers({
    auth: authReducer,
    user: userReducer
});
