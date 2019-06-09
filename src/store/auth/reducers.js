import {
    AUTH_SET_TOKEN,
    AUTH_CHANGE_EMAIL_TEXT,
    AUTH_CHANGE_PASSWORD_TEXT,
    AUTH_CHANGE_REPEAT_PASSWORD_TEXT
} from "./actions";

const defaultState = {
    token: null,
    email: '',
    password: '',
    repeatPassword: '',
};

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case AUTH_CHANGE_EMAIL_TEXT:
            return {...state, email: action.payload};
        case AUTH_CHANGE_PASSWORD_TEXT:
            return {...state, password: action.payload};
        case AUTH_CHANGE_REPEAT_PASSWORD_TEXT:
            return {...state, repeatPassword: action.payload};
        case AUTH_SET_TOKEN:
            return {...state, token: action.payload};
        default:
            return state;
    }
};
