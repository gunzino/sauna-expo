import React from 'react';
import {StyleSheet, Component, View, Text, TouchableOpacity} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo';


function RenderButton(props) {
    if (props.buttonOn) {
        return (
            <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress}>
                <FontAwesome name="power-off" style={styles.SwitchStyleON}></FontAwesome>
            </TouchableOpacity>
            <Text style={styles.ButtonTextStyle}>ZAP</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={props.onPress}>
                    <FontAwesome name="power-off" style={styles.SwitchStyleOFF}></FontAwesome>
                </TouchableOpacity>
                <Text style={styles.ButtonTextStyle}>VYP</Text>
            </View>
        )
    }
}

class MainSwitch extends React.Component {

    constructor() {
        super();
        this.state = {buttonOn: true};
    }
    onButtonPress = () => {
        this.setState(previousState => {
            if (previousState.buttonOn) {
                return { buttonOn: false}
            }
            return {buttonOn: true};
        });
    }



    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={{ padding: 15, alignItems: 'center', borderRadius: 50 }}>
                    <RenderButton buttonOn={this.state.buttonOn} onPress={this.onButtonPress}/>
                </LinearGradient>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    SwitchStyleON: {
        color: '#99ff33',
        fontSize: 60,
    },
    SwitchStyleOFF: {
        color: 'red',
        fontSize: 60,
    },
    ButtonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default MainSwitch;