import React, { ScrollView, View, Text, StyleSheet} from "react-native";
import Button from "apsl-react-native-button";
import {Actions} from "react-native-router-flux";
import dismissKeyboard from 'react-native-dismiss-keyboard'

import styles from "./RegisterStyle"
import FormLoader from "../../lib/form/FormLoader";
import API from "../../api/api";

var ResponsiveImage = require('react-native-responsive-image');
var LoadingView = require('react-native-gifted-spinner');

const {
    REGISTER,
    } = require('../../lib/constants').default;


export default class Register extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = {
            user: {},
            isLoading: false,
            error: ""
        };
        this.isValid = true;
    }


    /*
     function continue registration
     Checks if the frontend form validation is correct, by triggering validate(data).
     If yes we start fetching via post request and username + email.
     If the username or email doesn't exist the data fetch was successful.
     Then we push our userinformation to RegisterDetails-View, where the
     next step of the the registration goes on.
     */
    gogogo() {
        var value = this.state.user;
        Actions.registerDetails(value);
    }

    async _continueRegistration() {
        var value = this.state.user;
        dismissKeyboard();

        var errors = this.refs.form.validate(value);
        if (errors.errors.length == 0) {
            this.isValid = true;
            try {
                let response = await fetch(API.REGISTER, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: value.email,
                        phoneNumber: value.phone
                    })
                });
                let res = await response.text();
                //console.log('Register-Response: ' + response.text());

                if (response.status >= 200 && response.status < 300) {
                    // no errors so set error in constructor to empty string
                    this.setState({error: ""});
                    Actions.registerDetails(value);
                } else {
                    // response is >300 so error will be thrown
                    let error = res;
                    console.log(error);
                    throw error;
                }
            } catch (error) {
                // set the error in constructor
                this.setState({error: error});
                console.log("Error in Register: " + error);
            }
        }
        else {
            this.isValid = false;
        }
    }

    /*
     function onChange:
     is needed for the FormLoader. If the validation of formfields was incorrect
     we check on change of each field if the validation is now correct or not.
     This triggers the validate(value) function, which checks if the fields are
     valid or not. If not, the user gets the error message displayed.
     */
    onChange(value) {
        this.state.user = value;
        if (!this.isValid) {
            this.refs.form.validate(value);
        }
    }

    render() {
        let spinner = <View></View>;
        if (this.state.isLoading) {
            spinner = <LoadingView />;
        }
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollStyle}
                    contentContainerStyle={styles.container}
                >
                    <View style={styles.flexContainer}/>
                    <View style={styles.vheader}>
                        <ResponsiveImage
                            initWidth="160"
                            initHeight="127"
                            source={require("../../img/header/registration_header.png")}
                        />
                    </View>
                    <View style={styles.inputs}>
                        <View style={styles.vspinner}>
                            {spinner}
                        </View>
                        <FormLoader ref="form"
                                    formType={REGISTER}
                                    value={this.state.user}
                                    onChange={this.onChange}
                        />
                        <Text style={styles.error}>
                            {this.state.error}
                        </Text>
                    </View>
                    <View style={styles.vbtnRegister}>
                        <Button onPress={this._continueRegistration.bind(this)}
                                style={styles.btnRegister}
                                isDisabled={this.state.isLoading}>
                            CREATE PASSWORD
                        </Button>
                    </View>
                    <View style={styles.flexContainer}/>
                </ScrollView>

            </View>
        );
    }
}