import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import { TextInput, TouchableOpacity, View, Keyboard } from 'react-native'
import { BottomSheet, Button } from '@rneui/themed'
import theme from '../../../../../styles/theme/color'

interface IProps {
    children?: any
}

const CommentModal: FC<IProps> = ({ children }) => {
    const [comment, setComment] = useState('')
    const inputRef = useRef<any>(null)
    const disShow = children.disShow
    const disShowEdit = children.disShowEdit

    useEffect(() => {
        setTimeout(() => {
            inputRef.current.focus()
        }, 500)
        return () => {
            Keyboard.dismiss()
        }
    }, [])

    return (
        <BottomSheet
            isVisible={true}
            containerStyle={{
                height: 300,
            }}
        >
            <View className="flex-row pl-[10] pr-[10] items-center bg-white  h-[100]">
                <TextInput
                    ref={inputRef}
                    className="flex-1 mr-[10] pl-[10] pr-[10]  border-solid  border-b-amber-200 h-[45]"
                    style={{
                        backgroundColor: '#f6f6f6',
                        borderRadius: 30,
                    }}
                    placeholder="写评论....."
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                />
                <TouchableOpacity>
                    <Button
                        title={'发送'}
                        className="bg-red-50"
                        buttonStyle={{
                            backgroundColor: theme.colors.deep01Primary,
                            borderRadius: 15,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                        }}
                        onPress={() => {
                            disShow()
                            disShowEdit()
                        }}
                    ></Button>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    )
}

export default memo(CommentModal)
