/**
 * Created by albanveliu on 20/04/16.
 */

// port: 8080
// 10.10.1.227 arbeit
// 192.168.0.22 daheim
// 10.10.1.187 wlan-arbeit
// https://paybox-demo.ti8m.ch

var API_ADDRESS = 'https://paybox-demo.ti8m.ch/peanut/api';

var API = {
    HOST:               API_ADDRESS,
    LOGIN:              API_ADDRESS + '/customer/login',
    LOGOUT:             API_ADDRESS + '/customer/logout',
    TOKEN_CHECK:        API_ADDRESS + '/customer/byjwt/',
    SEARCH_SHOPS:       API_ADDRESS + '/store/getStore',
    SHOP_PRODUCTS:      API_ADDRESS + '/store/products/',
    REGISTER:           API_ADDRESS + '/customer/registerCheck',
    REGISTER_COMPLETE:  API_ADDRESS + '/customer/register',
    ORDER:              API_ADDRESS + '/purchase/orderProducts'
};

module.exports = API;