import React, {ScrollView ,View, Text, TextInput, StyleSheet} from "react-native";
import Button from "apsl-react-native-button";
import {Actions} from "react-native-router-flux";
import dismissKeyboard from 'react-native-dismiss-keyboard'

import styles from "./RegisterDetailsStyle"
import API from "../../../api/api"
import FormLoader from "../../../lib/form/FormLoader";

var ResponsiveImage = require('react-native-responsive-image');
var LoadingView = require('react-native-gifted-spinner');

const {
    REGISTER_DETAILS,
    } = require('../../../lib/constants').default;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            user: {
                email: this.props.email,
                phone: this.props.phone,
                password: this.props.password,
                passwordAgain: this.props.passwordAgain
            },
            error: ""
        };
        this.isValid = true;
    }


    /*
     function continue registration
     Checks if the frontend form validation is correct, by triggering validate(data).
     If yes we start fetching via post request and all userinformations from this view and
     the Register-View.
     If everything is fine, the user has successfuly registered his account. User will be pushed
     to Login-View
     */
    async _onRegisterPressed() {
        var data = this.state.user;
        dismissKeyboard();

        var errors = this.refs.form.validate(data);
        if (errors.errors.length == 0) {
            this.isValid = true;
            try {
                let response = await fetch(API.REGISTER_COMPLETE, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: data.email,
                        phoneNumber: data.phone,
                        password: data.password
                    })
                });
                let res = await response.text();
                //console.log('Register-Details-Response: ' + response.text());

                if (response.status >= 200 && response.status < 300) {
                    // no errors so set error in constructor to empty string
                    this.setState({error: ""});
                    Actions.pop();
                    Actions.pop();
                } else {
                    // response is >300 so error will be thrown
                    let error = res;
                    console.log(error);
                    throw error;
                }
            } catch (error) {
                // set error in constructor
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
                            source={require("../../../img/header/registration_header.png")}
                        />
                    </View>
                    <View style={styles.inputs}>
                        <View style={styles.vspinner}>
                            {spinner}
                        </View>
                        <FormLoader ref="form"
                                    formType={REGISTER_DETAILS}
                                    value={this.state.user}
                                    onChange={this.onChange}
                        />
                        <Text style={styles.error}>
                            {this.state.error}
                        </Text>
                    </View>
                    <View style={styles.vbtnRegisterDetails}>
                        <Button
                            onPress={this._onRegisterPressed.bind(this)}
                            style={styles.btnRegisterDetails}
                            isDisabled={this.state.isLoading}>
                            LET'S GO!
                        </Button>
                    </View>
                    <View style={styles.flexContainer}/>
                </ScrollView>
            </View>

        );
    }
}