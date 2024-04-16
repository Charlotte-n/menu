import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
    Alert,
    Image,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native'
import AutoText from '../../../../../../components/auto-text'
import { SwipeListView } from 'react-native-swipe-list-view'
import {
    DeleteGroupNumberApi,
    showMemberRankingApi,
} from '../../../../../../apis/group'
import {
    RankingMemberBody,
    RankingType,
    SingleRankingMemberType,
} from '../../../../../../apis/types/group'
import { useRoute } from '@react-navigation/native'
import { useAppSelector } from '../../../../../../store'
import { shallowEqual } from 'react-redux'
import theme from '../../../../../../styles/theme/color'

interface IProps {
    children?: ReactNode
}

const MemberManage: FC<IProps> = () => {
    const route = useRoute()
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    //获取成员数据
    const [memberList, setMemberList] = useState([] as RankingType)
    const getMemberList = () => {
        try {
            const body: RankingMemberBody = {
                pageNum: 50,
                pageSize: 1,
                groupId: (route.params as { id: number }).id,
                userId: userInfo.id,
            }
            showMemberRankingApi(body).then((res) => {
                setMemberList(res.data)
            })
        } catch (e) {
            console.log(e, '展示小组成员的接口出错了')
        }
    }
    useEffect(() => {
        getMemberList()
    }, [])

    //渲染的列表
    const Item = ({
        data,
        index,
    }: {
        data: SingleRankingMemberType
        index: number
    }) => {
        return (
            <View
                className="flex-row items-center bg-white"
                style={{
                    paddingBottom: 10,
                    borderBottomColor: theme.colors.secondary,
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                }}
            >
                <View className="flex-row flex-1 items-center">
                    <AutoText
                        style={{
                            marginRight: 10,
                        }}
                    >
                        {index + 1}
                    </AutoText>
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 100,
                            marginRight: 10,
                        }}
                        source={{ uri: data.avatar }}
                    ></Image>
                    <AutoText>{data.username}</AutoText>
                </View>
                <View>
                    <AutoText>{(data.rate * 100).toFixed(1)}%</AutoText>
                </View>
            </View>
        )
    }
    //关闭行
    const closeRow = (rowMap: any, rowKey: any) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow()
        }
    }
    //删除行
    const deleteRow = (rowMap: any, rowKey: any) => {
        closeRow(rowMap, rowKey)
        //删除成员
        try {
            DeleteGroupNumberApi(
                rowKey,
                (route.params as { id: number }).id,
            ).then((res) => {
                if (res.code === 0) {
                    //重新获取数据
                    getMemberList()
                    ToastAndroid.showWithGravity(
                        '删除成功',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    )
                }
                console.log(res)
            })
        } catch (e) {
            console.log(e, '删除小组的接口出错了')
        }
    }
    //删除成员
    const deleteMember = (rowMap: any, rowKey: any) => {
        Alert.alert('删除成员', '是否要删除该成员', [
            {
                text: '取消',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: '确定',
                onPress: () => {
                    deleteRow(rowMap, rowKey)
                },
            },
        ])
    }

    //隐藏的部分
    const HiddenItem = ({ rowMap, rowKey }: any) => {
        return (
            <TouchableOpacity
                className="absolute right-0 flex-row h-[100%] w-[75]"
                onPress={() => deleteMember(rowMap, rowKey)}
            >
                <View
                    className="bg-red-600"
                    style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <AutoText
                        style={{
                            color: 'white',
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        删除
                    </AutoText>
                </View>
            </TouchableOpacity>
        )
    }
    //获取成员的列表
    return (
        <>
            <SwipeListView
                style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                }}
                keyExtractor={(item) => String(item.id)}
                data={memberList}
                renderItem={(data) => (
                    <Item data={data.item} index={data.index}></Item>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <HiddenItem
                        rowMap={rowMap}
                        rowKey={data.item.id}
                    ></HiddenItem>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
                disableRightSwipe={true}
            ></SwipeListView>
        </>
    )
}

export default memo(MemberManage)
