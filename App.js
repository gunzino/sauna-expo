import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainSwitch from './src/components/MainSwitch';
import SaunaInfo from './src/components/SaunaInfo';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.containerWhole}>
          <View style={styles.containerMainSwitch}>
        <Text style={styles.mainSwitch}>HLAVNY VYPINAC</Text>
              <MainSwitch/>
          </View>
          <View style={styles.containerInfo}>
              <SaunaInfo/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainSwitch: {
        fontSize: 20,
        fontWeight: '800',
        lineHeight: 50,
    },
    containerWhole: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.2)'
    },
  containerMainSwitch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
      paddingTop: 20,
  },
    containerInfo: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
