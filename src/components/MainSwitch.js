import React, { useContext } from 'react';
import {StyleSheet, Component, View, Text, TouchableOpacity} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {getws} from "../network/ComApi";
import { AppContext } from '../context/context';


function RenderButton(props) {
    if (props.buttonOn) {
        return (
            <View style={styles.containerButton}>
                <TouchableOpacity onPress={props.onPress}>
                    <FontAwesome name="power-off" style={styles.SwitchStyleON}></FontAwesome>
                </TouchableOpacity>
                <Text style={styles.ButtonTextStyle}>ZAP</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.containerButton}>
                <TouchableOpacity onPress={props.onPress}>
                    <FontAwesome name="power-off" style={styles.SwitchStyleOFF}></FontAwesome>
                </TouchableOpacity>
                <Text style={styles.ButtonTextStyle}>VYP</Text>
            </View>
        )
    }
}


function MainSwitch() {
    const { state } = useContext(AppContext);

    function onButtonPress() {
        getws().switchSauna();
    }

    return (
        <View style={styles.MainSwitch}>
            <View style={styles.container}>
                <Text style={styles.mainSwitch}>HLAVNY VYPINAC</Text>
                <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.gradientStyle}>
                    <RenderButton buttonOn={state.status} onPress={onButtonPress}/>
                </LinearGradient>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    MainSwitch: {
      flex: 2
    },
    container: {
        paddingTop: 30,
      alignItems: 'center',
    },
    gradientStyle: {
        padding: 15,
        borderRadius: 50,
    },
    containerButton: {
        marginTop: 20,
        alignItems: 'center'
    },
    mainSwitch: {
        fontSize: 20,
        fontWeight: '800',
        lineHeight: 50,
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