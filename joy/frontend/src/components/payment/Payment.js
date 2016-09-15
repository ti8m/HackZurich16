/**
 * Created by albanveliu on 02/05/16.
 */
import React, {Image, View, ScrollView, Text, StyleSheet, ListView} from "react-native";
import Button from "apsl-react-native-button";
import {Actions} from "react-native-router-flux";
import Popup from 'react-native-popup';

import FormLoader from "../../lib/form/FormLoader";
var styles = require('./PaymentStyle');
import API from "../../api/api";

const {
    SBB,
    } = require('../../lib/constants').default;

// Create our dataSource which will be displayed in the data list
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            isLoading: false,
            totalPrice: this.props.totalPrice,
            cartList: ds.cloneWithRows(this.props.shoppingCart),
            passengerSeat: {}
        }
    }

    _btnPay() {
        var value = this.state.passengerSeat;

        var errors = false;
        if(this.props.shop.passengerSeat){
            var validation = this.refs.form.validate(value);
            if(validation.errors.length != 0){
                errors=true;
            }
        }
        if (!errors) {
            this.popup.confirm(
                {
                    title: "Sind Sie sicher?",
                    content: "Möchten Sie den Bezahlvorgang wirklich durchführen?",
                    ok: {
                        text: "Ja",
                        callback: () => {
                            this.setState({isLoading: true});
                            this.payCall();
                        }
                    },
                    cancel: {
                        text: "Nein"
                    }
                }
            );
        }
    }

    async payCall() {
        var totalPrice = (Math.round((this.state.totalPrice) * 100) / 100).toFixed(2);
        let response = await fetch(API.ORDER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                passengerSeat: this.state.passengerSeat.passengerSeat,
                customer: this.props.user,
                shop: {
                    id: this.props.shop.id
                },
                totalPrice: totalPrice,
                paymentCreditCard: {
                    type: "visa",
                    number: "4217989427342113",
                    expire_month: 6,
                    expire_year: 2021,
                    firstName: "Joey",
                    lastName: "Minnis",
                    intent: "sale",
                    method: "credit_card",
                    currency: "USD",
                    total: ""
                },
                shoppingCart: this.props.shoppingCart
            })
        });
        var responseText = await response.text();
        if (responseText == "approved") {

            this.popup.tip(
                {
                    title: "Bezahlvorgang war erfolgreich!",
                    content: "Ihre Bezahlung wurde erfolgreich durchgeführt",
                    btn: {
                        text: "OK",
                        callback: () => {
                            this.setState({isLoading: false});
                            Actions.shopping({type: "reset", user: this.props.user});
                        }
                    }
                }
            );
        } else {
            this.setState({isLoading: false});
            this.popup.tip({
                title: "Fehler beim Bezahlvorgang!",
                content: "Ihre Bezahlung konnte nicht durchgeführt werden!",
                btn: {
                    text: "OK"
                }
            })
        }
    }

    _btnCancel(){
        this.popup.confirm(
            {
                title: "Sind Sie sicher?",
                content: "Möchten Sie den Bezahlvorgang wirklich abbrechen?",
                ok: {
                    text: "Ja",
                    callback: () => {
                        Actions.shopping({type: "reset", user: this.props.user});
                    }
                },
                cancel: {
                    text: "Nein"
                }
            }
        );
    }

    onChange(value) {
        this.state.passengerSeat = value;
        if (!this.isValid) {
            this.refs.form.validateSBB(value);
        }
    }

    _renderRow(product) {
        var productTotalPrice = Math.round((product.price * product.amount) * 100) / 100;
        return (
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
        );
    }


    render() {
        var formContainer = <View></View>;
        //for sbb only
        if (this.props.shop.passengerSeat) {
            formContainer =
                <FormLoader ref="form"
                            formType={SBB}
                            value={this.state.passengerSeat}
                            onChange={this.onChange}
                            style={styles.formContainer}
                />;
        }
        return (
            <View style={styles.container}>
                <View>
                    <ScrollView >
                        <ListView
                            style={styles.listViewStyle}
                            dataSource={this.state.cartList}
                            renderRow={this._renderRow.bind(this)}
                            enableEmptySections
                        />
                    </ScrollView>
                    <View style={styles.divider}></View>
                    <View style={styles.vtotalPrice}>
                        <Text style={styles.txtTotalPrice}>
                            Total Price: {(Math.round((this.state.totalPrice) * 100) / 100).toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.vformContainer}>
                        {formContainer}
                    </View>
                    <View style={styles.btnArea}>
                        <View style={styles.vbtnPay}>
                            <Button
                                onPress={this._btnPay.bind(this)}
                                style={styles.btnPayment}
                                isLoading={this.state.isLoading}
                            >
                                PAY
                            </Button>
                        </View>
                        <View style={styles.vbtnCancel}>
                            <Button
                                onPress={this._btnCancel.bind(this)}
                                style={styles.btnPayment}
                                isLoading={this.state.isLoading}
                            >
                                CANCEL
                            </Button>
                        </View>
                    </View>

                    <Popup ref={(popup) => { this.popup = popup }}/>
                </View>
            </View>
        );
    }
}