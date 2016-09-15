'use strict';
import React from "react-native";

const {
    LOGIN,
    REGISTER,
    REGISTER_DETAILS
    } = require('./constants').default;

import Immutable from 'immutable';
const t = require('tcomb-form-native');

let userStruct;

export default class UserStruct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            passwordAgain: this.props.passwordAgain
        }
    }

    /*
     expressions for t.struct fields
     */


    validatePassword(s) {
        s == this.state.passwordAgain;
    }

    max8(s) {
        s.length <= 8;
    }

    validateEmail(email) {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Za-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
        return re.test(email);
    }

    getUserStruct(type, passwordCheck) {
        switch (type) {
            case REGISTER:
                var username = t.refinement(t.String, s=> max8(s));
                var password = t.refinement(t.String, s=>max8(s));
                var passwordAgain = t.refinement(t.String, s=>validatePassword(s));
                var email = t.refinement(t.String, s=> validateEmail(s));
                console.log("passwordcheck: " + passwordCheck);
                console.log("password: " + password);


                username.getValidationErrorMessage = s => {
                    if (!s) {
                        return 'Bitte geben Sie einen Usernamen an.';
                    }
                    if (!max8(s)) {
                        return 'Der Username darf maximal 8 Zeichen lang sein';
                    }
                };

                password.getValidationErrorMessage = s => {
                    if (!s) {
                        return 'Bitte geben Sie ein Passwort an.';
                    }
                    if (!max8(s)) {
                        return 'Das Passwort darf maximal 8 Zeichen lang sein';
                    }
                };

                passwordAgain.getValidationErrorMessage = s => {
                    if (!s) {
                        return 'Bitte geben Sie das Passwort erneut ein.';
                    }
                    if (!validatePassword(s)) {
                        return 'Passwörter stimmen nicht überein.';
                    }
                };

                email.getValidationErrorMessage = s => {
                    if (!s) {
                        return 'Bitte geben Sie eine E-Mail ein.'
                    }
                    if (!validateEmail(s)) {
                        return 'Bitte geben Sie eine gültige E-Mail ein.'
                    }
                }

                userStruct = t.struct({
                    username: username,
                    email: email,
                    password: password,
                    passwordAgain: passwordAgain
                });
                console.log(userStruct);
                return userStruct;

        }
    }

};