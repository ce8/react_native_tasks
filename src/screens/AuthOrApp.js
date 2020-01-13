import React, { Component } from 'react'
import axios from 'axios'
import {View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native'

export default class AuthOrapp extends Component {
    componentDidMount = async () => {
        const json = await AsyncStorage.getItem('userData')
        const userData = JSON.parse(json) || {}

        if (userData.token) {
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation.navigate('Home', userData)
        } else {
            this.props.navigation.navigate('Auth')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
}

// Flex: 1 irá ocupar a tela toda

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})