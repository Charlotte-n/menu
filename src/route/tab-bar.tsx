import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './home'
import DietScreen from './diet'
import HealthMealScreen from './health-meal'
import MineScreen from './mine'
import { Icon } from '@rneui/themed'
import theme from '../styles/theme/color'
import { Text } from 'react-native'
import MyLocation from '../components/location'

interface IProps {
    children?: ReactNode
}

const TabBar: FC<IProps> = () => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator
            screenOptions={{
                headerShadowVisible: false,
            }}
            initialRouteName={'DietScreen'}
        >
            <Tab.Screen
                name={'HomeScreen'}
                component={HomeScreen}
                options={{
                    title: '首页',
                    tabBarActiveTintColor: theme.colors.deep01Primary,
                    tabBarIcon: ({ color, size, focused }) => {
                        return focused ? (
                            <Icon
                                name={'home'}
                                color={theme.colors.deep01Primary}
                                type={'feather'}
                            ></Icon>
                        ) : (
                            <Icon name={'home'} type={'feather'} />
                        )
                    },
                }}
            ></Tab.Screen>
            <Tab.Screen
                name={'DietScreen'}
                component={DietScreen}
                options={{
                    title: '饮食',
                    tabBarActiveTintColor: theme.colors.deep01Primary,
                    tabBarIcon: ({ color, size, focused }) => {
                        return focused ? (
                            <Icon
                                name={'slightly-smile'}
                                color={theme.colors.deep01Primary}
                                type={'fontisto'}
                            ></Icon>
                        ) : (
                            <Icon name={'slightly-smile'} type={'fontisto'} />
                        )
                    },
                    headerShown: false,
                }}
            ></Tab.Screen>
            <Tab.Screen
                name={'HealthMealScreen'}
                component={HealthMealScreen}
                options={{
                    title: '健康简餐',
                    tabBarIcon: ({ color, size, focused }) => {
                        return focused ? (
                            <Icon
                                name={'filetext1'}
                                color={theme.colors.deep01Primary}
                                type={'antdesign'}
                            ></Icon>
                        ) : (
                            <Icon name={'filetext1'} type={'antdesign'} />
                        )
                    },
                    tabBarActiveTintColor: theme.colors.deep01Primary,
                }}
            ></Tab.Screen>
            <Tab.Screen
                name={'MineScreen'}
                component={MineScreen}
                options={{
                    title: '个人中心',
                    tabBarIcon: ({ color, size, focused }) =>
                        focused ? (
                            <Icon
                                name="user"
                                type="feather"
                                color={theme.colors.deep01Primary}
                                size={size}
                            />
                        ) : (
                            <Icon name="user" type="feather" size={size} />
                        ),
                    tabBarActiveTintColor: theme.colors.deep01Primary,
                    headerTitleAlign: 'center',
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    )
}

export default memo(TabBar)
