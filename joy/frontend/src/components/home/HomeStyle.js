/**
 * Created by albanveliu on 27/05/16.
 */
'use strict';
var React = require('react-native');
var {StyleSheet, Platform} = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 64 : 104,
        backgroundColor: '#F9F0EA',
        alignItems: "center",
        justifyContent: "center"
    },
    flexContainer: {
        flex: 0.1
    },
    vheader: {
        flex: 0.5,
        marginHorizontal: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    txtHeader: {
        marginTop: 30,
        fontWeight: "bold",
        fontSize: 20
    },
    imgHeader_2: {
        marginTop: 30
    },
    btnLogin: {
        marginTop: 30,
        height: 45,
        width: 225,
        borderWidth: 3,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    txtLogin: {
        fontWeight: "bold",
        fontSize: 15
    },
    vbtnRegister: {
        justifyContent: "center",
        alignItems: "center"
    },
    btnRegister: {
        justifyContent: "center",
        alignItems: "center",
        height:45,
        width: 225
    },
    txtRegister: {
        fontSize: 12,
        color: "#6B9BBF"
    }
});