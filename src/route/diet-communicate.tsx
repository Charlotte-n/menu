import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Communicate from '../views/more/c-pages/communicate'
import RecordToday from '../views/more/c-pages/communicate/c-pages/record-today'
import CommunicateDetail from '../views/more/c-pages/communicate/c-pages/communicate-detail'

interface IProps {
    children?: ReactNode
}
const Stack = createStackNavigator()

const DietCommunicate: FC<IProps> = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'DietCommunication'}
                component={Communicate}
                options={{
                    headerTitle: '饮食圈广场',
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            ></Stack.Screen>
            <Stack.Screen
                name={'RecordToday'}
                component={RecordToday}
                options={{
                    headerTitle: '发布饮食圈记录',
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            ></Stack.Screen>
            <Stack.Screen
                name={'CommunicateDetail'}
                component={CommunicateDetail}
                options={{
                    headerTitle: '交流详情',
                    headerTitleStyle: {
                        fontSize: 15,
                    },
                }}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default memo(DietCommunicate)
