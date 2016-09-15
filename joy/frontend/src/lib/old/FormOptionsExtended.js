'use strict';
var React = require('react-native');
var {StyleSheet} = React;

const {
    LOGIN,
    REGISTER,
    REGISTER_DETAILS
    } = require('./constants').default;

import Immutable from 'immutable';
const t = require('tcomb-form-native');

export default function getOptions(type) {
    let options = {
        auto: 'none',
        fields: {}
    };
    switch (type) {
        case LOGIN:
            let emailLoginOpt = {
                placeholder: 'email',
                autoCapitalize: 'none',
                autoCorrect: false,
                keyboardType: 'email-address',
                hasError: false
            };
            let passwordLoginOpt = {
                placeholder: 'password',
                autoCorrect: false,
                password: true,
                error: "Bitte geben Sie Ihr Passwort ein.",
                hasError: false
            };
            options.fields['email'] = emailLoginOpt;
            options.fields['password'] = passwordLoginOpt;
            return options;
            break;
        case REGISTER:
            let usernameRegisterOpt = {
                placeholder: 'Username',
                autoCorrect: false,
                hasError: false
            };

            let emailOpt = {
                placeholder: 'email',
                autoCapitalize: 'none',
                autoCorrect: false,
                keyboardType: 'email-address',
                hasError: false
            };

            let passwordRegisterOpt = {
                placeholder: 'Passwort',
                autoCorrect: false,
                password: true,
                hasError: false
            };

            let passwordAgainOpt = {
                placeholder: 'Passwort erneut eingeben',
                autoCorrect: false,
                password: true,
                equality: 'password',
                hasError: false
            };
            options.fields['username'] = usernameRegisterOpt;
            options.fields['password'] = passwordRegisterOpt;
            options.fields['passwordAgain'] = passwordAgainOpt;
            return options;

        case REGISTER_DETAILS:
            let firstNameOpt = {
                placeholder: 'Vorname',
                autoCorrect: false,
                hasError: false
            };

            let lastNameOpt = {
                placeholder: 'Name',
                autoCorrect: false,
                hasError: false
            };

            let streetOpt = {
                placeholder: "Straße",
                autoCorrect: false,
                hasError: false
            };

            let zipOpt = {
                placeholder: "Postleitzahl",
                autoCorrect: false,
                keyboardType: 'number-pad',
                error: "Bitte geben Sie ihre Postleitzahl ein",
                hasError: false
            };

            let cityOpt = {
                placeholder: "Stadt",
                autoCorrect: false,
                hasError: false
            };

            let paypal_usernameOpt = {
                placeholder: 'PayPal Username',
                autoCorrect: false,
                error: "Bitte geben Sie Ihren PayPal Usernamen ein.",
                hasError: false
            };

            let paypal_passwordOpt = {
                placeholder: 'PayPal Passwort',
                autoCorrect: false,
                password: true,
                error: "Bitte geben Sie Ihr PayPal Password ein.",
                hasError: false
            };

            let paypal_passwordAgainOpt = {
                placeholder: 'PayPal Passwort erneut eingeben',
                autoCorrect: false,
                password: true,
                hasError: false
            };


            options.fields['firstName'] = firstNameOpt;
            options.fields['lastName'] = lastNameOpt;
            options.fields['street'] = streetOpt;
            options.fields['zip'] = zipOpt;
            options.fields['city'] = cityOpt;
            options.fields['paypal_userName'] = paypal_usernameOpt;
            options.fields['paypal_password'] = paypal_passwordOpt;
            options.fields['paypal_passwordAgain'] = paypal_passwordAgainOpt;

            return options;
    }
};