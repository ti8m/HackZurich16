/**
 * Created by albanveliu on 02/05/16.
 */
import React, {Image, View, Text, ListView} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

var LoadingView = require('react-native-gifted-spinner');

import styles from "./ShopProductListStyle";
import API from "../../../api/api";

// Create our dataSource which will be displayed in the data list
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var dumpShoppingCart = [];
var totalProducts = 0;

export default class ShopProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows([]),
            isLoading: false,
            error: "",
            shoppingCart: [],
            totalPrice: 0
        };
        componentProductListMounted = false;
        this.refreshShoppingCart = this.refreshShoppingCart.bind(this);
        this.setLoadingShopProductList = this.setLoadingShopProductList.bind(this);

    }

    componentWillMount() {
        this.componentProductListMounted = true;
        this.props.loading(true);
        Actions.refresh(
            {
                onRight: () => this._onGotoShoppingCartBtn(),
                rightButtonImage: require("../../../img/ic/ic_shopping_cart.png")
            }
        );
        this.getProducts();
    }

    componentWillUnmount() {
        this.props.loading(false);
        dumpShoppingCart = [];
        totalProducts = 0;
        this.componentProductListMounted = false;
    }

    // will be called from ShopProduct-View
    setLoadingShopProductList(isLoadingCheck){
        if(this.componentProductListMounted){
            this.setState(
                {
                    isLoading: isLoadingCheck
                }
            );
        }
    }

    // will be called from ShopProduct-View to refresh the shopping cart
    refreshShoppingCart(shoppingCart, totalPrice) {
        this.setState({
            shoppingCart: shoppingCart,
            totalPrice: totalPrice
        });
    }

    // fetch products from server and push them into dataSource
    async getProducts() {
        this.setState({isLoading: true});
        try {
            let response = await fetch(API.SHOP_PRODUCTS + this.props.data.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            var responseText = await response.text();
            if (response.status >= 200 && response.status < 300) {
                // success
                var products = JSON.parse(responseText);
                // no errors so set error in constructor to empty string
                this.setState({error: ""});

                this.setState({isLoading: false});
                // initial rows with filled shopList
                this.setState({
                    dataSource: ds.cloneWithRows(products)
                });
            } else {
                // response is >300 so error will be thrown
                let error = responseText;
                this.setState({isLoading: false});
                throw error;
            }
        } catch (error) {
            this.setState({error: error});
            this.setState({isLoading: false});
            console.log("Error in products list: " + error);
        }
    }

    /*
     push data to new View "ShoppingCart". There we have to show the actual totalPrice and cartList.
     */
    _onGotoShoppingCartBtn() {
        if(this.state.shoppingCart.length > 0){

            Actions.shoppingCart({
                cartList: this.state.shoppingCart,
                totalPrice: this.state.totalPrice,
                refreshShoppingCart: this.refreshShoppingCart,
                setLoadingShopProductList: this.setLoadingShopProductList,
                user: this.props.user,
                shop: this.props.data,
                title: "Warenkorb"
            });
        }else{
            alert("Sie haben noch nichts im Warenkorb.")
        }

    }

    // push product to new View "ShopProduct". There we can add products to our cartList
    _gotoProduct(product){
        this.setState({isLoading: true});
        Actions.shopProduct({
            product: product,
            shoppingCart: this.state.shoppingCart,
            totalPrice: this.state.totalPrice,
            refreshShoppingCart: this.refreshShoppingCart,
            title: product.product.name,
            setLoadingShopProductList: this.setLoadingShopProductList
        })
    }

    _renderRow(product) {
        return (
            <Button onPress={this.state.isLoading ? null : this._gotoProduct.bind(this, product)}>
                <View style={styles.row}>
                    <View style={styles.listViewContainer}>
                        <View style={styles.vimgProduct}>
                            <Image
                                source={{uri: product.product.image}}
                                style={styles.imgProduct}
                            />
                        </View>
                        <View style={styles.vProductInfo}>
                            <Text style={styles.txtProductName}>{product.product.name}</Text>
                            <Text style={styles.txtProductDescription}>{product.product.description}</Text>
                        </View>
                        <View style={styles.vProductPrice}>
                            <Text style={styles.txtProductPrice}>{product.price.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </Button>
        );
    }



    render() {
        return (
            <View style={styles.container}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                        enableEmptySections
                    />
                    <Text style={styles.error}>
                        {this.state.error}
                    </Text>
            </View>
        );
    }
}