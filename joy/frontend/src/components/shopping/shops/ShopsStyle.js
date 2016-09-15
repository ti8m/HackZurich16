/**
 * Created by albanveliu on 26/04/16.
 */
'use strict';
var React = require('react-native');
var {StyleSheet, Platform} = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 44 : 44,
        backgroundColor: '#F9F0EA'
    },
    row: {
        padding: 8,
        paddingBottom: Platform.OS === "ios" ? 16 : -15
    },
    listViewContainer: {
        paddingTop: 20,
        paddingBottom: Platform.OS === "ios" ? 15 : 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F0EA'
    },
    txtSmallText: {
        fontSize: 11
    },
    txtShopName: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 20
    },
    shopImage: {
        width: 200,
        height: 200,
        borderWidth: 3,
        borderRadius: 100,
        borderColor: "black",
        backgroundColor: Platform.OS === "ios" ? '#E0D3C6' : 'transparent',
        marginRight: 10
    },
    permissionDeniedContainer: {
        alignItems: 'center'
    },
    loading: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#F5FCFF",
        justifyContent: 'center',
        alignItems: 'center'
    }
});
