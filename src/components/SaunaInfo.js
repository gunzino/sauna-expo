import React from 'react';
import {StyleSheet, Component, View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { getws } from '../network/ComApi';


class SaunaInfo extends React.Component {
    constructor() {
        super();
        this.networkClient  = getws();
        this.state = {
            actualSaunaState: this.networkClient.getActualSaunaState()
        };
    }

    componentWillMount() {
        this.listenerID = this.networkClient.addNotifyCallback(data => {
            this.onMessage(data);
        });
        this.setState(previousState => {
            return  { actualSaunaState: this.networkClient.getActualSaunaState()}
        });
    }

    componentWillUnmount() {
        this.networkClient.removeNotifyCallback(this.listenerID);
    }

    onMessage(message) {
        this.setState(previousState => {
            return  { actualSaunaState: this.networkClient.getActualSaunaState()}
        });
    }


    renderTemperature() {
        if (!this.state.actualSaunaState.loaded) {
            return (
                <ActivityIndicator style={styles.spinnerStyle} size="large" color="red" />
            )
        } else {
            return (
                <Text style={styles.infoValue}>{this.state.actualSaunaState.temperature} °C</Text>
            )
        }
    }

    renderSetTemperature() {
        if (!this.state.actualSaunaState.loaded) {
            return (
                <ActivityIndicator style={styles.spinnerStyle} size="large" color="red" />
            )
        } else {
            return (
                <Text style={styles.infoValue}>{this.state.actualSaunaState.setTemperature} °C</Text>
            )
        }
    }

    renderHumidity() {
        if (!this.state.actualSaunaState.loaded) {
            return (
                <ActivityIndicator style={styles.spinnerStyle} size="large" color="#0000ff" />
            )
        } else {
            return (
                <Text style={styles.infoValue}>{this.state.actualSaunaState.humidity} %</Text>
            )
        }
    }


    render() {
        return (
            <View style={styles.saunaInfo}>
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoHeader}>AKTUALNA TEPLOTA</Text>
                        {this.renderTemperature()}
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoHeader}>NASTAVENA TEPLOTA</Text>
                        {this.renderSetTemperature()}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SetTemperature')}>
                            <FontAwesome name="cog" style={styles.setTemperatureIcon}></FontAwesome>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoHeader}>VLHKOST VZDUCHU</Text>
                        {this.renderHumidity()}
                    </View>
                </View>
            </View>
       )
    }
}

const styles = StyleSheet.create({
    saunaInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
   container: {
       flex: 1,
       flexDirection: 'row',
   },
    infoContainer: {
       flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    infoHeader: {
       fontSize: 20,
        fontWeight: '800',
        textAlign: 'center'
    },
    infoValue: {
       paddingTop: 10,
        fontSize: 18,
        fontWeight: '600',
    },
    spinnerStyle: {
       paddingTop: 10
    },
    setTemperatureIcon: {
       fontSize: 30,
    }
});

export default SaunaInfo;