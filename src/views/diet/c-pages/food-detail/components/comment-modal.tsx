import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import {
    TextInput,
    TouchableOpacity,
    View,
    Keyboard,
    ToastAndroid,
} from 'react-native'
import { BottomSheet, Button } from '@rneui/themed'
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
    const { comments, userInfo, parentId } = useAppSelector((state) => {
        return {
            comments: state.FoodSlice.comment,
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
        const data: PostFoodCommentData = {
            content: comment,
            dishId: foodId,
            userId: userInfo.id,
            parentId: parentId,
        }
        const res = await PostCommentsApi(data)
        console.log(res)
        await getComment()
    }
    const getComment = async () => {
        //获取评论列表
        const res = await getCommentsApi(foodId)
        console.log(res.data)
        dispatch(changeCommentAction(res.data))
    }

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
