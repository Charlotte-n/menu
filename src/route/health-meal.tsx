import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Text } from 'nativewind/dist/preflight'
import { Tab, TabView } from '@rneui/themed'
import { createStackNavigator } from '@react-navigation/stack'
import HealthMeal from '../views/health-meal'

interface IProps {
    children?: ReactNode
}

const Stack = createStackNavigator()
const HealthMealScreen: FC<IProps> = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name={'health-meal'}
                component={HealthMeal}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default memo(HealthMealScreen)
