import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './home'
import DietScreen from './diet'
import HealthMealScreen from './health-meal'
import MineScreen from './mine'
import { Icon } from '@rneui/themed'
import theme from '../styles/theme/color'
import { Image, TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppSelector } from '../store'
import { changeOpenAction } from '../store/slice/home'
import { transformAdaption } from '../utils/adaptation'
import { shallowEqual } from 'react-redux'

interface IProps {
    children?: ReactNode
}

const TabBar: FC<IProps> = () => {
    const Tab = createBottomTabNavigator()
    const dispatch = useAppDispatch()
    const { isOpen } = useAppSelector((state) => {
        return {
            isOpen: state.HomeSlice.open,
        }
    }, shallowEqual)
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
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(changeOpenAction(!isOpen))
                            }}
                        >
                            <Image
                                source={require('../../assets/icon/more.png')}
                                style={{
                                    width: transformAdaption(30),
                                    height: transformAdaption(30),
                                    marginLeft: transformAdaption(10),
                                }}
                            ></Image>
                        </TouchableOpacity>
                    ),
                    headerTitleAlign: 'center',
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
                    headerTitleAlign: 'center',
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
                    headerTitleAlign: 'center',
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
