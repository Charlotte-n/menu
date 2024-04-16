import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Animated,
    FlatList,
    Image,
    ScrollView,
    TextInput,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native'
import AutoText from '../../../../components/auto-text'
import { Button } from '@rneui/themed'
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
                flag: 1,
            },
        ]
    })
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    //连接websocket
    const [ws, setWs] = useState(
        () => new WebSocket('ws://123.57.175.4:80/api/ws/' + userInfo.id),
    )
    useEffect(() => {
        ws.onopen = () => {
            console.log('我连接好了')
        }
        ws.onmessage = (event) => {
            console.log('收到WebSocket消息:', event.data)
        }
        ws.onerror = (res) => {
            console.log(res, '出现错误啦')
        }
        return () => {
            ws.close()
        }
    }, [])

    let msg = useRef('')
    const first = useRef(true)
    const [end, setEnd] = useState(false)
    //更新内容
    useEffect(() => {
        // 监听WebSocket消息事件
        ws.onmessage = (event) => {
            setEnd(false)
            if (event.data === '|') {
                setEnd(true)
                first.current = true
                setMessage((prevState) => {
                    const updatedState = prevState.slice() as any // 创建副本
                    updatedState[updatedState.length - 1].end = true // 在副本上进行修改
                    return updatedState // 返回修改后的副本
                })
                clearMsg()
                return
            }
            msg.current += event.data
            if (first.current) {
                first.current = false
                setMessage((prevState) => {
                    return [...prevState, { text: msg.current, sender: 'ai' }]
                })
            } else {
                //进行更新
                setMessage((prevState) => {
                    const updatedState = prevState.slice() // 创建副本
                    updatedState[updatedState.length - 1].text = msg.current // 在副本上进行修改
                    return updatedState // 返回修改后的副本
                })
            }
        }
        return () => {
            ws.onmessage = null
        }
    }, [ws])

    const clearMsg = () => {
        msg.current = ''
    }

    //渲染对话组件
    const Item = ({ data }: { data: messageType }) => {
        const cursorAnimation = new Animated.Value(0)
        useEffect(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(cursorAnimation, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(cursorAnimation, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ]),
            ).start()
        }, [])
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
                                maxWidth: 280,
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                borderRadius: 10,
                                backgroundColor: theme.colors.secondary,
                            }}
                        >
                            {data.text}
                            {(data as any).flag || (data as any).end ? null : (
                                <Animated.View
                                    style={[
                                        styles.cursor,
                                        {
                                            opacity: cursorAnimation,
                                        },
                                    ]}
                                />
                            )}
                        </AutoText>
                    </View>
                ) : (
                    <View className="flex-row  mb-[20] justify-end">
                        <AutoText
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                borderRadius: 10,
                                backgroundColor: theme.colors.secondary,
                            }}
                        >
                            {data.text}
                        </AutoText>

                        {userInfo.avatar ? (
                            <Image
                                style={{
                                    borderRadius: 100,
                                    marginLeft: 10,
                                    width: 35,
                                    height: 35,
                                }}
                                source={{ uri: userInfo.avatar }}
                            ></Image>
                        ) : (
                            <Image
                                source={require('../../../../../assets/images/bg_login_header.png')}
                                style={{
                                    borderRadius: 100,
                                    marginLeft: 10,
                                    width: 35,
                                    height: 35,
                                }}
                            ></Image>
                        )}
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
        }).then((res) => {})
    }

    return (
        <ScrollView
            className="bg-gray-50 pl-[20] pr-[20] pt-[10]  relative flex-1"
            showsVerticalScrollIndicator={false}
        >
            {/*显示对话内容的区域*/}
            <ScrollView
                style={{
                    height: Dimensions.get('window').height - 200,
                    marginBottom: 80,
                }}
                showsVerticalScrollIndicator={false}
            >
                <FlatList
                    scrollEnabled={false}
                    data={message}
                    renderItem={({ item }) => <Item data={item} />}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                ></FlatList>
            </ScrollView>
            {/*    文本框*/}
            <View
                style={{
                    marginBottom: 10,
                    position: 'absolute',
                    bottom: 0,
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    rightAlign: {
        justifyContent: 'flex-end',
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 100,
        marginLeft: 10,
    },
    message: {
        maxWidth: 280,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#CCCCCC',
        marginRight: 10,
    },
    cursor: {
        width: 4,
        height: 12,
        backgroundColor: 'black',
    },
})

export default memo(AI)
