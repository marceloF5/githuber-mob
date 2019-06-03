import React from 'react'

import Header from '~/components/Header'
import IssueItem from './IssueItem'

import {
    View, Text, ActivityIndicator, FlatList,
} from 'react-native'
import styles from './styles'

import api from '~/services/api'

class Issues extends React.Component {
    state = {
        activeFilter: 'all',
        error: false,
        loading: true,
        message: '',
        refreshing: false,
        issues: [],
    }

    componentDidMount() {
        this.loadIssues()
    }

    loadIssues = async () => {
        this.setState({ refreshing: true })

        const { activeFilter } = this.state
        const { navigation } = this.props
        const { data } = await api.get(
            `/repos/${navigation.getParam('full_name')}/issues?state=${activeFilter}`,
        )

        this.setState({ issues: data, refreshing: false, loading: false })
        console.tron.log(data)
    }

    renderIssueItem = ({ item }) => <IssueItem issue={item} />

    // renderIssueItem = ({ item }) => <Text>{item.id}</Text>

    renderIssuesList = () => {
        const { issues, refreshing } = this.state

        return (
            <FlatList
                data={issues}
                keyExtractor={item => String(item.id)}
                renderItem={this.renderIssueItem}
                onRefresh={this.loadIssues}
                refreshing={refreshing}
            />
        )
    }

    render() {
        const { loading } = this.state
        return (
            <View style={styles.container}>
                <Header title="Issues List by Repo" backTo="ReposStars" />

                {loading ? (
                    <ActivityIndicator size="large" style={styles.loading} />
                ) : (
                    this.renderIssuesList()
                )}
            </View>
        )
    }
}

export default Issues
