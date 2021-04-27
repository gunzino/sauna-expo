import React, { useContext } from 'react';
import {StyleSheet, Component, View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { AppContext } from '../context/context';


function renderTemperature() {
    const { state } = useContext(AppContext);
    if (!state.loaded) {
        return (
            <ActivityIndicator style={styles.spinnerStyle} size="large" color="red" />
        )
    } else {
        return (
            <Text style={styles.infoValue}>{state.temperature} °C</Text>
        )
    }
}

function renderSetTemperature() {
    const { state } = useContext(AppContext);
    if (!state.loaded) {
        return (
            <ActivityIndicator style={styles.spinnerStyle} size="large" color="red" />
        )
    } else {
        return (
            <Text style={styles.infoValue}>{state.setTemperature} °C</Text>
        )
    }
}

function renderHumidity() {
    const { state } = useContext(AppContext);
    if (!state.loaded) {
        return (
            <ActivityIndicator style={styles.spinnerStyle} size="large" color="#0000ff" />
        )
    } else {
        return (
            <Text style={styles.infoValue}>{state.humidity} %</Text>
        )
    }
}

function SaunaInfo(props) {
    return (
        <View style={styles.saunaInfo}>
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>AKTUALNA TEPLOTA</Text>
                    {renderTemperature()}
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>NASTAVENA TEPLOTA</Text>
                    {renderSetTemperature()}
                    <TouchableOpacity onPress={() => props.navigation.navigate('SetTemperature')}>
                        <FontAwesome name="cog" style={styles.setTemperatureIcon}></FontAwesome>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>VLHKOST VZDUCHU</Text>
                    {renderHumidity()}
                </View>
            </View>
        </View>
    )
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