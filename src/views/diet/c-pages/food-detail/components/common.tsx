import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, TextInput, TouchableOpacity, View, Text } from 'react-native'
import AutoText from '../../../../../components/auto-text'
import { useAppDispatch, useAppSelector } from '../../../../../store'
import { shallowEqual } from 'react-redux'
import theme from '../../../../../styles/theme/color'
import { useNavigation } from '@react-navigation/native'
import { getCommentsApi, PostCommentsApi } from '../../../../../apis/food'
import {
    changeCommentAction,
    changeParentIdAction,
} from '../../../../../store/slice/food'
import { PostFoodCommentData } from '../../../../../apis/types/food'

interface IProps {
    children?: any
    foodId: number
}

const common: FC<IProps> = ({ children, foodId }) => {
    const show = children.show
    const navigation = useNavigation()
    const [comment, setComment] = useState('')
    //获取comments
    const { comments, userInfo } = useAppSelector((state) => {
        return {
            comments: state.FoodSlice.comment,
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const dispatch = useAppDispatch()
    //获取用户的评论
    const getComments = () => {
        getCommentsApi(foodId).then((res) => {
            dispatch(changeCommentAction(res.data))
        })
    }

    useEffect(() => {
        getComments()
    }, [])
    //去往回复详情页面
    const GoCommentComply = (id: number) => {
        //@ts-ignore
        navigation.navigate('commentsComply', { id })
    }
    return (
        <View>
            {/*标题*/}
            <View>
                <AutoText
                    fontSize={6.5}
                    style={{
                        fontWeight: 700,
                    }}
                >
                    这道菜的评论 {comments?.length}
                </AutoText>
            </View>
            {/*用户发评论的帖子*/}
            <View className="mt-[20] flex-row items-center pl-[5] pr-[5]">
                <Image
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                    }}
                    source={{ uri: userInfo.avatar }}
                ></Image>
                <TouchableOpacity
                    onPress={() => {
                        show()
                        dispatch(changeParentIdAction(0))
                    }}
                    className="flex-1 h-[35]"
                >
                    <TextInput
                        editable={false}
                        className="flex-1 ml-[10] pl-[10] pr-[10]  border-solid  border-b-amber-200 h-[35]"
                        style={{
                            backgroundColor: '#F6F6F6',
                            borderRadius: 30,
                        }}
                        placeholder="喜欢评论的人,做饭一定很好吃~"
                        value={comment}
                        onChangeText={(text) => setComment(text)}
                    />
                </TouchableOpacity>
            </View>
            {/*    用户的评论*/}

            {comments?.length
                ? comments.map((item) => (
                      <View
                          key={item.id}
                          className="flex-row pl-[5] pr-[5] mt-[20]"
                      >
                          <Image
                              source={{ uri: item.avatar }}
                              style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 100,
                              }}
                              resizeMode={'cover'}
                          ></Image>
                          <View className="ml-[10]">
                              {/*自己的展示*/}
                              <View className="w-[200]">
                                  <AutoText
                                      numberOfLines={1}
                                      fontSize={5.5}
                                      style={{
                                          color: '#cccccc',
                                          marginBottom: 10,
                                      }}
                                  >
                                      {item.username}
                                  </AutoText>
                                  <TouchableOpacity
                                      onPress={() => {
                                          show()
                                          //parentId
                                          dispatch(
                                              changeParentIdAction(item.id),
                                          )
                                      }}
                                  >
                                      <AutoText fontSize={4.8}>
                                          {item.content}
                                      </AutoText>
                                  </TouchableOpacity>
                              </View>
                              {/*    回复的展示*/}

                              {item.children.length ? (
                                  <View className="mt-[10] flex-row">
                                      <Image
                                          source={{ uri: item.avatar }}
                                          style={{
                                              width: 25,
                                              height: 25,
                                              borderRadius: 100,
                                          }}
                                      ></Image>
                                      <View className="relative top-1 ml-[5]">
                                          <AutoText
                                              numberOfLines={1}
                                              fontSize={4.3}
                                              style={{
                                                  color: '#cccccc',
                                                  marginBottom: 5,
                                              }}
                                          >
                                              {item.children[0].username}
                                          </AutoText>
                                          <AutoText fontSize={4.3}>
                                              {item.children[0].content}
                                          </AutoText>
                                          {/*    TODO:根据条件显示*/}
                                          {item.children.length > 1 ? (
                                              <TouchableOpacity
                                                  className="mt-[5]"
                                                  onPress={() =>
                                                      GoCommentComply(item.id)
                                                  }
                                              >
                                                  <AutoText
                                                      fontSize={4.3}
                                                      style={{
                                                          color: theme.colors
                                                              .deep01Primary,
                                                      }}
                                                  >
                                                      查看全部 (
                                                      {item.children.length})
                                                  </AutoText>
                                              </TouchableOpacity>
                                          ) : null}
                                      </View>
                                  </View>
                              ) : null}
                          </View>
                      </View>
                  ))
                : null}
        </View>
    )
}

export default memo(common)
