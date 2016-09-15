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
    REGISTER_DETAILS
    } = require('./constants').default;

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
            user: {}
        }
    }

    onChange(value) {
        this.state.user = value;
    }

    validate(user) {
        this.state.user = user;
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
        var paypalPasswordCheck = s => s == this.state.user.paypal_password;

        function validateEmail(email) {
            var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Za-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
            return re.test(email);
        }

        function validatePhone(phone) {
            var re= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return re.test(phone);
        }

        function validateText(text) {
            var re = /[A-Z][a-z]+/;
            return re.test(text);
        }

        function validateStreet(street) {
            //var re = /[A-Z][a-zA-Z-\s\S]*[\.]?[\s][0-9]*[a-zA-Z]?/;
            var re = /[A-Z][a-z]+[\s]?((\.)?(\s)(A-Z)(a-z)+)?/;
            return re.test(street);
        }

        //---------- register ----------
        /*
         decl and init of fields for t.struct
         */
        var username = t.refinement(t.String, s=> max8(s));
        var password = t.refinement(t.String, s=>max8(s));
        var passwordAgain = t.refinement(t.String, s=>passwordCheck(s));
        var email = t.refinement(t.String, s=> validateEmail(s));
        var phone = t.refinement(t.String, s=> validatePhone(s));

        /*
         error handling for formfield validation
         */
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
            if (!passwordCheck(s)) {
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

        //---------- register details ----------
        /*
         decl and init of fields for t.struct
         */
        var firstName = t.refinement(t.String, s=> validateText(s));
        var lastName = t.refinement(t.String, s=> validateText(s));
        var city = t.refinement(t.String, s=> validateText(s));
        var street = t.refinement(t.String, s=> validateStreet(s));
        var paypal_passwordAgain = t.refinement(t.String, s=> paypalPasswordCheck(s));

        /*
         error handling for formfield validation
         */


        //---------- register details end ----------
        firstName.getValidationErrorMessage = s => {
            if (!s) {
                return 'Bitte geben Sie Ihren Vornamen ein.';
            }
            if (!validateText(s)) {
                return 'Überprüfen Sie Ihre Eingabe.';
            }
        };

        lastName.getValidationErrorMessage = s => {
            if (!s) {
                return 'Bitte geben Sie Ihren Nachnamen ein.';
            }
            if (!validateText(s)) {
                return 'Überprüfen Sie Ihre Eingabe.';
            }
        };

        street.getValidationErrorMessage = s => {
            if (!s) {
                return 'Bitte geben Sie Ihre Straße ein.';
            }
            if (!validateStreet(s)) {
                return 'Überprüfen Sie Ihre Eingabe.';
            }
        };

        city.getValidationErrorMessage = s => {
            if (!s) {
                return 'Bitte geben Sie Ihren Ort ein.';
            }
            if (!validateText(s)) {
                return 'Überprüfen Sie Ihre Eingabe.';
            }
        };

        paypal_passwordAgain.getValidationErrorMessage = s => {
            if (!s) {
                return 'Bitte geben Sie Ihr PayPal Password erneut ein.';
            }
            if (!paypalPasswordCheck(s)) {
                return 'Passwörter stimmen nicht überein.';
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
                    /*username: username,
                     email: email,
                     password: password,
                     passwordAgain: passwordAgain*/
                    email: email,
                    phone: phone
                });
                options = getOptions(REGISTER);
                options.stylesheet = styles;
                break;

            case(REGISTER_DETAILS):
                formLoader = t.struct({
                    /*firstName: firstName,
                     lastName: lastName,
                     street: street,
                     zip: t.String,
                     city: city,
                     paypal_userName: t.String,
                     paypal_password: t.String,
                     paypal_passwordAgain: paypal_passwordAgain*/
                    password: password,
                    passwordAgain: passwordAgain
                });
                options = getOptions(REGISTER_DETAILS);
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