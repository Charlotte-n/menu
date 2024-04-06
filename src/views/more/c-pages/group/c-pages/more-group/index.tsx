import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { getCategoryGroupsApi } from '../../../../../../apis/group'
import { useNavigation, useRoute } from '@react-navigation/native'
import AutoText from '../../../../../../components/auto-text'
import { Button } from '@rneui/themed'
import theme from '../../../../../../styles/theme/color'

interface IProps {
    children?: ReactNode
}

const MoreGroup: FC<IProps> = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [groups, setGroups] = useState([])
    const getCategoryGroup = () => {
        getCategoryGroupsApi(
            (route.params as { category: string }).category,
        ).then((res) => {
            const result = res.data.map((item) => {
                item.createTime = (
                    item.createTime.slice(0, 3) as number[]
                ).join('-')
                return item
            })
            setGroups(result as any)
        })
    }
    //去往小组详情
    const gotoGroupDetail = (id: number) => {
        //@ts-ignore
        navigation.navigate('groupDetailHome', { id })
    }
    useEffect(() => {
        getCategoryGroup()
    }, [])
    return (
        <ScrollView className="flex-1 bg-white">
            {groups.map((item: any) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            gotoGroupDetail(item.id)
                        }}
                        key={item.id}
                        className="flex-row items-center justify-between pt-[20] pb-[20] pl-[30] pr-[30]"
                    >
                        <View className="flex-row items-center">
                            {item.avatar ? (
                                <Image
                                    source={{ uri: item.avatar }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 100,
                                    }}
                                    resizeMode={'cover'}
                                    className="mr-[20]"
                                ></Image>
                            ) : (
                                <Image
                                    className="mr-[20]"
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 100,
                                    }}
                                    source={require('../../../../../../../assets/images/bg_login_header.png')}
                                ></Image>
                            )}

                            <View className="flex">
                                <AutoText
                                    style={{
                                        marginBottom: 15,
                                    }}
                                >
                                    {item.groupName} {item.createTime}
                                </AutoText>
                                <AutoText>{item.introduce}</AutoText>
                            </View>
                        </View>
                        <View>
                            <Button
                                onPress={() => {}}
                                title="加入"
                                containerStyle={{
                                    borderRadius: 20,
                                    width: 70,
                                    height: 30,
                                    borderWidth: 1,
                                    borderColor: theme.colors.deep01Primary,
                                }}
                                titleStyle={{
                                    color: theme.colors.deep01Primary,
                                    fontSize: 10,
                                    lineHeight: 10,
                                }}
                                color={'white'}
                            ></Button>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}

export default memo(MoreGroup)
