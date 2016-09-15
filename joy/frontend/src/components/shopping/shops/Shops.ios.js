/**
 * Created by albanveliu on 27/04/16.
 */
import React, {Image, View, Text, AlertIOS, DeviceEventEmitter, ListView} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import dismissKeyboard from 'react-native-dismiss-keyboard'
var LoadingView = require('react-native-gifted-spinner');

import API from "../../../api/api";
import styles from "./ShopsStyle";

// Require react-native-ibeacon and Bluetooth module
var Beacons = require('react-native-ibeacon');
import BluetoothState from 'react-native-bluetooth-state';

// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
var region = {
    identifier: 'Joy',
    uuid: '20CB0314-A24F-0815-AFF9-A98FEAA6F01B'
};

// Range for beacons inside the region
Beacons.startMonitoringForRegion(region);
Beacons.startRangingBeaconsInRegion(region);

// Create our dataSource which will be displayed in the data list
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var beaconList = [];
var shopList = [];

export default class Shops extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: ds.cloneWithRows([]),
            bluetoothIsActivated: true,
            isLoading: false
        };
        componentMounted = false;
        beaconListener = "";
        this.loading = this.loading.bind(this);
    }

    loading(isLoadingCheck) {
        if (this.componentMounted) {
            this.setState({
                isLoading: isLoadingCheck
            });
        }
    }

    // will be triggered after component has been rendered
    componentWillMount() {
        var self = this;
        this.componentMounted = true;

        if (this.componentMounted) {
            // Request location authorization
            Beacons.requestWhenInUseAuthorization();
            /*
             Set DeviceEventEmitter to check for event 'centralManagerDidUpdateState'
             which has data if the user has bluetooth turned on or off
             */
            BluetoothState.subscribe(bluetoothState => {
                // bluetoothState can either be "on", "off", "unknown", "unauthorized", "resetting" or "unsupported‚"
                if(this.componentMounted){
                    if (bluetoothState == "on") {
                        this.setState({bluetoothIsActivated: true});
                    } else {
                        this.setState({bluetoothIsActivated: false});
                        AlertIOS.alert(
                            "Bluetooth",
                            "Bitte aktivieren Sie Bluetooth, um diese Anwendung benutzen zu können."
                        );
                    }
                }
            });

            // Initialize needs to be called otherwise we don't get the initial state
            BluetoothState.initialize();
            /*
             Set DeviceEventEmitter to check for event 'beaconsDidRange'
             which has data of beacons in region
             */
            // TODO: CHANGE ALGORITHM ... STILL BUGGY
            this.beaconlistener = DeviceEventEmitter.addListener(
                'beaconsDidRange', (data) => {
                    var beaconExists = false;
                    data.beacons.forEach((beacon) => {
                        if (beaconList.length == 0) {
                            this.fetchShop(beacon);
                        } else {
                            beaconList.forEach((beaconL) => {
                                if (beacon.major == beaconL.majorId && beacon.minor == beaconL.minorId) {
                                    beaconExists = true;
                                    return;
                                }
                            });
                            if (!beaconExists) {
                                this.fetchShop(beacon);
                            }
                        }
                    });

                    this.fillShopList(data.beacons);

                    self.setState({
                        dataSource: ds.cloneWithRows(shopList)
                    });
                }
            );
        }


    }

    // remove all listener if component will unmount
    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners();
        this.beaconlistener.remove();
        this.beaconlistener = "";
        this.setState({
            dataSource: "",
            locationIsActivated: "",
            bluetoothIsActivated: "",
            isLoading: false
        });
        this.componentMounted = false;
    }

    fillShopList(beacons) {
        var newShopList = [];
        var beaconIsInShopList = false;
        for (var i = 0; i < beaconList.length; i++) {
            beaconList[i].ranged = false;
            for (var j = 0; j < beacons.length; j++) {
                // Check if beacon is in beacon list
                if (beaconList[i].majorId == beacons[j].major
                    && beaconList[i].minorId == beacons[j].minor) {
                    newShopList.push(beaconList[i]);
                }
            }
        }
        shopList = newShopList;
    }

    // fetch with beaconData for shops from backend server
    async fetchShop(beacon) {
        try{
            let response = await fetch(API.SEARCH_SHOPS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uuid: beacon.uuid,
                    shops: [
                        {
                            beacon: {
                                minorId: beacon.minor,
                                majorId: beacon.major
                            }
                        }
                    ]
                })
            });
            var responseText = await response.text();

            if (response.status >= 200 && response.status < 300) {
                var shop = JSON.parse(responseText);
                beaconList.push(shop);
            }else{
                let error = responseText;
                throw error;
            }
        }catch(error){
            console.log("Error while fetching for beaconData: " + error);
        }
    }


    // goto shopView where products of selected shop will be shown
    _onShopProductsPressed(data) {
        Actions.shopProductList(
            {
                data: data,
                loading: this.loading,
                title: data.name,
                user: this.props.user
            }
        );
    }

    /*
     renders the rows for beacons of shopList which has to be displayed
     */
    renderRow(rowData) {
        return (
            <Button onPress={this.state.isLoading ? null : this._onShopProductsPressed.bind(this, rowData)}>
                <View style={styles.row}>
                    <View style={styles.listViewContainer}>
                        <View>
                            <Image
                                source={{uri: rowData.image}}
                                style={styles.shopImage}/>
                        </View>
                        <View>
                            <Text style={styles.txtShopName}>{rowData.name}</Text>
                        </View>
                    </View>
                </View>
            </Button>
        )
    }

    render() {
        if (this.state.bluetoothIsActivated) {

            return (
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        enableEmptySections
                    />
                </View>
            );

        } else {
            if (!this.state.bluetoothIsActivated) {
                return (
                    <View style={styles.container}>
                        <View style={styles.permissionDeniedContainer}>
                            <Text style={styles.headline}>Bitte aktivieren Sie Bluetooth.</Text>
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles.container}>
                        <View style={styles.permissionDeniedContainer}>
                            <Text style={styles.headline}>Bitte aktivieren Sie die Standortfreigabe.</Text>
                        </View>
                    </View>
                );
            }
        }
    }
}