import React from 'react'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'

import api from '~/services/api'

import {
    View, Text, TextInput, TouchableOpacity, StatusBar, ActivityIndicator,
} from 'react-native'

import styles from './styles'

class Welcome extends React.Component {
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }),
    }

    state = {
        username: '',
        loading: false,
        error: false,
    }

    componentDidMount() {}

    checkUserExists = async (username) => {
        const user = await api.get(`/users/${username}`)
        return user
    }

    saveUserStorage = async (username) => {
        await AsyncStorage.setItem('@Githuber:username', username)
    }

    signIn = async () => {
        const { username } = this.state
        const { navigation } = this.props

        this.setState({ loading: true })
        try {
            await this.checkUserExists(username)
            await this.saveUserStorage(username)

            navigation.navigate('User')
        } catch (err) {
            this.setState({ loading: false, error: true })
        }
    }

    render() {
        const { username, loading, error } = this.state

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Text style={styles.title}>Bem-vindo</Text>
                <Text style={styles.text}>
                    Para continuar, precisamos que você informe seu utilizador do GitHub
                </Text>

                {error && <Text style={styles.error}>User Not Found</Text>}

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Type your user"
                        underlineColorAndroid="transparent"
                        value={username}
                        onChangeText={text => this.setState({ username: text })}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.signIn}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Go On!</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Welcome
