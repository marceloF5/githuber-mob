import { StyleSheet } from 'react-native'

import { colors, metrics } from '~/styles'

const style = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.lighter },

    loading: {
        marginTop: metrics.baseMargin * 2,
    },
})

export default style
