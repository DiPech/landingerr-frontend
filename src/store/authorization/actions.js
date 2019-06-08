export const AUTHORIZATION_CHANGE_EMAIL_TEXT = 'AUTHORIZATION_CHANGE_EMAIL_TEXT';
export const AUTHORIZATION_CHANGE_PASSWORD_TEXT = 'AUTHORIZATION_CHANGE_PASSWORD_TEXT';

export const setEmailText = (email) => ({
    type: AUTHORIZATION_CHANGE_EMAIL_TEXT,
    payload: email
});

export const setPasswordText = (password) => ({
    type: AUTHORIZATION_CHANGE_PASSWORD_TEXT,
    payload: password
});
