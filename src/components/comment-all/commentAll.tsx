import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import AutoText from '../auto-text'
import theme from '../../styles/theme/color'
import { useNavigation } from '@react-navigation/native'
import { doLike } from '../../apis/communicate'
import { useAppSelector } from '../../store'
import { shallowEqual } from 'react-redux'

interface IProps {
    children?: ReactNode
    comments: any
    width: number
    open: (value: number) => void
    logId: number
    getComment: any
}

const CommentAll: FC<IProps> = ({
    comments,
    width,
    open,
    logId,
    getComment,
}) => {
    const navigation = useNavigation()
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const gotoUser = () => {
        //@ts-ignore
        navigation.navigate('userPage')
    }
    //点赞
    const LikeDisLike = (logCommentId: number) => {
        doLike(userInfo.id, logCommentId).then((res) => {
            getComment()
        })
    }
    return (
        <>
            {/*    用户的评论*/}
            {comments.length
                ? comments.map((item: any) => (
                      <View
                          key={item.id}
                          className="flex-row pl-[5] pr-[5] mt-[20]"
                      >
                          {item.avatar ? (
                              <TouchableOpacity onPress={() => gotoUser()}>
                                  <Image
                                      source={{ uri: item.avatar }}
                                      style={{
                                          width: 30,
                                          height: 30,
                                          borderRadius: 100,
                                      }}
                                      resizeMode={'cover'}
                                  ></Image>
                              </TouchableOpacity>
                          ) : (
                              <TouchableOpacity onPress={() => gotoUser()}>
                                  <Image
                                      source={require('../../../assets/images/bg_login_header.png')}
                                      style={{
                                          width: 30,
                                          height: 30,
                                          borderRadius: 100,
                                      }}
                                      resizeMode={'cover'}
                                  ></Image>
                              </TouchableOpacity>
                          )}

                          <View className="ml-[10] flex-1">
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
                                          //显示
                                          open(item.id as number)
                                      }}
                                  >
                                      <AutoText fontSize={4.8}>
                                          {item.content}
                                      </AutoText>
                                  </TouchableOpacity>
                              </View>
                              {/*    回复的展示*/}
                              {item.childern && item.childern?.length ? (
                                  <View className="mt-[10] flex-row">
                                      {item.childern[0].avatar ? (
                                          <Image
                                              source={{
                                                  uri: item.childern[0].avatar,
                                              }}
                                              style={{
                                                  width: 25,
                                                  height: 25,
                                                  borderRadius: 100,
                                              }}
                                          ></Image>
                                      ) : (
                                          <Image
                                              source={require('../../../assets/images/bg_login_header.png')}
                                              style={{
                                                  width: 25,
                                                  height: 25,
                                                  borderRadius: 100,
                                              }}
                                              resizeMode={'cover'}
                                          ></Image>
                                      )}

                                      <View className="relative top-1 ml-[5] flex-1">
                                          <AutoText
                                              numberOfLines={1}
                                              fontSize={4.3}
                                              style={{
                                                  color: '#cccccc',
                                                  marginBottom: 5,
                                              }}
                                          >
                                              {item.childern[0].username}
                                          </AutoText>
                                          <AutoText fontSize={4.3}>
                                              {item.childern[0].content}
                                          </AutoText>
                                          {item.childern.length > 1 ? (
                                              <TouchableOpacity className="mt-[5]">
                                                  <AutoText
                                                      fontSize={4.3}
                                                      style={{
                                                          color: theme.colors
                                                              .deep01Primary,
                                                      }}
                                                  >
                                                      查看全部 (
                                                      {item.childern.length})
                                                  </AutoText>
                                              </TouchableOpacity>
                                          ) : null}
                                      </View>
                                      {/*点赞*/}
                                      <TouchableOpacity>
                                          {item.childern[0]?.like ? (
                                              <TouchableOpacity
                                                  className="flex-row items-center justify-center"
                                                  onPress={() => {
                                                      LikeDisLike(
                                                          item.childern[0].id,
                                                      )
                                                  }}
                                              >
                                                  <Image
                                                      style={{
                                                          width: 15,
                                                          height: 15,
                                                          marginTop: 28,
                                                          marginRight: 5,
                                                      }}
                                                      source={require('../../../assets/icon/zan2.png')}
                                                  ></Image>
                                                  <AutoText
                                                      fontSize={3.5}
                                                      style={{
                                                          marginTop: 28,
                                                      }}
                                                  >
                                                      {item.childern[0].likes
                                                          ? item.childern[0]
                                                                .likes
                                                          : 0}
                                                  </AutoText>
                                              </TouchableOpacity>
                                          ) : (
                                              <TouchableOpacity
                                                  className="flex-row items-center justify-center"
                                                  onPress={() => {
                                                      LikeDisLike(
                                                          item.childern[0].id,
                                                      )
                                                  }}
                                              >
                                                  <Image
                                                      style={{
                                                          width: 15,
                                                          height: 15,
                                                          marginTop: 28,
                                                          marginRight: 5,
                                                      }}
                                                      source={require('../../../assets/icon/zan1.png')}
                                                  ></Image>
                                                  <AutoText
                                                      fontSize={3.5}
                                                      style={{
                                                          marginTop: 28,
                                                      }}
                                                  >
                                                      {item.childern[0].likes
                                                          ? item.childern[0]
                                                                .likes
                                                          : 0}
                                                  </AutoText>
                                              </TouchableOpacity>
                                          )}
                                      </TouchableOpacity>
                                  </View>
                              ) : null}
                          </View>
                          <TouchableOpacity>
                              {item.like ? (
                                  <TouchableOpacity
                                      className="flex-row items-center"
                                      onPress={() => {
                                          LikeDisLike(item.id)
                                      }}
                                  >
                                      <Image
                                          style={{
                                              width: 20,
                                              height: 20,
                                              marginTop: 25,
                                              marginRight: 5,
                                          }}
                                          source={require('../../../assets/icon/zan2.png')}
                                      ></Image>
                                      <AutoText
                                          fontSize={4}
                                          style={{
                                              marginTop: 25,
                                          }}
                                      >
                                          {item.likes}
                                      </AutoText>
                                  </TouchableOpacity>
                              ) : (
                                  <TouchableOpacity
                                      className="flex-row items-center"
                                      onPress={() => {
                                          LikeDisLike(item.id)
                                      }}
                                  >
                                      <Image
                                          style={{
                                              width: 20,
                                              height: 20,
                                              marginTop: 25,
                                              marginRight: 5,
                                          }}
                                          source={require('../../../assets/icon/zan1.png')}
                                      ></Image>
                                      <AutoText
                                          fontSize={4}
                                          style={{
                                              marginTop: 25,
                                          }}
                                      >
                                          {item.likes}
                                      </AutoText>
                                  </TouchableOpacity>
                              )}
                          </TouchableOpacity>
                      </View>
                  ))
                : null}
        </>
    )
}

export default memo(CommentAll)
