import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { FlatList, Image, ScrollView, TextInput, View } from 'react-native'
import AutoText from '../../../../components/auto-text'
import { Button, Input } from '@rneui/themed'
import theme from '../../../../styles/theme/color'
import { AiQuestionApi } from '../../../../apis/common'
import { useAppSelector } from '../../../../store'
import { shallowEqual } from 'react-redux'

interface IProps {
    children?: ReactNode
}
interface messageType {
    sender: string
    text: string
}

const AI: FC<IProps> = () => {
    const inputRef = useRef<any>()
    const [inputContent, setInputContent] = useState('')
    const [message, setMessage] = useState<messageType[]>(() => {
        return [
            {
                text: '你好！很高兴能为你提供有关饮食健康的建议。',
                sender: 'ai',
            },
        ]
    })
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)

    //渲染对话组件
    const Item = ({ data }: { data: messageType }) => {
        return (
            <>
                {data.sender === 'ai' ? (
                    <View className="flex-row mb-[20]">
                        <Image
                            style={{
                                marginRight: 10,
                                width: 30,
                                height: 30,
                            }}
                            source={require('../../../../../assets/images/robot.png')}
                        ></Image>
                        <AutoText
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                borderRadius: 10,
                                backgroundColor: theme.colors.secondary,
                                flex: 1,
                            }}
                        >
                            {data.text}
                        </AutoText>
                    </View>
                ) : (
                    <View className="flex-row  mb-[20]">
                        <AutoText
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                borderRadius: 10,
                                backgroundColor: theme.colors.secondary,
                                flex: 1,
                            }}
                        >
                            {data.text}
                        </AutoText>
                        <Image
                            style={{
                                borderRadius: 100,
                                marginLeft: 10,
                                width: 35,
                                height: 35,
                            }}
                            source={{ uri: userInfo.avatar }}
                        ></Image>
                    </View>
                )}
            </>
        )
    }

    //ai
    const getAiAnswer = () => {
        //先将对话放在setMessage中
        setMessage((prevState) => {
            return [...prevState, { text: inputContent, sender: 'user' }]
        })
        AiQuestionApi({
            question: inputContent,
            userid: userInfo.id,
        }).then((res) => {
            setMessage((prevState) => {
                return [...prevState, { text: res.data, sender: 'ai' }]
            })
        })
    }
    useEffect(() => {
        setTimeout(() => {
            inputRef.current.focus()
        }, 100)
    }, [])

    return (
        <View className="flex-1 bg-gray-50 pl-[20] pr-[20] pt-[10]">
            {/*显示对话内容的区域*/}
            <FlatList
                data={message}
                renderItem={({ item }) => <Item data={item} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
            ></FlatList>
            {/*    文本框*/}
            <View
                style={{
                    marginBottom: 10,
                }}
                className="flex-row"
            >
                <TextInput
                    ref={inputRef}
                    className="flex-1 mr-[10]"
                    style={{
                        paddingHorizontal: 10,
                        height: 45,
                        borderWidth: 1,
                        borderColor: theme.colors.deep01Primary,
                        borderRadius: 10,
                    }}
                    value={inputContent}
                    onChangeText={(e) => {
                        setInputContent(e)
                    }}
                ></TextInput>
                <Button
                    onPress={() => {
                        getAiAnswer()
                        setInputContent('')
                    }}
                    buttonStyle={{
                        height: 46,
                        paddingHorizontal: 15,
                        borderRadius: 15,
                        backgroundColor: theme.colors.deep01Primary,
                    }}
                >
                    发送
                </Button>
            </View>
        </View>
    )
}

export default memo(AI)
