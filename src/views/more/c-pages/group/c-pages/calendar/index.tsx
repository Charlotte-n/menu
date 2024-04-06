import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import AutoText from '../../../../../../components/auto-text'
import moment from 'moment'
import theme from '../../../../../../styles/theme/color'
import { ClockCalendarApi } from '../../../../../../apis/group'
import { ClockCalendarParams } from '../../../../../../apis/types/group'
import { useAppSelector } from '../../../../../../store'
import { shallowEqual } from 'react-redux'
import { useRoute } from '@react-navigation/native'

interface IProps {
    children?: ReactNode
}

const CalendarDay: FC<IProps> = () => {
    const route = useRoute()
    const data = ''
    const { userInfo, currentTime } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
            currentTime: state.GroupSlice.currentTime,
        }
    }, shallowEqual)
    const ClockCalendarBody: ClockCalendarParams = {
        newDateTime: '2024-04-05',
        userId: userInfo.id,
        groupId: (route.params as { id: number }).id,
    }
    const ClockCalendar = () => {
        ClockCalendarApi(ClockCalendarBody).then((res) => {
            console.log(res.data)
        })
    }
    useEffect(() => {
        ClockCalendar()
    }, [])
    return (
        <View>
            <View className="text-center mt-[10] mb-[10]">
                <AutoText
                    fontSize={6}
                    style={{
                        textAlign: 'center',
                    }}
                >
                    减脂打卡监督小分队
                </AutoText>
            </View>
            <Calendar
                initialDate={moment(new Date()).format('YYYY-MM-DD')}
                minDate={'2022-05-10'}
                onDayPress={(day) => {
                    // console.log('selected day', day)
                }}
                onDayLongPress={(day) => {
                    // console.log('selected day', day)
                }}
                monthFormat={'yyyy-MM-dd'}
                onMonthChange={(month) => {
                    // console.log('month changed', month)
                }}
                firstDay={1}
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                onPressArrowRight={(addMonth) => addMonth()}
                enableSwipeMonths={true}
                markedDates={{
                    '2024-03-26': {
                        selected: true,
                        color: theme.colors.deep01Primary,
                    },
                }}
            />
            <View className="mt-[20] ml-[50]">
                <View className="flex-row">
                    <View
                        className="w-[20] h-[20] mr-[20]"
                        style={{
                            borderRadius: 10,
                            backgroundColor: theme.colors.deep01Primary,
                        }}
                    ></View>
                    <AutoText>已经打卡</AutoText>
                </View>
            </View>
        </View>
    )
}

export default memo(CalendarDay)
