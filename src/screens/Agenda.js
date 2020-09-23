import React, {Component} from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    ImageBackground, 
    FlatList, 
    TouchableOpacity, 
    Platform,
    Alert } from 'react-native'

import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTask'
import {server, showError} from '../common'
import todayImage from  '../../assets/imgs/today.jpg'
import tomorrowImage from  '../../assets/imgs/tomorrow.jpg'
import weekImage from  '../../assets/imgs/week.jpg'
import monthImage from  '../../assets/imgs/month.jpg'

//Flat List que permitir fazer o scrool das Tasks.
//Platform é o que diferencia as plataforma como android e IOS

export default class Agenda extends React.Component {
    state = {
        tasks: [],
        
        //Uasado para carregar as task no array
        // tasks: [
        //     {id: Math.random(), desc: 'Compra Curso de React Native', estimateAt: new Date(), doneAt: new Date() },
        //     {id: Math.random(), desc: 'Criar o APP para Gamorra', estimateAt: new Date(), doneAt: null },
        //     {id: Math.random(), desc: 'Compra Curso de React Native', estimateAt: new Date(), doneAt: new Date() },
        //     {id: Math.random(), desc: 'Criar o APP para Gamorra', estimateAt: new Date(), doneAt: null },
        //     {id: Math.random(), desc: 'Compra Curso de React Native', estimateAt: new Date(), doneAt: new Date() },
        //     {id: Math.random(), desc: 'Criar o APP para Gamorra', estimateAt: new Date(), doneAt: null },
        //     {id: Math.random(), desc: 'Compra Curso de React Native', estimateAt: new Date(), doneAt: new Date() },
        //     {id: Math.random(), desc: 'Criar o APP para Gamorra', estimateAt: new Date(), doneAt: null },
        //     {id: Math.random(), desc: 'Compra Curso de React Native', estimateAt: new Date(), doneAt: new Date() },
        //     {id: Math.random(), desc: 'Criar o APP para Gamorra', estimateAt: new Date(), doneAt: null },
        //     {id: Math.random(), desc: 'Compra Curso de React Native', estimateAt: new Date(), doneAt: new Date() },
        //     {id: Math.random(), desc: 'Criar o APP para Gamorra', estimateAt: new Date(), doneAt: null },
        // ],
        visibleTasks: [],
        showDoneTasks: true,
        showAddTask: false,
        IdTaskClicked: ''

    }

    addTask = async task => {
        //Alert.alert("Entrou", task.date.toString())
        try {
            await axios.post(`${server}/tasks`, {
                desc: task.desc,
                estimateAt: task.date
            })
            this.setState({ showAddTask: false }, this.loadTasks)
        }catch (err){
            showError(err)
        }

            // const tasks = [...this.state.tasks]
            // tasks.push({
            //     id: Math.random(),
            //     desc: task.desc,
            //     estimateAt: task.date,
            //     doneAt: null
            // })
            // this.setState({ tasks, showAddTask: false },
            //      this.filterTasks)
    }

    deleteTask = async id => {
        try {
            await axios.delete(`${server}/tasks/${id}`)
            await this.loadTasks()
        } catch (err) {
            showError(err)
        }
        // const tasks = this.state.tasks.filter(task => task.id !== id)
        // this.setState({ tasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({visibleTasks})
        
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    componentDidMount = async () => {
       this.loadTasks()
    }

    toggleTask = async id => {
        try {
            console.warn('Entrou no Tougle do Agenda.js')
            await axios.put(`${server}/tasks/${id}/toggle`)
            await this.loadTasks()
        } catch (err) {
            showError(err)
        }
    }
    //Usado para exemplo
    
    TesteID = id =>  {
         console.warn('Chamou a Função Agenda.JS - TesteID', id.toString())
         this.setState({IdTaskClicked: id.toString()})
         this.setState({ showAddTask: true })
         //console.warn('Entrou? TesteID: ', this.state.IdTaskClicked)
         
        
    }
    TesteDESC = desc =>  {
        console.warn('Chamou a Função Agenda.JS - TesteDESC', desc.toString())
        //Alert.alert('Chamou a Função Agenda.JS - Testex', id.toString())
        //this.setState({ showAddTask: true })
        //console.warn('Agenda.JS - Testex - Status ShowAddTask', this.state.showAddTask)
        //console.warn('Agenda.JS - Testex - Title: ',)
  
    }

    Testey = () =>  {
        Alert.alert('Chamou a Função Agenda.JS - Testex', id.toString())
    }

    loadTasks = async () => {
       try{
           const maxDate = moment().add({ days: this.props.daysAhead }).format('YYYY-MM-DD 23:59')
           const res = await axios.get(`${server}/tasks?date=${maxDate}`)
           //const res = await axios.get(`${server}/tasks`)
           //console.log(`${server}/tasks?date=${maxDate}`)
           this.setState({ tasks: res.data }, this.filterTasks)

       } catch(err) {
           showError(err)
       }
    }

    render(){
        let styleColor = null
        let image = null

        switch(this.props.daysAhead) {
            case 0: 
                styleColor = commonStyles.colors.today
                image = todayImage
                break 
            case 1: 
                styleColor = commonStyles.colors.tomorrow
                image = tomorrowImage
                break
            case 7: 
                styleColor = commonStyles.colors.week
                image = weekImage
                break
            case 30: 
                styleColor = commonStyles.colors.month
                image = monthImage
                break
        }

        
        return (
            <View style={styles.container}>
                {/* Defini o cabeçalho */}
                <AddTask isVisible={this.state.showAddTask}
                    onSave={this.addTask}
                    OnTeste={this.state.IdTaskClicked}
                    onCancel={() => this.setState({ showAddTask: false })}>
                </AddTask>
                <ImageBackground source={image}
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars' size={20} color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                            size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>    
                </ImageBackground>
                <View style={styles.taskContainer}>
                    {/* <Text>Tarefa 1</Text>
                    {/* <Task desc='Tarefa concluída' estimateAt={new Date()} doneAt={new Date()} /> */}
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}` }
                        renderItem={({ item }) => 
                            <Task {...item} onToggleTask={this.toggleTask}
                                onDelete={this.deleteTask} OnTeste={this.TesteID} /> } />
                </View>
                <ActionButton buttonColor={styleColor} 
                    onPress={() => { this.setState({ showAddTask: true }) }}>
                </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginLeft: 20,
        marginBottom: 10,

    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    taskContainer: {
        flex: 7
    },
    iconBar: {
        marginTop: Platform.OS  === 'ios' ? 30 : 10, 
        marginHorizontal: 20, 
        flexDirection: 'row',
        justifyContent: 'space-between' 
    }
})