import React, { memo, useEffect, useState } from 'react'
import type { FC } from 'react'
import {
    Dimensions,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { BottomSheet, Button, Card, Dialog, Icon } from '@rneui/themed'
import theme from '../../styles/theme/color'
import WheelPicker from 'react-native-wheely'
import { FoodNutrition, FoodNutritionData, foodTime } from '../../data/diet'
import { useNavigation } from '@react-navigation/native'
import AutoText from '../auto-text'
import {
    FoodListByCategoryType,
    SingleFoodListType,
} from '../../apis/types/food'
import { FoodListByCategoryApi } from '../../apis/food'
import { addCaloriesApi } from '../../apis/diet'
import { CaloriesBodyData } from '../../apis/types/diet'
import { useAppSelector } from '../../store'
import { shallowEqual } from 'react-redux'
interface IProps {
    children: {
        cancel: () => void
    }
    isVisible: boolean
    id: number
}

const RecordFood: FC<IProps> = ({ isVisible, children, id }) => {
    const { cancel } = children
    const navigation = useNavigation()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [visible, setVisible] = useState(false)
    const [FoodDetail, setFoodDetail] = useState<SingleFoodListType>(
        {} as SingleFoodListType,
    )
    const { userInfo } = useAppSelector((state) => {
        return {
            userInfo: state.LoginRegisterSlice.userInfo,
        }
    }, shallowEqual)
    const disShow = () => {
        setVisible(false)
    }
    const getFoodDetail = () => {
        FoodListByCategoryApi({ id }).then((res) => {
            setFoodDetail((res.data as FoodListByCategoryType)[0])
        })
    }
    useEffect(() => {
        getFoodDetail()
        return () => cancel()
    }, [])
    useEffect(() => {
        getFoodDetail()
    }, [visible])
    //添加饮食
    const addFood = () => {
        const data: CaloriesBodyData = {
            fat: 0,
            calories: 0,
            carbohydrate: 0,
            cellulose: 0,
            type: 0,
            protein: 0,
            id: userInfo.id,
        }
        addCaloriesApi(data).then((res) => {
            if (res.code === 1) {
                //TODO:可以添加一个弹窗
                disShow()
            }
        })
    }
    return (
        <BottomSheet isVisible={isVisible} containerStyle={{}}>
            <Card
                containerStyle={{
                    width: Dimensions.get('screen').width,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    margin: 0,
                }}
            >
                <View className="m-auto mb-[20] flex-row">
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(true)
                        }}
                        className="flex-1 flex-row items-center justify-center ml-[20]"
                    >
                        <Text className="text-center mr-[10]">
                            {foodTime[selectedIndex]}
                        </Text>
                        <Icon type={'antdesign'} name={'down'} size={15}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            cancel()
                        }}
                    >
                        <Icon
                            type={'antdesign'}
                            name={'close'}
                            size={20}
                        ></Icon>
                    </TouchableOpacity>
                </View>
                {/*食物*/}
                <View className="m-auto items-center">
                    {FoodDetail.image != null ? (
                        <Image
                            source={{
                                uri: FoodDetail.image,
                            }}
                            style={{
                                borderRadius: 10,
                                width: 60,
                                height: 60,
                            }}
                        ></Image>
                    ) : null}

                    <TouchableOpacity
                        className="flex-row items-center mt-[20] pt-[3] pb-[3] pr-[3]"
                        style={{
                            backgroundColor: theme.colors.primary,
                            borderRadius: 10,
                            width: 100,
                        }}
                        onPress={() => {
                            cancel()
                            //@ts-ignore
                            navigation.navigate('food-nutrients', { id })
                        }}
                    >
                        <AutoText
                            fontSize={4.5}
                            style={{
                                flex: 1,
                                textAlign: 'center',
                            }}
                            className=" text-center flex-1"
                            numberOfLines={1}
                        >
                            {FoodDetail?.title}
                        </AutoText>
                        <Icon
                            type={'antdesign'}
                            name={'right'}
                            size={13}
                        ></Icon>
                    </TouchableOpacity>
                </View>
                {/*营养成分*/}
                <View className="flex-row">
                    {FoodNutritionData.map((item, index) => {
                        return (
                            <View
                                key={item}
                                style={{
                                    marginTop: 20,
                                    width: Dimensions.get('screen').width / 4.4,
                                }}
                                className="justify-center border-t border-b pt-[10] pb-[10] border-[#f4f4f4]"
                            >
                                <AutoText
                                    fontSize={4.5}
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    {(FoodNutrition as any)[item]}
                                </AutoText>
                                <AutoText
                                    fontSize={4.5}
                                    style={{
                                        marginTop: 10,
                                        textAlign: 'center',
                                    }}
                                >
                                    {(FoodDetail as any)[item]
                                        ? (FoodDetail as any)[item]?.toFixed(2)
                                        : 0}
                                </AutoText>
                            </View>
                        )
                    })}
                </View>
                {/*  数量*/}
                <View className="m-auto mt-[20]">
                    <TextInput
                        className="border-b pb-[2] pl-[10] pr-[10]"
                        style={{
                            fontSize: 22,
                            color: theme.colors.deep01Primary,
                            borderColor: theme.colors.deep01Primary,
                        }}
                    >
                        100.00
                    </TextInput>
                    <Text
                        className="mt-[5] text-center"
                        style={{
                            color: theme.colors.deep01Primary,
                            fontSize: 13,
                        }}
                    >
                        克
                    </Text>
                </View>
                {/*计算器组件*/}
                <View className="m-auto mt-[20]">
                    <Button
                        onPress={() => {
                            cancel()
                            addFood()
                        }}
                        title="保存"
                        containerStyle={{
                            width: Dimensions.get('screen').width / 4,
                            borderRadius: 20,
                        }}
                        buttonStyle={{
                            backgroundColor: theme.colors.deep01Primary,
                            paddingVertical: 5,
                        }}
                    ></Button>
                </View>
            </Card>
            <Dialog isVisible={visible}>
                <TouchableOpacity
                    onPress={() => {
                        setVisible(false)
                    }}
                    className="items-end"
                >
                    <Icon type={'antdesign'} name={'close'}></Icon>
                </TouchableOpacity>
                {/*换成选择器*/}
                <WheelPicker
                    selectedIndex={selectedIndex}
                    options={foodTime}
                    onChange={(index) => {
                        setSelectedIndex(index)
                    }}
                />
                <Dialog.Actions>
                    <Dialog.Button
                        title="确定"
                        onPress={() => {
                            disShow()
                        }}
                        titleStyle={{
                            color: theme.colors.deep01Primary,
                        }}
                    />
                    <Dialog.Button
                        title="取消"
                        onPress={() => {
                            disShow()
                        }}
                        titleStyle={{
                            color: theme.colors.deep01Primary,
                        }}
                    />
                </Dialog.Actions>
            </Dialog>
        </BottomSheet>
    )
}

export default memo(RecordFood)
