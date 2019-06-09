export const AUTH_CHANGE_EMAIL_TEXT = 'AUTH_CHANGE_EMAIL_TEXT';
export const AUTH_CHANGE_PASSWORD_TEXT = 'AUTH_CHANGE_PASSWORD_TEXT';
export const AUTH_CHANGE_REPEAT_PASSWORD_TEXT = 'AUTH_CHANGE_REPEAT_PASSWORD_TEXT';
export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN';

export const setEmailText = (email) => ({
    type: AUTH_CHANGE_EMAIL_TEXT,
    payload: email
});
export const setPasswordText = (password) => ({
    type: AUTH_CHANGE_PASSWORD_TEXT,
    payload: password
});
export const setRepeatPasswordText = (password) => ({
    type: AUTH_CHANGE_REPEAT_PASSWORD_TEXT,
    payload: password
});
export const setToken = (token) => ({
    type: AUTH_SET_TOKEN,
    payload: token
});
