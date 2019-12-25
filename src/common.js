import { Alert, Platform } from 'react-native'
//Se o backend estiver na Cloud não precisa fazer isso

const server = Platform.OS === 'ios' ? 
    'http://localhost:3000' : 'http://10.0.2.2:3000'

function showError(err) {
    Alert.alert('Ops! Ocorreu um problema!', `Mensagem: ${err}`)
}

export { server, showError }