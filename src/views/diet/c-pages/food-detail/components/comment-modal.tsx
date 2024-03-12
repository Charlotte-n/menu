import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import {
    TextInput,
    TouchableOpacity,
    View,
    Keyboard,
    ToastAndroid,
} from 'react-native'
import { BottomSheet, Button, Icon } from '@rneui/themed'
import theme from '../../../../../styles/theme/color'
import { PostFoodCommentData } from '../../../../../apis/types/food'
import { getCommentsApi, PostCommentsApi } from '../../../../../apis/food'
import { useAppDispatch, useAppSelector } from '../../../../../store'
import { shallowEqual } from 'react-redux'
import { changeCommentAction } from '../../../../../store/slice/food'

interface IProps {
    children?: any
    foodId: number
}

const CommentModal: FC<IProps> = ({ children, foodId }) => {
    const [comment, setComment] = useState('')
    const inputRef = useRef<any>(null)
    const disShow = children.disShow
    const disShowEdit = children.disShowEdit
    const { userInfo, parentId } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
            parentId: state.FoodSlice.parentId,
        }
    }, shallowEqual)
    const dispatch = useAppDispatch()
    useEffect(() => {
        setTimeout(() => {
            inputRef.current.focus()
        }, 500)
        return () => {
            Keyboard.dismiss()
        }
    }, [])

    //发表评论
    enum COMMENT_TYPE {
        FATHER = 0,
    }

    const postComments = async () => {
        if (comment === '') {
            ToastAndroid.show('内容不能为空', ToastAndroid.SHORT)
            return
        }
        try {
            const data: PostFoodCommentData = {
                content: comment,
                dishId: foodId,
                userId: userInfo.id,
                parentId: parentId,
            }
            await PostCommentsApi(data)
            await getComment()
        } catch (e) {
            console.log(e)
        }
    }
    const getComment = async () => {
        //获取评论列表
        const res = await getCommentsApi(foodId)
        dispatch(changeCommentAction(res.data))
    }

    return (
        <BottomSheet
            isVisible={true}
            containerStyle={{
                height: 300,
            }}
        >
            <View className="bg-white items-end justify-end pt-[5]">
                <TouchableOpacity
                    className=" pr-[20]"
                    onPress={() => {
                        disShow()
                        disShowEdit()
                    }}
                >
                    <Icon type="antdesign" name="close"></Icon>
                </TouchableOpacity>
            </View>
            <View className="flex-row pl-[10] pr-[10] items-center bg-white  h-[80]">
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
                            //发表评论
                            postComments()
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
