import React from 'react'
import { withNavigation } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
    View, Text, TouchableOpacity, StatusBar,
} from 'react-native'

import styles from './styles'

class Header extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }),
    }

    signOut = async () => {
        const { navigation } = this.props

        await AsyncStorage.clear()
        navigation.navigate('Welcome')
    }

    render() {
        const { title, backTo, navigation } = this.props
        const { navigate } = navigation
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <TouchableOpacity style={styles.left} onPress={() => navigate(backTo)}>
                    {backTo && <Icon name="chevron-left" size={18} style={styles.icon} />}
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={this.signOut}>
                    <Icon name="exchange" size={18} style={styles.icon} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default withNavigation(Header)
