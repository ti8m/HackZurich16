/**
 * Created by albanveliu on 26/05/16.
 */
import React, {Image, View, Text, StyleSheet, TouchableOpacity, DeviceEventEmitter, ListView} from "react-native";
import Button from "apsl-react-native-button";
import {Actions} from "react-native-router-flux";

var styles = require('./EditProductStyle');

import API from "../../../../api/api";


var dumpShoppingCart = [];
var dumpAmount = 1;
var dumpTotalPrice = 0;
var productChanged = false;

export default class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product,
            amount: this.props.product.amount
        };
        dumpShoppingCart = this.props.shoppingCart;
        dumpAmount = this.state.amount;
        dumpTotalPrice = this.props.totalPrice;
    }
    // decrease amount of products that have to be added
    _decreaseAmount() {
        productChanged = true;
        if (dumpAmount == 0) {
            alert("Sie haben bereits ihre Produktanzahl minimiert.");
        } else {
            dumpAmount--;
        }

        this.setState({
            amount: dumpAmount
        });
    }

    // increase amount of products that have to be added
    _increaseAmount() {
        productChanged = true;
        dumpAmount++;
        this.setState({
            amount: dumpAmount
        });
    }

    // add product to cartList
    _editCartList(product) {
        if(dumpAmount == 0){
            for (var i = 0; i < dumpShoppingCart.length; i++) {
                if (product.product.id == dumpShoppingCart[i].product.id) {
                    dumpShoppingCart.splice(i, 1);
                    dumpTotalPrice = dumpTotalPrice - (this.props.product.amount * this.state.product.price);
                }
            }
        }else{
            for(var i = 0; i < dumpShoppingCart.length; i++){
                if (product.product.id == dumpShoppingCart[i].product.id) {
                    if(dumpAmount == this.props.product.amount){
                        dumpShoppingCart[i].amount = dumpAmount;
                    }else if(dumpAmount > this.props.product.amount){
                        dumpTotalPrice = dumpTotalPrice + ((dumpAmount - this.props.product.amount) * this.state.product.price);
                        dumpShoppingCart[i].amount = dumpAmount;
                    }else{
                        dumpTotalPrice = dumpTotalPrice - ((this.props.product.amount - dumpAmount) * this.state.product.price);
                        dumpShoppingCart[i].amount = dumpAmount;
                    }
                }
            }
        }

        this.state.amount = dumpAmount;

        this.props.refreshShoppingCart(dumpShoppingCart, dumpTotalPrice);
        Actions.pop();
    }

    // function to watch if duplicates are in shoppingCart
    _checkForExistingProduct(product) {
        var productExists = false;
        for (var i = 0; i < dumpShoppingCart.length; i++) {
            if (product.product.id == dumpShoppingCart[i].product.id) {
                productExists = true;
                break;
            } else {
                productExists = false;
            }
        }
        if (productExists) {
            product.amount += dumpAmount;
        } else {
            product.amount = dumpAmount;
            dumpShoppingCart.push(product);
        }
    }

    //function to calculate the actual total price of cartList
    _calculateTotalPrice(product) {
        if (dumpAmount > 1) {
            for (var i = 0; i < dumpAmount; i++) {
                dumpTotalPrice += product.price;
            }
        } else {
            dumpTotalPrice += product.price;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.vimgProduct}>
                    <Image
                        style={styles.imgProduct}
                        source={{uri: this.state.product.product.image}}
                    />
                </View>
                <View style={styles.vproductAddDeleteArea}>
                    <View style={styles.vbtnDelete}>
                        <TouchableOpacity onPress={this._decreaseAmount.bind(this)}>
                            <Image source={require("../../../../img/ic/ic_remove.png")}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.vtxtAmount}>
                        <Text style={styles.txtAmount}>{this.state.amount}</Text>
                    </View>
                    <View style={styles.vbtnAdd}>
                        <TouchableOpacity onPress={this._increaseAmount.bind(this)}>
                            <Image source={require("../../../../img/ic/ic_add.png")}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.vbtnAddToCartList}>
                    <Button
                        onPress={this._editCartList.bind(this, this.state.product)}
                        style={styles.btnEditCartList}
                    >
                        EDIT CART
                    </Button>
                </View>
            </View>
        );
    };
}