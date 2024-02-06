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
import foodDetail from '../../views/diet/c-pages/food-detail/food-detail'
import { foodTime } from '../../data/diet'
import { useNavigation } from '@react-navigation/native'
interface IProps {
    children: {
        cancel: () => void
    }
    isVisible: boolean
}

const RecordFood: FC<IProps> = ({ isVisible, children }) => {
    const { cancel } = children
    const navigation = useNavigation()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [visible, setVisible] = useState(false)
    const disShow = () => {
        setVisible(false)
    }
    useEffect(() => {
        return () => cancel()
    }, [])
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
                    <Image
                        source={require('../../../assets/images/bg_welcome_header.png')}
                        style={{
                            borderRadius: 10,
                            width: 60,
                            height: 60,
                        }}
                    ></Image>
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
                            navigation.navigate('food-nutrients')
                        }}
                    >
                        <Text className=" text-center flex-1">鸡腿</Text>
                        <Icon
                            type={'antdesign'}
                            name={'right'}
                            size={13}
                        ></Icon>
                    </TouchableOpacity>
                </View>
                {/*营养成分*/}
                <View className="flex-row">
                    {[1, 2, 3, 4].map((item, index) => {
                        return (
                            <View
                                key={item}
                                style={{
                                    marginTop: 20,
                                    width: Dimensions.get('screen').width / 4.4,
                                }}
                                className="border-t border-b pt-[10] pb-[10] border-[#f4f4f4]"
                            >
                                <Text className="color-[#666]">热量(千卡)</Text>
                                <Text className="mt-[10] text-center">85</Text>
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
                        20.0
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
                {/*<View></View>*/}
                <View className="m-auto mt-[20]">
                    <Button
                        onPress={() => {
                            cancel()
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
                        console.log(selectedIndex)
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
