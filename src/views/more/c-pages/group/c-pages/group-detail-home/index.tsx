import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import AutoText from '../../../../../../components/auto-text'
import { BottomSheet, Button, Card, Icon } from '@rneui/themed'
import theme from '../../../../../../styles/theme/color'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
    DeleteGroupNumberApi,
    getClockContentApi,
    getThreeGroupApi,
    GroupDetailApi,
    JoinGroupByCodeApi,
} from '../../../../../../apis/group'
import {
    ClockContentType,
    GroupInfoType,
} from '../../../../../../apis/types/group'
import { useAppSelector } from '../../../../../../store'
import { shallowEqual, useDispatch } from 'react-redux'
import {
    changeIsInnerAction,
    changeThreeGroupAction,
} from '../../../../../../store/slice/group'

interface IProps {
    children?: ReactNode
}

const GroupDetailHome: FC<IProps> = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [showBottom, setShowBottom] = useState(false)
    const [groupDetail, setGroupDetail] = useState({} as GroupInfoType)
    const { userInfo, isJoin } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
            isJoin: state.GroupSlice.isInner,
        }
    }, shallowEqual)
    //获取组队详情
    const getGroupDetail = () => {
        GroupDetailApi((route.params as { id: number }).id, userInfo.id).then(
            (res) => {
                dispatch(changeIsInnerAction(res.data.isInner ? true : false))
                setGroupDetail(res.data)
            },
        )
    }
    const [ClockContent, setClockContent] = useState([] as ClockContentType)
    //获取打卡内容
    const GetClockContent = () => {
        try {
            getClockContentApi((route.params as { id: number }).id).then(
                (res) => {
                    res.data.map((item) => {
                        if (item.image) {
                            item.image = (item.image as string).split('|')
                            item.image.pop()
                        }
                        return item
                    })
                    setClockContent(res.data)
                },
            )
        } catch (e) {
            console.log(e, '获取打卡内容接口出错了')
        }
    }
    //判断是否加入了
    useEffect(() => {
        getGroupDetail()
        GetClockContent()
    }, [])
    useEffect(() => {
        GetClockContent()
    }, [(route.params as { time: string }).time])
    //打卡
    const handleClock = () => {
        //@ts-ignore
        navigation.navigate('clock', { id: route.params.id })
    }

    //去日历
    const gotoCalendar = () => {
        //@ts-ignore
        navigation.navigate('calendar', {
            id: groupDetail.id,
            name: groupDetail.groupName,
        })
    }
    //去排行榜
    const gotoRanking = (id: number) => {
        //@ts-ignore
        navigation.navigate('ranking', { id })
    }
    //去往成员管理页面
    const gotoMembersManage = (id: number) => {
        //@ts-ignore
        navigation.navigate('memberManage', { id })
    }

    //加入小组
    const JoinGroup = () => {
        JoinGroupByCodeApi(userInfo.id, groupDetail.codeInfo).then((res) => {
            if (res.code == 1) {
                Alert.alert('成功加入小组')
            }
        })
        getGroupDetail()
    }
    const disShowBottom = () => {
        setShowBottom(false)
    }
    //获取小组
    const getThreeGroup = () => {
        getThreeGroupApi(userInfo.id).then((res) => {
            dispatch(changeThreeGroupAction(res.data))
        })
    }
    const disBottom = () => {
        if (isJoin) {
            //退出小组
            DeleteGroupNumberApi(
                userInfo.id,
                (route.params as { id: number }).id,
            ).then((res) => {
                if (res.code === 1) {
                    getThreeGroup()
                    ToastAndroid.show('退出成功', 10)
                    getGroupDetail()
                }
            })
            disShowBottom()
        } else {
            JoinGroup()
            disShowBottom()
            getGroupDetail()
        }
    }
    //去上一级别
    const gotoBack = () => {
        navigation.goBack()
    }
    const ShowBottom = () => {
        setShowBottom(true)
    }
    useEffect(() => {
        console.log(groupDetail)
    }, [groupDetail])
    return (
        <>
            <View className="flex-1 bg-[#f6f7f7]">
                {/*小组信息*/}

                <ScrollView>
                    {groupDetail.avatar ? (
                        <View className="relative">
                            <Image
                                source={{ uri: groupDetail.avatar }}
                                style={{
                                    minHeight: 250,
                                    position: 'relative',
                                    top: 0,
                                    left: 0,
                                }}
                                blurRadius={100}
                            ></Image>
                            <View className="bg-black h-[250] relative top-[-300] opacity-[0.3]"></View>
                        </View>
                    ) : (
                        <View className="relative">
                            <Image
                                source={require('../../../../../../../assets/images/bg_login_header.png')}
                                style={{
                                    height: 250,
                                    position: 'relative',
                                    top: 0,
                                    left: 0,
                                }}
                                blurRadius={50}
                            ></Image>
                            <View className="bg-black h-[250] relative top-[-300] opacity-[0.3]"></View>
                        </View>
                    )}

                    <View className="relative  top-[-500] left-0 ">
                        <View className="pl-[10] pr-[10]  pt-[10] pb-[15]">
                            <View className="flex-row ">
                                <TouchableOpacity
                                    onPress={() => gotoBack()}
                                    style={{
                                        borderRadius: 20,
                                        borderStyle: 'solid',
                                        borderColor: 'white',
                                        borderWidth: 1,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Icon
                                        color={'white'}
                                        type={'antdesign'}
                                        name={'arrowleft'}
                                        size={30}
                                    ></Icon>
                                </TouchableOpacity>
                            </View>
                            <View className="flex-row items-center">
                                {groupDetail.avatar ? (
                                    <Image
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 10,
                                            marginRight: 10,
                                        }}
                                        source={{ uri: groupDetail.avatar }}
                                    ></Image>
                                ) : (
                                    <Image
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 10,
                                            marginRight: 10,
                                        }}
                                        source={require('../../../../../../../assets/images/bg_login_header.png')}
                                    ></Image>
                                )}

                                <View>
                                    <AutoText
                                        fontSize={5}
                                        style={{
                                            marginBottom: 10,
                                            color: 'white',
                                        }}
                                    >
                                        {groupDetail.groupName}
                                    </AutoText>
                                    <AutoText
                                        fontSize={4}
                                        style={{
                                            color: 'white',
                                        }}
                                    >
                                        {groupDetail.introduce}
                                    </AutoText>
                                </View>
                            </View>
                            <View className="flex-row mt-[10]">
                                <AutoText
                                    fontSize={4.5}
                                    style={{
                                        marginRight: 10,
                                        color: 'white',
                                    }}
                                >
                                    打卡率
                                    {((groupDetail.rate as any) * 100).toFixed(
                                        1,
                                    )}
                                    %
                                </AutoText>
                                <AutoText
                                    fontSize={4.5}
                                    style={{
                                        color: 'white',
                                    }}
                                >
                                    成员数{groupDetail.curNum}
                                </AutoText>
                            </View>
                            <View className="mt-[10] flex-row">
                                <TouchableOpacity
                                    onPress={() => {
                                        gotoRanking(groupDetail.id)
                                    }}
                                    style={{
                                        paddingHorizontal: 5,
                                        borderWidth: 1,
                                        borderRadius: 20,
                                        marginRight: 10,
                                        borderColor: 'white',
                                    }}
                                >
                                    <AutoText
                                        fontSize={4}
                                        style={{
                                            color: 'white',
                                        }}
                                    >
                                        排行榜
                                    </AutoText>
                                </TouchableOpacity>
                                {/*群主的权限*/}
                                {groupDetail.ownerId === userInfo.id ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            gotoMembersManage(groupDetail.id)
                                        }}
                                        style={{
                                            paddingHorizontal: 5,
                                            borderWidth: 1,
                                            borderRadius: 20,
                                            borderColor: 'white',
                                        }}
                                    >
                                        <AutoText
                                            fontSize={4}
                                            style={{
                                                color: 'white',
                                            }}
                                        >
                                            成员管理
                                        </AutoText>
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        </View>
                        {/*    小组的打卡内容*/}
                        <View>
                            <Card
                                containerStyle={{
                                    position: 'relative',
                                    paddingHorizontal: 20,
                                    paddingVertical: 20,
                                    width: '100%',
                                    height: '100%',
                                    marginHorizontal: 0,
                                    backgroundColor: '#F7F7F7',
                                    borderTopLeftRadius: 20,
                                    marginVertical: 0,
                                    borderTopRightRadius: 20,
                                }}
                            >
                                <View className="flex-row">
                                    <AutoText
                                        fontSize={4.5}
                                        style={{
                                            flex: 1,
                                        }}
                                    >
                                        {groupDetail.groupName}
                                    </AutoText>
                                    <View className="flex-row">
                                        <TouchableOpacity
                                            className="flex-row items-center"
                                            onPress={() => {
                                                gotoCalendar()
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    height: 16,
                                                    width: 16,
                                                }}
                                                source={require('../../../../../../../assets/icon/rili.png')}
                                            ></Image>
                                            <AutoText
                                                fontSize={4.5}
                                                style={{
                                                    marginRight: 10,
                                                }}
                                            >
                                                日历
                                            </AutoText>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            className="flex-row items-center"
                                            onPress={() => {
                                                ShowBottom()
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    width: 16,
                                                    height: 16,
                                                }}
                                                source={require('../../../../../../../assets/icon/setting.png')}
                                            ></Image>
                                            <AutoText fontSize={4.5}>
                                                设置
                                            </AutoText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/*打卡内容*/}
                                {ClockContent.map((item) => {
                                    return (
                                        <View key={item.id}>
                                            <View
                                                style={{
                                                    alignItems: 'center',
                                                    marginTop: 30,
                                                    paddingHorizontal: 20,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width:
                                                            Dimensions.get(
                                                                'window',
                                                            ).width - 15,
                                                        paddingHorizontal: 0,
                                                        borderRadius: 12,
                                                        backgroundColor:
                                                            'white',
                                                        alignItems:
                                                            'flex-start',
                                                        //阴影
                                                        shadowColor: '#000000',
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 2,
                                                        },
                                                        shadowOpacity: 0.2,
                                                        shadowRadius: 4,
                                                        elevation: 2,
                                                    }}
                                                >
                                                    <View className="mt-[20] flex-row top-[-35] left-[10]">
                                                        {item.avatar ? (
                                                            <Image
                                                                style={{
                                                                    height: 30,
                                                                    width: 30,
                                                                    borderRadius: 10,
                                                                    marginRight: 5,
                                                                }}
                                                                source={{
                                                                    uri: item.avatar,
                                                                }}
                                                            ></Image>
                                                        ) : (
                                                            <Image
                                                                style={{
                                                                    height: 30,
                                                                    width: 30,
                                                                    borderRadius: 10,
                                                                    marginRight: 5,
                                                                }}
                                                                source={require('../../../../../../../assets/images/bg_login_header.png')}
                                                            ></Image>
                                                        )}

                                                        <AutoText
                                                            fontSize={3.5}
                                                        >
                                                            {item.username}
                                                        </AutoText>
                                                    </View>
                                                    {/*内容*/}
                                                    <View className="pl-[10] pb-[10]  ">
                                                        <AutoText
                                                            style={{
                                                                top: -20,
                                                                left: 10,
                                                            }}
                                                        >
                                                            {item.content}
                                                        </AutoText>
                                                        {item.image
                                                            ? (
                                                                  item.image as string[]
                                                              ).map(
                                                                  (
                                                                      item,
                                                                      index,
                                                                  ) => (
                                                                      <Image
                                                                          key={
                                                                              index
                                                                          }
                                                                          source={{
                                                                              uri: item,
                                                                          }}
                                                                          style={{
                                                                              width: 100,
                                                                              height: 100,
                                                                              borderRadius: 10,
                                                                          }}
                                                                      ></Image>
                                                                  ),
                                                              )
                                                            : null}
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                            </Card>
                        </View>
                    </View>
                </ScrollView>
                {/*    固定按钮*/}
                <View className="relative top-[-20] items-center">
                    {isJoin ? (
                        <Button
                            onPress={() => {
                                handleClock()
                            }}
                            title="打卡"
                            containerStyle={{
                                width: Dimensions.get('window').width / 2,
                                borderRadius: 30,
                            }}
                            color={theme.colors.deep01Primary}
                        ></Button>
                    ) : (
                        <Button
                            title="加入"
                            containerStyle={{
                                width: Dimensions.get('window').width / 2,
                                borderRadius: 30,
                            }}
                            color={theme.colors.deep01Primary}
                            onPress={() => {
                                JoinGroup()
                            }}
                        ></Button>
                    )}
                </View>
                {/*底层显示*/}
                <View>
                    <BottomSheet isVisible={showBottom}>
                        <View
                            className="bg-white pt-[10] pb-[10] pl-[10] pr-[10]"
                            style={{
                                borderRadius: 10,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    borderBottomWidth: 0.2,
                                    borderColor: '#cccccc',
                                    paddingVertical: 10,
                                }}
                                onPress={() => {
                                    disBottom()
                                }}
                            >
                                <AutoText
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    {groupDetail.isInner
                                        ? '退出小组'
                                        : '加入小组'}
                                </AutoText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="pt-[10]"
                                onPress={() => {
                                    disShowBottom()
                                }}
                            >
                                <AutoText
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    取消
                                </AutoText>
                            </TouchableOpacity>
                        </View>
                    </BottomSheet>
                </View>
            </View>
        </>
    )
}
export default memo(GroupDetailHome)
