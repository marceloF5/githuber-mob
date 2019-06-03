import React from 'react'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'

import {
    TouchableOpacity, View, Text, Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './styles'

const RepoStarItem = ({ repository, navigation: { navigate } }) => (
    <TouchableOpacity
        style={styles.container}
        onPress={() => navigate('Issues', { title: repository.name, full_name: repository.full_name })
        }
    >
        <Image style={styles.avatar} source={{ uri: repository.owner.avatar_url }} />
        <View style={styles.infoContainer}>
            <Text style={styles.title}>{repository.name}</Text>
            <Text style={styles.author}>{repository.owner.login}</Text>
        </View>
        <Icon style={styles.icon} name="chevron-right" size={16} />
    </TouchableOpacity>
)

RepoStarItem.propTypes = {
    repository: PropTypes.shape({
        name: PropTypes.string,
        owner: PropTypes.shape({
            avatar_url: PropTypes.string,
            login: PropTypes.string,
        }),
    }).isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
}

export default withNavigation(RepoStarItem)
