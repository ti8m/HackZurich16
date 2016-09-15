/**
 * Created by albanveliu on 02/05/16.
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
        padding: 10,
        paddingHorizontal: 20
    },
    listViewContainer: {
        flex: 1,
        flexDirection: "row",
        paddingTop: 20,
        paddingBottom: Platform.OS === "ios" ? 0 : 10,
        alignItems: 'center',
        backgroundColor: '#F9F0EA'
    },
    vimgProduct: {

    },
    imgProduct: {
        height: 80,
        width: 80,
        borderWidth: 3,
        borderColor: "black",
        borderRadius: 40
    },
    vProductInfo: {
        paddingLeft: 20,
        width: 160
    },
    txtProductName: {
        fontWeight: "bold",
        fontSize: 15
    },
    txtProductDescription: {
      fontSize: 10
    },
    vProductPrice: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'flex-end'
    },
    txtProductPrice: {
        fontWeight: "bold",
        fontSize: 15
    },
    error: {
        color: "red",
        textAlign: 'center',
        marginBottom: 5
    },
    shoppingCartInfo: {
        alignItems: 'center'
    }
});