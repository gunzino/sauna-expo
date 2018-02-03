import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Slider } from 'react-native';
import {getws} from "../network/ComApi";

class SetTemperature extends React.Component {
    static navigationOptions = {
        title: 'Nastavit Teplotu',
    };

    constructor() {
        super();
        this.networkClient  = getws();
        this.state =  {
            temperature: this.networkClient.getSetTemperature(),
        };
    }

    componentWillMount() {
        this.listenerID = this.networkClient.addNotifyCallback(data => {
            this.onMessage(data);
        });
        this.setState(previousState => {
            return  { temperature: this.networkClient.getSetTemperature()}
        });
    }

    componentWillUnmount() {
        this.networkClient.removeNotifyCallback(this.listenerID);
    }

    onMessage(message) {
        this.setState(previousState => {
            return  { temperature: this.networkClient.getSetTemperature()}
        });
    }

    onValueChange(value) {
        this.setState({temperature : value});
    }

    onSlidingComplete() {
        this.networkClient.setTemperature(this.state.temperature);
    }

    render() {
        return (<View style={styles.SetTemperature}>
                <Slider
                    minimumValue={0}
                    maximumValue={100}
                    step={0.5}
                    value={this.state.temperature}
                    onValueChange={(value) => this.onValueChange(value)}
                    onSlidingComplete={(value) => this.onSlidingComplete()}/>
                <Text style={styles.textValue}>{this.state.temperature} °C</Text>
            </View>
        )
    }
}

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
