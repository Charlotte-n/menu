import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Mine from '../views/mine'

interface IProps {
    children?: ReactNode
}
const Stack = createStackNavigator()
const MineScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'mine'}
                component={Mine}
                options={{ headerShown: false }}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default memo(MineScreen)
