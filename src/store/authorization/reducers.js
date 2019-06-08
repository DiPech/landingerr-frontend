import {AUTHORIZATION_CHANGE_EMAIL_TEXT, AUTHORIZATION_CHANGE_PASSWORD_TEXT} from "./actions";

const defaultState = {
    email: '',
    password: ''
};

export const authorizationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case AUTHORIZATION_CHANGE_EMAIL_TEXT:
            return { ...state, email: action.payload };
        case AUTHORIZATION_CHANGE_PASSWORD_TEXT:
            return { ...state, password: action.payload };
        default: return state;
    }
};
