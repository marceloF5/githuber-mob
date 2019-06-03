import React from 'react'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'

import Header from '~/components/Header'
import RepoStarItem from './RepoStarItem'

import {
    View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'

import api from '~/services/api'

const TabIcon = ({ tintColor }) => <Icon name="star" size={20} color={tintColor} />

TabIcon.propTypes = {
    tintColor: PropTypes.string.isRequired,
}

class ReposStars extends React.Component {
    static navigationOptions = {
        tabBarIcon: TabIcon,
    }

    state = {
        error: false,
        loading: false,
        loadingList: true,
        message: '',
        refreshing: false,
        repoName: '',
        repositories: [],
    }

    async componentDidMount() {
        this.loadRepos()
    }

    loadRepos = async () => {
        this.setState({ refreshing: true })

        const repositories = JSON.parse(await AsyncStorage.getItem('@GitHuber:repositories'))

        this.setState({ repositories: repositories || [], loadingList: false, refreshing: false })
    }

    addRepo = async () => {
        const { repoName, repositories } = this.state
        this.setState({ loading: true })
        if (!repoName) {
            this.setState({
                loading: false,
                error: true,
                message: 'You does not type any repository, please type one',
            })
            return
        }
        if (repositories.find(repository => repository.full_name === repoName)) {
            this.setState({ loading: false, error: true, message: 'Duplicate Repository' })
            return
        }
        try {
            const { data } = await api.get(`/repos/${repoName}`)

            this.setState({
                error: false,
                repoName: '',
                message: '',
                repositories: [...repositories, data],
            })
            await AsyncStorage.setItem(
                '@GitHuber:repositories',
                JSON.stringify([...repositories, data]),
            )
        } catch (err) {
            this.setState({ error: true, message: err.response.data.message })
        } finally {
            this.setState({
                loading: false,
            })
        }
    }

    renderRepoStarItem = ({ item }) => <RepoStarItem repository={item} />

    renderReposList = () => {
        const { repositories, refreshing } = this.state
        return (
            <FlatList
                data={repositories}
                keyExtractor={item => String(item.id)}
                renderItem={this.renderRepoStarItem}
                onRefresh={this.loadRepos}
                refreshing={refreshing}
            />
        )
    }

    render() {
        const {
            repoName, error, loading, loadingList, message,
        } = this.state
        return (
            <View style={styles.container}>
                <Header title="ReposStars" />
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Add new repository"
                            underlineColorAndroid="transparent"
                            value={repoName}
                            onChangeText={text => this.setState({ repoName: text })}
                        />
                        <TouchableOpacity onPress={this.addRepo}>
                            {loading ? (
                                <ActivityIndicator size="small" style={styles.formLoading} />
                            ) : (
                                <Icon name="plus" size={18} style={styles.formIcon} />
                            )}
                        </TouchableOpacity>
                    </View>
                    {error && <Text style={styles.message}>{message}</Text>}
                </View>

                {loadingList ? (
                    <ActivityIndicator size="large" style={styles.loading} />
                ) : (
                    this.renderReposList()
                )}
            </View>
        )
    }
}

export default ReposStars
