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
import { BottomSheet, Button, Card } from '@rneui/themed'
import theme from '../../../../../../styles/theme/color'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
    DeleteGroupNumberApi,
    getThreeGroupApi,
    GroupDetailApi,
    JoinGroupByCodeApi,
    QuitGroupApi,
    showGambitApi,
} from '../../../../../../apis/group'
import { GambitData, GroupInfoType } from '../../../../../../apis/types/group'
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
    //获取队伍详细信息
    const [groupGambit, setGroupGambit] = useState([] as GambitData)
    const getGroupGambit = () => {
        showGambitApi((route.params as { id: number }).id).then((res) => {
            console.log(res)
            setGroupGambit(res.data)
        })
    }
    //判断是否加入了
    useEffect(() => {
        getGroupDetail()
        getGroupGambit()
    }, [])
    //打卡
    const handleClock = () => {
        //@ts-ignore
        navigation.navigate('clock', { id: route.params.id })
    }

    //去日历
    const gotoCalendar = () => {
        //@ts-ignore
        navigation.navigate('calendar', { id: groupDetail.id })
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
            Alert.alert('成功加入小组')
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
        //判断是否加入了该小组
        if (!isJoin) {
            Alert.alert('您没有加入该小组')
            return
        }
        //退出小组
        DeleteGroupNumberApi(
            userInfo.id,
            (route.params as { id: number }).id,
        ).then((res) => {
            getThreeGroup()
            ToastAndroid.show('退出成功', 10)
            getGroupDetail()
        })
        disShowBottom()
    }
    const ShowBottom = () => {
        setShowBottom(true)
    }
    return (
        <View className="flex-1 bg-[#F7F7F7]">
            <ScrollView className="" showsVerticalScrollIndicator={false}>
                {/*小组信息*/}
                <View className="pl-[10] pr-[10] pt-[10]">
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
                                }}
                            >
                                {groupDetail.groupName}
                            </AutoText>
                            <AutoText fontSize={4}>
                                {groupDetail.introduce}
                            </AutoText>
                        </View>
                    </View>
                    <View className="flex-row mt-[10]">
                        <AutoText
                            fontSize={4.5}
                            style={{
                                marginRight: 10,
                            }}
                        >
                            打卡率
                            {((groupDetail.rate as any) * 100).toFixed(1)}%
                        </AutoText>
                        <AutoText fontSize={4.5}>
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
                                width: 50,
                                borderRadius: 20,
                                marginRight: 10,
                            }}
                        >
                            <AutoText fontSize={4}>排行榜</AutoText>
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
                                }}
                            >
                                <AutoText fontSize={4}>成员管理</AutoText>
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
                            marginHorizontal: 0,
                            height: '100%',
                            backgroundColor: '#F7F7F7',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    >
                        <View className="flex-row">
                            <AutoText
                                fontSize={4}
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
                                            height: 15,
                                            width: 15,
                                        }}
                                        source={require('../../../../../../../assets/icon/rili.png')}
                                    ></Image>
                                    <AutoText
                                        fontSize={4}
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
                                            width: 15,
                                            height: 15,
                                        }}
                                        source={require('../../../../../../../assets/icon/setting.png')}
                                    ></Image>
                                    <AutoText fontSize={4}>设置</AutoText>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/*打卡内容*/}
                        {groupGambit.map((item, index) => {
                            return (
                                <View key={item.id}>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            marginTop: 30,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width:
                                                    Dimensions.get('window')
                                                        .width - 15,
                                                paddingHorizontal: 0,
                                                borderRadius: 12,
                                                backgroundColor: 'white',
                                                alignItems: 'flex-start',
                                            }}
                                        >
                                            <View className="mt-[20] flex-row top-[-35] left-[10]">
                                                <Image
                                                    style={{
                                                        height: 30,
                                                        width: 30,
                                                        borderRadius: 10,
                                                        marginRight: 5,
                                                    }}
                                                    source={require('../../../../../../../assets/images/bg_login_header.png')}
                                                ></Image>
                                                <AutoText fontSize={3.5}>
                                                    减肥小可爱
                                                </AutoText>
                                            </View>
                                            {/*内容*/}
                                            <AutoText
                                                style={{
                                                    top: -20,
                                                    left: 10,
                                                }}
                                            >
                                                {item.content}
                                            </AutoText>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </Card>
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
                                退出小组
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
    )
}

export default memo(GroupDetailHome)
