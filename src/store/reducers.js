import {combineReducers} from "redux";
import {authReducer} from "./auth/reducers";
import {userReducer} from "./user/reducers";
import {shopReducer} from "./shop/reducers";

export default combineReducers({
    shop: shopReducer,
    auth: authReducer,
    user: userReducer
});
