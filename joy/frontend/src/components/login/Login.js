import React, {View, ListView, Text, Image, ScrollView, TextInput, AsyncStorage} from "react-native";
import Button from "apsl-react-native-button";
import {Actions} from "react-native-router-flux";
import dismissKeyboard from 'react-native-dismiss-keyboard'

import FormLoader from "../../lib/form/FormLoader";
import styles from "./LoginStyle"
import API from "../../api/api";

var ResponsiveImage = require('react-native-responsive-image');
var LoadingView = require('react-native-gifted-spinner');

const {
    LOGIN,
    } = require('../../lib/constants').default;
const ACCESS_TOKEN = 'access_token';

const MAIL = "mail";

export default class extends React.Component {
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

    componentWillMount(){
        this.getMail();
    }

    /*
     function storeToken:
     Token will be stored in local storage of device
     */
    async storeToken(accessToken) {
        try {
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            this.getToken();
        } catch (error) {
            console.log("something went wrong")
        }
    }

    /*
     function getToken:
     Get token from local storage of device.
     */
    async getToken() {
        try {
            let token = await AsyncStorage.getItem(ACCESS_TOKEN);
            console.log("token is: " + token);
        } catch (error) {
            console.log("something went wrong")
        }
    }

    /*
     function removeToken:
     Remove token from local storage of device.
     */
    async removeToken() {
        try {
            await AsyncStorage.removeItem(ACCESS_TOKEN);
            this.getToken();
        } catch (error) {
            console.log("something went wrong")
        }
    }

    async storeMail(mail){
        try {
            await AsyncStorage.setItem(MAIL, mail);
            console.log("mail is: " + mail);

        } catch (error){
            console.log(MAIL+": something went wrong")
        }
    }

    async getMail(){
        try {
            let mail = await AsyncStorage.getItem(MAIL);
            console.log("mail is: " + mail);

            if(mail != null){
                this.setState({
                    user: {email: mail}
                })
            }else{
                this.setState({
                    user: {email: ""}
                })
            }
        } catch (error){
            console.log(MAIL+": something went wrong")
        }
    }

    /*
     function logn:
     Checks if the frontend form validation is correct, by triggering validate(data).
     If yes start fetching via get request and username + password.
     On successful storeToken(accessToken) will be triggered and user will be pushed
     to Home-View.
     */
    async _onLoginPressed() {
        var data = this.state.user;
        dismissKeyboard();
        this.setState({isLoading: true});
        var errors = this.refs.form.validate(data);
        if (errors.errors.length == 0) {
            this.isValid = true;
            try {
                let response = await fetch(API.LOGIN + '?email=' +
                    this.state.user.email + '&password=' + this.state.user.password, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                let res = await response.text();
                if (response.status >= 200 && response.status < 300) {
                    // success
                    var user = JSON.parse(res);
                    // no errors so set error in constructor to empty string
                    this.storeToken(user.jwt);
                    this.storeMail(user.email);
                    this.setState(
                        {
                            isLoading: false,
                            error: ""
                        }
                    );

                    Actions.shopping({user: user});
                } else {
                    // response is >300 so error will be thrown
                    let error = res;
                    throw error;
                }
            } catch (error) {
                this.setState({isLoading: false});
                // trigger removeToken
                this.removeToken();
                // set the error in constructor
                var errorMessage = JSON.parse(error);
                this.setState({error: errorMessage.message});
                console.log("Error in Login: " + error);
            }
        } else {
            this.setState({isLoading: false});
            this.isValid = false;
        }
    }

    /*function onChange:
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
                <View style={styles.flexContainer}/>
                <View style={styles.vheader}>
                    <ResponsiveImage
                        initWidth="160"
                        initHeight="129"
                        source={require("../../img/header/login_header.png")}
                    />
                </View>
                <View style={styles.inputs}>
                    <View style={styles.vspinner}>
                        {spinner}
                    </View>
                    <View >
                        <FormLoader ref="form"
                                    formType={LOGIN}
                                    value={this.state.user}
                                    onChange={this.onChange}
                                    style={styles.inputContainer}
                        />
                    </View>
                    <Text style={styles.error}>
                        {this.state.error}
                    </Text>
                </View>

                <View style={styles.vbtnLogin}>
                    <Button
                        onPress={this._onLoginPressed.bind(this)}
                        style={styles.btnLogin}
                        isDisabled={this.state.isLoading}
                        >
                        LOGIN
                    </Button>
                </View>
                <View style={styles.flexContainer}/>
            </View>
        );
    }
}