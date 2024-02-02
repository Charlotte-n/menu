import React, { memo, useEffect, useState } from 'react'
import type { FC } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed'
import { useAppSelector } from '../../../../store'
import { shallowEqual } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

interface IProps {
    children?: any
    getId: any
}

const ProfileFlatList: FC<IProps> = ({ getId, children }) => {
    const [Id, setId] = useState('')
    const navigation = useNavigation()
    const { set } = children
    //获取用户的信息
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const { username } = userInfo
    const profileData = [
        {
            id: '0',
            left: '用户名',
            right: username,
        },
        {
            id: '1',
            left: '绑定手机',
            right: '13383024736',
        },
        {
            id: '2',
            left: '绑定邮箱',
            right: '已绑定',
        },
        {
            id: '3',
            left: '用户协议',
            right: (
                <Icon
                    name={'right'}
                    type={'antdesign'}
                    size={14}
                    color={'#888888'}
                ></Icon>
            ),
        },
    ]
    //查看id

    const Item = ({
        left,
        right,
        id,
    }: {
        left: string
        right: any
        id: string
    }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setId(id)
                    getId(id)
                    set()
                }}
            >
                <View className="flex-row items-center pt-[25] pb-[25] border-[#F1F3F4] border-b">
                    <Text
                        className="flex-1"
                        style={{ fontSize: 15, fontWeight: '300' }}
                    >
                        {left}
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: '300' }}>
                        {right}
                    </Text>
                    {!(id === '3') && (
                        <Icon
                            name={'right'}
                            type={'antdesign'}
                            size={14}
                            color={'#888888'}
                            style={{
                                marginLeft: 10,
                            }}
                        ></Icon>
                    )}
                </View>
            </TouchableOpacity>
        )
    }
    useEffect(() => {
        if (Id === '3') {
            //@ts-ignore
            navigation.navigate('userAgreeScreen')
        }
        return setId('')
    }, [Id])
    return (
        <View>
            <FlatList
                data={profileData}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <Item
                        left={item.left}
                        right={item.right}
                        id={item.id}
                    ></Item>
                )}
            ></FlatList>
        </View>
    )
}

export default memo(ProfileFlatList)
