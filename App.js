import React, { useState } from 'react';
import { StackNavigator } from 'react-navigation';
import MainScreen from './src/screens/MainScreen';
import SetTemperature from './src/screens/SetTemperature';
import { initws, initialSaunaState } from './src/network/ComApi';
import { AppContext, configureSetStateMethod } from './src/context/context';

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


export default function App () {
    const [state, setState] = useState(initialSaunaState);
    configureSetStateMethod(setState);
    return (
        <AppContext.Provider value={{state, setState}}>
            <RootStack/>
        </AppContext.Provider>
    )
}