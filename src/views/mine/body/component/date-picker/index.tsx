import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import theme from '../../../../../styles/theme/color'
import { Icon } from '@rneui/themed'
import moment from 'moment'
interface IProps {
    children?: ReactNode
    birth: any
    setBirth: any
}

const DatePicker: FC<IProps> = ({ birth, setBirth }) => {
    const [date, setDate] = useState(new Date(1598051730000))
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [currentDate, setCurrentDate] = useState('')
    const onChange = (event: any, selectedDate: any) => {
        if (event.type === 'dismissed') {
            setShow(false)
        } else {
            setShow(false)
            setBirth(moment(selectedDate).format('YYYY-MM-DD'))
            setCurrentDate(moment(selectedDate).format('YYYY-MM-DD'))
        }
    }

    //刚开始的生日日期
    useEffect(() => {
        if (birth) {
            setCurrentDate(birth.join('-'))
        } else {
            setBirth(moment(date).format('YYYY-MM-DD'))
        }
    }, [])
    useEffect(() => {
        setBirth(currentDate)
    }, [currentDate])
    return (
        <TouchableOpacity
            className="flex-row items-center border-[#F1F3F4] border-b"
            onPress={() => setShow(true)}
            style={{ height: 58 }}
        >
            <Text
                className="flex-1"
                style={{ fontSize: 15, fontWeight: '300' }}
            >
                出生日期
            </Text>
            <View className="flex-row items-center">
                <Text style={{ fontSize: 15, fontWeight: '300' }}>
                    {currentDate
                        ? currentDate
                        : String(moment(date).format('YYYY-MM-DD'))}
                </Text>
                <Icon
                    type={'antdesign'}
                    name={'caretdown'}
                    size={10}
                    color={'#666666'}
                    style={{
                        marginLeft: 10,
                        marginRight: 15,
                    }}
                ></Icon>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    display="spinner"
                    value={date}
                    //@ts-ignore
                    mode={mode}
                    is24Hour={false}
                    onChange={onChange}
                    style={{
                        backgroundColor: theme.colors.deep01Primary,
                    }}
                />
            )}
        </TouchableOpacity>
    )
}

export default memo(DatePicker)
