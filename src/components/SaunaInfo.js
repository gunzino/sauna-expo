import React from 'react';
import {StyleSheet, Component, View, Text, TouchableOpacity} from 'react-native';


class SaunaInfo extends React.Component {
    constructor() {
        super();
        this.state = {temperature: 37, humidity: 80};
    }
    render() {
       return ( <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoHeader}>TEPLOTA</Text>
                <Text style={styles.infoValue}>{this.state.temperature} °C</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoHeader}>VLHKOST</Text>
                <Text style={styles.infoValue}>{this.state.humidity} %</Text>
            </View>
        </View>
       )
    }
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       flexDirection: 'row',
   },
    infoContainer: {
       flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoHeader: {
       fontSize: 20,
        fontWeight: '800',
    },
    infoValue: {
       paddingTop: 10,
        fontSize: 18,
        fontWeight: '600',
    }
});

export default SaunaInfo;