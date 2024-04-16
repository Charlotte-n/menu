import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Group from '../views/more/c-pages/group'
import { TouchableOpacity } from 'react-native'
import AutoText from '../components/auto-text'
import CreateGroup from '../views/more/c-pages/group/c-pages/create-group'
import GroupDetailHome from '../views/more/c-pages/group/c-pages/group-detail-home'
import CalendarDay from '../views/more/c-pages/group/c-pages/calendar'
import Ranking from '../views/more/c-pages/group/c-pages/ranking'
import Clock from '../views/more/c-pages/group/c-pages/clock'
import MoreGroup from '../views/more/c-pages/group/c-pages/more-group'
import { useAppSelector } from '../store'
import { shallowEqual } from 'react-redux'
import MemberManage from '../views/more/c-pages/group/c-pages/member-manage'
import Search from '../views/more/c-pages/group/c-pages/search'

interface IProps {
    children?: ReactNode
    navigation: any
}

const Stack = createStackNavigator()

const GroupRoute: FC<IProps> = ({ navigation }) => {
    const { groupTitle } = useAppSelector((state) => {
        return {
            groupTitle: state.GroupSlice.groupTitle,
        }
    }, shallowEqual)
    const gotoCreate = () => {
        //直接跳转创建小组的页面
        navigation.navigate('createGroup')
    }
    return (
        <Stack.Navigator initialRouteName={'Group'}>
            <Stack.Screen
                name={'Group'}
                component={Group}
                options={{
                    headerTitle: '组队监督',
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                                className="pr-[20]"
                                onPress={() => {
                                    gotoCreate()
                                }}
                            >
                                <AutoText>创建</AutoText>
                            </TouchableOpacity>
                        )
                    },
                }}
            ></Stack.Screen>
            <Stack.Screen
                name={'createGroup'}
                component={CreateGroup}
                options={{
                    headerTitle: '创建小组',
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            ></Stack.Screen>
            <Stack.Screen
                name={'groupDetailHome'}
                component={GroupDetailHome}
                options={{
                    headerTitle: '小组详情',
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                    headerShown: false,
                    headerStatusBarHeight: 30,
                }}
            ></Stack.Screen>
            {/*打卡日历*/}
            <Stack.Screen
                name={'calendar'}
                component={CalendarDay}
                options={{
                    headerTitle: '打卡日历',
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            ></Stack.Screen>
            {/*    排行榜*/}

            <Stack.Screen
                name={'ranking'}
                component={Ranking}
                options={{
                    headerTitle: '排行榜',
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            ></Stack.Screen>
            <Stack.Screen
                name={'clock'}
                component={Clock}
                options={{
                    headerTitle: '打卡小分队',
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                    headerStyle: {
                        backgroundColor: '#FBEEE6',
                    },
                }}
            ></Stack.Screen>
            <Stack.Screen
                name={'moreGroup'}
                component={MoreGroup}
                options={{
                    headerTitle: groupTitle,
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                    headerStyle: {
                        backgroundColor: '#FBEEE6',
                    },
                }}
            ></Stack.Screen>
            <Stack.Screen
                name={'memberManage'}
                component={MemberManage}
                options={{
                    headerTitle: '成员管理',
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            ></Stack.Screen>
            <Stack.Screen
                name={'search'}
                component={Search}
                options={{
                    headerTitle: '搜索页面',
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default memo(GroupRoute)
