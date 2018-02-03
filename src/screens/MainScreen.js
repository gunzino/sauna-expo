import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainSwitch from '../components/MainSwitch';
import SaunaInfo from '../components/SaunaInfo';

export default class MainScreen extends React.Component{
    static navigationOptions = {
        title: 'Control Sauna',
        header: null,
        headerBackTitle: 'Control Sauna'
    };
    render() {
        return (
            <View style={styles.containerWhole}>
                    <MainSwitch/>
                    <SaunaInfo navigation={this.props.navigation}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    containerWhole: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.2)'
    },
});

