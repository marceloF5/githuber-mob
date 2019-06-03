import React from 'react'

import {
    View, Text, TouchableOpacity, Image, Linking,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './styles'

const IssueItem = ({ issue }) => (
    <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(issue.html_url)}>
        <Image style={styles.avatar} source={{ uri: issue.user.avatar_url }} />
        <View style={styles.infoContainer}>
            <Text style={styles.title}>{issue.title}</Text>
            <Text style={styles.author}>{issue.user.login}</Text>
        </View>
        <Icon style={styles.icon} name="chevron-right" size={16} />
    </TouchableOpacity>
)

export default IssueItem
