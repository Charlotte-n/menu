import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text } from 'nativewind/dist/preflight'
import { StyleSheet } from 'react-native'
import theme from '../../styles/theme/color'
interface IProps {
    children?: ReactNode
    getTime: (value: string | number) => void
}

const CountDown: FC<IProps> = (props) => {
    let [time, setTime] = useState(10)

    useEffect(() => {
        const inter = setInterval(() => {
            if (time <= 0) {
                props.getTime(time)
                inter && clearInterval(inter)
            }
            setTime(time--)
        }, 1000)
        return () => {
            inter && clearInterval(inter)
        }
    }, [])
    return <Text style={styles.TimeText}>{time}s</Text>
}
const styles = StyleSheet.create({
    TimeText: {
        borderRadius: 30,
        paddingVertical: 11,
        width: 100,
        fontSize: 15,
        borderStyle: 'solid',
        backgroundColor: theme.colors.deep01Primary,
        color: 'white',
        textAlign: 'center',
        alignContent: 'flex-end',
    },
})
export default memo(CountDown)
