import { StyleSheet } from 'react-native'

import { colors, metrics } from '~/styles'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        margin: metrics.baseMargin,
        padding: metrics.basePadding,
        borderRadius: metrics.baseRadius,
    },

    avatar: {
        width: 50,
        height: 50,
    },

    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: metrics.baseMargin,
    },

    author: {
        color: colors.regular,
        fontSize: 14,
        marginLeft: metrics.baseMargin,
    },

    icon: {
        color: colors.light,
    },
})

export default styles
