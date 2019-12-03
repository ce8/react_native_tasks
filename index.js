/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Agenda from './src/screens/Agenda'

// AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerComponent(appName, () => Agenda);