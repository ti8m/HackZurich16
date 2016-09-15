/**
 * Created by albanveliu on 25/05/16.
 */
import React, {Image, View, Text, TouchableOpacity, ListView} from "react-native";
import Button from "apsl-react-native-button";
import {Actions} from "react-native-router-flux";

var styles = require('./ShopProductStyle');

import API from "../../../api/api";


var dumpShoppingCart = [];
var dumpAmount = 1;
var dumpTotalPrice = 0;

export default class ShopProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product,
            amount: this.props.product.amount
        };
        dumpShoppingCart = this.props.shoppingCart;
        dumpTotalPrice = this.props.totalPrice;
    }

    componentWillMount(){
        this.props.setLoadingShopProductList(true);
    }

    componentWillUnmount() {
        dumpAmount = 1;
        this.props.setLoadingShopProductList(false);
    }

    // function to watch if duplicates are in shoppingCart
    _watchForDuplicateProduct(product) {
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
                dumpTotalPrice += (Math.round(product.price * 100.00) / 100.00);
            }
        } else {
            dumpTotalPrice += (Math.round(product.price * 100.00) / 100.00);
        }
    }

    // decrease amount of products that have to be added
    _decreaseAmount() {
        if (dumpAmount == 1) {
            alert("Sie können nur mindestens ein Artikel zum Warenkorb hinzufügen.");
        } else {
            dumpAmount--;
        }

        this.setState({
            amount: dumpAmount
        });
    }

    // increase amount of products that have to be added
    _increaseAmount() {
        dumpAmount++;
        this.setState({
            amount: dumpAmount
        });
    }

    // add product to cartList
    _addToCartList(product) {
        if (dumpShoppingCart.length == 0) {
            product.amount = dumpAmount;
            dumpShoppingCart.push(product);
        } else {
            this._watchForDuplicateProduct(product);
        }
        this._calculateTotalPrice(product);

        this.props.refreshShoppingCart(dumpShoppingCart, dumpTotalPrice);
        Actions.pop();
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
                            <Image source={require("../../../img/ic/ic_remove.png")}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.vtxtAmount}>
                        <Text style={styles.txtAmount}>{dumpAmount}</Text>
                    </View>
                    <View style={styles.vbtnAdd}>
                        <TouchableOpacity onPress={this._increaseAmount.bind(this)}>
                            <Image source={require("../../../img/ic/ic_add.png")}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.vbtnAddToCartList}>
                    <Button
                        onPress={this._addToCartList.bind(this, this.state.product)}
                        style={styles.btnAddToCartList}
                    >
                        ADD TO CART
                    </Button>
                </View>
            </View>
        );
    };
}