/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Agenda from './src/screens/Agenda'
import Navigator from './src/Navigator'

// AppRegistry.registerComponent(appName, () => App);

//AppRegistry.registerComponent(appName, () => Agenda);

//Criado o arquivo Navigator.JS na pasta SCR
AppRegistry.registerComponent(appName, () => Navigator);