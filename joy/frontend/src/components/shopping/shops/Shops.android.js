/**
 * Created by albanveliu on 27/04/16.
 */
import React, {Image, View, Text, DeviceEventEmitter, ListView} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import dismissKeyboard from 'react-native-dismiss-keyboard'
var LoadingView = require('react-native-gifted-spinner');

import API from "../../../api/api";
import styles from "./ShopsStyle";

// Require react-native-ibeacon module
var Beacons = require('react-native-ibeacon');

// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
var region = {
    identifier: 'Joy',
    uuid: '20CB0314-A24F-0815-AFF9-A98FEAA6F01B'
};


// Create our dataSource which will be displayed in the data list
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var beaconList = [];
var shopList = [];


// start ranging for beacons ins region
Beacons.startBeaconSearch(region);

export default class Shops extends React.Component {
    constructor() {
        super();
        this.state = {
            dataSource: ds.cloneWithRows([]),
            isLoading: false
        };
        componentMounted = false;
        beaconlistener: "";
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
            /*
             Set DeviceEventEmitter to check for event 'beaconsDidRange'
             which has data of beacons in region
             */
            // TODO: CHANGE ALGORITHM STILL BUGGY
            this.beaconlistener = DeviceEventEmitter.addListener(
                'beaconsDidRange', (data) => {
                    var beaconExists = false;
                    var beacons = JSON.parse(data.beacons);
                    beacons.forEach((beacon) => {
                        if (beaconList.length == 0) {
                            this.fetchShop(beacon);
                            console.log("beaconlist length:" + beaconList.length);
                        } else {
                            for (var i = 0; i < beaconList.length; i++) {
                                if (beacon.major == beaconList[i].majorId && beacon.minor == beaconList[i].minorId) {
                                    beaconExists = true;
                                    break;
                                }
                            }
                            if (!beaconExists) {
                                //console.log("!BEACONEXIST: push in beaconList: " + beacon);
                                this.fetchShop(beacon);
                            }
                        }
                    });

                    this.fillShopList(beacons);

                    self.setState({
                        dataSource: ds.cloneWithRows(shopList)
                    });
                    //console.log(this.state.isLoading);
                }
            );
        }
    }

    // remove all listener if component will unmount
    componentWillUnmount() {
        this.beaconlistener.remove();
        this.beaconlistener = "";
        this.setState({
            dataSource: "",
            isLoading: false,
            isMounted: false
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

    async fetchShop(beacon) {
        console.log("RNBEACON: " + beacon.uuid);
        try{
            let response = await fetch(API.SEARCH_SHOPS, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uuid: beacon.proximityUUID,
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
    _renderRow(rowData) {
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
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections
                />
            </View>
        );
    }
}