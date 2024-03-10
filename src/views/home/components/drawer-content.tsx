import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Text, View, Image, FlatList } from 'react-native'
import AutoText from '../../../components/auto-text'
import theme from '../../../styles/theme/color'
import { useAppSelector } from '../../../store'
import { shallowEqual } from 'react-redux'
import { BodyData, targetData } from '../../../data/mine'

interface IProps {
    children?: ReactNode
}

const DrawerContent: FC<IProps> = () => {
    const { profile, healthTarget } = useAppSelector((state) => {
        return {
            profile: state.LoginRegisterSlice.userInfo,
            healthTarget: state.LoginRegisterSlice.healthTarget,
        }
    }, shallowEqual)

    const profileData = [
        {
            id: '0',
            title: '性别',
            content: profile.sex === 0 ? '男' : '女',
        },
        {
            id: '1',
            title: '身高',
            content: profile.height ? profile.height + 'cm' : '无',
        },
        {
            id: '2',
            title: '体重',
            content: profile.weight ? profile.weight + 'kg' : '无',
        },
        {
            id: '3',
            title: '出生日期',
            content: profile.birth ? profile.birth.join('-') : '无',
        },
        {
            id: '4',
            title: '运动习惯',
            content: BodyData[Number(profile.habit)],
        },
        {
            id: '5',
            title: '健康目标',
            content: targetData[Number(healthTarget)],
        },
    ]
    return (
        <View className="pl-[12] pt-[12] pr-[12]">
            <View className="flex-row items-center">
                {profile.avatar ? (
                    <Image
                        source={{ uri: profile.avatar }}
                        style={{
                            width: 70,
                            height: 70,
                            borderRadius: 100,
                            marginRight: 15,
                        }}
                    ></Image>
                ) : (
                    <Image
                        source={require('../../../../assets/images/bg_login_header.png')}
                        style={{
                            width: 70,
                            height: 70,
                            borderRadius: 100,
                            marginRight: 10,
                        }}
                    ></Image>
                )}

                <AutoText fontSize={7}>{profile.username}</AutoText>
            </View>
            {/*    身体数据*/}
            <View>
                {profileData.map((item, index) => {
                    return (
                        <View
                            key={item.id}
                            className="flex-row justify-between pt-[15] pb-[15] border-b"
                            style={{
                                borderColor: theme.colors.secondary,
                            }}
                        >
                            <Text>{item.title}</Text>
                            <Text>{item.content}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default memo(DrawerContent)
