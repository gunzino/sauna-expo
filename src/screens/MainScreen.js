import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainSwitch from '../components/MainSwitch';
import SaunaInfo from '../components/SaunaInfo';

function MainScreen(props) {

    return (
        <View style={styles.containerWhole}>
            <MainSwitch/>
            <SaunaInfo navigation={props.navigation}/>
        </View>
    )
}

MainScreen['navigationOptions'] = () => ({
    title: 'Control Sauna',
    header: null,
    headerBackTitle: 'Control Sauna'
})
export default MainScreen;

const styles = StyleSheet.create({
    containerWhole: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.2)'
    },
});

