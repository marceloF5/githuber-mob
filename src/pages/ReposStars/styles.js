import { StyleSheet } from 'react-native'

import { colors, metrics } from '~/styles'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lighter,
    },
    inputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    form: {
        borderBottomColor: colors.light,
        borderBottomWidth: 1,
        padding: metrics.basePadding / 1.2,
    },
    input: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: metrics.baseRadius,
        width: metrics.screenWidth - 60,
        padding: metrics.basePadding / 2,
        marginRight: metrics.baseMargin,
        fontSize: 14,
    },
    message: {
        textAlign: 'left',
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.danger,
        marginTop: metrics.baseMargin,
    },
    loading: {
        marginTop: metrics.baseMargin * 2,
    },
})

export default styles
