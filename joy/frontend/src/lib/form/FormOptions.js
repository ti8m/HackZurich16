'use strict';
var React = require('react-native');
var {StyleSheet} = React;

const {
    LOGIN,
    REGISTER,
    REGISTER_DETAILS,
    SBB
    } = require('../constants').default;

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
            let emailOpt = {
                placeholder: 'email',
                autoCapitalize: 'none',
                autoCorrect: false,
                keyboardType: 'email-address',
                hasError: false
            };

            let phoneOpt = {
                placeholder: 'phone',
                autoCapitalize: 'none',
                autoCorrect: false,
                keyboardType: 'phone-pad',
                hasError: false
            };
            options.fields['email'] = emailOpt;
            options.fields['phone'] = phoneOpt;
            return options;

        case REGISTER_DETAILS:

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
            options.fields['password'] = passwordRegisterOpt;
            options.fields['passwordAgain'] = passwordAgainOpt;
            return options;

        case SBB:
            let passengerSeatOpt = {
                placeholder: 'Sitznummer',
                autoCapitalize: 'none',
                autoCorrect: false,
                keyboardType: 'numeric',
                hasError: false
            };
            options.fields['passengerSeat'] = passengerSeatOpt;
            return options;
    }
};