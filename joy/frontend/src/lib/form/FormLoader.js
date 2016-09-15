/**
 * Created by albanveliu on 13/04/16.
 */
import React, {
    PropTypes,
    StyleSheet
} from 'react-native';

import Immutable from 'immutable';
const {
    LOGIN,
    REGISTER,
    REGISTER_DETAILS,
    SBB
    } = require('../constants').default;

const t = require('tcomb-form-native');
let Form = t.form.Form;

import getOptions from './FormOptions';
import styles from './FormStyle';

export default class FormLoader extends React.Component {
    propTypes:{
        formType: PropTypes.string,
        form: PropTypes.object,
        isLoading: PropTypes.boolean,
        value: PropTypes.object,
        onChange: PropTypes.func
        };

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = {
            user: {},
            passengerSeat: {}
        }
    }

    onChange(value) {
        this.state.user = value;
    }

    validate(user) {
        this.state.user = user;
        return this.refs.form.validate();
    }

    validateSBB(passengerSeat){
        this.state.passengerSeat = passengerSeat;
        return this.refs.form.validate();
    }

    render() {

        /*
         decl options for form
         */
        let options = {};

        /*
         expressions for t.struct fields
         */
        var max8 = s => s.length <= 8;
        var passwordCheck = s => s == this.state.user.password;

        function validateEmail(email) {
            var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Za-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
            return re.test(email);
        }

        function validatePhone(phone) {
            var re= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return re.test(phone);
        }

        function validatePassengerSeat(number){
            var re= /^[0-9]*$/gm;
            return re.test(number);
        }

        //---------- register ----------
        /*
         decl and init of fields for t.struct
         */
        var password = t.refinement(t.String, s=>max8(s));
        var passwordAgain = t.refinement(t.String, s=>passwordCheck(s));
        var email = t.refinement(t.String, s=> validateEmail(s));
        var phone = t.refinement(t.String, s=> validatePhone(s));
        var passengerSeat = t.refinement(t.String, s=> validatePassengerSeat(s));

        /*
         error handling for formfield validation
         */
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
            if (!passwordCheck(s)) {
                return 'Passwörter stimmen nicht überein.';
            }
        };

        email.getValidationErrorMessage = s => {
            if (!s) {
                return 'Bitte geben Sie Ihre E-Mail ein.'
            }
            if (!validateEmail(s)) {
                return 'Bitte geben Sie eine gültige E-Mail ein.'
            }
        };

        phone.getValidationErrorMessage = s => {
            if(!s){
                return "Bitte geben Sie Ihre Telefonnummer ein.";
            }
            if(!validatePhone(s)){
                return "Bitte geben Sie eine gültige Telefonnummer ein.";
            }
        };
        //---------- register end ----------

        passengerSeat.getValidationErrorMessage = s => {
            if(!s){
                return "Bitte geben Sie Ihre Sitznummer ein.";
            }
            if(!validatePassengerSeat(s)){
                return "Bitte geben Sie eine gültige Sitznummer ein.";
            }
        };


        let formType = this.props.formType;
        switch (formType) {
            case(LOGIN):
                formLoader = t.struct({
                    email: email,
                    password: t.String
                });
                options = getOptions(LOGIN);
                options.stylesheet = styles;
                break;

            case(REGISTER):
                formLoader = t.struct({
                    email: email,
                    phone: phone
                });
                options = getOptions(REGISTER);
                options.stylesheet = styles;
                break;

            case(REGISTER_DETAILS):
                formLoader = t.struct({
                    password: password,
                    passwordAgain: passwordAgain
                });
                options = getOptions(REGISTER_DETAILS);
                options.stylesheet = styles;
                break;

            case(SBB):
                formLoader = t.struct({
                    passengerSeat: passengerSeat
                });
                options = getOptions(SBB);
                options.stylesheet = styles;
                break;
        }
        return (
            <Form ref="form"
                  type={formLoader}
                  options={options}
                  value={this.props.value}
                  onChange={this.props.onChange}
            />
        );
    }
}