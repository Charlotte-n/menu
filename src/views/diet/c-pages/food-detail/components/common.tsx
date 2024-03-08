import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, TextInput, TouchableOpacity, View, Text } from 'react-native'
import AutoText from '../../../../../components/auto-text'
import { useAppSelector } from '../../../../../store'
import { shallowEqual } from 'react-redux'
import theme from '../../../../../styles/theme/color'
import { useNavigation } from '@react-navigation/native'

interface IProps {
    children?: any
}

const common: FC<IProps> = ({ children }) => {
    const show = children.show
    const navigation = useNavigation()
    const [comment, setComment] = useState('')
    //获取comments
    const { comments } = useAppSelector((state) => {
        return {
            comments: state.FoodSlice.comment,
        }
    }, shallowEqual)
    //去往回复详情页面
    const GoCommentComply = () => {
        //@ts-ignore
        navigation.navigate('commentsComply')
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
                    这道菜的评论 6
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
                    source={require('../../../../../../assets/images/bg_login_header.png')}
                ></Image>
                <TouchableOpacity
                    onPress={() => {
                        show()
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
            {[1, 2, 3, 4].map((item) => (
                <View key={item} className="flex-row pl-[5] pr-[5] mt-[20]">
                    <Image
                        source={require('../../../../../../assets/images/bg_login_header.png')}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 100,
                        }}
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
                                下厨房用户
                            </AutoText>
                            <AutoText fontSize={4.8}>可以放陶瓷盘子吗</AutoText>
                        </View>
                        {/*    回复的展示*/}
                        <View className="mt-[10] flex-row">
                            <Image
                                source={require('../../../../../../assets/images/bg_login_header.png')}
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
                                    下厨房用户
                                </AutoText>
                                <AutoText fontSize={4.3}>
                                    可以放陶瓷盘子吗
                                </AutoText>
                                {/*    TODO:根据条件显示*/}
                                <TouchableOpacity
                                    className="mt-[5]"
                                    onPress={() => GoCommentComply()}
                                >
                                    <AutoText
                                        fontSize={4.3}
                                        style={{
                                            color: theme.colors.deep01Primary,
                                        }}
                                    >
                                        查看全部 (4)
                                    </AutoText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default memo(common)
