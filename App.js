import React from 'react'
import { StyleSheet, View, Text}  from 'react-native'
import commonStyles from './src/commonStyles'


export default class App extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  }
});


