import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Dialog, Icon } from '@rneui/themed'
import theme from '../../../../../styles/theme/color'

interface IProps {
    children?: ReactNode
    title: string
    modelTitle: string
    inputContent: string
    content: string
    setValue: any
}

const HighPicker: FC<IProps> = ({
    title,
    modelTitle,
    inputContent,
    content,
    setValue,
}) => {
    const [isShow, setIsShow] = useState(false)
    const [contentValue, setContentValue] = useState('')
    const selected = useRef(content)
    useEffect(() => {
        // console.log(content)
    }, [])
    const feedBack = () => {
        switch (title) {
            case '身高':
                return (
                    <Text style={{ fontSize: 15, fontWeight: '300' }}>
                        {selected.current ? selected.current : content}
                    </Text>
                )
            case '体重':
                return (
                    <Text style={{ fontSize: 15, fontWeight: '300' }}>
                        {selected.current ? selected.current : content}
                    </Text>
                )
            case '运动习惯':
                return (
                    <Text style={{ fontSize: 15, fontWeight: '300' }}>
                        {selected.current ? selected.current : content}
                    </Text>
                )
            default:
                return (
                    <Text style={{ fontSize: 15, fontWeight: '300' }}>
                        {content}
                    </Text>
                )
        }
    }
    useEffect(() => {}, [])
    return (
        <TouchableOpacity
            className="flex-row items-center h-[58] border-[#F1F3F4] border-b"
            onPress={() => setIsShow(true)}
        >
            <Text
                className="flex-1"
                style={{ fontSize: 15, fontWeight: '300' }}
            >
                {title}
            </Text>
            <View className="flex-row items-center">
                {feedBack()}
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
            <Dialog isVisible={isShow}>
                <Dialog.Title title={modelTitle} />
                <TextInput
                    style={{
                        borderColor: '#888888',
                        height: 40,
                    }}
                    placeholder={inputContent}
                    onChangeText={(value) => setContentValue(value)}
                    value={contentValue}
                    className="border pl-[5]"
                    placeholderTextColor={'#6666'}
                ></TextInput>
                <Dialog.Actions>
                    <Dialog.Button
                        title="确定"
                        onPress={() => {
                            setIsShow(false)
                            selected.current = contentValue
                            setValue(selected.current)
                        }}
                        titleStyle={{
                            color: theme.colors.deep01Primary,
                        }}
                    />
                    <Dialog.Button
                        title="取消"
                        onPress={() => setIsShow(false)}
                        titleStyle={{
                            color: theme.colors.deep01Primary,
                        }}
                    />
                </Dialog.Actions>
            </Dialog>
        </TouchableOpacity>
    )
}

export default memo(HighPicker)
