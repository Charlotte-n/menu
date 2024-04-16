import React, { memo, useEffect, useRef, useState } from 'react'
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
    const { userInfo, currentTime } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
            currentTime: state.GroupSlice.currentTime,
        }
    }, shallowEqual)
    const ClockCalendarBody: ClockCalendarParams = {
        userId: userInfo.id,
        groupId: (route.params as { id: number }).id,
    }
    const [date, setDate] = useState({})
    const [array, setArray] = useState([] as any)
    const ClockCalendar = () => {
        try {
            ClockCalendarApi(ClockCalendarBody).then((res) => {
                if (res.code === 1) {
                    setArray(
                        res.data.datetime ? res.data.datetime.split('|') : [],
                    )
                    res.data.datetime
                        ? res.data.datetime
                              .split('|')
                              .filter((item) => {
                                  return item !== ' '
                              })
                              .map((value) => {
                                  setDate((prevState) => {
                                      ;(prevState as any)[value.trim()] = {
                                          selectedColor:
                                              theme.colors.deep01Primary,
                                          selected: true,
                                      }
                                      return prevState
                                  })
                              })
                        : null
                }
            })
        } catch (e) {
            console.log(e, '打卡日历接口出错了')
        }
    }
    useEffect(() => {
        ClockCalendar()
    }, [date])
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
                    {(route.params as { name: string }).name}
                </AutoText>
            </View>
            <Calendar
                initialDate={moment(new Date()).format('YYYY-MM-DD')}
                theme={{
                    todayTextColor: theme.colors.deep01Primary,
                    arrowColor: theme.colors.deep01Primary,
                }}
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
                markedDates={date}
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
