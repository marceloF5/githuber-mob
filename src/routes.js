import {
    createAppContainer,
    createSwitchNavigator,
    createBottomTabNavigator,
} from 'react-navigation'

import Issues from '~/pages/Issues'
import Organizations from '~/pages/Organizations'
import Repositories from '~/pages/Repositories'
import ReposStars from '~/pages/ReposStars'
import Welcome from '~/pages/Welcome'

import { colors } from '~/styles'

const Routes = (userLogged = false) => createAppContainer(
    createSwitchNavigator(
        {
            Welcome,
            Issues,
            User: createBottomTabNavigator(
                {
                    ReposStars,
                    Repositories,
                    Organizations,
                },
                {
                    tabBarOptions: {
                        showIcon: true,
                        showLabel: false,
                        activeTintColor: colors.white,
                        inactiveTintColor: colors.whiteTransparent,
                        style: {
                            backgroundColor: colors.secundary,
                        },
                    },
                },
            ),
        },
        { initialRouteName: userLogged ? 'User' : 'Welcome' },
    ),
)

export default Routes
