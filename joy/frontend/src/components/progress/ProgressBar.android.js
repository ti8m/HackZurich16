/**
 * Created by albanveliu on 24/04/16.
 */
import React, {View, StyleSheet} from "react-native";
var ProgressBar = require('ProgressBarAndroid');
var TimerMixin = require('react-timer-mixin');

var ProgressBarAndroid = React.createClass({
    mixins: [TimerMixin],

    getInitialState: function() {
        return {
            progress: 0
        };
    },

    componentDidMount: function() {
        this.setInterval(
            () => {
                var progress = (this.state.progress + 0.02) % 1;
                this.setState({progress: progress});
            }, 50
        );
    },

    render: function() {
        return <ProgressBar progress={this.state.progress} styleAttr="Large" />;
    },
});

module.exports = ProgressBarAndroid;