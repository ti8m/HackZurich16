/**
 * Created by albanveliu on 18/04/16.
 */
'use strict';
var React = require('react-native');
var {StyleSheet, Platform} = React;

module.exports = StyleSheet.create({
    scrollStyle: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 64 : 64,
        paddingHorizontal: 40,
        backgroundColor: '#F9F0EA'
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    flexContainer: {
        flex: 0.1
    },
    vheader: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    vspinner: {
        margin: 10
    },
    inputs: {
        justifyContent: "center"
    },
    inputContainer: {
        marginHorizontal: 50,
        paddingVertical: 15,
        borderWidth: 2,
        borderBottomColor: 'black',
        borderColor: 'transparent'
    },
    error: {
        color: "red",
        textAlign: 'center',
        marginBottom: 5
    },
    vbtnRegisterDetails: {
        alignSelf: "center",
        justifyContent: "center"
    },
    btnRegisterDetails: {
        height: 45,
        width: 225,
        borderWidth: 3,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    }

});