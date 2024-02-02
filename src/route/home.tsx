import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../views/home'

interface IProps {
    children?: ReactNode
}

const Stack = createStackNavigator()
const HomeScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'Home'}
                component={Home}
                options={{ headerShown: false }}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default memo(HomeScreen)
