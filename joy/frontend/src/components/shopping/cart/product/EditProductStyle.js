/**
 * Created by albanveliu on 26/05/16.
 */
'use strict';
var React = require('react-native');
var {StyleSheet, Platform} = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 64 : 44,
        backgroundColor: '#F9F0EA',
        justifyContent: "center",
        paddingBottom: Platform.OS === "ios" ? 0 : 40
    },
    vimgProduct: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgProduct: {
        height: 120,
        width: 120,
        borderWidth: 3,
        borderColor: "black",
        borderRadius: 60
    },
    vproductAddDeleteArea: {
        flex: 0.5,
        paddingVertical: 20,
        marginHorizontal: 40,
        borderWidth: 3,
        borderColor: "black",
        borderRadius: 30,
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    vbtnDelete: {
        flex: 1,
        padding: 20
    },
    btnDeleteProduct: {

    },
    vtxtAmount: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtAmount: {
        fontSize: 50,
        fontWeight: "bold"
    },
    vbtnAdd: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'flex-end',
        padding: 20
    },
    vbtnAddToCartList: {
        flex: 0.25,
        justifyContent: "center",
        alignSelf: "center"
    },
    btnEditCartList: {
        height: 45,
        width: 225,
        borderWidth: 3,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    }
});