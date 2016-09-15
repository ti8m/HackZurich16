/**
 * Created by albanveliu on 27/05/16.
 */
import React, {Image, View, TouchableOpacity, Text, StyleSheet} from "react-native";
import Button from "apsl-react-native-button";
import {Actions} from "react-native-router-flux";
var ResponsiveImage = require('react-native-responsive-image');

import API from "../../api/api";
import styles from "./HomeStyle";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    _gotoLogin(){
        Actions.login();
    }

    _gotoRegister(){
        Actions.register();
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.vheader}>
                    <ResponsiveImage
                        style={styles.imgHeader_1}
                        resizeMode={"cover"}
                        initWidth="250"
                        initHeight="176"
                        source={require("../../img/header/home_header_1.png")}
                    />
                    <Text style={styles.txtHeader}>Order.  Pick-up.  Be happy.</Text>
                    <ResponsiveImage
                        style={styles.imgHeader_2}
                        initWidth="160"
                        initHeight="100"
                        source={require("../../img/header/home_header_2.png")}
                    />
                    <View style={styles.vbtnLogin}>
                        <Button
                            onPress={this._gotoLogin.bind(this)}
                            style={styles.btnLogin}>
                            LOGIN
                        </Button>
                    </View>
                    <View style={styles.vbtnRegister}>
                        <TouchableOpacity
                            onPress={this._gotoRegister.bind(this)}
                            style={styles.btnRegister}
                        >
                            <Text style={styles.txtRegister}>or Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.flexContainer} />
            </View>
        );
    }
}