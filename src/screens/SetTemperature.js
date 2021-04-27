import React, { useContext, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Slider } from 'react-native';
import {getws} from "../network/ComApi";
import { AppContext } from '../context/context';

function SetTemperature() {
    const { state } = useContext(AppContext);

    const [temperature, setTemperature] = useState(state.setTemperature);

    function onValueChange(value) {
        setTemperature(value);
    }

    function onSlidingComplete() {
        getws().setTemperature(temperature);
    }

    return (
        <View style={styles.SetTemperature}>
            <Slider
                minimumValue={0}
                maximumValue={100}
                step={0.5}
                value={state.setTemperature}
                onValueChange={(value) => onValueChange(value)}
                onSlidingComplete={() => onSlidingComplete()}/>
            <Text style={styles.textValue}>{temperature} °C</Text>
        </View>
    )
}

SetTemperature['navigationOptions'] = screenProps => ({
    title: 'Nastavit Teplotu',
})

const styles = StyleSheet.create({
    SetTemperature: {
        flex: 0.5,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    textValue: {
        lineHeight: 60,
        fontSize: 40,
        fontWeight: '800',
        textAlign: 'center'
    }
});

export default SetTemperature;
