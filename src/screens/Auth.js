import React, { component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert
} from 'react-native'
import axios from 'axios'
import { server, showError } from '../common'
import commonStyles from '../commonStyles'
import backgroundImage from '../../asserts/imgs/login.jpg'
//import { thisExpression } from '@babel/types'
import AuthInput from '../components/AuthInput'

export default class Auth extends React.Component {
    state ={
        stageNew: false,  //se for true esta na tela de cadastro se for false esta na tela de login
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    signin = async () =>{
        try {
            const res = await axios.post(`${server}/signin` , {
                email: this.state.email,
                password: this.state.password
            })
            axios.defaults.headers.common['Autorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home')
        } catch (err) {
            Alert.alert('Erro', 'Falha no Login')
            //showError(err)
        }
    }

    signup = async () => {
        try {
            //Chama a apai passando o parametros de cadastro do usuário e irá esperar o retorno do cadastro
            await axios.post(`${server}/signup` , {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })

            Alert.alert('Sucesso!', 'Usuário Cadastrado :)')
            this.setState({ stageNew: false })
        } catch (err) {
            showError(err)
        }
    }


    signinOrSignup =  () => {
        if (this.state.stageNew) {
            this.signup()
        } else {
            this.signin()
        }
    }

    //Usado sem a api para teste das funcionalidades
    // signinOrSignup = () => {
    //     if (this.state.stageNew) {
    //         Alert.alert('Sucesso!', 'Criar Conta')
    //     } else {
    //         Alert.alert('Sucesso!', 'Logar')
    //     }
    // }


    render () {
        const validation =[]

        validation.push(this.state.email && this.state.email.includes('@'))
        validation.push(this.state.password && this.state.password.length >= 4)

        if(this.state.stageNew){
            validation.push(this.state.name && this.state.name.trim())
            validation.push(this.state.confirmPassword)
            validation.push(this.state.password === this.state.confirmPassword)
        }
        const validForm = validation.reduce((all, v) => all && v)

        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    {this.state.stageNew && 
                        <AuthInput icon='user' placeholder='Nome' style={styles.input}
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })} />}
                        <AuthInput icon='at' placeholder='Email' style={styles.input}
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })} />
                        <AuthInput icon='lock' secureTextEntry={true} placeholder='Senha' style={styles.input}
                            valeu={this.state.password}
                            onChangeText={password => this.setState({ password })} />
                        {this.state.stageNew && 
                            <AuthInput icon="asterisk" secureTextEntry={true} placeholder='Confirmação' style={styles.input}
                            value={this.state.confirmPassword}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })} />}
                    <TouchableOpacity disabled={!validForm} onPress={this.signinOrSignup}>
                        <View style={[styles.button, !validForm ? {backgroundColor: "#AAA"} : {}]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding:10 }}
                    onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText} >
                        {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?' }
                    </Text>
                </TouchableOpacity>
            </ImageBackground>    
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 70,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        width: '90%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
    }
})