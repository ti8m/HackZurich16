/**
 * Created by albanveliu on 11/04/16.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {
    AppRegistry,
    Component,
    Text,
    Navigator,
    AsyncStorage,
    Platform,
    View
} from 'react-native';

import {
    Actions,
    Scene,
    Router,
    Modal,
} from 'react-native-router-flux';

// import views
import Home from './src/components/home/Home';
import Login from './src/components/login/Login';
import Register from './src/components/register/Register';
import RegisterDetails from './src/components/register/details/RegisterDetails';
import Shops from './src/components/shopping/shops/Shops';
import ShopProductList from './src/components/shopping/productlist/ShopProductList';
import ShopProduct from './src/components/shopping/product/ShopProduct';
import ShoppingCart from './src/components/shopping/cart/ShoppingCart';
import EditProduct from './src/components/shopping/cart/product/EditProduct';
import Payment from './src/components/payment/Payment';

var LoadingView = require('react-native-gifted-spinner');

import API from "./src/api/api";
const ACCESS_TOKEN = 'access_token';

export default class Joy extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true
        }
    }

    // When component will mount we trigger getToken()
    componentWillMount() {
        //this.getToken();
        this.setState({isLoading: false});
        this.removeToken();
    }

    /*
     function checks if token exists. If yes, user will be logged out and token will be
     deleted. This is needed for logging out the user every time he starts the app.
     */
    async removeToken() {
        let accessToken;
        try {
            accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            if (accessToken != null) {
                this.logoutByToken(accessToken);
                await AsyncStorage.removeItem(ACCESS_TOKEN);
            }
        } catch (error) {
            console.log("something went wrong")
        }
    }

    /*
     function to log the user out by token
     */
    async logoutByToken(token) {
        let accessToken = token;
        try {
            let response = await fetch(API.LOGOUT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jwt: accessToken
                })
            });
            let res = await response.text();

            if (response.status >= 200 && response.status < 300) {
                //verified token means user is logged it so we redirect to home
                this.setState({isLoading: false});
            } else {
                //handle error
                this.setState({isLoading: false});
                let error = res;
                throw error;
            }
        } catch (error) {
            this.setState({isLoading: false});
            console.log("error response: " + error);
        }
    }

    // render the navigation for the app
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent: "center", backgroundColor: "#F9F0EA"}}>
                    <LoadingView />
                </View>
            );
        } else {
            return (
                <Router>
                    <Scene key="modal" component={Modal}>
                        <Scene key="root" hideNavBar={true}>
                            <Scene key="initialScene" type="replace">
                                <Scene key="home" component={Home}/>
                                <Scene key="login" component={Login}/>
                                <Scene key="register" component={Register}/>
                                <Scene key="registerDetails" component={RegisterDetails}/>
                            </Scene>


                            <Scene key="shopping" type="replace">
                                <Scene key="shops" component={Shops}/>
                                <Scene key="shopProductList" component={ShopProductList}/>
                                <Scene key="shopProduct" component={ShopProduct}/>
                                <Scene key="shoppingCart" component={ShoppingCart}/>
                                <Scene key="editProduct" component={EditProduct}/>
                            </Scene>

                            <Scene key="paymentScene" type="reset">
                                <Scene key="pay" title="Bezahlung" component={Payment}/>
                            </Scene>
                        </Scene>
                    </Scene>
                </Router>
            );
        }
    }
}