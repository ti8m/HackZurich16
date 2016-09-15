/**
 * Created by albanveliu on 02/05/16.
 */
import React, {Image, View, Text, StyleSheet, ListView} from "react-native";
import Button from "react-native-button";
import SButton from "apsl-react-native-button";
import Popup from 'react-native-popup';
import {Actions} from "react-native-router-flux";

var styles = require('./ShoppingCartStyle');
import API from "../../../api/api";

// Create our dataSource which will be displayed in the data list
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var dumpCartList = [];

export default class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice: this.props.totalPrice,
            cartList: ds.cloneWithRows(this.props.cartList)
        };
        this.isValid = true;
        dumpCartList = this.props.cartList;
        this.refreshShoppingCart = this.refreshShoppingCart.bind(this);
    }

    refreshShoppingCart(cartList, totalPrice) {
        dumpCartList = cartList;
        this.setState({
            totalPrice: totalPrice,
            cartList: ds.cloneWithRows(dumpCartList)
        });
        this.props.refreshShoppingCart(dumpCartList, totalPrice);
    }

    componentWillMount() {
        this.props.setLoadingShopProductList(true);
    }

    componentWillUnmount() {
        this.props.setLoadingShopProductList(false);
    }

    _gotoEditProduct(product) {
        Actions.editProduct({
            product: product,
            shoppingCart: dumpCartList,
            totalPrice: this.state.totalPrice,
            refreshShoppingCart: this.refreshShoppingCart,
            title: product.product.name
        });
    }

    _gotoPayment() {
        this.popup.confirm(
            {
                title: "Sind Sie sicher?",
                content: "Sie können den Warenkorb danach nicht mehr bearbeiten.",
                ok: {
                    text: "Ja",
                    callback: () => {
                        Actions.paymentScene({
                            type: "reset",
                            totalPrice: this.state.totalPrice,
                            shoppingCart: dumpCartList,
                            user: this.props.user,
                            shop: this.props.shop
                        });
                    }
                },
                cancel: {
                    text: "Nein"
                }
            }
        );
    }

    _renderRow(product) {
        var productTotalPrice = Math.round((product.price * product.amount) * 100) / 100;
        return (
            <Button onPress={this._gotoEditProduct.bind(this, product)}>
                <View style={styles.row}>
                    <View style={styles.listViewContainer}>
                        <View style={styles.vimgProduct}>
                            <Image
                                style={styles.imgProduct}
                                source={{uri: product.product.image}}
                            />
                        </View>
                        <View style={styles.vProductInfo}>
                            <Text style={styles.txtProductName}>{product.product.name}</Text>
                            <Text style={styles.txtProductDescription}>{product.product.description}</Text>
                        </View>
                        <View style={styles.vProductAmount}>
                            <Text style={styles.txtProductAmount}>{product.amount}</Text>
                        </View>
                        <View style={styles.vProductPrice}>
                            <Text style={styles.txtProductTotalPrice}>{productTotalPrice.toFixed(2)}</Text>
                            <Text style={styles.txtProductPrice}>{product.price.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </Button>
        );
    }

    render() {
        if (dumpCartList.length > 0) {
            return (
                <View style={styles.container}>
                    <View>
                        <ListView
                            style={styles.listViewStyle}
                            dataSource={this.state.cartList}
                            renderRow={this._renderRow.bind(this)}
                            enableEmptySections
                        />
                        <View style={styles.divider}></View>
                        <View style={styles.vtotalPrice}>
                            <Text style={styles.txtTotalPrice}>
                                Total Price: {(Math.round((this.state.totalPrice) * 100) / 100).toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.vgotoPayment}>
                            <SButton
                                onPress={this._gotoPayment.bind(this)}
                                style={styles.btnGotoPayment}
                            >
                                Next
                            </SButton>
                        </View>
                        <Popup ref={(popup) => { this.popup = popup }}/>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.emptyCartListContainer}>
                    <Text>Empty Cartlist!</Text>
                </View>
            );
        }
    }
}