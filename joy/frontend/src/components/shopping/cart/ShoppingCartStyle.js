/**
 * Created by albanveliu on 5/12/2016 AD.
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
    listViewStyle: {
        height: 380
    },
    emptyCartListContainer: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 64 : 44,
        backgroundColor: '#F9F0EA'
    },
    row: {
        padding: 8,
        paddingHorizontal: 20,
        paddingBottom: 16
    },
    listViewContainer: {
        flex: 1,
        flexDirection: "row",
        paddingTop: 20,
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
    vProductAmount: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'flex-end'
    },
    txtProductAmount: {
        fontSize: 15,
        margin: 10
    },
    vProductPrice: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'flex-end'
    },
    txtProductTotalPrice: {
        fontWeight: "bold",
        fontSize: 15
    },
    txtProductPrice: {
        color: "grey",
        fontSize: 15
    },
    divider:{
        borderWidth: 1
    },
    vtotalPrice: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
        justifyContent: "flex-end",
        alignItems: 'flex-end'
    },
    txtTotalPrice: {
        fontWeight: "bold",
        fontSize: 15
    },
    vgotoPayment: {
        marginTop: 20,
        alignSelf: "center",
        justifyContent: "center"
    },
    btnGotoPayment: {
        height: 45,
        width: 225,
        borderWidth: 3,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    }
});