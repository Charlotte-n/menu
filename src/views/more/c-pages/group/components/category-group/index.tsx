import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import AutoText from '../../../../../../components/auto-text'
import { useAppDispatch, useAppSelector } from '../../../../../../store'
import { shallowEqual } from 'react-redux'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { changeGroupTitleAction } from '../../../../../../store/slice/group'

interface IProps {
    children?: ReactNode
}

const CategoryGroup: FC<IProps> = () => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const { groupClassification } = useAppSelector((state) => {
        return {
            groupClassification: state.GroupSlice.groupClassification,
        }
    }, shallowEqual)
    //对数据进行分组
    const [groupCategory, setGroupCategory] = useState([] as any)
    const setGroup = () => {
        let result = {}
        groupClassification.forEach((item) => {
            const { category } = item
            if (!(result as any)[category]) {
                ;(result as any)[category] = []
            }
            ;(result as any)[category].push(item)
        })
        const res = Object.values(result)
        setGroupCategory(res)
    }
    //显示更多
    const [isShowMore, setIsShowMore] = useState(false)
    const showMore = () => {
        setIsShowMore(!isShowMore)
    }
    //去往详细页面
    const gotoGroupDetail = (id: number) => {
        //@ts-ignore
        navigation.navigate('groupDetailHome', { id })
    }
    //去往更多小组
    const gotoMoreGroup = (title: string) => {
        dispatch(changeGroupTitleAction(title))
        //@ts-ignore
        navigation.navigate('moreGroup', { category: title })
    }
    useEffect(() => {
        setGroup()
    }, [groupClassification])
    return (
        <>
            <View
                className="ml-[12] mt-[230] mr-[12] bg-white  pl-[10] pt-[10] pr-[10] pb-[10]"
                style={{
                    borderRadius: 10,
                }}
            >
                <View
                    className="flex-row flex  items-center"
                    style={{
                        borderBottomWidth: 0.5,
                        paddingBottom: 10,
                        borderColor: '#cccccc',
                    }}
                >
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10,
                        }}
                        source={require('../../../../../../../assets/icon/classify.png')}
                    ></Image>
                    <AutoText fontSize={5.5}>分类小组</AutoText>
                </View>

                {/*分类小组*/}
                <View className=" pb-[15]">
                    {groupCategory &&
                        groupCategory
                            .slice(0, isShowMore ? groupCategory.length : 3)
                            .map((item: any[], index: number) => {
                                return (
                                    <View key={index} className="mt-[15]">
                                        {/*头部*/}
                                        <View className="flex-row ">
                                            <AutoText
                                                style={{
                                                    flex: 1,
                                                }}
                                            >
                                                {item[0].category}
                                            </AutoText>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    gotoMoreGroup(
                                                        item[0].category,
                                                    )
                                                }}
                                            >
                                                <AutoText fontSize={4.3}>
                                                    更多 &gt;
                                                </AutoText>
                                            </TouchableOpacity>
                                        </View>
                                        {/*    小组*/}
                                        <View
                                            className="mt-[20]  items-center flex-row pb-[15]"
                                            style={{
                                                borderBottomWidth: 0.5,
                                                borderColor: '#cccccc',
                                                justifyContent:
                                                    item.length >= 3
                                                        ? 'space-between'
                                                        : undefined,
                                                paddingHorizontal: 30,
                                            }}
                                        >
                                            {item
                                                .slice(
                                                    0,
                                                    item.length >= 3
                                                        ? 3
                                                        : item.length,
                                                )
                                                .map((item, index) => {
                                                    return (
                                                        <TouchableOpacity
                                                            key={index}
                                                            onPress={() => {
                                                                gotoGroupDetail(
                                                                    item.id,
                                                                )
                                                            }}
                                                        >
                                                            {item.avatar ? (
                                                                <Image
                                                                    style={{
                                                                        width: 50,
                                                                        height: 50,
                                                                        borderRadius: 100,
                                                                        marginBottom: 5,
                                                                    }}
                                                                    source={{
                                                                        uri: item.avatar,
                                                                    }}
                                                                ></Image>
                                                            ) : (
                                                                <Image
                                                                    style={{
                                                                        width: 50,
                                                                        height: 50,
                                                                        borderRadius: 100,
                                                                        marginBottom: 5,
                                                                    }}
                                                                    source={require('../../../../../../../assets/images/group.jpeg')}
                                                                ></Image>
                                                            )}

                                                            <AutoText
                                                                fontSize={4.5}
                                                                numberOfLines={
                                                                    1
                                                                }
                                                                style={{
                                                                    width: 40,
                                                                    textAlign:
                                                                        'center',
                                                                }}
                                                            >
                                                                {item.groupName}
                                                            </AutoText>
                                                        </TouchableOpacity>
                                                    )
                                                })}
                                        </View>
                                    </View>
                                )
                            })}
                </View>
                <TouchableOpacity
                    className="items-center flex-row flex justify-center"
                    onPress={() => {
                        showMore()
                    }}
                >
                    <AutoText
                        style={{
                            marginRight: 10,
                        }}
                    >
                        {isShowMore ? '收起' : '更多分类'}
                    </AutoText>
                    <Icon
                        name={isShowMore ? 'up' : 'down'}
                        type={'antdesign'}
                        size={20}
                    ></Icon>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default memo(CategoryGroup)
