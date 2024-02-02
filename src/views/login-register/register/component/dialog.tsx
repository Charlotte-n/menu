import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {  Dialog } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

interface IProps {
    children?: ReactNode
}

const DialogComponent: FC<IProps> = () => {
    const navigation = useNavigation()
    const [visible5, setVisible5] = useState(true)
    const toggleDialog5 = () => {
        setVisible5(!visible5)
    }
    return (
        <Dialog isVisible={visible5} onBackdropPress={toggleDialog5}>
            <Dialog.Title title="该邮箱已经注册过了,是否要跳转到登录页面?" />
            <Dialog.Actions>
                <Dialog.Button
                    title="确定"
                    onPress={() => {
                        // @ts-ignore
                        navigation.navigate('Login')
                        setVisible5(false)
                    }}
                />
                <Dialog.Button title="取消" onPress={toggleDialog5} />
            </Dialog.Actions>
        </Dialog>
    )
}

export default memo(DialogComponent)
