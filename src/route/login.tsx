import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import LoginHome from '../views/login-register/login-register-home'
import Login from '../views/login-register/login'
import Register from '../views/login-register/register'
import theme from '../styles/theme/color'
interface IProps {
    children?: ReactNode
}

const Stack = createStackNavigator()
const LoginRegisterHomeScreen = () => {
    return (
        <Stack.Navigator initialRouteName={'LoginHome'}>
            <Stack.Screen
                name={'LoginHome'}
                component={LoginHome}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                }}
            ></Stack.Screen>
            <Stack.Screen
                name={'Login'}
                component={Login}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                }}
            ></Stack.Screen>
            <Stack.Screen
                name={'Register'}
                component={Register}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                }}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default memo(LoginRegisterHomeScreen)
