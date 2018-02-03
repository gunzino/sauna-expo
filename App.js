import React from 'react';
import { StackNavigator } from 'react-navigation';
import MainScreen from './src/screens/MainScreen';
import SetTemperature from './src/screens/SetTemperature';
import { initws } from './src/network/ComApi';

initws();

const RootStack = StackNavigator(
    {
        MainScreen: {
            screen: MainScreen,
        },
        SetTemperature: {
            screen: SetTemperature,
        },
    },
    {
        initialRouteName: 'MainScreen',
        headerMode: 'screen'
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}